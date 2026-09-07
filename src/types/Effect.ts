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
