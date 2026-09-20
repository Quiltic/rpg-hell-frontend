import MiniSearch, { Options } from "minisearch";
import { normalizeName } from "../glossary/sources/source";
import type { SearchDocument, SearchResult, SearchSource } from "./types";

const SOURCE_ORDER: SearchSource[] = ["glossary", "rulebook", "trait", "art", "item", "creature"];

export const SEARCH_OPTIONS: Options<SearchDocument> = {
    idField: "id",
    fields: ["title", "aliases", "body", "pageTags"],
    storeFields: [
        "source",
        "title",
        "aliases",
        "body",
        "pageTags",
        "context",
        "to",
        "pill",
        "color",
        "page",
        "anchor",
        "glossary",
    ],
    processTerm: (term) => {
        const normalized = normalizeName(term);
        return normalized.length < 2 ? null : normalized;
    },
    searchOptions: {
        boost: { title: 4, aliases: 3, pageTags: 2 },
        prefix: true,
        fuzzy: (term) => (term.length >= 5 ? 0.2 : false),
        combineWith: "AND",
    },
};

export function buildEngine(documents: SearchDocument[]): MiniSearch<SearchDocument> {
    const engine = new MiniSearch(SEARCH_OPTIONS);
    engine.addAll(documents);
    return engine;
}

export function serialize(engine: MiniSearch<SearchDocument>): string {
    return JSON.stringify(engine);
}

export function deserialize(json: string): MiniSearch<SearchDocument> {
    return MiniSearch.loadJSON(json, SEARCH_OPTIONS);
}

/**
 * @param engine - an index from `buildEngine` or `deserialize`
 * @param query - what the user typed
 * @param limit - most results to return, 50 by default
 * @returns ranked results; every word must match, or any word when that finds nothing
 * @example
 * ```typescript
 * const results = search(engine, "fall damage", 3)
 * ```
 */
export function search(engine: MiniSearch<SearchDocument>, query: string, limit = 50): SearchResult[] {
    const trimmed = query.trim();
    if (!trimmed) return [];

    let hits = engine.search(trimmed);
    if (hits.length === 0 && trimmed.split(/\s+/).length > 1) {
        hits = engine.search(trimmed, { combineWith: "OR" });
    }

    const results = hits as unknown as SearchResult[];
    return results
        .sort(
            (a, b) =>
                b.score - a.score ||
                SOURCE_ORDER.indexOf(a.source) - SOURCE_ORDER.indexOf(b.source) ||
                a.title.localeCompare(b.title)
        )
        .slice(0, limit);
}
