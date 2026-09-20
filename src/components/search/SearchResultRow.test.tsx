import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import SearchResultRow from "./SearchResultRow";
import { glossaryResult, rulebookResult, traitResult } from "./testResults";

function renderRow(props: Parameters<typeof SearchResultRow>[0]) {
    return render(
        <MemoryRouter>
            <SearchResultRow {...props} />
        </MemoryRouter>
    );
}

describe("SearchResultRow", () => {
    it("renders a title-cased title, the context and the snippet", () => {
        renderRow({ result: traitResult });
        expect(screen.getByText("True Strikes")).toBeInTheDocument();
        expect(screen.getByText("Trait · fighter 1")).toBeInTheDocument();
        expect(screen.getByText(/cannot miss/)).toBeInTheDocument();
    });

    it("marks the matched term and colors stat words in the snippet", () => {
        renderRow({ result: traitResult });
        expect(screen.getByText("strike").tagName).toBe("MARK");
        expect(screen.getByText("body")).toHaveClass("text-body-700");
    });

    it("leaves a rulebook title as written", () => {
        renderRow({ result: rulebookResult });
        expect(screen.getByText("Making a strike")).toBeInTheDocument();
    });

    it("shows the context of a glossary row as a pill only", () => {
        renderRow({ result: glossaryResult });
        expect(screen.getAllByText("elemental bane")).toHaveLength(1);
        expect(screen.getByText("elemental bane")).toHaveClass("bg-medicine");
    });

    it("tints the row with its color when active", () => {
        const { container } = renderRow({ result: traitResult, active: true });
        expect(container.firstChild).toHaveClass("bg-body-500/20", "ring-body-600");
    });

    /** `dark` is the color of mundane items and the dropdown background. */
    it("tints a dark row with light", () => {
        const { container } = renderRow({
            result: { ...traitResult, color: "dark" },
            active: true,
        });
        expect(container.firstChild).toHaveClass("bg-light-500/20");
    });

    /** The caller renders the definition after the row, so no link sits inside an option. */
    it("hides the snippet and renders no links when expanded", () => {
        renderRow({ result: glossaryResult, expanded: true });
        expect(screen.queryByText(/feels like a/)).not.toBeInTheDocument();
        expect(screen.queryByRole("link")).not.toBeInTheDocument();
    });
});
