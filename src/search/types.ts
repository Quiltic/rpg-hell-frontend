import type { RulebookPageSlug } from "../rulebook/pageList";

export type SearchSource = "trait" | "art" | "item" | "creature" | "glossary" | "rulebook";

export type SearchDocument = {
    id: string;
    source: SearchSource;
    title: string;
    aliases: string;
    body: string;
    pageTags: string;
    context: string;
    to: string;
    pill?: string;
    color: string;
    page?: RulebookPageSlug;
    anchor?: string;
    glossary?: { kind: string; name: string };
};

export type SearchIndexFile = {
    version: 1;
    hash: string;
    builtAt: string;
    documents: SearchDocument[];
};
