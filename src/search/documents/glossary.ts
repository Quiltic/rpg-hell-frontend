import { rulebookHref } from "../../glossary/resolve";
import { toPattern } from "../../glossary/scan";
import type { GlossarySource } from "../../glossary/sources/source";
import { generateSlug } from "../../util/slug";
import type { SearchDocument } from "../types";

export function glossaryDocuments(sources: readonly GlossarySource[]): SearchDocument[] {
    return sources.flatMap((source) =>
        source.records.map((record) => {
            const pill = source.pillColor(record);
            return {
                id: `glossary:${source.kind}:${generateSlug(record.name)}`,
                source: "glossary" as const,
                title: record.name,
                aliases: [toPattern(record.name), ...(record.aliases ?? [])].join(" "),
                body: record.effect,
                pageTags: "",
                context: source.label(record),
                to: rulebookHref({ source, record }),
                pill,
                color: pill.replace(/^bg-/, ""),
                page: source.page(record),
                anchor: source.anchor(record),
                glossary: { kind: source.kind, name: record.name },
            };
        })
    );
}
