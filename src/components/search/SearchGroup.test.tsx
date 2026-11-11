import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { ApiClassUnion } from "../../types/ApiClassUnions";
import { eApiClass } from "../../types/ApiClassUnions";
import SearchGroup from "./SearchGroup";

const item = (name: string, tags = "") => ({ name, effect: "", tags }) as ApiClassUnion;

describe("SearchGroup", () => {
    /** Headless UI's Dialog needs ResizeObserver, which jsdom lacks. */
    beforeEach(() => {
        vi.stubGlobal(
            "ResizeObserver",
            class {
                observe() {}
                disconnect() {}
            }
        );
    });

    /** Search also calls filter once on mount with a match-all predicate, so only the last call counts. */
    it("filters to initialName", async () => {
        const filter = vi.fn();
        render(
            <SearchGroup
                filter={filter}
                resetFilter={vi.fn()}
                filterClass={eApiClass.Item}
                tagList={[]}
                initialName="dagger"
            />
        );

        await waitFor(() => {
            const predicate = filter.mock.lastCall?.[0];
            expect(predicate(item("dagger"))).toBe(true);
            expect(predicate(item("sword"))).toBe(false);
        });
    });

    it("leaves the table alone without initialName", () => {
        const filter = vi.fn();
        render(
            <SearchGroup
                filter={filter}
                resetFilter={vi.fn()}
                filterClass={eApiClass.Item}
                tagList={[]}
            />
        );
        expect(filter.mock.lastCall?.[0](item("sword"))).toBe(true);
    });

    /** Chips are stored lowercase, "_" stands for a number, and the tags may appear in any order. */
    it("filters by tag chips", async () => {
        const filter = vi.fn();
        const { container } = render(
            <SearchGroup
                filter={filter}
                resetFilter={vi.fn()}
                filterClass={eApiClass.Item}
                tagList={["MONSTER", "range _", "weapon"]}
            />
        );
        fireEvent.click(container.querySelector("svg")!);
        fireEvent.click(await screen.findByRole("button", { name: "monster" }));
        fireEvent.click(screen.getByRole("button", { name: "range _" }));

        await waitFor(() => {
            const predicate = filter.mock.lastCall?.[0];
            expect(predicate(item("bow", "weapon, range 12, MONSTER"))).toBe(true);
            expect(predicate(item("claw", "MONSTER, weapon"))).toBe(false);
            expect(predicate(item("monster range 3", "weapon"))).toBe(false);
        });
    });

    it("matches a capitalized name", async () => {
        const filter = vi.fn();
        const { container } = render(
            <SearchGroup
                filter={filter}
                resetFilter={vi.fn()}
                filterClass={eApiClass.Item}
            />
        );
        fireEvent.click(container.querySelector("svg")!);
        fireEvent.change(await screen.findByPlaceholderText("Feather"), { target: { value: "Dagger" } });

        await waitFor(() => expect(filter.mock.lastCall?.[0](item("dagger"))).toBe(true));
        expect(filter.mock.lastCall?.[0](item("sword"))).toBe(false);
    });
});
