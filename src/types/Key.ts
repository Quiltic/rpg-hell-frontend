export const KEY_SOURCES = ["spell", "item"] as const;

export type KeySource = (typeof KEY_SOURCES)[number];

export type Key = {
    name: string;
    source: KeySource;
    effect: string;
    extra?: string;
    aliases?: string[];
};
