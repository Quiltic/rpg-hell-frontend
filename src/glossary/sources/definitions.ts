import type { RulebookPageSlug } from "../../rulebook/pages";
import definitionsJson from "../../assets/OfflineJsons/definitions.json";
import { generateSlug } from "../../util/slug";
import { GlossarySource, bullet, findRecord } from "./source";

export type Definition = {
    name: string;
    page: RulebookPageSlug;
    effect: string;
    short: string;
    extra?: string;
    aliases?: string[];
};

export const allDefinitions: Definition[] = definitionsJson as Definition[];

export function getDefinition(name: string): Definition | undefined {
    return findRecord(allDefinitions, name);
}

export const definitionsSource: GlossarySource<Definition> = {
    kind: "definitions",
    records: allDefinitions,
    page: (d) => d.page,
    anchor: (d) => `definition-${generateSlug(d.name)}`,
    label: () => "definition",
    pillColor: () => "bg-charm",
    toLine: (d) => bullet(d.name, d.effect),
    toBlock: (d) => d.effect,
};
