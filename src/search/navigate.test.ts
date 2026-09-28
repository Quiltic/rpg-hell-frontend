import { describe, expect, it } from "vitest";
import { glossaryResult, rulebookResult, traitResult } from "../components/search/testResults";
import { hrefFor } from "./navigate";

describe("hrefFor", () => {
    it("filters the table to the lowercased name of a content result", () => {
        expect(hrefFor({ ...traitResult, title: "True Strikes" }, "strike")).toBe("/rulebook/traits?q=true%20strikes");
    });

    /** The table filter is a regex, so a name with metacharacters has to be escaped. */
    it("escapes regex characters in the name", () => {
        expect(hrefFor({ ...traitResult, title: "bomb (large)" }, "bomb")).toBe(
            "/rulebook/traits?q=bomb%20%5C(large%5C)"
        );
    });

    it("puts the query before the hash for a rulebook result", () => {
        expect(hrefFor(rulebookResult, "making a strike")).toBe(
            "/rulebook/combat?q=making%20a%20strike#making-a-strike"
        );
    });

    it("handles a rulebook result with no anchor", () => {
        expect(hrefFor({ ...rulebookResult, to: "/rulebook/combat" }, "strike")).toBe("/rulebook/combat?q=strike");
    });

    it("adds the query to a glossary link into a rulebook page", () => {
        expect(hrefFor(glossaryResult, "burn")).toBe("/rulebook/effects?q=burn#effect-burn");
    });

    /** Keys live on the arts and items pages, where ?q= would filter the table. */
    it("leaves a glossary link into a table page alone", () => {
        const key = { ...glossaryResult, to: "/rulebook/items#key-item-glow" };
        expect(hrefFor(key, "glow")).toBe(key.to);
    });
});
