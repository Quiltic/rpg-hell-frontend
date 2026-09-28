import { describe, expect, it } from "vitest";
import { MARKDOWN_FILES, RULEBOOK_PAGES, markdownFile } from "./pages";
import { allDefinitions } from "../glossary/sources/definitions";

const DIRECTIVE = /^::definitions\{name="([^"]+)"\}/gm;

function placementsIn(file: string): string[] {
    return [...markdownFile(file).matchAll(DIRECTIVE)].map((m) => m[1]);
}

const placements = MARKDOWN_FILES.map(
    (file) => [file, placementsIn(file)] as const
);

function fileForPage(slug: string): string {
    const page = RULEBOOK_PAGES.find((p) => p.slug === slug);
    if (!page || !("file" in page)) throw new Error(`no file for page ${slug}`);
    return page.file;
}

/** A directive that names nothing renders as a visible failure paragraph. */
describe("::definitions placements", () => {
    it("only name real definitions", () => {
        const names = allDefinitions.map((d) => d.name);
        for (const [file, placed] of placements) {
            for (const name of placed) {
                expect(names, `${file}: ${name}`).toContain(name);
            }
        }
    });

    /** The tooltip link is built from `page`, so the page's own file must hold the anchor once. */
    it("place every definition exactly once on its own page", () => {
        for (const definition of allDefinitions) {
            const file = fileForPage(definition.page);
            const count = placementsIn(file).filter(
                (name) => name === definition.name
            ).length;
            expect(count, `${definition.name} in ${file}`).toBe(1);
        }
    });
});
