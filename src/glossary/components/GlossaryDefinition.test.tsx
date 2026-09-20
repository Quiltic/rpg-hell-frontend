import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import GlossaryDefinition from "./GlossaryDefinition";
import { GlossaryHit, resolveTerm } from "../resolve";

function hitFor(name: string): GlossaryHit {
    const hit = resolveTerm(name);
    if (!hit) throw new Error(`no glossary record for ${name}`);
    return hit;
}

function setup(name: string, onNavigate?: () => void) {
    render(
        <MemoryRouter>
            <GlossaryDefinition
                hit={hitFor(name)}
                onNavigate={onNavigate}
            />
        </MemoryRouter>
    );
}

describe("GlossaryDefinition", () => {
    it("links to the term's rulebook anchor", () => {
        setup("burn");
        const link = screen.getByRole("link", { name: /rulebook/i });
        expect(link).toHaveAttribute("href", "/rulebook/effects#effect-burn");
    });

    it("turns a nested keyword in the definition into a rulebook link", () => {
        // `wet` names Burn in its own text.
        setup("wet");
        const nested = screen.getAllByRole("link", { name: /^burn$/i })[0];
        expect(nested).toHaveAttribute("href", "/rulebook/effects#effect-burn");
    });

    it("does not link the term back to itself", () => {
        // `grappled` says "Grappled" inside its own definition.
        setup("grappled");
        const selfLinks = screen.getAllByRole("link").filter((a) => /^grappl/i.test(a.textContent ?? ""));
        expect(selfLinks).toHaveLength(0);
    });

    it("reports a click on either kind of link", async () => {
        const onNavigate = vi.fn();
        setup("wet", onNavigate);
        await userEvent.click(screen.getByRole("link", { name: /rulebook/i }));
        await userEvent.click(screen.getAllByRole("link", { name: /^burn$/i })[0]);
        expect(onNavigate).toHaveBeenCalledTimes(2);
    });
});
