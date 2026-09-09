import keysJson from "../../assets/OfflineJsons/keys.json";
import { generateSlug } from "../../util/slug";
import { GlossarySource, bullet, normalizeName } from "./source";

export const KEY_SOURCES = ["spell", "item"] as const;

export type KeySource = (typeof KEY_SOURCES)[number];

export type Key = {
    name: string;
    source: KeySource;
    effect: string;
    short?: string;
    extra?: string;
    aliases?: string[];
};

export const KEY_PAGES: Record<KeySource, string> = {
    spell: "spells",
    item: "items",
};

export const KEY_ANCHOR_PREFIXES = {
    spell: "key-spell-",
    item: "key-item-",
} as const;

const PILL_COLORS: Record<KeySource, string> = {
    spell: "bg-soul",
    item: "bg-mind",
};

// Static JSON, so a module constant. keys.test.ts and sources.test.ts
// validate every record, which is what makes the cast safe.
export const allKeys: Key[] = keysJson as Key[];

export function keysFor(source: KeySource): Key[] {
    return allKeys.filter((k) => k.source === source);
}

// Scoped on purpose: a spell key never applies to an item.
export function getKey(source: KeySource, name: string): Key | undefined {
    const wanted = normalizeName(name);
    return allKeys.find((k) => k.source === source && k.name === wanted);
}

export const keysSource: GlossarySource<Key> = {
    kind: "keys",
    records: allKeys,
    page: (k) => KEY_PAGES[k.source],
    anchor: (k) => `${KEY_ANCHOR_PREFIXES[k.source]}${generateSlug(k.name)}`,
    label: (k) => `${k.source} key`,
    pillColor: (k) => PILL_COLORS[k.source],
    toLine: (k) => bullet(k.name, k.effect),
};
