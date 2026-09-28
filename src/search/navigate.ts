import { escapeRegex } from "../util/regex";
import type { SearchResult } from "./types";

const CONTENT_SOURCES = ["trait", "art", "item", "creature"];
// on these pages ?q= is the table filter, not a highlight
const TABLE_ROUTES = ["/rulebook/traits", "/rulebook/spells", "/rulebook/items", "/rulebook/creatures"];

/**
 * @param result - the result being opened
 * @param query - the text the user searched for
 * @returns where the result leads: content pages get `?q=<name>` for the table filter, rulebook and glossary links get `?q=<query>` for the highlight, except glossary links into a table page, which are unchanged
 * @example
 * ```typescript
 * hrefFor(coverResult, "cover") // "/rulebook/combat?q=cover#cover"
 * ```
 */
export function hrefFor(result: SearchResult, query: string): string {
    if (CONTENT_SOURCES.includes(result.source)) {
        return `${result.to}?q=${encodeURIComponent(escapeRegex(result.title.toLowerCase()))}`;
    }
    const [path, anchor] = result.to.split("#");
    if (TABLE_ROUTES.includes(path)) return result.to;
    return `${path}?q=${encodeURIComponent(query)}${anchor ? `#${anchor}` : ""}`;
}
