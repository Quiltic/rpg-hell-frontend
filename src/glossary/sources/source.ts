import type { RulebookPageSlug } from "../../rulebook/pages";
import { titleCase } from "../../util/textFormatting";

/**
 * Shared Functions for all GlossaryRecord exensions
 */

export type GlossaryRecord = {
    name: string;
    effect: string;
    short?: string;
    extra?: string;
    aliases?: string[];
};

// Method syntax on purpose: it keeps a GlossarySource<Effect> assignable to
// GlossarySource<GlossaryRecord> so the registry can hold every source.
export type GlossarySource<T extends GlossaryRecord = GlossaryRecord> = {
    kind: string;
    records: readonly T[];
    page(record: T): RulebookPageSlug;
    anchor(record: T): string;
    label(record: T): string;
    pillColor(record: T): string;
    toLine(record: T): string;
    toBlock?(record: T): string;
};

export function normalizeName(name: string): string {
    return name.trim().toLowerCase().replace(/’/g, "'");
}

export function findRecord<T extends GlossaryRecord>(
    records: readonly T[],
    name: string
): T | undefined {
    const wanted = normalizeName(name);
    return records.find((r) => r.name === wanted);
}

export function bullet(name: string, effect: string): string {
    return `**_${titleCase(name)}_** - ${effect}`;
}
