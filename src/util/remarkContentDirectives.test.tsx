import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render } from "@testing-library/react";
import Markdown from "react-markdown";
import remarkDirective from "remark-directive";
import rehypeRaw from "rehype-raw";
import { remark } from "remark";
import type { List, Paragraph, Root } from "mdast";
import {
    DirectiveSources,
    remarkContentDirectives,
} from "./remarkContentDirectives";
import { contentDirectives } from "./contentDirectives";

type Fake = { name: string; group: string; text: string };

const fakes: Fake[] = [
    { name: "alpha", group: "a", text: "First body thing." },
    { name: "beta", group: "a", text: "Second **bold** thing." },
    { name: "gamma", group: "b", text: "Third thing." },
];

const sources: DirectiveSources = {
    things: {
        records: fakes,
        toLine: (r) => `**_${r.name}_** - ${r.text}`,
        idOf: (r) => `thing-${r.name}`,
    },
};

function parse(markdown: string): Root {
    return remark()
        .use(remarkDirective)
        .use(remarkContentDirectives(sources))
        .runSync(remark().use(remarkDirective).parse(markdown)) as Root;
}

function textOf(node: unknown): string {
    if (typeof node !== "object" || node === null) return "";
    const n = node as { value?: string; children?: unknown[] };
    if (typeof n.value === "string") return n.value;
    return (n.children ?? []).map(textOf).join("");
}

describe("remarkContentDirectives", () => {
    beforeEach(() => {
        vi.spyOn(console, "warn").mockImplementation(() => {});
    });
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("expands a filtered directive into a loose list with ids", () => {
        const tree = parse('::things{group="a"}');
        const list = tree.children[0] as List;

        expect(list.type).toBe("list");
        expect(list.spread).toBe(true);
        expect(list.children).toHaveLength(2);
        expect(list.children.map((li) => li.data?.hProperties?.id)).toEqual([
            "thing-alpha",
            "thing-beta",
        ]);
        expect(textOf(list.children[0])).toMatch(/^alpha - First/);
    });

    it("expands to every record when there are no attributes", () => {
        const list = parse("::things").children[0] as List;
        expect(list.children).toHaveLength(3);
    });

    it("renders a tight list with the tight attribute", () => {
        const list = parse('::things{group="a" tight}').children[0] as List;
        expect(list.spread).toBe(false);
        expect(list.children).toHaveLength(2);
    });

    it("leaves surrounding content alone", () => {
        const tree = parse('# Title\n\nSome prose.\n\n::things{group="b"}\n');
        expect(tree.children.map((c) => c.type)).toEqual([
            "heading",
            "paragraph",
            "list",
        ]);
    });

    it("shows a visible failure for zero matches", () => {
        const p = parse('::things{group="zzz"}').children[0] as Paragraph;
        expect(p.type).toBe("paragraph");
        expect(textOf(p)).toBe('[things: no entries for group="zzz"]');
        expect(console.warn).toHaveBeenCalled();
    });

    it("shows a visible failure for an unknown attribute", () => {
        const p = parse('::things{colour="red"}').children[0] as Paragraph;
        expect(textOf(p)).toBe('[things: unknown attribute "colour"]');
    });

    it("treats a prototype-inherited field as an unknown attribute", () => {
        const p = parse('::things{toString="x"}').children[0] as Paragraph;
        expect(textOf(p)).toBe('[things: unknown attribute "toString"]');
    });

    it("shows a visible failure for an unknown directive name", () => {
        const p = parse("::nothing").children[0] as Paragraph;
        expect(textOf(p)).toBe('[nothing: unknown directive "nothing"]');
    });

    it("renders through react-markdown with ids and inline markdown", () => {
        const { container } = render(
            <Markdown
                remarkPlugins={[
                    remarkDirective,
                    remarkContentDirectives(sources),
                ]}
                rehypePlugins={[rehypeRaw]}
            >
                {'::things{group="a"}'}
            </Markdown>
        );

        const alpha = container.querySelector("#thing-alpha");
        expect(alpha?.tagName).toBe("LI");
        // Colouring is remarkHighlightKeywords' job, not this plugin's; see
        // remarkHighlightKeywords.test.tsx for the two running together.
        expect(alpha?.querySelector("span")).toBeNull();
        expect(alpha?.textContent).toMatch(/First body thing\./);
        // First <strong> is the bolded name; the second is the **bold** in the text.
        const strongs = container.querySelectorAll("#thing-beta strong");
        expect(strongs[1]?.textContent).toBe("bold");
    });
});

describe("effects directive (real data)", () => {
    it("renders the banes with effect-<slug> ids and title-cased names", () => {
        const { container } = render(
            <Markdown
                remarkPlugins={[remarkDirective, contentDirectives]}
                rehypePlugins={[rehypeRaw]}
            >
                {'::effects{category="bane"}'}
            </Markdown>
        );

        const items = container.querySelectorAll("li");
        expect(items).toHaveLength(6);
        expect(items[0].id).toBe("effect-marked");
        expect(items[0].querySelector("strong em")?.textContent).toBe("Marked");
    });

    it("slugs apostrophes out of ids", () => {
        const { container } = render(
            <Markdown remarkPlugins={[remarkDirective, contentDirectives]}>
                {'::effects{name="death\'s door"}'}
            </Markdown>
        );
        expect(container.querySelector("li")?.id).toBe("effect-deaths-door");
    });
});
