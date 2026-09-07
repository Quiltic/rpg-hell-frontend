// Stat words that are also Tailwind colour names (tailwind.config.js).
export const STAT_COLORS = [
    "body",
    "mind",
    "soul",
    "arcana",
    "charm",
    "crafting",
    "nature",
    "medicine",
    "thieving",
] as const;

export function statColorClass(word: string): string {
    return `text-${word.toLowerCase()}-700`;
}
