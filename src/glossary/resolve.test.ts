import { describe, expect, it } from "vitest";
import {
    definitionHtml,
    GlossaryHit,
    resolveTerm,
    rulebookHref,
} from "./resolve";
import { allEffects, effectsSource } from "./sources/effects";
import { allKeys, keysSource } from "./sources/keys";
import { GLOSSARY_SOURCES } from "./sources/sources";
import { keywordPatterns } from "./scan";

function hit(name: string): GlossaryHit {
    const found = resolveTerm(name);
    if (!found) throw new Error(`no glossary record for ${name}`);
    return found;
}

describe("resolveTerm", () => {
    it("finds effects", () => {
        const found = hit("burn");
        expect(found.source.kind).toBe("effects");
        expect(found.record.effect).toMatch(/beginning of your turn/);
    });

    it("finds keys that are not effects", () => {
        expect(hit("on hit")).toEqual({
            source: keysSource,
            record: expect.objectContaining({ name: "on hit", source: "item" }),
        });
        expect(hit("reaction")).toEqual({
            source: keysSource,
            record: expect.objectContaining({
                name: "reaction",
                source: "spell",
            }),
        });
    });

    it("resolves the parameterised keys by their stored name", () => {
        expect(hit("reaching x").record.effect).toMatch(/range of/);
    });

    it("follows registry order when a name is in more than one source", () => {
        // focus and follower are deliberately duplicated between effects.json
        // and the spell key, byte for byte. Effects come first in the registry.
        for (const name of ["focus", "follower"]) {
            expect(hit(name).source).toBe(effectsSource);
        }
        expect(GLOSSARY_SOURCES[0]).toBe(effectsSource);
    });

    it("normalises case and apostrophes like getEffect does", () => {
        expect(hit("Reaching X").record.name).toBe("reaching x");
        expect(hit("GRAPPLED").record.name).toBe("grappled");
        expect(hit("On Hit").record.name).toBe("on hit");
    });

    it("returns undefined for an unknown name", () => {
        expect(resolveTerm("strain")).toBeUndefined();
    });

    // Nothing the matcher can emit should fail to resolve, or the tooltip
    // would open on a word and have nothing to say.
    it("resolves every canonical name the matcher can emit", () => {
        const canonical = new Set(
            GLOSSARY_SOURCES.flatMap((s) => s.records.map((r) => r.name))
        );
        expect(keywordPatterns().length).toBeGreaterThan(0);
        for (const name of canonical) {
            expect(resolveTerm(name), name).toBeDefined();
        }
    });
});

describe("rulebookHref", () => {
    it("points at the page each source is written up on", () => {
        expect(rulebookHref(hit("burn"))).toBe("/rulebook/effects#effect-burn");
        expect(rulebookHref(hit("on hit"))).toBe(
            "/rulebook/items#key-item-on-hit"
        );
        expect(rulebookHref(hit("reaction"))).toBe(
            "/rulebook/spells#key-spell-reaction"
        );
    });

    it("strips apostrophes the same way the heading slugs do", () => {
        expect(rulebookHref(hit("reaching x"))).toBe(
            "/rulebook/items#key-item-reaching-x"
        );
        expect(
            rulebookHref({
                source: effectsSource,
                record: { ...allEffects[0], name: "death's door" },
            })
        ).toBe("/rulebook/effects#effect-deaths-door");
    });

    // The links are only worth anything if they match the ids the directive
    // plugin renders, which come from the same `anchor` method.
    it("uses the source's anchor for every record", () => {
        for (const effect of allEffects) {
            expect(
                rulebookHref({ source: effectsSource, record: effect })
            ).toBe(`/rulebook/effects#${effectsSource.anchor(effect)}`);
        }
        for (const key of allKeys) {
            const page = key.source === "item" ? "items" : "spells";
            expect(rulebookHref({ source: keysSource, record: key })).toBe(
                `/rulebook/${page}#${keysSource.anchor(key)}`
            );
        }
    });
});

describe("definitionHtml", () => {
    it("links nested terms out to the rulebook", () => {
        // Wet's own text names Burn.
        const html = definitionHtml(hit("wet"));
        expect(html).toContain('href="/rulebook/effects#effect-burn"');
    });

    it("does not link the term the definition is about", () => {
        // Burn names itself; none of those should be a link.
        const html = definitionHtml(hit("burn"));
        expect(html).not.toContain("effect-burn");
        expect(html).toContain("Burn");
    });

    it("still colours stat words", () => {
        const html = definitionHtml(hit("grappled"));
        expect(html).toContain('<span class="text-body-700">BODY</span>');
    });

    it("prefers a non-empty short over the full effect", () => {
        const record = { ...allEffects[0], short: "Brief.", effect: "Long." };
        expect(definitionHtml({ source: effectsSource, record })).toBe(
            "Brief."
        );
        expect(
            definitionHtml({
                source: effectsSource,
                record: { ...record, short: "" },
            })
        ).toBe("Long.");
    });

    it("emits no tooltip spans, so tooltips cannot nest", () => {
        for (const effect of allEffects) {
            const html = definitionHtml({
                source: effectsSource,
                record: effect,
            });
            expect(html, effect.name).not.toContain('class="kw"');
        }
    });
});
