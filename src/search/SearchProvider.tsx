import type MiniSearch from "minisearch";
import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SEARCH_INDEX_HASH } from "../generated/searchIndex.hash";
import { buildEngine, deserialize, search, serialize } from "./engine";
import type { SearchDocument, SearchIndexFile } from "./types";
import { SearchContext, SearchContextValue, SearchStatus } from "./useSearch";

const CACHE_PREFIX = "rpg-hell.searchIndex.";
const CACHE_KEY = CACHE_PREFIX + SEARCH_INDEX_HASH;

async function loadEngine(): Promise<MiniSearch<SearchDocument>> {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) return deserialize(cached);

    const file = (await import("../generated/searchIndex.json")).default as unknown as SearchIndexFile;
    const engine = buildEngine(file.documents);
    console.debug(`search index built: ${file.documents.length} documents`);

    try {
        for (const key of Object.keys(sessionStorage)) {
            if (key.startsWith(CACHE_PREFIX)) sessionStorage.removeItem(key);
        }
        sessionStorage.setItem(CACHE_KEY, serialize(engine));
    } catch {
        // quota and private mode failures leave the index in memory only
    }
    return engine;
}

export function SearchProvider({ children }: { children: ReactNode }) {
    const [status, setStatus] = useState<SearchStatus>("idle");
    const engine = useRef<MiniSearch<SearchDocument>>();
    const started = useRef(false);

    const ensure = useCallback(() => {
        if (started.current) return;
        started.current = true;
        setStatus("building");
        loadEngine()
            .then((loaded) => {
                engine.current = loaded;
                setStatus("ready");
            })
            .catch((error) => {
                console.error("search index failed to load", error);
                setStatus("failed");
            });
    }, []);

    useEffect(() => {
        if ("requestIdleCallback" in window) {
            const id = window.requestIdleCallback(() => ensure());
            return () => window.cancelIdleCallback(id);
        }
        const id = setTimeout(ensure, 1500);
        return () => clearTimeout(id);
    }, [ensure]);

    const value = useMemo<SearchContextValue>(
        () => ({
            status,
            ensure,
            search: (query, limit) => (engine.current ? search(engine.current, query, limit) : []),
        }),
        [status, ensure]
    );

    return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}
