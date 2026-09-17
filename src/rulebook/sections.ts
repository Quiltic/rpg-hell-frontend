import { remark } from "remark";
import remarkFrontmatter from "remark-frontmatter";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";
import { toString } from "mdast-util-to-string";
import type { RootContent } from "mdast";
import { generateSlug } from "../util/slug";

export interface Heading {
    level: number;
    text: string;
    slug: string;
}

export interface Section extends Heading {
    path: string[];
    body: string;
}

const SKIPPED_BODY_NODES = new Set(["leafDirective", "containerDirective", "textDirective", "yaml", "html"]);

export function getChildrenText(nodeChildren: RootContent[]): string {
    return nodeChildren
        .map((child) => {
            if (child.type === "text") return child.value;
            if ("children" in child && Array.isArray(child.children)) {
                return getChildrenText(child.children as RootContent[]);
            }
            return "";
        })
        .join("");
}

function blockText(node: RootContent): string {
    switch (node.type) {
        case "list":
        case "listItem":
        case "blockquote":
            return node.children.map(blockText).filter(Boolean).join("\n");
        case "table":
            return node.children.map((row) => row.children.map((cell) => toString(cell)).join(" ")).join("\n");
        default:
            return toString(node);
    }
}

export function extractSections(markdown: string): Section[] {
    const tree = remark().use(remarkFrontmatter).use(remarkGfm).use(remarkDirective).parse(markdown);
    const stack: Heading[] = [];
    let current: Section = { level: 0, text: "", slug: "", path: [], body: "" };
    const bodyLines: string[] = [];
    const sections: Section[] = [];

    const close = () => {
        current.body = bodyLines.join("\n");
        bodyLines.length = 0;
        sections.push(current);
    };

    for (const node of tree.children) {
        if (node.type === "heading") {
            close();
            while (stack.length && stack[stack.length - 1].level >= node.depth) stack.pop();
            const text = getChildrenText(node.children as RootContent[]);
            const heading = { level: node.depth, text, slug: generateSlug(text) };
            current = { ...heading, path: stack.map((h) => h.text), body: "" };
            stack.push(heading);
        } else if (!SKIPPED_BODY_NODES.has(node.type)) {
            const text = blockText(node);
            if (text) bodyLines.push(text);
        }
    }
    close();
    return sections;
}

export function extractHeadings(markdown: string): Heading[] {
    try {
        return extractSections(markdown)
            .filter((section) => section.level > 0)
            .map(({ level, text, slug }) => ({ level, text, slug }));
    } catch (error) {
        console.error("Failed to parse markdown for heading extraction:", error);
        return [];
    }
}
