import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import ItemsTablePage from "./ItemsTablePage";

describe("ItemsTablePage", () => {
    it("filters the table to ?q=", async () => {
        render(
            <MemoryRouter initialEntries={["/rulebook/items?q=dagger"]}>
                <ItemsTablePage />
            </MemoryRouter>
        );

        await waitFor(() => expect(screen.queryByRole("cell", { name: /^fist$/i })).not.toBeInTheDocument());
        expect(screen.getAllByRole("cell", { name: /^dagger$/i }).length).toBeGreaterThan(0);
    });
});
