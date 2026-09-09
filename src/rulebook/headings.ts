import { remark } from "remark";
import { visit } from "unist-util-visit";
import { VFileCompatible } from "vfile";
import type { RootContent, Heading as ASTHeadingNode } from "mdast";
import { generateSlug } from "../util/slug";

export interface Heading {
    level: number;
    text: string;
    slug: string;
}

function getChildrenText(nodeChildren: RootContent[]): string {
    return nodeChildren
        .map((child) => {
            if (child.type === "text") {
                return child.value;
            }
            if ("children" in child && Array.isArray(child.children)) {
                return getChildrenText(child.children as RootContent[]);
            }
            return "";
        })
        .join("");
}

/**
 * Parses a Markdown string and extracts all headings with their levels, text, and slugs.
 * @param markdown The Markdown content as a string.
 * @returns An array of Heading objects.
 */
export function extractHeadings(markdown: string): Heading[] {
    const headings: Heading[] = [];
    try {
        const tree = remark().parse(markdown as VFileCompatible);

        visit(tree, "heading", (node: ASTHeadingNode) => {
            const text = getChildrenText(node.children as RootContent[]);
            const slug = generateSlug(text);

            headings.push({
                level: node.depth,
                text: text,
                slug: slug,
            });
        });
    } catch (error) {
        console.error(
            "Failed to parse markdown for heading extraction:",
            error
        );
    }
    return headings;
}
