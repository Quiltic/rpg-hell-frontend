import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import FilterListbox from "./FilterListbox";

const options = ["any", "common", "rare"];

function setup(value: string) {
    const onChange = vi.fn();
    render(
        <FilterListbox
            label="Rarity"
            options={options}
            value={value}
            onChange={onChange}
        />
    );
    return onChange;
}

describe("FilterListbox", () => {
    it("shows the label and the current value", () => {
        setup("common");
        expect(screen.getByText("Rarity")).toBeInTheDocument();
        expect(screen.getByRole("button")).toHaveTextContent("common");
        expect(screen.queryByRole("option")).not.toBeInTheDocument();
    });

    it("lists the options when opened and reports the picked one", () => {
        const onChange = setup("any");
        fireEvent.click(screen.getByRole("button"));
        expect(screen.getAllByRole("option")).toHaveLength(3);
        fireEvent.click(screen.getByRole("option", { name: "rare" }));
        expect(onChange).toHaveBeenCalledWith("rare");
    });
});
