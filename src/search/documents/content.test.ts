import { beforeEach, describe, expect, it, vi } from "vitest";
import traits from "../../assets/OfflineJsons/traits.json";
import items from "../../assets/OfflineJsons/RefinedItems.json";
import spells from "../../assets/OfflineJsons/spells.json";
import creatures from "../../assets/OfflineJsons/creatures.json";
import type { Creature, Item, Spell, Trait } from "../../client";
import { contentDocuments } from "./content";

const real = {
    traits: traits as Trait[],
    spells: spells as Spell[],
    items: items as Item[],
    creatures: creatures as Creature[],
};

const legendary: Item = {
    name: "Sun Blade",
    description: "A blade of light.",
    effect: "On Hit: Do 5 damage.",
    upgrades: [],
    tags: "weapon, two-handed",
    rarity: "legendary",
    tier: 5,
};

describe("contentDocuments", () => {
    beforeEach(() => {
        vi.spyOn(console, "warn").mockImplementation(() => {});
    });

    it("makes one document per record over the real content", () => {
        const docs = contentDocuments(real);
        const count = (source: string) => docs.filter((d) => d.source === source).length;
        expect(count("trait")).toBe(real.traits.length);
        expect(count("art")).toBe(real.spells.length);
        expect(count("item")).toBe(real.items.length);
        expect(count("creature")).toBe(real.creatures.length);
    });

    /** Duplicate names exist in the hand-maintained JSON; they get a numeric suffix rather than failing. */
    it("keeps ids unique by suffixing repeated names", () => {
        const docs = contentDocuments(real);
        expect(new Set(docs.map((d) => d.id)).size).toBe(docs.length);
        vi.mocked(console.warn).mockClear();
        const twice = contentDocuments({
            traits: [real.traits[0], real.traits[0]],
            spells: [],
            items: [],
            creatures: [],
        });
        expect(twice.map((d) => d.id)).toEqual([`trait:${twice[0].id.slice(6)}`, `${twice[0].id}-2`]);
        expect(console.warn).toHaveBeenCalledOnce();
    });

    it("describes an item by rarity and tags and colors it by rarity", () => {
        const [doc] = contentDocuments({ traits: [], spells: [], items: [legendary], creatures: [] });
        expect(doc.id).toBe("item:sun-blade");
        expect(doc.context).toBe("Item · legendary · weapon, two-handed");
        expect(doc.body).toBe("On Hit: Do 5 damage.\nA blade of light.");
        expect(doc.to).toBe("/rulebook/items");
        expect(doc.color).toBe("arcana");
    });

    it("describes a trait by its requirement and colors it by the class word", () => {
        const [doc] = contentDocuments({ traits: [real.traits[0]], spells: [], items: [], creatures: [] });
        expect(doc.context).toBe(`Trait · ${real.traits[0].req}`);
        expect(doc.color).toBe("body");
        expect(doc.to).toBe("/rulebook/traits");
    });

    it("describes an art by level, stat and tags", () => {
        const [doc] = contentDocuments({ traits: [], spells: [real.spells[0]], items: [], creatures: [] });
        const s = real.spells[0];
        expect(doc.context).toBe(`Art · level ${s.level} · ${s.stat} · ${s.tags}`);
        expect(doc.to).toBe("/rulebook/spells");
    });

    it("joins a creature's text fields into the body", () => {
        const c = real.creatures[0];
        const [doc] = contentDocuments({ traits: [], spells: [], items: [], creatures: [c] });
        expect(doc.body).toContain(c.actives);
        expect(doc.body).toContain(c.passives);
        expect(doc.context).toBe(`Creature · level ${c.level} · ${c.types}`);
        expect(doc.color).toBe("crafting");
    });
});
