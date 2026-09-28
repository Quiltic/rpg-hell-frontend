import { describe, it, expect } from "vitest";
import {
    EFFECT_CATEGORIES,
    allEffects,
    effectsInCategory,
    effectsSource,
    getEffect,
} from "./effects";
import { generateSlug } from "../../util/slug";

describe("effects.json", () => {
    it("has only known categories", () => {
        for (const effect of allEffects) {
            expect(EFFECT_CATEGORIES).toContain(effect.category);
        }
    });
});

describe("getEffect", () => {
    it("is case-insensitive", () => {
        expect(getEffect("Burn")?.name).toBe("burn");
    });

    it("normalizes curly apostrophes", () => {
        expect(getEffect("Attack’s")).toBeUndefined();
        expect(getEffect(" Grappled ")?.name).toBe("grappled");
    });

    it("returns undefined for unknown names", () => {
        expect(getEffect("nope")).toBeUndefined();
    });
});

describe("effectsInCategory", () => {
    it("keeps file order", () => {
        expect(effectsInCategory("boon").map((e) => e.name)).toEqual([
            "cloaked",
            "empowered",
            "ward",
            "invisible",
            "rallied",
            "reinforced",
        ]);
    });
});

describe("effectsSource", () => {
    it("labels and colours by category", () => {
        const burn = getEffect("burn")!;
        expect(effectsSource.label(burn)).toBe("bane");
        expect(effectsSource.pillColor(burn)).toBe("bg-medicine");
    });

    it("anchors every record on the effects page", () => {
        for (const effect of allEffects) {
            expect(effectsSource.page(effect)).toBe("effects");
            expect(effectsSource.anchor(effect)).toBe(
                `effect-${generateSlug(effect.name)}`
            );
        }
    });
});
