import { STAT_COLORS, statColorClass } from "../styling/statColors";
import { GlossaryRecord, normalizeName } from "./sources/source";
import { GLOSSARY_SOURCES } from "./sources/sources";

export type ScanEmit = {
    plain(text: string): string;
    stat(matched: string, statWord: string): string;
    keyword(matched: string, canonicalName: string): string;
};

const STAT_WORDS: ReadonlySet<string> = new Set(STAT_COLORS);

function escapeRegex(text: string): string {
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function escapeHtml(text: string): string {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function toPattern(name: string): string {
    return name.replace(/ x$/, "");
}

type Index = {
    regex: RegExp;
    canonical: ReadonlyMap<string, string>;
    patterns: readonly string[];
};

function buildIndex(records: readonly GlossaryRecord[]): Index {
    const canonical = new Map<string, string>();

    const add = (pattern: string, name: string) => {
        const key = normalizeName(pattern);
        if (key && !canonical.has(key)) {
            canonical.set(key, name);
        }
    };

    for (const record of records) {
        add(toPattern(record.name), record.name);
        for (const alias of record.aliases ?? []) {
            add(alias, record.name);
        }
    }

    const patterns = [...canonical.keys()].sort((a, b) => b.length - a.length);

    // to cover odd uses of different unicode apostrophies
    const keywordAlternation = patterns
        .map((p) => escapeRegex(p).replace(/'/g, "['’]"))
        .join("|");

    // an empty keyword branch would match zero-length and never advance
    const alternatives = [`\\b(?:${STAT_COLORS.join("|")})\\b`];
    if (keywordAlternation) {
        alternatives.unshift(`\\b(?:${keywordAlternation})\\b`);
    }

    return {
        regex: new RegExp(alternatives.join("|"), "gi"),
        canonical,
        patterns,
    };
}

export type Scanner = {
    scanText(text: string, emit: ScanEmit): string;
    keywordPatterns(): readonly string[];
};

// Scanner over an explicit record set. The module-level functions below use
// every registered source; tests use this to scan against fixtures.
export function createScanner(records: readonly GlossaryRecord[]): Scanner {
    const index = buildIndex(records);
    return {
        scanText: (text, emit) => scanWith(index, text, emit),
        keywordPatterns: () => index.patterns,
    };
}

let cached: Scanner | undefined;

function scanner(): Scanner {
    if (!cached) {
        cached = createScanner(GLOSSARY_SOURCES.flatMap((s) => s.records));
    }
    return cached;
}

export function keywordPatterns(): readonly string[] {
    return scanner().keywordPatterns();
}

/**
 *
 * @param text the string of text to be formatted.
 * @param emit the formatter functions for each type of text instances to be formatted, returns html encoded text.
 * @returns html encoded text decorated by the functions provided by emit
 */
export function scanText(text: string, emit: ScanEmit): string {
    return scanner().scanText(text, emit);
}

function scanWith(index: Index, text: string, emit: ScanEmit): string {
    const { regex, canonical } = index;
    const seen = new Set<string>();
    let out = "";
    let last = 0;

    regex.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(text)) !== null) {
        const matched = match[0];
        const lower = normalizeName(matched);

        if (match.index > last) {
            out += emit.plain(text.slice(last, match.index));
        }

        const name = canonical.get(lower);
        if (name !== undefined) {
            if (seen.has(name)) {
                out += emit.plain(matched);
            } else {
                seen.add(name);
                out += emit.keyword(matched, name);
            }
        } else if (STAT_WORDS.has(lower)) {
            out += emit.stat(matched, lower);
        } else {
            out += emit.plain(matched);
        }

        last = match.index + matched.length;
    }

    if (last < text.length) {
        out += emit.plain(text.slice(last));
    }
    return out;
}

export const spanEmit: ScanEmit = {
    plain: escapeHtml,
    stat: (matched, statWord) =>
        `<span class="${statColorClass(statWord)}">${escapeHtml(matched)}</span>`,
    keyword: (matched, name) =>
        `<span class="kw" data-kw="${escapeHtml(name)}" tabindex="0" role="button">${escapeHtml(matched)}</span>`,
};
