import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render } from "@testing-library/react";
import Markdown from "react-markdown";
import remarkDirective from "remark-directive";
import rehypeRaw from "rehype-raw";
import { remark } from "remark";
import type { List, Paragraph, Root } from "mdast";
import {
    ContentBlock,
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
        anchor: (r) => `thing-${r.name}`,
    },
    blocks: {
        records: fakes,
        toLine: (r) => `**_${r.name}_** - ${r.text}`,
        anchor: (r) => `block-${r.name}`,
        toBlock: (r) =>
            r.name === "alpha" ? `${r.text}\n\n- one\n- two` : `${r.text}`,
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

describe("remarkContentDirectives with toBlock", () => {
    it("expands a single match into a block carrying the id", () => {
        const node = parse('::blocks{name="beta"}').children[0] as ContentBlock;
        expect(node.type).toBe("contentBlock");
        expect(node.data?.hName).toBe("div");
        expect(node.data?.hProperties?.id).toBe("block-beta");
        expect(node.children.map((c) => c.type)).toEqual(["paragraph"]);
        expect(textOf(node)).toBe("Second bold thing.");
    });

    it("keeps every block of a multi-block effect", () => {
        const node = parse('::blocks{name="alpha"}')
            .children[0] as ContentBlock;
        expect(node.children.map((c) => c.type)).toEqual(["paragraph", "list"]);
    });

    it("falls back to a list when several records match", () => {
        const list = parse('::blocks{group="a"}').children[0] as List;
        expect(list.type).toBe("list");
        expect(list.children.map((li) => li.data?.hProperties?.id)).toEqual([
            "block-alpha",
            "block-beta",
        ]);
    });

    it("leaves a source without toBlock on the list path", () => {
        const list = parse('::things{name="beta"}').children[0] as List;
        expect(list.type).toBe("list");
    });

    it("expands consecutive directives on adjacent lines", () => {
        const tree = parse('::blocks{name="beta"}\n::blocks{name="gamma"}');
        expect(tree.children.map((c) => c.type)).toEqual([
            "contentBlock",
            "contentBlock",
        ]);
    });

    it("renders through react-markdown as a div with the id and inner list", () => {
        const { container } = render(
            <Markdown
                remarkPlugins={[
                    remarkDirective,
                    remarkContentDirectives(sources),
                ]}
                rehypePlugins={[rehypeRaw]}
            >
                {'::blocks{name="alpha"}'}
            </Markdown>
        );
        const div = container.querySelector("#block-alpha");
        expect(div?.tagName).toBe("DIV");
        expect(div?.querySelector("p")?.textContent).toBe("First body thing.");
        expect(div?.querySelectorAll("ul li")).toHaveLength(2);
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
        expect(items).toHaveLength(8);
        expect(items[0].id).toBe("effect-burn");
        expect(items[0].querySelector("strong em")?.textContent).toBe("Burn");
    });

    it("slugs spaces out of ids", () => {
        const { container } = render(
            <Markdown remarkPlugins={[remarkDirective, contentDirectives]}>
                {'::keys{name="on hit"}'}
            </Markdown>
        );
        expect(container.querySelector("li")?.id).toBe("key-item-on-hit");
    });
});
