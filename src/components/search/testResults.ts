import type { SearchResult } from "../../search";

function result(fields: Partial<SearchResult> & { id: string }): SearchResult {
    return {
        source: "rulebook",
        title: fields.id,
        aliases: "",
        body: "",
        pageTags: "",
        context: "Rulebook",
        to: "/rulebook/intro",
        color: "soul",
        score: 1,
        terms: ["strike"],
        ...fields,
    };
}

export const traitResult = result({
    id: "trait:true-strikes",
    source: "trait",
    title: "true strikes",
    body: "Your strike cannot miss. Costs 1 body.",
    context: "Trait · fighter 1",
    to: "/rulebook/traits",
    color: "body",
});

export const rulebookResult = result({
    id: "rulebook:combat#making-a-strike",
    title: "Making a strike",
    body: "To strike a creature, roll.",
    context: "Rulebook > Combat",
    to: "/rulebook/combat#making-a-strike",
});

export const glossaryResult = result({
    id: "glossary:effects:burn",
    source: "glossary",
    title: "burn",
    body: "A burn that feels like a strike.",
    context: "elemental bane",
    to: "/rulebook/effects#effect-burn",
    pill: "bg-medicine",
    color: "medicine",
    glossary: { kind: "effects", name: "burn" },
});

export const staleGlossaryResult = result({
    ...glossaryResult,
    id: "glossary:effects:renamed",
    title: "renamed",
    glossary: { kind: "effects", name: "no such record" },
});

export const artResult = result({
    id: "art:precision-strike",
    source: "art",
    title: "precision strike",
    body: "A careful strike.",
    context: "Art · mind 2",
    to: "/rulebook/spells",
    color: "mind",
});
