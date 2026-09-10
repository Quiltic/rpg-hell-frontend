import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RulebookMarkdownPage from "./RulebookMarkdownPage";

describe("RulebookMarkdownPage", () => {
    it("renders the page's markdown with the nav", () => {
        render(
            <MemoryRouter initialEntries={["/rulebook/effects"]}>
                <RulebookMarkdownPage slug="effects" />
            </MemoryRouter>
        );
        expect(
            screen.getByRole("heading", { level: 1, name: "States" })
        ).toBeInTheDocument();
        expect(screen.getByText("Rulebook Pages")).toBeInTheDocument();
    });

    it("renders directive-generated content on first render", () => {
        const { container } = render(
            <MemoryRouter>
                <RulebookMarkdownPage slug="effects" />
            </MemoryRouter>
        );
        expect(container.querySelector("#effect-burn")).not.toBeNull();
    });

    it("throws for a page without a markdown file", () => {
        vi.spyOn(console, "error").mockImplementation(() => {});
        expect(() =>
            render(
                <MemoryRouter>
                    <RulebookMarkdownPage slug="traits" />
                </MemoryRouter>
            )
        ).toThrow('"traits"');
    });
});
