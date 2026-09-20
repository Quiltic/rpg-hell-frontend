import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it, vi } from "vitest";
import creatures from "../assets/OfflineJsons/creatures.json";
import items from "../assets/OfflineJsons/RefinedItems.json";
import spells from "../assets/OfflineJsons/spells.json";
import traits from "../assets/OfflineJsons/traits.json";
import { GLOSSARY_SOURCES } from "../glossary/sources/sources";
import { RULEBOOK_PAGES } from "../rulebook/pageList";
import { buildDocuments } from "./documents/buildDocuments";
import { buildEngine, deserialize, search, serialize } from "./engine";
import type { SearchDocument, SearchSource } from "./types";

function doc(source: SearchSource, title: string, body: string, extra: Partial<SearchDocument> = {}): SearchDocument {
    return {
        id: `${source}:${title}`,
        source,
        title,
        aliases: "",
        body,
        pageTags: "",
        context: "",
        to: "/",
        color: "aabase",
        ...extra,
    };
}

const fixture: SearchDocument[] = [
    doc("glossary", "bleeding", "lose 1 health at the start of each turn"),
    doc("glossary", "reaching x", "melee attacks reach x extra spaces", { aliases: "reaching" }),
    doc("rulebook", "Cover", "half cover gives +1 dodge", { pageTags: "fighting" }),
    doc("rulebook", "Falling", "fall damage is 1 per 2 spaces", { pageTags: "fighting" }),
    doc("rulebook", "Resting", "a long rest stops bleeding and restores health"),
    doc("trait", "defender", "guard an ally next to you", { context: "Trait · hoplite 1" }),
    doc("art", "fireball", "a ball of fire bursts in an area"),
    doc("item", "sword", "a plain blade"),
    doc("item", "torch", "sets things on fire"),
    doc("creature", "wolf", "bites and scratches"),
];

const ids = (results: { id: string }[]) => results.map((r) => r.id);

describe("search over a fixture", () => {
    const engine = buildEngine(fixture);

    it("returns nothing for an empty or whitespace query", () => {
        expect(search(engine, "")).toEqual([]);
        expect(search(engine, "   ")).toEqual([]);
    });

    it("ranks an exact title above a body hit", () => {
        expect(ids(search(engine, "bleeding"))).toEqual(["glossary:bleeding", "rulebook:Resting"]);
    });

    it("finds a record through its aliases", () => {
        expect(ids(search(engine, "reaching"))[0]).toBe("glossary:reaching x");
    });

    it("finds every section of a page by its page tag", () => {
        expect(ids(search(engine, "fighting")).sort()).toEqual(["rulebook:Cover", "rulebook:Falling"]);
    });

    /** req and content tags live in context, which is stored for display and not indexed. */
    it("does not search context", () => {
        expect(search(engine, "hoplite")).toEqual([]);
    });

    it("requires every word when some document has them all", () => {
        expect(ids(search(engine, "fall damage"))).toEqual(["rulebook:Falling"]);
    });

    it("falls back to any word when no document has them all", () => {
        expect(ids(search(engine, "sword fire")).sort()).toEqual(["art:fireball", "item:sword", "item:torch"]);
    });

    it("tolerates a typo in a word of five letters or more", () => {
        expect(ids(search(engine, "bleding"))).toContain("glossary:bleeding");
    });

    it("returns the stored document fields and the matched terms", () => {
        const [first] = search(engine, "reaching");
        expect(first).toMatchObject({ ...fixture[1], terms: ["reaching"] });
        expect(first.score).toBeGreaterThan(0);
    });

    it("slices to the limit", () => {
        expect(search(engine, "sword fire", 2)).toHaveLength(2);
    });

    it("answers the same after a serialize round trip", () => {
        const restored = deserialize(serialize(engine));
        for (const query of ["bleeding", "sword fire", "fighting"]) {
            expect(ids(search(restored, query))).toEqual(ids(search(engine, query)));
        }
    });
});

describe("search over the real documents", () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const markdownDir = join(__dirname, "../assets/RulebookFiles/markdown");
    const { documents } = buildDocuments({
        pages: RULEBOOK_PAGES.flatMap((page) =>
            "file" in page
                ? [{ slug: page.slug, title: page.title, markdown: readFileSync(join(markdownDir, page.file), "utf8") }]
                : []
        ),
        sources: GLOSSARY_SOURCES,
        content: { traits, spells, items, creatures },
        hash: () => "test",
    });
    const engine = buildEngine(documents);

    it("returns a trait first for its name", () => {
        expect(search(engine, "twin strikes")[0].id).toBe("trait:twin-strikes");
    });

    it("returns the combat cover section in the top 3", () => {
        expect(ids(search(engine, "cover", 3))).toContain("rulebook:combat#cover");
    });
});
