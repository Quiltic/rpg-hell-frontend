import { describe, expect, it } from "vitest";
import { rulebookHref } from "../../glossary/resolve";
import { GLOSSARY_SOURCES } from "../../glossary/sources/sources";
import { glossaryDocuments } from "./glossary";

describe("glossaryDocuments", () => {
    const docs = glossaryDocuments(GLOSSARY_SOURCES);

    it("makes one document per record of every source", () => {
        const total = GLOSSARY_SOURCES.reduce((n, source) => n + source.records.length, 0);
        expect(docs).toHaveLength(total);
    });

    it("routes every document where the tooltip's rulebook link goes", () => {
        for (const source of GLOSSARY_SOURCES) {
            for (const record of source.records) {
                const doc = docs.find((d) => d.glossary?.kind === source.kind && d.glossary.name === record.name);
                expect(doc?.to, `${source.kind} ${record.name}`).toBe(rulebookHref({ source, record }));
                expect(doc?.page).toBe(source.page(record));
                expect(doc?.anchor).toBe(source.anchor(record));
            }
        }
    });

    it("carries the pill class and derives the color from it", () => {
        for (const doc of docs) {
            expect(doc.pill, doc.id).toMatch(/^bg-[a-z]+$/);
            expect(doc.color).toBe(doc.pill!.slice(3));
        }
    });

    /** "reaching x" is matched as "reaching" by the scanner, so search must accept that spelling too. */
    it("adds the x-stripped name and the record aliases to aliases", () => {
        const reaching = docs.find((d) => d.id === "glossary:keys:reaching-x");
        expect(reaching?.aliases.split(" ")).toContain("reaching");
        const grappled = docs.find((d) => d.id === "glossary:effects:grappled");
        expect(grappled?.aliases.split(" ")).toContain("grapple");
    });

    it("lists a definition placed on two pages once", () => {
        expect(docs.filter((d) => d.glossary?.name === "death's door")).toHaveLength(1);
    });

    it("stores the record effect as the body and the source label as the context", () => {
        const burn = docs.find((d) => d.id === "glossary:effects:burn")!;
        expect(burn.body.length).toBeGreaterThan(0);
        expect(burn.context).toBe("bane");
        expect(burn.source).toBe("glossary");
    });
});
