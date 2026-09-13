import { describe, it, expect } from "vitest";
import {
    KEY_ANCHOR_PREFIXES,
    KEY_SOURCES,
    allKeys,
    getKey,
    keysFor,
    keysSource,
} from "./keys";
import { getEffect } from "./effects";

describe("keys.json", () => {
    it("has only known sources", () => {
        for (const key of allKeys) {
            expect(KEY_SOURCES).toContain(key.source);
        }
    });

    // Focus and Follower are deliberately duplicated between the spell key
    // and effects.json. This keeps the copies honest.
    it("matches effects.json wherever a spell key shares a name with an effect", () => {
        const shared = allKeys.filter(
            (k) => k.source === "spell" && getEffect(k.name)
        );
        expect(shared.map((k) => k.name)).toEqual(["focus", "follower"]);
        for (const key of shared) {
            expect(
                key.effect,
                `"${key.name}" differs between keys.json and effects.json — update both`
            ).toBe(getEffect(key.name)?.effect);
        }
    });
});

describe("keysFor", () => {
    it("keeps file order per source", () => {
        expect(keysFor("spell").map((k) => k.name)).toEqual([
            "reaction",
            "focus",
            "follower",
        ]);
        expect(keysFor("item")).toHaveLength(10);
    });
});

describe("getKey", () => {
    it("is scoped to the source", () => {
        expect(getKey("item", "Glow")?.effect).toMatch(/illuminate/);
        expect(getKey("spell", "glow")).toBeUndefined();
    });
});

describe("keysSource", () => {
    it("pages, anchors, labels and colours by key source", () => {
        const onHit = getKey("item", "on hit")!;
        const reaction = getKey("spell", "reaction")!;
        expect(keysSource.page(onHit)).toBe("items");
        expect(keysSource.page(reaction)).toBe("spells");
        expect(keysSource.anchor(onHit)).toBe("key-item-on-hit");
        expect(keysSource.anchor(reaction)).toBe("key-spell-reaction");
        expect(keysSource.label(onHit)).toBe("item key");
        expect(keysSource.pillColor(reaction)).toBe("bg-soul");
    });

    it("anchors start with the prefixes useKeyAnchor matches", () => {
        for (const key of allKeys) {
            expect(
                keysSource
                    .anchor(key)
                    .startsWith(KEY_ANCHOR_PREFIXES[key.source])
            ).toBe(true);
        }
    });
});
