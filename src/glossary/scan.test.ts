import { describe, expect, it } from "vitest";
import { keywordPatterns, scanText, spanEmit } from "./scan";

const scan = (text: string) => scanText(text, spanEmit);

// Just the terms, so an assertion reads as what a reader would see decorated.
const terms = (text: string) => {
    const found: string[] = [];
    scanText(text, {
        plain: () => "",
        stat: () => "",
        keyword: (matched, name) => {
            found.push(`${matched}=${name}`);
            return "";
        },
    });
    return found;
};

describe("boundaries", () => {
    it("prefers the longest term, so Side does not eat Downside", () => {
        expect(terms("Downside: lose a die.")).toEqual(["Downside=downside"]);
        expect(terms("Can be used as a Side weapon.")).toEqual(["Side=side"]);
    });

    it("does not match a stat word inside a longer keyword", () => {
        // `charm` is a stat colour, `charmed` a bane. The bane must win, and
        // the stat pass must not also fire inside it.
        expect(scan("Charmed")).toBe(
            '<span class="kw" data-kw="charmed" tabindex="0" role="button">Charmed</span>'
        );
    });

    it("does not match a keyword inside a longer word", () => {
        expect(terms("The wand focuses light.")).toEqual([]);
        expect(terms("Unwarded targets.")).toEqual([]);
    });

    it("matches multi-word terms and survives trailing punctuation", () => {
        expect(terms("On Hit: Do 1 damage.")).toEqual(["On Hit=on hit"]);
        expect(terms("At 1 stack of Death's Door you are Slowed.")).toEqual([
            "Death's Door=death's door",
            "Slowed=slow",
        ]);
    });
});

describe("casing and apostrophes", () => {
    it("matches case-insensitively but emits the source casing", () => {
        expect(scan("STUN")).toContain(">STUN<");
        expect(scan("STUN")).toContain('data-kw="stun"');
    });

    it("matches a curly apostrophe and keeps it in the output", () => {
        const out = scan("Death’s Door");
        expect(out).toContain('data-kw="death\'s door"');
        expect(out).toContain(">Death’s Door<");
    });
});

describe("aliases", () => {
    it("resolves an inflection to its canonical record", () => {
        expect(terms("They are Slowed and Warded.")).toEqual([
            "Slowed=slow",
            "Warded=ward",
        ]);
    });

    it("handles a multi-word alias", () => {
        expect(terms("Targets are knocked back 2 tiles.")).toEqual([
            "knocked back=knockback",
        ]);
    });

    it("resolves the parameterised keys from the bare word", () => {
        expect(terms("Reaching 2 and +1 Reaching")).toEqual([
            "Reaching=reaching x",
        ]);
        expect(terms("Loading 3")).toEqual(["Loading=loading x"]);
    });
});

describe("first occurrence only", () => {
    it("decorates the first match of a term and leaves later ones plain", () => {
        expect(
            terms("Gain Stun. You cannot gain Stun again while Stun.")
        ).toEqual(["Stun=stun"]);
    });

    it("still decorates a different term later in the string", () => {
        expect(terms("Apply Burn, then Burn again, then Wet.")).toEqual([
            "Burn=burn",
            "Wet=wet",
        ]);
    });
});

describe("stat colouring shares the pass", () => {
    it("colours stat words", () => {
        expect(scan("Roll body.")).toBe(
            'Roll <span class="text-body-700">body</span>.'
        );
    });

    it("never colours a stat word inside markup it just injected", () => {
        // The regression this whole one-pass design exists for: two separate
        // string passes would let `nature` match inside class="text-nature-700"
        // or inside data-kw, producing broken markup.
        const out = scan("NATURE Knockback and nature magic");
        expect(out.match(/text-nature-700/g)).toHaveLength(2);
        expect(out).not.toMatch(/text-<span/);
        expect(out).not.toMatch(/data-kw="[^"]*<span/);
    });
});

describe("content that must pass through untouched", () => {
    it("leaves dice placeholders alone", () => {
        expect(scan("Spend ⚀⚁⚂; Melee Attack")).toBe("Spend ⚀⚁⚂; Melee Attack");
        expect(scan("Spend ##; Melee Attack")).toBe("Spend ##; Melee Attack");
    });

    it("leaves text with nothing to match byte-identical", () => {
        const text = "Once per turn, roll two dice and pick one.";
        expect(scan(text)).toBe(text);
    });

    it("does not decorate core mechanics, which are out of scope for v1", () => {
        expect(terms("Spend 2 Strain to make an Attack after a Rest.")).toEqual(
            []
        );
    });
});

describe("the index", () => {
    it("is sorted longest first", () => {
        const lengths = keywordPatterns().map((p) => p.length);
        expect([...lengths].sort((a, b) => b - a)).toEqual(lengths);
    });

    it("stores patterns normalised", () => {
        for (const pattern of keywordPatterns()) {
            expect(pattern).toBe(pattern.toLowerCase().trim());
            expect(pattern).not.toContain("’");
            expect(pattern).not.toMatch(/ x$/);
        }
    });
});
