import { describe, it, expect } from "vitest";
import { capitalize, highlightKeywords } from "./textFormatting";

describe("highlightKeywords", () => {
    it("wraps stat words in a colored span", () => {
        expect(highlightKeywords("Roll body.")).toBe(
            'Roll <span class="text-body-700">body</span>.'
        );
    });

    it("matches case-insensitively but keeps the original casing", () => {
        expect(highlightKeywords("Arcana")).toBe(
            '<span class="text-arcana-700">Arcana</span>'
        );
    });

    it("leaves text without stat words alone", () => {
        expect(highlightKeywords("Roll two dice.")).toBe("Roll two dice.");
    });
});

describe("capitalize", () => {
    it("uppercases the first character", () => {
        expect(capitalize("twin strikes")).toBe("Twin strikes");
    });
});
