import { RulebookPageSlug, pageFor } from "./pageList";

export * from "./pageList";

const MARKDOWN_DIR = "../assets/RulebookFiles/markdown/";

const markdown = import.meta.glob("../assets/RulebookFiles/markdown/*.md", {
    query: "?raw",
    import: "default",
    eager: true,
}) as Record<string, string>;

export const MARKDOWN_FILES = Object.keys(markdown).map((key) => key.slice(MARKDOWN_DIR.length));

export function markdownFile(file: string): string {
    const text = markdown[MARKDOWN_DIR + file];
    if (text === undefined) throw new Error(`no markdown file "${file}"`);
    return text;
}

export function markdownFor(slug: RulebookPageSlug): string | undefined {
    const page = pageFor(slug);
    return "file" in page ? markdownFile(page.file) : undefined;
}
