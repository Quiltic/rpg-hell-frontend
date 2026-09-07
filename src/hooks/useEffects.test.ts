import { describe, it, expect } from "vitest";
import { allEffects, effectsInCategory, getEffect } from "./useEffects";
import { allKeys } from "./useKeys";
import { EFFECT_CATEGORIES } from "../types/Effect";
import { STAT_COLORS } from "../util/statColors";

describe("effects.json", () => {
    it("has only known categories", () => {
        for (const effect of allEffects) {
            expect(EFFECT_CATEGORIES).toContain(effect.category);
        }
    });

    it("uses unique lowercase names", () => {
        const names = allEffects.map((e) => e.name);
        expect(new Set(names).size).toBe(names.length);
        for (const name of names) {
            expect(name).toBe(name.toLowerCase());
        }
    });

    it("uses straight apostrophes only", () => {
        for (const effect of allEffects) {
            expect(effect.name).not.toContain("’");
            expect(effect.effect).not.toContain("’");
        }
    });

    it("has a non-empty effect for every entry", () => {
        for (const effect of allEffects) {
            expect(effect.effect.trim()).not.toBe("");
        }
    });
});

// Aliases feed the keyword matcher, so a bad one is a wrong tooltip on a
// perfectly ordinary word rather than a missing one.
describe("aliases", () => {
    const aliased = [...allEffects, ...allKeys];

    it("uses lowercase straight-apostrophe values", () => {
        for (const record of aliased) {
            for (const alias of record.aliases ?? []) {
                expect(alias).toBe(alias.toLowerCase().trim());
                expect(alias).not.toContain("\u2019");
                expect(alias).not.toBe("");
            }
        }
    });

    // `charm` is a stat word, a Tailwind colour and a safelisted class prefix.
    // An alias colliding with one would fight the colour pass in the same regex.
    it("never collides with a stat word", () => {
        for (const record of aliased) {
            for (const alias of record.aliases ?? []) {
                expect(STAT_COLORS, alias).not.toContain(alias);
            }
        }
    });

    it("never duplicates a record name", () => {
        const names = new Set(aliased.map((r) => r.name));
        for (const record of aliased) {
            for (const alias of record.aliases ?? []) {
                expect(names, alias).not.toContain(alias);
            }
        }
    });

    it("never duplicates another alias", () => {
        const all = aliased.flatMap((r) => r.aliases ?? []);
        expect(new Set(all).size).toBe(all.length);
    });
});

describe("getEffect", () => {
    it("is case-insensitive", () => {
        expect(getEffect("Burn")?.name).toBe("burn");
    });

    it("normalizes curly apostrophes", () => {
        expect(getEffect("Death’s Door")?.name).toBe("death's door");
    });

    it("returns undefined for unknown names", () => {
        expect(getEffect("nope")).toBeUndefined();
    });
});

describe("effectsInCategory", () => {
    it("keeps file order", () => {
        expect(effectsInCategory("elemental-bane").map((e) => e.name)).toEqual([
            "burn",
            "wet",
            "slow",
            "knockback",
        ]);
    });
});
