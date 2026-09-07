export const EFFECT_CATEGORIES = [
    "character-state",
    "elemental-bane",
    "bane",
    "boon",
] as const;

export type EffectCategory = (typeof EFFECT_CATEGORIES)[number];

// Matches the shape of Trait/Spell/Item (name, effect, extra) so shared text
// tooling treats effects like any other content. Names are lowercase; use
// titleCase() from util/textFormatting for display.
export type Effect = {
    name: string;
    category: EffectCategory;
    effect: string;
    extra?: string;
};
