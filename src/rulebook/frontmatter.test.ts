import { afterEach, describe, expect, it, vi } from "vitest";
import { parseFrontmatter } from "./frontmatter";

const block = "---\ntitle: Combat\norder: 5\ntags: [combat, initiative]\n---\n\n# Combat\n\ntext\n";

afterEach(() => {
    vi.restoreAllMocks();
});

describe("parseFrontmatter", () => {
    it("parses the three fields and strips the block from the body", () => {
        const { data, body } = parseFrontmatter(block);
        expect(data).toEqual({ title: "Combat", order: 5, tags: ["combat", "initiative"] });
        expect(body).toBe("\n\n# Combat\n\ntext\n");
    });

    it("returns empty data and the whole string when there is no block", () => {
        const markdown = "# Combat\n\ntext\n";
        expect(parseFrontmatter(markdown)).toEqual({ data: {}, body: markdown });
    });

    /** A thematic break followed by text is prose, not frontmatter, unless it is on line 1. */
    it("ignores a block that does not start on line 1", () => {
        const markdown = "\n---\ntitle: Combat\n---\n\n# Combat\n";
        expect(parseFrontmatter(markdown)).toEqual({ data: {}, body: markdown });
    });

    it("drops a tags value that is not a list of strings", () => {
        const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
        const { data } = parseFrontmatter("---\ntitle: Combat\ntags: combat\n---\n");
        expect(data).toEqual({ title: "Combat" });
        expect(warn).toHaveBeenCalledOnce();
    });

    it("drops a title or order of the wrong type", () => {
        vi.spyOn(console, "warn").mockImplementation(() => {});
        const { data } = parseFrontmatter("---\ntitle: 5\norder: five\ntags: []\n---\n");
        expect(data).toEqual({ tags: [] });
    });

    it("treats an empty block as no data", () => {
        expect(parseFrontmatter("---\n---\n# Combat\n").data).toEqual({});
    });
});
