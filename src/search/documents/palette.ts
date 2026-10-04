import { STAT_COLORS } from "../../styling/statColors";
import { PILL_COLOR_WORDS } from "../../util/textFormatting";
import pathJson from "../../assets/OfflineJsons/paths.json";

const STAT_WORDS: ReadonlySet<string> = new Set(STAT_COLORS);

// Palette name for the hover tint of a class, rarity or stat word.
export function colorFor(word: string): string {
    const key = word.trim().toLowerCase();
    const pill = PILL_COLOR_WORDS[key];
    if (pill) return pill.split("-")[0];
    const path = pathJson.find((p) => p.name === key);
    if (path) return path.color;
    return STAT_WORDS.has(key) ? key : "aabase";
}
