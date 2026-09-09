import { describe, it, expect } from "vitest";
import { formatEffectString } from "./format";
import { highlightKeywords } from "../util/textFormatting";
import traits from "../assets/OfflineJsons/traits.json";
import spells from "../assets/OfflineJsons/spells.json";
import items from "../assets/OfflineJsons/items.json";

// The guarantee that makes the one-pass rewrite safe: adding keyword spans must
// not have disturbed a single stat colour anywhere in the real content. Strip
// the keyword spans back out of formatEffectString's output and what is left
// must be exactly what stat colouring alone produces.
//
// This is the whole corpus, not a sample, because the risk it covers -- one
// pass matching inside markup another pass injected -- shows up on specific
// strings rather than in general.
describe("formatEffectString parity with stat-only colouring", () => {
    // Every string formatEffectString is actually called on: the three tables
    // and three cards pass `effect`, and itemCard formats each upgrade line
    // separately (itemCard.tsx:106). Item descriptions are in too, so the guard
    // still holds if a card starts rendering them.
    const corpus = [...traits, ...spells, ...items]
        .flatMap(
            (record: {
                effect?: string;
                description?: string;
                upgrades?: unknown[];
            }) => [
                record.effect,
                record.description,
                ...(record.upgrades ?? []),
            ]
        )
        .filter(
            (text): text is string => typeof text === "string" && text !== ""
        );

    const stripKeywords = (html: string) =>
        html.replace(
            /<span class="kw" data-kw="[^"]*" tabindex="0" role="button">([\s\S]*?)<\/span>/g,
            "$1"
        );

    it("covers every string formatEffectString is called on", () => {
        // 100 traits + 204 arts + 166 items + 84 item descriptions + 88 upgrades
        expect(corpus.length).toBe(642);
    });

    it("leaves stat colouring byte-identical on every effect string", () => {
        for (const text of corpus) {
            expect(
                stripKeywords(formatEffectString(text)),
                text.slice(0, 60)
            ).toBe(highlightKeywords(text));
        }
    });

    it("never emits a stat span inside a keyword span or its attributes", () => {
        for (const text of corpus) {
            const html = formatEffectString(text);
            expect(html).not.toMatch(/data-kw="[^"]*<span/);
            expect(html).not.toMatch(/class="text-[a-z]*-700"[^>]*<span/);
        }
    });
});
