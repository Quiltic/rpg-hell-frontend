import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, describe, expect, it } from "vitest";
import { findBrokenJson } from "./vitePlugin";

describe("findBrokenJson", () => {
    const dir = mkdtempSync(join(tmpdir(), "broken-json-"));
    afterAll(() => rmSync(dir, { recursive: true, force: true }));

    writeFileSync(join(dir, "good.json"), '[\n    {"name":"a"},\n    {"name":"b"}\n]\n');
    writeFileSync(join(dir, "lines.json"), '[\n    {"name":"a"},\n    {"name":"b",\n    {"name":"c"}\n]\n');
    writeFileSync(join(dir, "multi.json"), '[\n    {\n        "name": "a"\n    ,\n]\n');
    writeFileSync(join(dir, "unlisted.json"), "{ not json");

    const broken = findBrokenJson(dir, ["good.json", "lines.json", "multi.json"]);

    it("skips files that parse and files that are not listed", () => {
        expect(broken.some((line) => line.includes("good.json") || line.includes("unlisted.json"))).toBe(false);
    });

    it("reports the line of a broken single-line entry", () => {
        expect(broken).toContainEqual(expect.stringMatching(/lines\.json:3: /));
    });

    /** Bare `{` lines are skipped, so a multi-line file can only be reported by name. */
    it("reports a broken multi-line file without a line", () => {
        expect(broken).toContainEqual(expect.stringMatching(/multi\.json: /));
    });
});
