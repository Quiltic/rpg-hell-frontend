import type { RulebookPageSlug } from "../../rulebook/pageList";
import { parseFrontmatter } from "../../rulebook/frontmatter";
import { extractSections } from "../../rulebook/sections";
import type { SearchDocument } from "../types";

export type RulebookPageInput = { slug: RulebookPageSlug; title: string; markdown: string };

export function rulebookDocuments(pages: RulebookPageInput[]): SearchDocument[] {
    return pages.flatMap(({ slug, markdown }) => {
        const { data, body } = parseFrontmatter(markdown);
        const pageTags = (data.tags ?? []).join(" ");
        const sections = extractSections(body);
        const preamble = sections[0]?.level === 0 ? sections[0].body : "";
        return sections
            .filter((section) => section.level > 0)
            .map((section, i) => ({
                id: `rulebook:${slug}#${section.slug}`,
                source: "rulebook" as const,
                title: section.text,
                aliases: "",
                body: i === 0 && preamble ? `${preamble}\n${section.body}` : section.body,
                pageTags,
                context: ["Rulebook", ...section.path].join(" > "),
                to: `/rulebook/${slug}#${section.slug}`,
                color: "soul",
                page: slug,
                anchor: section.slug,
            }));
    });
}
