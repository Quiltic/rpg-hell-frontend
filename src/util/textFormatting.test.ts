import { describe, it, expect } from "vitest";
import { capitalize, titleCase } from "./textFormatting";

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
