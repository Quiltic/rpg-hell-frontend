import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Pill from "./Pill";

describe("Pill", () => {
    it("renders its label and appends the color class", () => {
        render(<Pill colorClassName="bg-body">body 1</Pill>);

        const pill = screen.getByText("body 1");
        expect(pill).toBeInTheDocument();
        expect(pill).toHaveClass("bg-body");
    });
});
