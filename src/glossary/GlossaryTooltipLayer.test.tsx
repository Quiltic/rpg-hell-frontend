import { ReactNode } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import GlossaryTooltipLayer from "./GlossaryTooltipLayer";

const CLOSE_DELAY = 200;

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

function Keyword({ name, label }: { name: string; label: string }) {
    return (
        <span className="kw" data-kw={name} tabIndex={0} role="button">
            {label}
        </span>
    );
}

function renderLayer(ui: ReactNode, onCardClick?: () => void) {
    return render(
        <MemoryRouter>
            <GlossaryTooltipLayer>
                <div onClick={onCardClick}>{ui}</div>
            </GlossaryTooltipLayer>
        </MemoryRouter>
    );
}

describe("GlossaryTooltipLayer", () => {
    const user = userEvent.setup();

    it("opens on hover, but not instantly", async () => {
        renderLayer(<Keyword name="burn" label="Burn" />);

        await user.hover(screen.getByRole("button", { name: "Burn" }));
        expect(screen.queryByRole("tooltip")).toBeNull();
        expect(await screen.findByRole("tooltip")).toHaveTextContent("Burn");
    });

    it("stays open while the pointer crosses into the panel", async () => {
        // The specimen-sheet regression: the rulebook link must be reachable.
        renderLayer(<Keyword name="burn" label="Burn" />);
        const kw = screen.getByRole("button", { name: "Burn" });

        await user.hover(kw);
        const tip = await screen.findByRole("tooltip");

        await user.unhover(kw);
        await user.hover(tip.parentElement!);
        await wait(CLOSE_DELAY * 3);

        expect(screen.getByRole("tooltip")).toBe(tip);
    });

    it("closes once the pointer leaves the word", async () => {
        renderLayer(<Keyword name="burn" label="Burn" />);
        const kw = screen.getByRole("button", { name: "Burn" });

        await user.hover(kw);
        await screen.findByRole("tooltip");

        await user.unhover(kw);
        await waitFor(() => expect(screen.queryByRole("tooltip")).toBeNull());
    });

    it("opens on focus", async () => {
        renderLayer(<Keyword name="burn" label="Burn" />);

        screen.getByRole("button", { name: "Burn" }).focus();
        expect(await screen.findByRole("tooltip")).toBeInTheDocument();
    });

    it("opens on click without firing the card's own onClick", async () => {
        // The cards pin themselves on click, so a tap on a keyword must not pin.
        const onCardClick = vi.fn();
        renderLayer(<Keyword name="burn" label="Burn" />, onCardClick);

        await user.click(screen.getByRole("button", { name: "Burn" }));
        expect(await screen.findByRole("tooltip")).toBeInTheDocument();
        expect(onCardClick).not.toHaveBeenCalled();
    });

    it("lets the card's onClick through for a click outside a keyword", async () => {
        const onCardClick = vi.fn();
        renderLayer(<span>plain text</span>, onCardClick);

        await user.click(screen.getByText("plain text"));
        expect(onCardClick).toHaveBeenCalled();
    });

    it("ignores a keyword naming no glossary record", async () => {
        renderLayer(<Keyword name="not-a-real-term" label="Nope" />);

        await user.click(screen.getByRole("button", { name: "Nope" }));
        await wait(CLOSE_DELAY);
        expect(screen.queryByRole("tooltip")).toBeNull();
    });

    it("shows one tooltip at a time across separate layers", async () => {
        render(
            <MemoryRouter>
                <GlossaryTooltipLayer>
                    <Keyword name="burn" label="Burn" />
                </GlossaryTooltipLayer>
                <GlossaryTooltipLayer>
                    <Keyword name="ward" label="Ward" />
                </GlossaryTooltipLayer>
            </MemoryRouter>
        );

        await user.click(screen.getByRole("button", { name: "Burn" }));
        await screen.findByRole("tooltip");

        await user.click(screen.getByRole("button", { name: "Ward" }));
        const tips = await screen.findAllByRole("tooltip");
        expect(tips).toHaveLength(1);
        expect(tips[0]).toHaveTextContent("Ward");
    });
});
