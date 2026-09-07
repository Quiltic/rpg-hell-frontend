import { describe, it, expect } from "vitest";
import { allKeys, getKey, keysFor } from "./useKeys";
import { getEffect } from "./useEffects";
import { KEY_SOURCES } from "../types/Key";

describe("keys.json", () => {
    it("has only known sources", () => {
        for (const key of allKeys) {
            expect(KEY_SOURCES).toContain(key.source);
        }
    });

    it("uses lowercase names, unique within a source", () => {
        const pairs = allKeys.map((k) => `${k.source}:${k.name}`);
        expect(new Set(pairs).size).toBe(pairs.length);
        for (const key of allKeys) {
            expect(key.name).toBe(key.name.toLowerCase());
        }
    });

    it("uses straight apostrophes and non-empty effects", () => {
        for (const key of allKeys) {
            expect(key.effect).not.toContain("’");
            expect(key.effect.trim()).not.toBe("");
        }
    });

    // Aura, Focus and Follower are deliberately duplicated between the spell
    // key and effects.json (questionnaire Q7). This keeps the copies honest.
    // Item keys are excluded: the item Glow and the bane Glow differ on purpose.
    it("matches effects.json wherever a spell key shares a name with an effect", () => {
        const shared = allKeys.filter(
            (k) => k.source === "spell" && getEffect(k.name)
        );
        expect(shared.map((k) => k.name)).toEqual([
            "aura",
            "focus",
            "follower",
        ]);
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
            "aura",
            "focus",
            "follower",
        ]);
        expect(keysFor("item")).toHaveLength(11);
    });
});

describe("getKey", () => {
    it("is scoped to the source", () => {
        expect(getKey("item", "Glow")?.effect).toMatch(/illuminate/);
        expect(getKey("spell", "glow")).toBeUndefined();
    });
});
