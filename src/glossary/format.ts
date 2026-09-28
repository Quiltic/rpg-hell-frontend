import { scanText, spanEmit } from "./scan";

const formatted = new Map<string, string>();

export function formatEffectString(text: string): string {
    const hit = formatted.get(text);
    if (hit !== undefined) {
        return hit;
    }

    const html = scanText(text, spanEmit);
    formatted.set(text, html);
    return html;
}
