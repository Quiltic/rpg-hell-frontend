/**
 * @param text - any string
 * @returns the string with regex metacharacters escaped, safe to put inside a `RegExp`
 * @example
 * ```typescript
 * new RegExp(escapeRegex("1d6 (fire)"))
 * ```
 */
export function escapeRegex(text: string): string {
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
