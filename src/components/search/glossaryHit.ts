import { GLOSSARY_SOURCES, GlossaryHit, findRecord } from "../../glossary";
import type { SearchResult } from "../../search";

/**
 * @param result - a search result from any source
 * @returns the glossary record behind a glossary result, or undefined when the result is not one or the record no longer exists
 */
export function glossaryHitFor(result: SearchResult): GlossaryHit | undefined {
    if (!result.glossary) return undefined;
    const { kind, name } = result.glossary;
    const source = GLOSSARY_SOURCES.find((s) => s.kind === kind);
    const record = source && findRecord(source.records, name);
    return source && record ? { source, record } : undefined;
}
