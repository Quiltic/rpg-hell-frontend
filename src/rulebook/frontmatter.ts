import { remark } from "remark";
import remarkFrontmatter from "remark-frontmatter";
import { parse as parseYaml } from "yaml";

export type PageFrontmatter = { title?: string; order?: number; tags?: string[] };

export function parseFrontmatter(markdown: string): { data: PageFrontmatter; body: string } {
    const tree = remark().use(remarkFrontmatter).parse(markdown);
    const first = tree.children[0];
    if (!first || first.type !== "yaml") return { data: {}, body: markdown };
    const end = first.position?.end.offset ?? 0;
    return { data: validate(readYaml(first.value)), body: markdown.slice(end) };
}

function readYaml(value: string): unknown {
    try {
        return parseYaml(value);
    } catch (error) {
        console.warn("frontmatter: invalid yaml, ignoring block", error);
        return undefined;
    }
}

function validate(raw: unknown): PageFrontmatter {
    if (typeof raw !== "object" || raw === null) return {};
    const fields = raw as Record<string, unknown>;
    const data: PageFrontmatter = {};
    if (typeof fields.title === "string") data.title = fields.title;
    else if ("title" in fields) warn("title", "a string");
    if (typeof fields.order === "number") data.order = fields.order;
    else if ("order" in fields) warn("order", "a number");
    if (Array.isArray(fields.tags) && fields.tags.every((t) => typeof t === "string")) {
        data.tags = fields.tags;
    } else if ("tags" in fields) warn("tags", "a list of strings");
    return data;
}

function warn(field: string, expected: string) {
    console.warn(`frontmatter: "${field}" is not ${expected}, dropping it`);
}
