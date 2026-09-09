import { ScanEmit, scanText } from "./scan";
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

export function definitionHtml({ record }: GlossaryHit): string {
    return scanText(record.short || record.effect, linkEmitFor(record.name));
}
