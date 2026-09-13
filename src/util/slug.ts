export function generateSlug(text: string): string {
    return text
        .toLowerCase()
        .replace(/['".()!/:,]/g, "")
        .replace(/\s+/g, "-")
        .replace(/^-+|-+$/g, "");
}
