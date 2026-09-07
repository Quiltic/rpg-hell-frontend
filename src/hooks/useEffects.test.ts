import { describe, it, expect } from "vitest";
import { allEffects, effectsInCategory, getEffect } from "./useEffects";
import { EFFECT_CATEGORIES } from "../types/Effect";

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
