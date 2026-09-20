import type { Creature, Item, Spell, Trait } from "../../client";
import { generateSlug } from "../../util/slug";
import type { SearchDocument, SearchSource } from "../types";
import { colorFor } from "./palette";

export type ContentInput = { traits: Trait[]; spells: Spell[]; items: Item[]; creatures: Creature[] };

type Draft = Omit<SearchDocument, "id" | "aliases" | "pageTags">;

function joinContext(parts: (string | undefined)[]): string {
    return parts.filter((part) => part && part.trim()).join(" · ");
}

function withIds(source: SearchSource, drafts: Draft[]): SearchDocument[] {
    const seen = new Map<string, number>();
    return drafts.map((draft) => {
        const base = `${source}:${generateSlug(draft.title)}`;
        const count = (seen.get(base) ?? 0) + 1;
        seen.set(base, count);
        if (count > 1) console.warn(`search index: duplicate ${source} name "${draft.title}", using ${base}-${count}`);
        return { ...draft, id: count > 1 ? `${base}-${count}` : base, aliases: "", pageTags: "" };
    });
}

export function contentDocuments({ traits, spells, items, creatures }: ContentInput): SearchDocument[] {
    return [
        ...withIds(
            "trait",
            traits.map((t) => ({
                source: "trait",
                title: t.name,
                body: t.effect,
                context: joinContext(["Trait", t.req]),
                to: "/rulebook/traits",
                color: colorFor(t.req.split(/[\s,]/)[0]),
            }))
        ),
        ...withIds(
            "art",
            spells.map((s) => ({
                source: "art",
                title: s.name,
                body: s.effect,
                context: joinContext(["Art", `level ${s.level}`, s.stat, s.tags]),
                to: "/rulebook/spells",
                color: colorFor(s.stat),
            }))
        ),
        ...withIds(
            "item",
            items.map((i) => ({
                source: "item",
                title: i.name,
                body: [i.effect, i.description].filter(Boolean).join("\n"),
                context: joinContext(["Item", i.rarity, i.tags]),
                to: "/rulebook/items",
                color: colorFor(i.rarity),
            }))
        ),
        ...withIds(
            "creature",
            creatures.map((c) => ({
                source: "creature",
                title: c.name,
                body: [c.how_act, c.actives, c.passives, c.notes].filter(Boolean).join("\n"),
                context: joinContext(["Creature", `level ${c.level}`, c.types]),
                to: "/rulebook/creatures",
                color: "crafting",
            }))
        ),
    ];
}
