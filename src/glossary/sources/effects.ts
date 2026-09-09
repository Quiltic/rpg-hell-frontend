import effectsJson from "../../assets/OfflineJsons/effects.json";
import { generateSlug } from "../../util/slug";
import { GlossarySource, bullet, findRecord } from "./source";

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
    short?: string;
    extra?: string;
    aliases?: string[];
};

const PILL_COLORS: Record<EffectCategory, string> = {
    "character-state": "bg-body",
    "elemental-bane": "bg-arcana",
    bane: "bg-medicine",
    boon: "bg-nature",
};

// Static JSON, so a module constant. effects.test.ts and sources.test.ts
// validate every record, which is what makes the cast safe.
export const allEffects: Effect[] = effectsJson as Effect[];

export function getEffect(name: string): Effect | undefined {
    return findRecord(allEffects, name);
}

export function effectsInCategory(category: EffectCategory): Effect[] {
    return allEffects.filter((e) => e.category === category);
}

export const effectsSource: GlossarySource<Effect> = {
    kind: "effects",
    records: allEffects,
    page: () => "effects",
    anchor: (e) => `effect-${generateSlug(e.name)}`,
    label: (e) => e.category,
    pillColor: (e) => PILL_COLORS[e.category],
    toLine: (e) => bullet(e.name, e.effect),
};
