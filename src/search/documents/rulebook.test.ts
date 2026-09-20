import { describe, expect, it } from "vitest";
import { rulebookDocuments } from "./rulebook";

const combat = [
    "---",
    "title: Combat",
    "order: 5",
    "tags: [Main Rules, fighting]",
    "---",
    "",
    "preamble text",
    "",
    "# Combat",
    "",
    "intro",
    "",
    '::effects{category="bane"}',
    "",
    "## Cover",
    "",
    "behind a wall",
    "",
].join("\n");

const intro = "# Intro\n\nhello\n";

describe("rulebookDocuments", () => {
    const docs = rulebookDocuments([
        { slug: "combat", title: "Combat", markdown: combat },
        { slug: "intro", title: "Intro", markdown: intro },
    ]);

    it("makes one document per heading with the page and section in the id", () => {
        expect(docs.map((d) => d.id)).toEqual([
            "rulebook:combat#combat",
            "rulebook:combat#cover",
            "rulebook:intro#intro",
        ]);
    });

    it("builds the context from the heading path and the route from slug and anchor", () => {
        expect(docs.map((d) => [d.context, d.to, d.page, d.anchor])).toEqual([
            ["Rulebook", "/rulebook/combat#combat", "combat", "combat"],
            ["Rulebook > Combat", "/rulebook/combat#cover", "combat", "cover"],
            ["Rulebook", "/rulebook/intro#intro", "intro", "intro"],
        ]);
    });

    it("puts frontmatter tags in pageTags and none when the page has no frontmatter", () => {
        expect(docs[0].pageTags).toBe("Main Rules fighting");
        expect(docs[2].pageTags).toBe("");
    });

    /** The preamble before the first heading has no anchor of its own, so it joins the first section. */
    it("merges the preamble into the first section and drops directive lines", () => {
        expect(docs[0].body).toBe("preamble text\nintro");
        expect(docs[0].body).not.toContain("::effects");
        expect(docs[1].body).toBe("behind a wall");
    });

    it("uses the heading text as the title and the rulebook color", () => {
        expect(docs[1].title).toBe("Cover");
        expect(docs.every((d) => d.source === "rulebook" && d.color === "soul" && d.aliases === "")).toBe(true);
    });
});
