import { escapeHtml, escapeRegex, scanText, statOnlyEmit } from "../glossary/scan";
import type { SearchResult } from "./types";

const LEAD = 40;

function termsRegex(terms: string[]): RegExp | undefined {
    if (terms.length === 0) return undefined;
    const alternation = [...terms]
        .sort((a, b) => b.length - a.length)
        .map(escapeRegex)
        .join("|");
    return new RegExp(`\\b(${alternation})`, "gi");
}

/**
 * @param result - a result from `search`
 * @param maxLength - window size in characters, 160 by default
 * @returns plain text from the body around the first matched term, with an ellipsis on each clipped end
 * @example
 * ```typescript
 * const html = snippetHtml(snippetFor(result), result.terms)
 * ```
 */
export function snippetFor(result: SearchResult, maxLength = 160): string {
    const text = result.body.replace(/\s+/g, " ").trim();
    const matchIndex = termsRegex(result.terms)?.exec(text)?.index ?? 0;

    let start = Math.max(0, matchIndex - LEAD);
    if (start > 0) {
        const space = text.indexOf(" ", start);
        if (space !== -1 && space < matchIndex) start = space + 1;
    }

    let end = Math.min(text.length, start + maxLength);
    if (end < text.length) {
        const space = text.lastIndexOf(" ", end);
        if (space > matchIndex) end = space;
    }

    return (start > 0 ? "…" : "") + text.slice(start, end) + (end < text.length ? "…" : "");
}

/**
 * @param snippet - plain text from `snippetFor`
 * @param terms - the matched terms of the result
 * @returns escaped HTML with stat words colored and each matched term inside `<mark>`
 */
export function snippetHtml(snippet: string, terms: string[]): string {
    const regex = termsRegex(terms);
    if (!regex) return scanText(snippet, statOnlyEmit);
    return snippet
        .split(regex)
        .map((piece, i) =>
            i % 2 === 1
                ? `<mark class="bg-transparent font-semibold text-light">${escapeHtml(piece)}</mark>`
                : scanText(piece, statOnlyEmit)
        )
        .join("");
}
