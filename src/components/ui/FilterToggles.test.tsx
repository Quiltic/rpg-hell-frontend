import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import FilterToggles from "./FilterToggles";

const options = ["weapon", "armor", "tool"];

function setup(selected: string[]) {
    const onChange = vi.fn();
    render(
        <FilterToggles
            options={options}
            selected={selected}
            onChange={onChange}
        />
    );
    return onChange;
}

describe("FilterToggles", () => {
    it("lights All only when nothing is selected", () => {
        setup([]);
        expect(screen.getByRole("button", { name: "All" })).toHaveAttribute("aria-pressed", "true");
        expect(screen.getByRole("button", { name: "weapon" })).toHaveAttribute("aria-pressed", "false");
    });

    it("adds a toggle to the ones already on", () => {
        const onChange = setup(["weapon"]);
        expect(screen.getByRole("button", { name: "All" })).toHaveAttribute("aria-pressed", "false");
        expect(screen.getByRole("button", { name: "weapon" })).toHaveAttribute("aria-pressed", "true");
        fireEvent.click(screen.getByRole("button", { name: "armor" }));
        expect(onChange).toHaveBeenCalledWith(["weapon", "armor"]);
    });

    it("turns a selected toggle off", () => {
        const onChange = setup(["weapon", "armor"]);
        fireEvent.click(screen.getByRole("button", { name: "weapon" }));
        expect(onChange).toHaveBeenCalledWith(["armor"]);
    });

    it("clears every toggle from All", () => {
        const onChange = setup(["weapon", "armor"]);
        fireEvent.click(screen.getByRole("button", { name: "All" }));
        expect(onChange).toHaveBeenCalledWith([]);
    });
});
