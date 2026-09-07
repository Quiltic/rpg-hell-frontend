import { describe, expect, it } from "vitest";
import {
    definitionHtml,
    GlossaryHit,
    resolveTerm,
    rulebookHref,
} from "./resolveTerm";
import { allEffects } from "../hooks/useEffects";
import { allKeys } from "../hooks/useKeys";
import { effectsSource, keysSource } from "../util/contentDirectives";
import { keywordPatterns } from "../util/keywordScan";

describe("resolveTerm", () => {
    it("finds effects", () => {
        const hit = resolveTerm("burn");
        expect(hit?.kind).toBe("effect");
        expect(hit?.record.effect).toMatch(/beginning of your turn/);
    });

    it("finds keys that are not effects", () => {
        expect(resolveTerm("on hit")).toEqual({
            kind: "key",
            source: "item",
            record: expect.objectContaining({ name: "on hit" }),
        });
        expect(resolveTerm("reaction")).toEqual({
            kind: "key",
            source: "spell",
            record: expect.objectContaining({ name: "reaction" }),
        });
    });

    it("resolves the parameterised keys by their stored name", () => {
        expect(resolveTerm("reaching x")?.record.effect).toMatch(/range of/);
    });

    // The accepted wart. If someone renames one of the two glow records this
    // test should be updated, not deleted -- it is the reminder that the Items
    // table currently shows the wrong one.
    it("gives the bane for glow, even though an item key shares the name", () => {
        const hit = resolveTerm("glow");
        expect(hit?.kind).toBe("effect");
        expect(hit?.record.effect).toMatch(/You emit light/);
        expect(hit?.record.effect).not.toMatch(/illuminate/);
    });

    it("gives the character state for the three verbatim duplicates", () => {
        for (const name of ["aura", "focus", "follower"]) {
            expect(resolveTerm(name)?.kind).toBe("effect");
        }
    });

    it("normalises case and apostrophes like getEffect does", () => {
        expect(resolveTerm("Death’s Door")?.record.name).toBe("death's door");
    });

    it("returns undefined for an unknown name", () => {
        expect(resolveTerm("strain")).toBeUndefined();
    });

    // Nothing the matcher can emit should fail to resolve, or the tooltip
    // would open on a word and have nothing to say.
    it("resolves every canonical name the matcher can emit", () => {
        const canonical = new Set([
            ...allEffects.map((e) => e.name),
            ...allKeys.map((k) => k.name),
        ]);
        expect(keywordPatterns().length).toBeGreaterThan(0);
        for (const name of canonical) {
            expect(resolveTerm(name), name).toBeDefined();
        }
    });
});

describe("rulebookHref", () => {
    it("points at the page each kind of term is written up on", () => {
        expect(rulebookHref(resolveTerm("burn") as GlossaryHit)).toBe(
            "/rulebook/effects#effect-burn"
        );
        expect(rulebookHref(resolveTerm("on hit") as GlossaryHit)).toBe(
            "/rulebook/items#key-item-on-hit"
        );
        expect(rulebookHref(resolveTerm("reaction") as GlossaryHit)).toBe(
            "/rulebook/spells#key-spell-reaction"
        );
    });

    it("strips apostrophes the same way the heading slugs do", () => {
        expect(rulebookHref(resolveTerm("death's door") as GlossaryHit)).toBe(
            "/rulebook/effects#effect-deaths-door"
        );
    });

    // The links are only worth anything if they match the ids the directive
    // plugin actually renders. This is the guard against those drifting apart.
    it("matches the ids contentDirectives generates for every record", () => {
        for (const effect of allEffects) {
            expect(rulebookHref({ kind: "effect", record: effect })).toBe(
                `/rulebook/effects#${effectsSource.idOf(effect)}`
            );
        }
        for (const key of allKeys) {
            const page = key.source === "item" ? "items" : "spells";
            expect(
                rulebookHref({ kind: "key", source: key.source, record: key })
            ).toBe(`/rulebook/${page}#${keysSource.idOf(key)}`);
        }
    });
});

describe("definitionHtml", () => {
    it("links nested terms out to the rulebook", () => {
        // Bleeding Out's own text names Death's Door.
        const html = definitionHtml(resolveTerm("bleeding out") as GlossaryHit);
        expect(html).toContain('href="/rulebook/effects#effect-deaths-door"');
    });

    it("does not link the term the definition is about", () => {
        // Death's Door names itself four times; none should be a link.
        const html = definitionHtml(resolveTerm("death's door") as GlossaryHit);
        expect(html).not.toContain("effect-deaths-door");
        expect(html).toContain("Death's Door");
    });

    it("still colours stat words", () => {
        const html = definitionHtml(resolveTerm("hidden") as GlossaryHit);
        expect(html).toContain(
            '<span class="text-thieving-700">Thieving</span>'
        );
    });

    it("emits no tooltip spans, so tooltips cannot nest", () => {
        for (const effect of allEffects) {
            const html = definitionHtml({ kind: "effect", record: effect });
            expect(html, effect.name).not.toContain('class="kw"');
        }
    });
});
