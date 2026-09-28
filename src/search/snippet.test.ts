import { describe, expect, it } from "vitest";
import { snippetFor, snippetHtml } from "./snippet";
import type { SearchResult } from "./types";

function result(body: string, terms: string[]): SearchResult {
    return {
        id: "item:test",
        source: "item",
        title: "test",
        aliases: "",
        body,
        pageTags: "",
        context: "",
        to: "/",
        color: "aabase",
        score: 1,
        terms,
    };
}

const filler = (words: number) => Array.from({ length: words }, (_, i) => `word${i}`).join(" ");

describe("snippetFor", () => {
    it("returns a short body whole, with whitespace collapsed and no ellipsis", () => {
        expect(snippetFor(result("deal 2\n\ndamage  to a target", ["damage"]))).toBe("deal 2 damage to a target");
    });

    it("windows around the first matched term and marks both clipped ends", () => {
        const snippet = snippetFor(result(`${filler(40)} bleeding ${filler(40)}`, ["bleeding"]));
        expect(snippet.startsWith("…")).toBe(true);
        expect(snippet.endsWith("…")).toBe(true);
        expect(snippet.length).toBeLessThanOrEqual(162);
        const at = snippet.indexOf("bleeding");
        expect(at).toBeGreaterThan(0);
        expect(at).toBeLessThanOrEqual(41);
    });

    it("starts and ends the window on whole words", () => {
        const snippet = snippetFor(result(`${filler(40)} bleeding ${filler(40)}`, ["bleeding"]));
        for (const word of snippet.replace(/…/g, "").split(" ")) {
            expect(word).toMatch(/^(word\d+|bleeding)$/);
        }
    });

    it("has no leading ellipsis when the match is near the start", () => {
        const snippet = snippetFor(result(`bleeding ${filler(40)}`, ["bleeding"]));
        expect(snippet.startsWith("bleeding")).toBe(true);
        expect(snippet.endsWith("…")).toBe(true);
    });

    it("matches a term as a prefix, in any case", () => {
        const snippet = snippetFor(result(`${filler(40)} Bleeding out ${filler(40)}`, ["bleed"]));
        expect(snippet).toContain("Bleeding out");
    });

    /** A title-only hit has no term in the body, so the snippet is the opening text. */
    it("falls back to the start of the body when no term is found", () => {
        const snippet = snippetFor(result(filler(60), ["sword"]));
        expect(snippet.startsWith("word0 word1")).toBe(true);
        expect(snippet.endsWith("…")).toBe(true);
    });

    it("honours maxLength", () => {
        expect(snippetFor(result(filler(60), []), 30).length).toBeLessThanOrEqual(31);
    });
});

describe("snippetHtml", () => {
    const mark = (text: string) => `<mark class="bg-transparent font-semibold text-light">${text}</mark>`;

    it("wraps each matched term in a mark", () => {
        expect(snippetHtml("a Sword and a swordfish", ["sword"])).toBe(`a ${mark("Sword")} and a ${mark("sword")}fish`);
    });

    it("prefers the longest term where two overlap", () => {
        expect(snippetHtml("fireball", ["fire", "fireball"])).toBe(mark("fireball"));
    });

    it("colors stat words", () => {
        expect(snippetHtml("roll Body to hit", ["hit"])).toContain('<span class="text-body-700">Body</span>');
    });

    /** Snippets have no tooltip layer, so glossary terms must stay plain text. */
    it("leaves glossary terms plain", () => {
        const html = snippetHtml("the target is bleeding", ["target"]);
        expect(html).toContain("bleeding");
        expect(html).not.toContain("kw");
    });

    it("escapes HTML in plain and matched pieces", () => {
        expect(snippetHtml('<b>bold</b> & "quoted"', ["bold"])).toBe(
            `&lt;b&gt;${mark("bold")}&lt;/b&gt; &amp; &quot;quoted&quot;`
        );
    });

    it("handles no terms and regex characters in terms", () => {
        expect(snippetHtml("plain text", [])).toBe("plain text");
        expect(snippetHtml("costs 2+ points", ["2+"])).toBe(`costs ${mark("2+")} points`);
    });
});
