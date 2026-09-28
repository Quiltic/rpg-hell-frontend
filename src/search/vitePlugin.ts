import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import type { Plugin } from "vite";

const WATCHED_DIRS = ["src/assets/RulebookFiles/markdown", "src/assets/OfflineJsons"];
const DEBOUNCE_MS = 200;

function runScript(): void {
    const result = spawnSync("bun", ["scripts/build-search-index.ts"], { stdio: "inherit" });
    if (result.status !== 0) throw new Error(`search index build failed (exit ${result.status ?? result.signal})`);
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
