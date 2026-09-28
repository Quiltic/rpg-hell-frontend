import { beforeEach, describe, expect, it, vi } from "vitest";
import { effectsSource } from "../../glossary/sources/effects";
import { GLOSSARY_SOURCES } from "../../glossary/sources/sources";
import { buildDocuments, BuildInput } from "./buildDocuments";

const input: BuildInput = {
    pages: [{ slug: "intro", title: "Intro", markdown: "# Intro\n\nhello\n" }],
    sources: GLOSSARY_SOURCES,
    content: { traits: [], spells: [], items: [], creatures: [] },
    hash: (json) => `len-${json.length}`,
};

describe("buildDocuments", () => {
    beforeEach(() => {
        vi.spyOn(console, "warn").mockImplementation(() => {});
    });

    it("concatenates the corpora and hashes the documents JSON", () => {
        const index = buildDocuments(input);
        expect(index.version).toBe(1);
        expect(index.hash).toBe(`len-${JSON.stringify(index.documents).length}`);
        expect(new Date(index.builtAt).toString()).not.toBe("Invalid Date");
        expect(index.documents[0].id).toBe("rulebook:intro#intro");
        expect(index.documents.filter((d) => d.source === "glossary").length).toBeGreaterThan(0);
    });

    it("throws on a duplicate id across sources", () => {
        expect(() => buildDocuments({ ...input, sources: [effectsSource, effectsSource] })).toThrow(
            /duplicate document id "glossary:effects:/
        );
    });
});
