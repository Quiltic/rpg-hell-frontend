import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, describe, expect, it } from "vitest";
import type { SearchIndexFile } from "./types";

const root = join(__dirname, "../..");
const script = readFileSync(join(root, "scripts/build-search-index.ts"), "utf8");

function jsonImports(source: string): string[] {
    return [...source.matchAll(/^import .* from "(.*OfflineJsons\/[^"]+\.json)";/gm)].map(
        (m) => m[1].split("/").pop()!
    );
}

describe("build-search-index script", () => {
    const outDir = mkdtempSync(join(tmpdir(), "search-index-"));
    afterAll(() => rmSync(outDir, { recursive: true, force: true }));

    /** The table pages and the index must read the same files, or search shows records the tables cannot. */
    it("imports the same content JSON files as useApiClass", () => {
        const hook = readFileSync(join(root, "src/hooks/useApiClass.tsx"), "utf8").replace(/^\s*\/\/.*$/gm, "");
        expect(jsonImports(script).sort()).toEqual(jsonImports(hook).sort());
    });

    /** Proves the module graph loads under bun, which is what dev and build run. */
    it("runs under bun and writes a valid index file", () => {
        const result = spawnSync("bun", ["scripts/build-search-index.ts", "--out", outDir], {
            cwd: root,
            encoding: "utf8",
        });
        expect(result.status, result.stderr).toBe(0);
        const index: SearchIndexFile = JSON.parse(readFileSync(join(outDir, "searchIndex.json"), "utf8"));
        expect(index.version).toBe(1);
        expect(index.hash).toMatch(/^[0-9a-f]{40}$/);
        expect(index.documents.length).toBeGreaterThan(400);
        expect(new Set(index.documents.map((d) => d.source))).toEqual(
            new Set(["rulebook", "glossary", "trait", "art", "item", "creature"])
        );
        expect(readFileSync(join(outDir, "searchIndex.hash.ts"), "utf8")).toBe(
            `export const SEARCH_INDEX_HASH = "${index.hash}";\n`
        );
        expect(existsSync(join(root, "src/generated/searchIndex.json"))).toBe(existsSync(join(root, "src/generated")));
    });
});
