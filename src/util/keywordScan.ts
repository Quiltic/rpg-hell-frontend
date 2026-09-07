import { allEffects } from "../hooks/useEffects";
import { allKeys } from "../hooks/useKeys";
import { STAT_COLORS, statColorClass } from "./statColors";

export type ScanEmit = {
    plain(text: string): string;
    stat(matched: string, statWord: string): string;
    keyword(matched: string, canonicalName: string): string;
};

const STAT_WORDS: ReadonlySet<string> = new Set(STAT_COLORS);

function normalize(text: string): string {
    return text.trim().toLowerCase().replace(/’/g, "'");
}

function escapeRegex(text: string): string {
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function toPattern(name: string): string {
    return name.replace(/ x$/, "");
}

type Index = {
    regex: RegExp;
    canonical: ReadonlyMap<string, string>;
    patterns: readonly string[];
};

let cached: Index | undefined;

function buildIndex(): Index {
    const canonical = new Map<string, string>();

    const add = (pattern: string, name: string) => {
        const key = normalize(pattern);
        if (key && !canonical.has(key)) {
            canonical.set(key, name);
        }
    };

    for (const record of [...allEffects, ...allKeys]) {
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

    return {
        regex: new RegExp(
            `\\b(?:${keywordAlternation})\\b|\\b(?:${STAT_COLORS.join("|")})\\b`,
            "gi"
        ),
        canonical,
        patterns,
    };
}

function index(): Index {
    if (!cached) {
        cached = buildIndex();
    }
    return cached;
}

export function keywordPatterns(): readonly string[] {
    return index().patterns;
}

export function scanText(text: string, emit: ScanEmit): string {
    const { regex, canonical } = index();
    const seen = new Set<string>();
    let out = "";
    let last = 0;

    regex.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(text)) !== null) {
        const matched = match[0];
        const lower = normalize(matched);

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
    plain: (text) => text,
    stat: (matched, statWord) =>
        `<span class="${statColorClass(statWord)}">${matched}</span>`,
    keyword: (matched, name) =>
        `<span class="kw" data-kw="${name}" tabindex="0" role="button">${matched}</span>`,
};
