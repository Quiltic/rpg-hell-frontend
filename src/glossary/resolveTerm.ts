import { getEffect } from "../hooks/useEffects";
import { getKey } from "../hooks/useKeys";
import { Effect } from "../types/Effect";
import { Key, KeySource } from "../types/Key";
import { ScanEmit, scanText } from "../util/keywordScan";
import { statColorClass } from "../util/statColors";
import { generateSlug } from "../util/MarkdownHeaderParsing";

export type GlossaryHit =
    | { kind: "effect"; record: Effect }
    | { kind: "key"; source: KeySource; record: Key };

// Resolves colissions to effects over keys.
// TODO: deconfict one of the "Glow" instances
export function resolveTerm(name: string): GlossaryHit | undefined {
    const effect = getEffect(name);
    if (effect) {
        return { kind: "effect", record: effect };
    }
    for (const source of ["item", "spell"] as const) {
        const key = getKey(source, name);
        if (key) {
            return { kind: "key", source, record: key };
        }
    }
    return undefined;
}

export function rulebookHref(hit: GlossaryHit): string {
    const slug = generateSlug(hit.record.name);
    if (hit.kind === "effect") {
        return `/rulebook/effects#effect-${slug}`;
    }
    return hit.source === "item"
        ? `/rulebook/items#key-item-${slug}`
        : `/rulebook/spells#key-spell-${slug}`;
}

function escapeAttribute(text: string): string {
    return text.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

export function linkEmitFor(selfName: string): ScanEmit {
    return {
        plain: (text) => text,
        stat: (matched, statWord) =>
            `<span class="${statColorClass(statWord)}">${matched}</span>`,
        keyword: (matched, name) => {
            const hit = name === selfName ? undefined : resolveTerm(name);
            if (!hit) {
                return matched;
            }
            return `<a href="${escapeAttribute(rulebookHref(hit))}">${matched}</a>`;
        },
    };
}

export function definitionHtml(hit: GlossaryHit): string {
    return scanText(hit.record.effect, linkEmitFor(hit.record.name));
}
