import { describe, expect, it } from "vitest";
import { GLOSSARY_SOURCES } from "./sources";
import { STAT_COLORS } from "../../styling/statColors";
import { resolveTerm } from "../resolve";
import { RULEBOOK_PAGES } from "../../rulebook/pages";

const PAGE_SLUGS: string[] = RULEBOOK_PAGES.map((page) => page.slug);

/** Every registered source is held to the same data rules. */
describe.each(GLOSSARY_SOURCES.map((s) => [s.kind, s] as const))(
    "source %s",
    (_kind, source) => {
        it("has a non-empty kind usable as a directive name", () => {
            expect(source.kind).toMatch(/^[a-z]+$/);
        });

        it("uses lowercase, trimmed, straight-apostrophe names", () => {
            for (const record of source.records) {
                expect(record.name).toBe(record.name.toLowerCase().trim());
                expect(record.name).not.toContain("’");
                expect(record.name).not.toBe("");
            }
        });

        it("has no duplicate names, so lookups never depend on file order", () => {
            const names = source.records.map((r) => r.name);
            expect(new Set(names).size).toBe(names.length);
        });

        it("has a non-empty straight-apostrophe effect on every record", () => {
            for (const record of source.records) {
                expect(record.effect.trim(), record.name).not.toBe("");
                expect(record.effect, record.name).not.toContain("’");
            }
        });

        it("keeps short straight-apostrophe when present", () => {
            for (const record of source.records) {
                if (record.short) {
                    expect(record.short, record.name).not.toContain("’");
                }
            }
        });

        it("points every record at a real rulebook page", () => {
            for (const record of source.records) {
                expect(PAGE_SLUGS, record.name).toContain(source.page(record));
            }
        });

        it("gives every record a unique anchor", () => {
            const anchors = source.records.map((r) => source.anchor(r));
            expect(new Set(anchors).size).toBe(anchors.length);
            for (const anchor of anchors) {
                expect(anchor).toMatch(/^[a-z0-9-]+$/);
            }
        });

        it("gives every record a literal pill colour class", () => {
            for (const record of source.records) {
                expect(source.pillColor(record), record.name).toMatch(
                    /^bg-[a-z]+(-\d{3})?$/
                );
                expect(source.label(record), record.name).not.toBe("");
            }
        });

        it("renders a bullet for every record", () => {
            for (const record of source.records) {
                expect(source.toLine(record)).toContain(record.effect);
            }
        });
    }
);

// Aliases feed the keyword matcher, so a bad one is a wrong tooltip on a
// perfectly ordinary word rather than a missing one.
describe("aliases", () => {
    const records = GLOSSARY_SOURCES.flatMap((s) => s.records);

    it("uses lowercase straight-apostrophe values", () => {
        for (const record of records) {
            for (const alias of record.aliases ?? []) {
                expect(alias).toBe(alias.toLowerCase().trim());
                expect(alias).not.toContain("’");
                expect(alias).not.toBe("");
            }
        }
    });

    // `charm` is a stat word, a Tailwind colour and a safelisted class prefix.
    // An alias colliding with one would fight the colour pass in the same regex.
    it("never collides with a stat word", () => {
        for (const record of records) {
            for (const alias of record.aliases ?? []) {
                expect(STAT_COLORS, alias).not.toContain(alias);
            }
        }
    });

    it("never duplicates a record name", () => {
        const names = new Set(records.map((r) => r.name));
        for (const record of records) {
            for (const alias of record.aliases ?? []) {
                expect(names, alias).not.toContain(alias);
            }
        }
    });

    it("never duplicates another alias", () => {
        const all = records.flatMap((r) => r.aliases ?? []);
        expect(new Set(all).size).toBe(all.length);
    });
});

/**
 * A name held by more than one source resolves to whichever is first in
 * GLOSSARY_SOURCES. Every such overlap is listed here so adding one is a
 * deliberate choice, not a surprise.
 */
describe("collisions between sources", () => {
    it("are only the known ones", () => {
        const seen = new Map<string, string[]>();
        for (const source of GLOSSARY_SOURCES) {
            for (const record of source.records) {
                seen.set(record.name, [
                    ...(seen.get(record.name) ?? []),
                    source.kind,
                ]);
            }
        }
        const collisions = [...seen]
            .filter(([, kinds]) => kinds.length > 1)
            .map(([name, kinds]) => `${name}: ${kinds.join(" > ")}`)
            .sort();
        expect(collisions).toEqual([
            "focus: effects > keys",
            "follower: effects > keys",
        ]);
    });

    it("resolve to the first source in registry order", () => {
        expect(resolveTerm("focus")?.source.kind).toBe("effects");
    });
});
