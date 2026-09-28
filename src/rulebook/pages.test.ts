import { describe, expect, it } from "vitest";
import { parseFrontmatter } from "./frontmatter";
import { MARKDOWN_FILES, RULEBOOK_PAGES, markdownFile, markdownFor, pageTitle } from "./pages";

/** Markdown files that are read by a component rather than served as a page. */
const NON_PAGE_FILES = ["spell_key.md", "item_key.md", "character_examples.md"];

describe("RULEBOOK_PAGES", () => {
    it("has unique slugs", () => {
        const slugs = RULEBOOK_PAGES.map((page) => page.slug);
        expect(new Set(slugs).size).toBe(slugs.length);
    });

    it("names a markdown file that exists for every page with a file", () => {
        for (const page of RULEBOOK_PAGES) {
            if ("file" in page) {
                expect(MARKDOWN_FILES, page.slug).toContain(page.file);
            }
        }
    });

    /** A markdown file nobody reads is a page that fell off the router. */
    it("accounts for every markdown file in the folder", () => {
        const pageFiles = RULEBOOK_PAGES.flatMap((page) => ("file" in page ? [page.file] : []));
        for (const file of MARKDOWN_FILES) {
            expect([...pageFiles, ...NON_PAGE_FILES], file).toContain(file);
        }
    });
});

describe("frontmatter", () => {
    const filePages = RULEBOOK_PAGES.filter((page) => "file" in page);

    /** The search index shows the frontmatter title, so it must match the nav. */
    it.each(filePages)("$slug: title and order match the registry", ({ slug }) => {
        const { data } = parseFrontmatter(markdownFor(slug)!);
        expect(data.title).toBe(pageTitle(slug));
        expect(data.order).toBe(filePages.findIndex((page) => page.slug === slug) + 1);
    });

    it.each(NON_PAGE_FILES)("%s has no frontmatter", (file) => {
        expect(parseFrontmatter(markdownFile(file)).data).toEqual({});
    });
});

describe("markdownFor", () => {
    it("returns the file contents for a markdown page", () => {
        expect(markdownFor("effects")).toContain("# States");
    });

    it("returns undefined for a page without a file", () => {
        expect(markdownFor("traits")).toBeUndefined();
    });
});

describe("markdownFile", () => {
    it("reads a non-page file by name", () => {
        expect(markdownFile("spell_key.md")).toContain("::keys{");
    });

    it("throws on an unknown file", () => {
        expect(() => markdownFile("nope.md")).toThrow('"nope.md"');
    });
});

describe("pageTitle", () => {
    it("returns the display title", () => {
        expect(pageTitle("spells")).toBe("Arts");
    });
});
