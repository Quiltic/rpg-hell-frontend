import effectsJson from "../assets/OfflineJsons/effects.json";

export const EFFECT_CATEGORIES = [
    "character-state",
    "elemental-bane",
    "bane",
    "boon",
] as const;

export type EffectCategory = (typeof EFFECT_CATEGORIES)[number];

export type Effect = {
    name: string;
    category: EffectCategory;
    effect: string;
    extra?: string;
    aliases?: string[];
};

// The JSON is static, so this is a module constant rather than hook state.
// useEffects.test.ts checks every record is a valid Effect, which is what
// makes the cast safe.
export const allEffects: Effect[] = effectsJson as Effect[];

function normalizeName(name: string): string {
    return name.trim().toLowerCase().replace(/’/g, "'");
}

export function getEffect(name: string): Effect | undefined {
    const wanted = normalizeName(name);
    return allEffects.find((e) => e.name === wanted);
}

export function effectsInCategory(category: EffectCategory): Effect[] {
    return allEffects.filter((e) => e.category === category);
}

export function useEffects() {
    return { allEffects, getEffect, effectsInCategory };
}
