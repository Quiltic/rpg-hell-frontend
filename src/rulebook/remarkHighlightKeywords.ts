import { visit } from "unist-util-visit";
import type { Html, Root, Text } from "mdast";
import { STAT_COLORS, statColorClass } from "../styling/statColors";

const KEYWORD_PATTERN = new RegExp(`\\b(${STAT_COLORS.join("|")})\\b`, "gi");

// Splits one text node's value into the nodes that replace it: the matched
// words wrapped in raw <span> tags, the rest left as text so the renderer still
// escapes it. Returns null when there is nothing to colour.
export function splitOnKeywords(value: string): (Text | Html)[] | null {
    const parts: (Text | Html)[] = [];
    let last = 0;

    KEYWORD_PATTERN.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = KEYWORD_PATTERN.exec(value)) !== null) {
        const word = match[0];
        if (match.index > last) {
            parts.push({ type: "text", value: value.slice(last, match.index) });
        }
        parts.push({
            type: "html",
            value: `<span class="${statColorClass(word)}">`,
        });
        parts.push({ type: "text", value: word });
        parts.push({ type: "html", value: "</span>" });
        last = match.index + word.length;
    }

    if (parts.length === 0) {
        return null;
    }
    if (last < value.length) {
        parts.push({ type: "text", value: value.slice(last) });
    }
    return parts;
}

// remark plugin. Colours stat words in the parsed tree instead of in the
// markdown source, so it cannot reach anything that is syntax rather than
// prose: directive attributes, link urls, and code are not text nodes.
//
// Must run after remarkContentDirectives so the bullets a directive expands
// into get coloured too.
export function remarkHighlightKeywords() {
    return (tree: Root) => {
        visit(tree, "text", (node: Text, index, parent) => {
            if (!parent || index === undefined) {
                return;
            }
            const parts = splitOnKeywords(node.value);
            if (!parts) {
                return;
            }
            (parent.children as (Text | Html)[]).splice(index, 1, ...parts);
            // Skip past what we just inserted; the text nodes in it are the
            // matched words themselves and would match again forever.
            return index + parts.length;
        });
    };
}
