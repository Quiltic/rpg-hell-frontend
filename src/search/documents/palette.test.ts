import { describe, expect, it } from "vitest";
import { colorFor } from "./palette";

describe("colorFor", () => {
    it("maps class and rarity words through the pill table", () => {
        expect(colorFor("fighter")).toBe("body");
        expect(colorFor("legendary")).toBe("arcana");
        expect(colorFor("Craftsman")).toBe("crafting");
    });

    it("drops the shade so mundane tints with the base dark color", () => {
        expect(colorFor("mundane")).toBe("dark");
    });

    it("returns a stat word as itself and anything else as aabase", () => {
        expect(colorFor("nature")).toBe("nature");
        expect(colorFor("")).toBe("aabase");
        expect(colorFor("mystery")).toBe("aabase");
    });
});
