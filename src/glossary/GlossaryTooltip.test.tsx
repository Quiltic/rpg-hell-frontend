import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import GlossaryTooltip from "./GlossaryTooltip";
import { GlossaryHit, resolveTerm } from "./resolve";

function hitFor(name: string): GlossaryHit {
    const hit = resolveTerm(name);
    if (!hit) throw new Error(`no glossary record for ${name}`);
    return hit;
}

function setup(
    name: string,
    props: Partial<Parameters<typeof GlossaryTooltip>[0]> = {}
) {
    const anchor = document.createElement("span");
    anchor.textContent = name;
    document.body.appendChild(anchor);

    const view = render(
        <MemoryRouter>
            <GlossaryTooltip
                anchor={anchor}
                hit={hitFor(name)}
                tooltipId="kw-tip"
                onPointerEnter={() => {}}
                onPointerLeave={() => {}}
                onDismiss={() => {}}
                onNavigate={() => {}}
                {...props}
            />
        </MemoryRouter>
    );
    return { anchor, ...view };
}

describe("GlossaryTooltip", () => {
    it("shows the term, its category and its definition", () => {
        setup("burn");
        const tip = screen.getByRole("tooltip");
        expect(tip).toHaveTextContent("Burn");
        expect(tip).toHaveTextContent("elemental-bane");
        expect(tip).toHaveTextContent(
            hitFor("burn").record.effect.slice(0, 30)
        );
    });

    it("title-cases a stored lowercase name", () => {
        setup("bleeding out");
        expect(screen.getByRole("tooltip")).toHaveTextContent("Bleeding Out");
    });

    it("labels a key by its source rather than a category", () => {
        setup("on hit");
        expect(screen.getByRole("tooltip")).toHaveTextContent("item key");
    });

    it("links to the term's rulebook anchor", () => {
        setup("burn");
        const link = screen.getByRole("link", { name: /rulebook/i });
        expect(link).toHaveAttribute("href", "/rulebook/effects#effect-burn");
    });

    it("turns a nested keyword in the definition into a rulebook link", () => {
        // `bleeding out` names **Death's Door** in its own text (Q14b).
        setup("bleeding out");
        const nested = screen.getByRole("link", { name: /death's door/i });
        expect(nested).toHaveAttribute(
            "href",
            "/rulebook/effects#effect-deaths-door"
        );
    });

    it("does not link the term back to itself", () => {
        // `grappled` says "Grappled" inside its own definition.
        setup("grappled");
        const selfLinks = screen
            .getAllByRole("link")
            .filter((a) => /^grappl/i.test(a.textContent ?? ""));
        expect(selfLinks).toHaveLength(0);
    });

    it("describes the anchor while open and cleans up on unmount", () => {
        const { anchor, unmount } = setup("burn");
        expect(anchor).toHaveAttribute("aria-describedby", "kw-tip");
        unmount();
        expect(anchor).not.toHaveAttribute("aria-describedby");
    });

    it("dismisses on Escape", async () => {
        const onDismiss = vi.fn();
        setup("burn", { onDismiss });
        await userEvent.keyboard("{Escape}");
        expect(onDismiss).toHaveBeenCalled();
    });

    it("reports pointer entry and exit so the layer can cancel its close timer", async () => {
        const onPointerEnter = vi.fn();
        const onPointerLeave = vi.fn();
        setup("burn", { onPointerEnter, onPointerLeave });

        // The pointer lands on the transparent bridge, not the panel itself.
        const bridge = screen.getByRole("tooltip").parentElement!;
        await userEvent.hover(bridge);
        expect(onPointerEnter).toHaveBeenCalled();
        await userEvent.unhover(bridge);
        expect(onPointerLeave).toHaveBeenCalled();
    });
});
