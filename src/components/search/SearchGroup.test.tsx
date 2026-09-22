import { render, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { ApiClassUnion } from "../../types/ApiClassUnions";
import { eApiClass } from "../../types/ApiClassUnions";
import SearchGroup from "./SearchGroup";

const item = (name: string) => ({ name, effect: "", tags: "" }) as ApiClassUnion;

describe("SearchGroup", () => {
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
});
