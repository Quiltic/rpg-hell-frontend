import { act, render, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { buildEngine, serialize } from "./engine";
import { SearchProvider } from "./SearchProvider";
import type { SearchDocument } from "./types";
import { SearchContextValue, useSearch } from "./useSearch";

const documents = vi.hoisted((): SearchDocument[] => [
    {
        id: "item:sword",
        source: "item",
        title: "sword",
        aliases: "",
        body: "a plain blade",
        pageTags: "",
        context: "Item · mundane",
        to: "/rulebook/items",
        color: "dark",
    },
]);

/** The generated files are gitignored, so both are mocked and the suite runs on a fresh clone. */
vi.mock("../generated/searchIndex.hash", () => ({ SEARCH_INDEX_HASH: "testhash" }));
vi.mock("../generated/searchIndex.json", () => ({
    default: { version: 1, hash: "testhash", builtAt: "", documents },
}));
vi.mock("./engine", async (importOriginal) => {
    const actual = await importOriginal<typeof import("./engine")>();
    return { ...actual, buildEngine: vi.fn(actual.buildEngine) };
});

const KEY = "rpg-hell.searchIndex.testhash";

function renderProvider() {
    const seen: SearchContextValue[] = [];
    function Probe() {
        seen.push(useSearch());
        return null;
    }
    render(
        <SearchProvider>
            <Probe />
        </SearchProvider>
    );
    const statuses = () => seen.map((v) => v.status).filter((s, i, all) => s !== all[i - 1]);
    const latest = () => seen[seen.length - 1];
    return { statuses, latest };
}

describe("SearchProvider", () => {
    beforeEach(() => {
        sessionStorage.clear();
        vi.restoreAllMocks();
        vi.mocked(buildEngine).mockClear();
        vi.spyOn(console, "debug").mockImplementation(() => {});
    });

    it("builds the index and caches it under the hash", async () => {
        sessionStorage.setItem("rpg-hell.searchIndex.oldhash", "stale");
        const { statuses, latest } = renderProvider();
        expect(latest().search("sword")).toEqual([]);

        act(() => latest().ensure());
        await waitFor(() => expect(latest().status).toBe("ready"));

        expect(statuses()).toEqual(["idle", "building", "ready"]);
        expect(buildEngine).toHaveBeenCalledTimes(1);
        expect(sessionStorage.getItem(KEY)).not.toBeNull();
        expect(sessionStorage.getItem("rpg-hell.searchIndex.oldhash")).toBeNull();
        expect(latest().search("sword")[0].id).toBe("item:sword");
    });

    it("restores a cached index without building", async () => {
        const actual = await vi.importActual<typeof import("./engine")>("./engine");
        sessionStorage.setItem(KEY, serialize(actual.buildEngine(documents)));
        const { latest } = renderProvider();

        act(() => latest().ensure());
        await waitFor(() => expect(latest().status).toBe("ready"));

        expect(buildEngine).not.toHaveBeenCalled();
        expect(latest().search("sword")[0].id).toBe("item:sword");
    });

    it("still becomes ready when the cache cannot be written", async () => {
        vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
            throw new DOMException("full", "QuotaExceededError");
        });
        const { latest } = renderProvider();

        act(() => latest().ensure());
        await waitFor(() => expect(latest().status).toBe("ready"));

        expect(sessionStorage.getItem(KEY)).toBeNull();
        expect(latest().search("sword")[0].id).toBe("item:sword");
    });

    it("fails when the cached index cannot be read", async () => {
        vi.spyOn(console, "error").mockImplementation(() => {});
        sessionStorage.setItem(KEY, "not json");
        const { latest } = renderProvider();

        act(() => latest().ensure());
        await waitFor(() => expect(latest().status).toBe("failed"));
        expect(console.error).toHaveBeenCalledTimes(1);
    });

    it("starts the build by itself after mount", async () => {
        vi.useFakeTimers();
        const { latest } = renderProvider();
        expect(latest().status).toBe("idle");
        await act(() => vi.advanceTimersByTimeAsync(1500));
        vi.useRealTimers();
        await waitFor(() => expect(latest().status).toBe("ready"));
    });

    it("useSearch throws outside the provider", () => {
        vi.spyOn(console, "error").mockImplementation(() => {});
        function Probe() {
            useSearch();
            return null;
        }
        expect(() => render(<Probe />)).toThrow(/inside SearchProvider/);
    });
});
