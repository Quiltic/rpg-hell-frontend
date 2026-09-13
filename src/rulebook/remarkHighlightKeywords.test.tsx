import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render } from "@testing-library/react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkDirective from "remark-directive";
import rehypeRaw from "rehype-raw";
import {
    remarkHighlightKeywords,
    splitOnKeywords,
} from "./remarkHighlightKeywords";
import {
    DirectiveSources,
    remarkContentDirectives,
} from "./remarkContentDirectives";

// The full rulebook chain, in the order MarkdownRenderer uses.
function renderMd(markdown: string, sources?: DirectiveSources) {
    return render(
        <Markdown
            remarkPlugins={[
                remarkGfm,
                remarkDirective,
                ...(sources ? [remarkContentDirectives(sources)] : []),
                remarkHighlightKeywords,
            ]}
            rehypePlugins={[rehypeRaw]}
        >
            {markdown}
        </Markdown>
    ).container;
}

describe("splitOnKeywords", () => {
    it("splits a stat word out into span nodes around it", () => {
        expect(splitOnKeywords("Roll body.")).toEqual([
            { type: "text", value: "Roll " },
            { type: "html", value: '<span class="text-body-700">' },
            { type: "text", value: "body" },
            { type: "html", value: "</span>" },
            { type: "text", value: "." },
        ]);
    });

    it("matches case-insensitively but keeps the original casing", () => {
        expect(splitOnKeywords("Arcana")).toEqual([
            { type: "html", value: '<span class="text-arcana-700">' },
            { type: "text", value: "Arcana" },
            { type: "html", value: "</span>" },
        ]);
    });

    it("returns null when there is nothing to colour", () => {
        expect(splitOnKeywords("Roll two dice.")).toBeNull();
    });

    it("handles several words in one string", () => {
        const parts = splitOnKeywords("body and mind") ?? [];
        expect(parts.filter((p) => p.type === "html")).toHaveLength(4);
    });
});

describe("remarkHighlightKeywords", () => {
    it("colours stat words in prose", () => {
        const c = renderMd("Roll body.");
        expect(c.querySelector("span.text-body-700")?.textContent).toBe("body");
        expect(c.textContent).toBe("Roll body.");
    });

    it("colours stat words in headings", () => {
        const c = renderMd("## Body checks");
        expect(c.querySelector("h2 span.text-body-700")?.textContent).toBe(
            "Body"
        );
    });

    it("leaves inline code alone", () => {
        const c = renderMd("Use `body` here.");
        expect(c.querySelector("code")?.textContent).toBe("body");
        expect(c.querySelector("code span")).toBeNull();
    });

    it("leaves fenced code alone", () => {
        const c = renderMd("```\nbody\n```");
        expect(c.querySelector("pre code")?.textContent?.trim()).toBe("body");
        expect(c.querySelector("pre span")).toBeNull();
    });

    it("leaves link urls alone but colours the label", () => {
        const c = renderMd("[body stat](/rulebook/body)");
        const link = c.querySelector("a");
        expect(link?.getAttribute("href")).toBe("/rulebook/body");
        expect(link?.querySelector("span.text-body-700")?.textContent).toBe(
            "body"
        );
    });

    // The old pre-parse pass rewrote `body` inside the `text-body-700` class it
    // had just written, so running it twice produced a mangled class attribute.
    // Raw html is a separate node type here, so the attribute is untouchable.
    it("never rewrites the class of an existing colour span", () => {
        const c = renderMd('<span class="text-body-700">body</span>');
        const spans = c.querySelectorAll("span");
        spans.forEach((span) =>
            expect(span.getAttribute("class")).toBe("text-body-700")
        );
        expect(c.textContent).toBe("body");
    });
});

// The regression this whole plugin exists for: colouring used to run over the
// markdown source, which rewrote `nature` inside the attribute and left the
// line to parse as a paragraph instead of a directive.
describe("directives with a stat word in an attribute", () => {
    const sources: DirectiveSources = {
        things: {
            records: [
                { name: "alpha", group: "nature", text: "A body thing." },
                { name: "beta", group: "other", text: "Another thing." },
            ],
            toLine: (r) => `**_${r.name}_** - ${r.text}`,
            anchor: (r) => `thing-${r.name}`,
        },
    };

    beforeEach(() => {
        vi.spyOn(console, "warn").mockImplementation(() => {});
    });
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("still expands the directive", () => {
        const c = renderMd('::things{group="nature"}', sources);
        const items = c.querySelectorAll("li");
        expect(items).toHaveLength(1);
        expect(items[0].id).toBe("thing-alpha");
        expect(c.textContent).not.toMatch(/::things/);
        expect(console.warn).not.toHaveBeenCalled();
    });

    it("colours stat words inside the expanded bullets", () => {
        const c = renderMd('::things{group="nature"}', sources);
        expect(
            c.querySelector("#thing-alpha span.text-body-700")?.textContent
        ).toBe("body");
    });
});
