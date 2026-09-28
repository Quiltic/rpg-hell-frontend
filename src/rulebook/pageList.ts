export const RULEBOOK_PAGES = [
    { slug: "intro", title: "Intro", file: "intro.md" },
    { slug: "core-rules", title: "Core Rules", file: "core_rules.md" },
    { slug: "stats", title: "Stats", file: "stats.md" },
    {
        slug: "character-creation",
        title: "Character Creation",
        file: "character_creation.md",
    },
    { slug: "combat", title: "Combat", file: "combat.md" },
    { slug: "effects", title: "Effects", file: "effects.md" },
    { slug: "misc-rules", title: "Miscellaneous Rules", file: "mysc_rules.md" },
    { slug: "for-gms", title: "For GMs", file: "for_gms.md" },
    { slug: "traits", title: "Traits" },
    { slug: "spells", title: "Arts" },
    { slug: "items", title: "Items" },
    { slug: "creatures", title: "Creatures" },
    { slug: "full-doc", title: "Printable" },
    { slug: "character-examples", title: "Character Examples" },
] as const;

export type RulebookPage = (typeof RULEBOOK_PAGES)[number];
export type RulebookPageSlug = RulebookPage["slug"];

export function pageFor(slug: RulebookPageSlug): RulebookPage {
    const page = RULEBOOK_PAGES.find((p) => p.slug === slug);
    if (!page) throw new Error(`unknown rulebook page "${slug}"`);
    return page;
}

export function pageTitle(slug: RulebookPageSlug): string {
    return pageFor(slug).title;
}
