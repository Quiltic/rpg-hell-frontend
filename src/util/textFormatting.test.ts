import { describe, it, expect } from "vitest";
import { capitalize, highlightKeywords, titleCase } from "./textFormatting";

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

describe("titleCase", () => {
    it("uppercases the first letter of every word", () => {
        expect(titleCase("bleeding out")).toBe("Bleeding Out");
    });

    it("keeps apostrophes and the rest of each word", () => {
        expect(titleCase("death's door")).toBe("Death's Door");
        expect(titleCase("SPEED boost")).toBe("SPEED Boost");
    });
});
