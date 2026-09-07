import keysJson from "../assets/OfflineJsons/keys.json";
import { Key, KeySource } from "../types/Key";

// Static JSON, so a module constant. useKeys.test.ts validates every record,
// which is what makes the cast safe.
export const allKeys: Key[] = keysJson as Key[];

function normalizeName(name: string): string {
    return name.trim().toLowerCase().replace(/’/g, "'");
}

export function keysFor(source: KeySource): Key[] {
    return allKeys.filter((k) => k.source === source);
}

// Scoped on purpose: the item Glow and the bane Glow are different things,
// and a spell key never applies to an item.
export function getKey(source: KeySource, name: string): Key | undefined {
    const wanted = normalizeName(name);
    return allKeys.find((k) => k.source === source && k.name === wanted);
}

export function useKeys() {
    return { allKeys, keysFor, getKey };
}
