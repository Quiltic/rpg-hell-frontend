import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Link, MemoryRouter, useLocation, useNavigationType } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { SearchContext, SearchContextValue } from "../../search/useSearch";
import type { SearchResult } from "../../search";
import SearchPage from "./SearchPage";
import { glossaryResult, staleGlossaryResult, traitResult } from "./testResults";

function Location() {
    const { pathname, search } = useLocation();
    return <output data-action={useNavigationType()}>{pathname + search}</output>;
}

function setup(url: string, results: SearchResult[], value: Partial<SearchContextValue> = {}) {
    const context: SearchContextValue = {
        status: "ready",
        ensure: vi.fn(),
        search: vi.fn((query: string, limit?: number) => (query ? results.slice(0, limit) : [])),
        ...value,
    };
    render(
        <SearchContext.Provider value={context}>
            <MemoryRouter initialEntries={[url]}>
                <SearchPage />
                <Link to="/search?q=burn">burn</Link>
                <Location />
            </MemoryRouter>
        </SearchContext.Provider>
    );
    return context;
}

const many = Array.from({ length: 60 }, (_, i) => ({
    ...traitResult,
    id: `trait:row-${i}`,
    title: `row ${i}`,
}));

const input = () => screen.getByRole("searchbox");
const message = () =>
    screen.getByText((_, element) => element?.tagName === "DIV" && element.getAttribute("role") === "status");
const location = () => screen.getByText((_, element) => element?.tagName === "OUTPUT");

describe("SearchPage", () => {
    it("renders the count and the rows for ?q=", () => {
        const context = setup("/search?q=strike", [traitResult, glossaryResult]);

        expect(input()).toHaveValue("strike");
        expect(context.search).toHaveBeenLastCalledWith("strike", 200);
        expect(message()).toHaveTextContent("2 results for “strike”");
        expect(screen.getByRole("link", { name: /True Strikes/ })).toHaveAttribute(
            "href",
            "/rulebook/traits?q=true%20strikes"
        );
        expect(screen.getByRole("button", { name: /Burn/ })).toBeInTheDocument();
    });

    it("starts the index build on mount", () => {
        const context = setup("/search?q=strike", [], { status: "building" });
        expect(context.ensure).toHaveBeenCalled();
        expect(message()).toHaveTextContent("Building index…");
    });

    it("says so when the index failed", () => {
        setup("/search?q=strike", [], { status: "failed" });
        expect(message()).toHaveTextContent("Search unavailable");
    });

    it("names the query when nothing matched", () => {
        setup("/search?q=zzz", []);
        expect(message()).toHaveTextContent("No results for “zzz”");
    });

    it("shows only the hint for an empty query", () => {
        setup("/search", [traitResult]);
        expect(message()).toHaveTextContent(/type to search/i);
        expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    });

    /** Replacing keeps the back button on the page the user came from. */
    it("writes the typed query to the URL with replace", async () => {
        setup("/search?q=str", [traitResult]);
        await userEvent.type(input(), "ike");

        await waitFor(() => expect(location()).toHaveTextContent("/search?q=strike"));
        expect(location()).toHaveAttribute("data-action", "REPLACE");
    });

    it("drops q from the URL when the input is emptied", async () => {
        setup("/search?q=strike", [traitResult]);
        await userEvent.clear(input());

        await waitFor(() => expect(location().textContent).toBe("/search"));
        expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    });

    /** The header bar navigates to a new ?q= while the page is mounted. */
    it("follows a q that changes from outside", async () => {
        setup("/search?q=strike", [traitResult]);
        await userEvent.click(screen.getByRole("link", { name: "burn" }));
        await waitFor(() => expect(input()).toHaveValue("burn"));
    });

    it("reveals 25 more rows with Show more", async () => {
        setup("/search?q=row", many);
        expect(screen.getAllByRole("listitem")).toHaveLength(25);

        await userEvent.click(screen.getByRole("button", { name: "Show more" }));
        expect(screen.getAllByRole("listitem")).toHaveLength(50);

        await userEvent.click(screen.getByRole("button", { name: "Show more" }));
        expect(screen.getAllByRole("listitem")).toHaveLength(60);
        expect(screen.queryByRole("button", { name: "Show more" })).not.toBeInTheDocument();
    });

    it("opens a glossary row in place and collapses it again", async () => {
        setup("/search?q=burn", [glossaryResult]);
        const row = screen.getByRole("button", { name: /Burn/ });

        await userEvent.click(row);
        expect(row).toHaveAttribute("aria-expanded", "true");
        expect(location()).toHaveTextContent("/search?q=burn");
        expect(screen.getByRole("link", { name: /read in the rulebook/i })).toHaveAttribute(
            "href",
            "/rulebook/effects?q=burn#effect-burn"
        );

        await userEvent.click(row);
        expect(screen.queryByRole("link", { name: /read in the rulebook/i })).not.toBeInTheDocument();
    });

    /** A cached index can name a record that has since been renamed. */
    it("links a glossary row whose record is gone", () => {
        setup("/search?q=renamed", [staleGlossaryResult]);
        expect(screen.getByRole("link", { name: /Renamed/ })).toHaveAttribute(
            "href",
            "/rulebook/effects?q=renamed#effect-burn"
        );
    });
});
