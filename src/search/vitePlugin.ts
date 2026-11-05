import { spawnSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import type { Plugin } from "vite";

const JSON_DIR = "src/assets/OfflineJsons";
const WATCHED_DIRS = ["src/assets/RulebookFiles/markdown", JSON_DIR];
const DEBOUNCE_MS = 200;

/**
 * Finds the JSON files in a directory that fail to parse.
 * The line is found by parsing each single-line `{...}` entry on its own, so multi-line files report the file only.
 * @param dir - the directory to scan
 * @returns one `path:line: message` string per broken file
 * @example
 * ```typescript
 * findBrokenJson("src/assets/OfflineJsons") // ["src/assets/OfflineJsons/traits.json:42: JSON Parse error: Expected '}'"]
 * ```
 */
export function findBrokenJson(dir: string): string[] {
    const broken: string[] = [];
    for (const name of readdirSync(dir).filter((file) => file.endsWith(".json"))) {
        const path = join(dir, name);
        const text = readFileSync(path, "utf8");
        try {
            JSON.parse(text);
        } catch (error) {
            const index = text.split("\n").findIndex((line) => {
                const entry = line.trim().replace(/,$/, "");
                if (!entry.startsWith("{") || entry === "{") return false;
                try {
                    JSON.parse(entry);
                    return false;
                } catch {
                    return true;
                }
            });
            broken.push(`${path}${index === -1 ? "" : `:${index + 1}`}: ${(error as Error).message}`);
        }
    }
    return broken;
}

function runScript(): void {
    const result = spawnSync("bun", ["scripts/build-search-index.ts"], { stdio: "inherit" });
    if (result.status !== 0)
        throw new Error(
            [`search index build failed (exit ${result.status ?? result.signal})`, ...findBrokenJson(JSON_DIR)].join(
                "\n"
            )
        );
}

export function searchIndexPlugin(): Plugin {
    let testing = false;
    return {
        name: "search-index",
        config(_config, env) {
            testing = env.mode === "test";
        },
        // under vitest only a fresh clone needs the files, for the static hash import
        buildStart() {
            if (!testing || !existsSync("src/generated/searchIndex.hash.ts")) runScript();
        },
        configureServer(server) {
            if (testing) return;
            const dirs = WATCHED_DIRS.map((dir) => resolve(server.config.root, dir));
            let timer: ReturnType<typeof setTimeout> | undefined;
            for (const dir of dirs) server.watcher.add(dir);
            server.watcher.on("all", (event, file) => {
                if (!["add", "change", "unlink"].includes(event)) return;
                if (!dirs.some((dir) => file.startsWith(dir))) return;
                clearTimeout(timer);
                timer = setTimeout(() => {
                    try {
                        runScript();
                        server.ws.send({ type: "full-reload" });
                    } catch (error) {
                        server.config.logger.error(String(error));
                    }
                }, DEBOUNCE_MS);
            });
        },
    };
}
