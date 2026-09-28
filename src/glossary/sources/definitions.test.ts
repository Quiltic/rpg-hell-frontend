import { describe, expect, it } from "vitest";
import { remark } from "remark";
import type { Text } from "mdast";
import { visit } from "unist-util-visit";
import {
    allDefinitions,
    definitionsSource,
    getDefinition,
} from "./definitions";

describe("definitions.json", () => {
    it("carries a short string on every record, empty allowed", () => {
        for (const definition of allDefinitions) {
            expect(typeof definition.short, definition.name).toBe("string");
        }
    });

    /** A closing sentence after a list needs a blank line or it renders inside the last bullet. */
    it("never lets a sentence lazily continue a list item", () => {
        for (const definition of allDefinitions) {
            const tree = remark().parse(definition.effect);
            visit(tree, "listItem", (item) => {
                visit(item, "text", (text: Text) => {
                    expect(text.value, definition.name).not.toContain("\n");
                });
            });
        }
    });
});

describe("getDefinition", () => {
    it("resolves a name with an apostrophe case-insensitively", () => {
        expect(getDefinition("Death's Door")?.page).toBe("combat");
    });

    it("returns undefined for unknown names", () => {
        expect(getDefinition("nope")).toBeUndefined();
    });
});

describe("definitionsSource", () => {
    it("places each record on its own page with a definition anchor", () => {
        const death = getDefinition("death's door")!;
        expect(definitionsSource.page(death)).toBe("combat");
        expect(definitionsSource.anchor(death)).toBe("definition-deaths-door");
        expect(definitionsSource.label(death)).toBe("definition");
        expect(definitionsSource.toBlock?.(death)).toBe(death.effect);
    });
});
