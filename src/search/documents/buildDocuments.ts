import type { GlossarySource } from "../../glossary/sources/source";
import type { SearchDocument, SearchIndexFile } from "../types";
import { ContentInput, contentDocuments } from "./content";
import { glossaryDocuments } from "./glossary";
import { RulebookPageInput, rulebookDocuments } from "./rulebook";

export type BuildInput = {
    pages: RulebookPageInput[];
    sources: readonly GlossarySource[];
    content: ContentInput;
    // sha1 of the documents JSON; supplied by the caller so this module stays free of node: imports
    hash: (documentsJson: string) => string;
};

export function buildDocuments({ pages, sources, content, hash }: BuildInput): SearchIndexFile {
    const documents: SearchDocument[] = [
        ...rulebookDocuments(pages),
        ...glossaryDocuments(sources),
        ...contentDocuments(content),
    ];
    const ids = new Set<string>();
    for (const { id } of documents) {
        if (ids.has(id)) throw new Error(`search index: duplicate document id "${id}"`);
        ids.add(id);
    }
    return { version: 1, hash: hash(JSON.stringify(documents)), builtAt: new Date().toISOString(), documents };
}
