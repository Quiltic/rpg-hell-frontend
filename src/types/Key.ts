export const KEY_SOURCES = ["spell", "item"] as const;

export type KeySource = (typeof KEY_SOURCES)[number];

// A key is per-table vocabulary: spell keys apply only to Arts, item keys only
// to Items. `source` is that scope. Same shape as Effect otherwise; names are
// lowercase and unique within a source.
export type Key = {
    name: string;
    source: KeySource;
    effect: string;
    extra?: string;
};
