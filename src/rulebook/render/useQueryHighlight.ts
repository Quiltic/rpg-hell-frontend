import { MutableRefObject, RefObject, useEffect, useRef } from "react";
import { normalizeName } from "../../glossary/sources/source";

const HIGHLIGHT_NAME = "search-query";
const MAX_RANGES = 200;

type HighlightRegistry = { set(name: string, highlight: unknown): void; delete(name: string): void };

// the whole phrase first, so "death's door" is one span where it appears as written
function queryTerms(query: string): string[] {
    return [normalizeName(query), ...query.split(/[\n\r\p{Z}\p{P}]+/u).map(normalizeName)].filter(
        (term) => term.length >= 2
    );
}

function findRanges(root: HTMLElement, terms: string[]): Range[] {
    const ranges: Range[] = [];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        const text = (node.textContent ?? "").toLowerCase().replace(/’/g, "'");
        // lowercasing can change the length of a few characters, which would shift the offsets
        if (text.length !== node.textContent?.length) continue;
        const spans: [number, number][] = [];
        for (const term of terms) {
            for (let at = text.indexOf(term); at !== -1; at = text.indexOf(term, at + term.length)) {
                spans.push([at, at + term.length]);
            }
        }
        // document order, and no overlaps, so the mark fallback can wrap each range on its own
        spans.sort((x, y) => x[0] - y[0]);
        let end = 0;
        for (const [from, to] of spans) {
            if (from < end) continue;
            if (ranges.length === MAX_RANGES) return ranges;
            const range = document.createRange();
            range.setStart(node, from);
            range.setEnd(node, to);
            ranges.push(range);
            end = to;
        }
    }
    return ranges;
}

/**
 * Tints every occurrence of the query's words under `container`, with the CSS Highlight API where it exists and `<mark class="search-query">` otherwise.
 * @param container - the element whose text is searched
 * @param query - the search text; empty or null clears the highlight
 * @param content - what the container renders, so the highlight is redone when it changes
 * @returns a ref to the highlighted ranges in document order, at most 200
 * @example
 * ```typescript
 * const ranges = useQueryHighlight(root, searchParams.get("q"), markdown)
 * ```
 */
export function useQueryHighlight(
    container: RefObject<HTMLElement>,
    query: string | null | undefined,
    content: string
): MutableRefObject<Range[]> {
    const found = useRef<Range[]>([]);

    useEffect(() => {
        const terms = queryTerms(query ?? "");
        if (!container.current || terms.length === 0) return;
        const ranges = findRanges(container.current, terms);
        found.current = ranges;

        const registry =
            typeof CSS === "undefined" ? undefined : (CSS as unknown as { highlights?: HighlightRegistry }).highlights;
        const Highlight = (window as unknown as { Highlight?: new (...ranges: Range[]) => unknown }).Highlight;
        if (registry && Highlight) {
            registry.set(HIGHLIGHT_NAME, new Highlight(...ranges));
            return () => {
                registry.delete(HIGHLIGHT_NAME);
                found.current = [];
            };
        }

        // last to first, so splitting a text node never moves a range still to be wrapped
        const marks = [...ranges].reverse().map((range) => {
            const mark = document.createElement("mark");
            mark.className = HIGHLIGHT_NAME;
            range.surroundContents(mark);
            return mark;
        });
        // surroundContents leaves each range selecting its mark, so point them back at the text
        found.current = marks.reverse().map((mark) => {
            const range = document.createRange();
            range.selectNodeContents(mark);
            return range;
        });
        return () => {
            for (const mark of marks) {
                const parent = mark.parentNode;
                mark.replaceWith(...mark.childNodes);
                parent?.normalize();
            }
            found.current = [];
        };
    }, [container, query, content]);

    return found;
}
