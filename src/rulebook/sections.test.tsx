import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { extractHeadings, extractSections } from "./sections";
import { RULEBOOK_PAGES, markdownFor } from "./pages";
import MarkdownRenderer from "./render/MarkdownRenderer";
import combatHeadings from "./__fixtures__/combat-headings.json";

const filePages = RULEBOOK_PAGES.filter((page) => "file" in page);

describe("extractSections", () => {
    it("gives a child heading the path of its ancestors and the root an empty path", () => {
        const sections = extractSections("# Combat\n\nintro\n\n## Cover\n\nbehind a wall\n");
        expect(sections).toEqual([
            { level: 0, text: "", slug: "", path: [], body: "" },
            { level: 1, text: "Combat", slug: "combat", path: [], body: "intro" },
            { level: 2, text: "Cover", slug: "cover", path: ["Combat"], body: "behind a wall" },
        ]);
    });

    /** A skipped level still nests under the nearest shallower heading. */
    it("nests a heading under a shallower one even when a level is skipped", () => {
        const sections = extractSections("# Combat\n\n### Cover\n\ntext\n\n## Initiative\n");
        expect(sections.map((s) => [s.text, s.path])).toEqual([
            ["", []],
            ["Combat", []],
            ["Cover", ["Combat"]],
            ["Initiative", ["Combat"]],
        ]);
    });

    it("stops a body at the next heading of any level, including a shallower one", () => {
        const sections = extractSections("## Deep\n\ndeep text\n\n# Shallow\n\nshallow text\n");
        expect(sections.find((s) => s.text === "Deep")?.body).toBe("deep text");
        expect(sections.find((s) => s.text === "Shallow")?.body).toBe("shallow text");
    });

    it("joins several blocks under one heading with newlines", () => {
        const sections = extractSections("# A\n\none\n\n- two\n- three\n\nfour\n");
        expect(sections[1].body).toBe("one\ntwo\nthree\nfour");
    });

    it("separates table cells and rows", () => {
        const sections = extractSections("# A\n\n| x | y |\n| - | - |\n| 1 | 2 |\n");
        expect(sections[1].body).toBe("x y\n1 2");
    });

    it("recurses into nested lists and blockquotes", () => {
        const sections = extractSections("# A\n\n- one\n    - two\n\n> three\n\n---\n");
        expect(sections[1].body).toBe("one\ntwo\nthree");
    });

    /** Glossary records are indexed from their sources, never from the directive. */
    it("contributes nothing to body from a directive line", () => {
        const sections = extractSections('# Banes\n\nintro\n\n::effects{category="bane"}\n\nafter\n');
        expect(sections[1].body).toBe("intro\nafter");
    });

    it("keeps the text inside an inline html tag and drops the tag", () => {
        const sections = extractSections(
            '# Stats\n\nis <span style="font-size: 1.3em">Max Strain = Level</span> here\n'
        );
        expect(sections[1].body).toBe("is Max Strain = Level here");
    });

    it("contributes no heading and no body from a frontmatter block", () => {
        const sections = extractSections("---\ntitle: Combat\norder: 5\ntags: [x]\n---\n\n# Combat\n\ntext\n");
        expect(sections).toEqual([
            { level: 0, text: "", slug: "", path: [], body: "" },
            { level: 1, text: "Combat", slug: "combat", path: [], body: "text" },
        ]);
    });

    it("puts content before the first heading in a level-0 section", () => {
        const sections = extractSections("preamble\n\n# Combat\n");
        expect(sections[0]).toEqual({ level: 0, text: "", slug: "", path: [], body: "preamble" });
    });

    it("reads heading text through inline formatting", () => {
        const sections = extractSections("## The *Big* [Link](#x) Heading\n");
        expect(sections[1]).toMatchObject({ text: "The Big Link Heading", slug: "the-big-link-heading" });
    });
});

describe("extractHeadings", () => {
    it("returns the same list for combat.md as before the sections refactor", () => {
        expect(extractHeadings(markdownFor("combat")!)).toEqual(combatHeadings);
    });

    it("omits the level-0 section", () => {
        expect(extractHeadings("preamble\n\n# A\n")).toEqual([{ level: 1, text: "A", slug: "a" }]);
    });
});

describe("rulebook pages", () => {
    /** The index anchors are only useful if the renderer sets the same ids. */
    it.each(filePages)("$slug: rendered heading ids match extractSections slugs", ({ slug }) => {
        const markdown = markdownFor(slug)!;
        const { container } = render(
            <MemoryRouter initialEntries={[`/rulebook/${slug}`]}>
                <MarkdownRenderer
                    markdown={markdown}
                    have_header={false}
                />
            </MemoryRouter>
        );
        const rendered = Array.from(container.querySelectorAll("h1, h2, h3, h4, h5, h6")).map((el) => el.id);
        const expected = extractSections(markdown)
            .filter((s) => s.level > 0)
            .map((s) => s.slug);
        expect(rendered).toEqual(expected);
    });

    /** Two headings with one slug would send a search result to the wrong section. */
    it.each(filePages)("$slug: heading slugs are unique", ({ slug }) => {
        const slugs = extractSections(markdownFor(slug)!)
            .filter((s) => s.level > 0)
            .map((s) => s.slug);
        expect(new Set(slugs).size).toBe(slugs.length);
    });
});
