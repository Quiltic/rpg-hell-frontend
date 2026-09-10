import { ScanEmit, escapeHtml, scanText } from "./scan";
import { statColorClass } from "../styling/statColors";
import { GlossaryRecord, GlossarySource, findRecord } from "./sources/source";
import { GLOSSARY_SOURCES } from "./sources/sources";

export type GlossaryHit = {
    source: GlossarySource;
    record: GlossaryRecord;
};

export function resolveTerm(name: string): GlossaryHit | undefined {
    for (const source of GLOSSARY_SOURCES) {
        const record = findRecord(source.records, name);
        if (record) {
            return { source, record };
        }
    }
    return undefined;
}

export function rulebookHref({ source, record }: GlossaryHit): string {
    return `/rulebook/${source.page(record)}#${source.anchor(record)}`;
}

export function linkEmitFor(selfName: string): ScanEmit {
    return {
        plain: escapeHtml,
        stat: (matched, statWord) =>
            `<span class="${statColorClass(statWord)}">${escapeHtml(matched)}</span>`,
        keyword: (matched, name) => {
            const hit = name === selfName ? undefined : resolveTerm(name);
            if (!hit) {
                return escapeHtml(matched);
            }
            return `<a href="${escapeHtml(rulebookHref(hit))}">${escapeHtml(matched)}</a>`;
        },
    };
}

export function definitionHtml({ record }: GlossaryHit): string {
    return scanText(record.short || record.effect, linkEmitFor(record.name));
}
