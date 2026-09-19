import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Link, MemoryRouter, useLocation } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { SearchContext, SearchContextValue } from "../../search/useSearch";
import type { SearchResult } from "../../search";
import GlobalSearch from "./GlobalSearch";
import { artResult, glossaryResult, rulebookResult, staleGlossaryResult, traitResult } from "./testResults";

function Location() {
    const { pathname, search, hash } = useLocation();
    return <output>{pathname + search + hash}</output>;
}

function setup(results: SearchResult[], value: Partial<SearchContextValue> = {}, variant: "bar" | "icon" = "bar") {
    const context: SearchContextValue = {
        status: "ready",
        ensure: vi.fn(),
        search: vi.fn((query: string, limit?: number) => (query ? results.slice(0, limit) : [])),
        ...value,
    };
    render(
        <SearchContext.Provider value={context}>
            <MemoryRouter initialEntries={["/start"]}>
                <GlobalSearch variant={variant} />
                <Link to="/elsewhere">elsewhere</Link>
                <Location />
            </MemoryRouter>
        </SearchContext.Provider>
    );
    return context;
}

const input = () => screen.getByRole("combobox", { name: "Search" });
const location = () => screen.getByRole("status").textContent;

describe("GlobalSearch", () => {
    it("shows three rows and See all when a fourth result exists", async () => {
        const context = setup([traitResult, artResult, rulebookResult, glossaryResult]);
        await userEvent.type(input(), "strike");

        expect(await screen.findByText("True Strikes")).toBeInTheDocument();
        expect(context.search).toHaveBeenLastCalledWith("strike", 4);
        expect(screen.getAllByRole("option")).toHaveLength(4);
        expect(screen.queryByText("Burn")).not.toBeInTheDocument();
        expect(screen.getByRole("option", { name: "See all results" })).toBeInTheDocument();
    });

    it("leaves See all out when everything fits", async () => {
        setup([traitResult, artResult]);
        await userEvent.type(input(), "strike");

        await screen.findByText("True Strikes");
        expect(screen.getAllByRole("option")).toHaveLength(2);
    });

    it("starts the index build on the first keystroke", async () => {
        const context = setup([], { status: "building" });
        await userEvent.type(input(), "s");

        expect(context.ensure).toHaveBeenCalled();
        expect(screen.getByText("Building index…")).toBeInTheDocument();
    });

    it("says so when the index failed", async () => {
        setup([], { status: "failed" });
        await userEvent.type(input(), "strike");
        expect(screen.getByText("Search unavailable")).toBeInTheDocument();
    });

    it("names the query when nothing matched", async () => {
        setup([]);
        await userEvent.type(input(), "zzz");
        expect(await screen.findByText("No results for “zzz”")).toBeInTheDocument();
    });

    it("has no clear button while the input is empty", () => {
        setup([traitResult]);
        expect(screen.queryByRole("button", { name: "Clear search" })).not.toBeInTheDocument();
    });

    it("clears the query and keeps focus in the input", async () => {
        setup([traitResult]);
        await userEvent.type(input(), "strike");
        await screen.findByText("True Strikes");

        await userEvent.click(screen.getByRole("button", { name: "Clear search" }));

        expect(input()).toHaveValue("");
        expect(input()).toHaveFocus();
        expect(screen.queryByText("True Strikes")).not.toBeInTheDocument();
    });

    it("closes on Escape and keeps the query", async () => {
        setup([traitResult]);
        await userEvent.type(input(), "strike");
        await screen.findByText("True Strikes");

        await userEvent.keyboard("{Escape}");
        expect(screen.queryByText("True Strikes")).not.toBeInTheDocument();
        expect(input()).toHaveValue("strike");
    });

    it("goes to /search on Enter with no row selected", async () => {
        setup([traitResult]);
        await userEvent.type(input(), "true strike{Enter}");
        expect(location()).toBe("/search?q=true%20strike");
    });

    /** Headless UI activates the first row as soon as the list opens. */
    it("goes to /search on Enter when the rows are showing but none was chosen", async () => {
        setup([traitResult]);
        await userEvent.type(input(), "strike");
        await screen.findByText("True Strikes");

        await userEvent.keyboard("{Enter}");
        expect(location()).toBe("/search?q=strike");
    });

    it("reaches the first row with one ArrowDown", async () => {
        setup([traitResult, rulebookResult]);
        await userEvent.type(input(), "strike");
        await screen.findByText("True Strikes");

        await userEvent.keyboard("{ArrowDown}{Enter}");
        expect(location()).toBe("/rulebook/traits");
    });

    it("navigates to the selected row on Enter", async () => {
        setup([traitResult, rulebookResult]);
        await userEvent.type(input(), "strike");
        await screen.findByText("True Strikes");

        await userEvent.keyboard("{ArrowDown}{ArrowDown}{Enter}");
        expect(location()).toBe("/rulebook/combat#making-a-strike");
    });

    it("navigates when a row is clicked", async () => {
        setup([traitResult]);
        await userEvent.type(input(), "strike");

        await userEvent.click(await screen.findByText("True Strikes"));
        expect(location()).toBe("/rulebook/traits");
    });

    it("goes to /search from the See all row", async () => {
        setup([traitResult, artResult, rulebookResult, glossaryResult]);
        await userEvent.type(input(), "strike");

        await userEvent.click(await screen.findByText("See all results"));
        expect(location()).toBe("/search?q=strike");
    });

    it("opens a glossary row in place and collapses it again", async () => {
        setup([glossaryResult]);
        await userEvent.type(input(), "burn");

        await userEvent.click(await screen.findByText("Burn"));
        expect(location()).toBe("/start");
        const link = screen.getByRole("link", {
            name: /read in the rulebook/i,
        });
        expect(link).toHaveAttribute("href", "/rulebook/effects#effect-burn");
        expect(link.closest('[role="option"]')).toBeNull();

        await userEvent.click(screen.getByText("Burn"));
        expect(screen.queryByRole("link", { name: /read in the rulebook/i })).not.toBeInTheDocument();
    });

    it("follows the rulebook link inside an open glossary row", async () => {
        setup([glossaryResult]);
        await userEvent.type(input(), "burn");
        await userEvent.click(await screen.findByText("Burn"));

        await userEvent.click(screen.getByRole("link", { name: /read in the rulebook/i }));
        expect(location()).toBe("/rulebook/effects#effect-burn");
        expect(input()).toHaveValue("");
    });

    /** A cached index can name a record that has since been renamed. */
    it("navigates for a glossary row whose record is gone", async () => {
        setup([staleGlossaryResult]);
        await userEvent.type(input(), "renamed");

        await userEvent.click(await screen.findByText("Renamed"));
        expect(location()).toBe("/rulebook/effects#effect-burn");
    });

    it("clears the input on a route change", async () => {
        setup([traitResult]);
        await userEvent.type(input(), "strike");
        await screen.findByText("True Strikes");

        await userEvent.click(screen.getByRole("link", { name: "elsewhere" }));
        await waitFor(() => expect(input()).toHaveValue(""));
        expect(screen.queryByText("True Strikes")).not.toBeInTheDocument();
    });

    /** Headless UI's Dialog needs ResizeObserver, which jsdom lacks. */
    it("opens the same search in a dialog from the icon", async () => {
        vi.stubGlobal(
            "ResizeObserver",
            class {
                observe() {}
                disconnect() {}
            }
        );
        setup([traitResult], {}, "icon");
        expect(screen.queryByRole("combobox")).not.toBeInTheDocument();

        await userEvent.click(screen.getByRole("button", { name: "Open search" }));
        await userEvent.type(input(), "strike");
        expect(await screen.findByText("True Strikes")).toBeInTheDocument();

        await userEvent.click(screen.getByRole("button", { name: "Close search" }));
        expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    });
});
