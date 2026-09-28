import { createContext, useContext } from "react";
import type { SearchResult } from "./types";

export type SearchStatus = "idle" | "building" | "ready" | "failed";

export type SearchContextValue = {
    status: SearchStatus;
    ensure(): void;
    search(query: string, limit?: number): SearchResult[];
};

export const SearchContext = createContext<SearchContextValue | undefined>(undefined);

/**
 * @returns the search status, `ensure()` to start the index build now, and `search(query, limit?)`, which is empty until ready
 * @example
 * ```typescript
 * const { status, search } = useSearch()
 * ```
 */
export function useSearch(): SearchContextValue {
    const value = useContext(SearchContext);
    if (!value) throw new Error("useSearch must be used inside SearchProvider");
    return value;
}
