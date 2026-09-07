import { Disclosure } from "@headlessui/react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { keyAnchorState, useKeyAnchor } from "./useKeyAnchor";

describe("keyAnchorState", () => {
    it("opens for a hash naming a key of that source", () => {
        expect(keyAnchorState("#key-item-on-hit", "key-item-")).toEqual({
            defaultOpen: true,
            remountKey: "key-item-on-hit",
        });
    });

    it("tolerates a hash without the leading #", () => {
        expect(keyAnchorState("key-spell-reaction", "key-spell-")).toEqual({
            defaultOpen: true,
            remountKey: "key-spell-reaction",
        });
    });

    it("stays closed for the other source's keys", () => {
        // The Items page must not open its panel for a spell key anchor.
        expect(keyAnchorState("#key-spell-reaction", "key-item-")).toEqual({
            defaultOpen: false,
            remountKey: "closed",
        });
    });

    it("stays closed for an effect anchor or no hash", () => {
        for (const hash of ["", "#effect-burn", "#some-heading"]) {
            expect(keyAnchorState(hash, "key-item-")).toEqual({
                defaultOpen: false,
                remountKey: "closed",
            });
        }
    });

    it("gives a different remountKey per anchor, so Disclosure remounts", () => {
        // Disclosure reads defaultOpen only on mount, so following a second
        // key link on the same page has to change the key to reopen it.
        const first = keyAnchorState("#key-item-bonus", "key-item-");
        const second = keyAnchorState("#key-item-side", "key-item-");
        expect(first.remountKey).not.toBe(second.remountKey);
    });

    it("uses the same ids contentDirectives generates", async () => {
        // Guards against the id scheme in contentDirectives.ts drifting away
        // from the prefixes this hook matches.
        const { keysSource } = await import("../util/contentDirectives");
        const { allKeys } = await import("./useKeys");

        for (const key of allKeys) {
            const id = keysSource.idOf(key);
            const prefix = key.source === "item" ? "key-item-" : "key-spell-";
            expect(keyAnchorState("#" + id, prefix).defaultOpen).toBe(true);
        }
    });
});

// The Items page in miniature: a Disclosure whose panel is unmounted while
// closed, opened from the hash exactly the way ItemsTablePage does it. This is
// here because the whole design rests on @headlessui/react 1.7 honouring
// `defaultOpen` on mount -- it has no controlled `open` prop to fall back on.
function KeyPanel() {
    const keyAnchor = useKeyAnchor("key-item-");

    return (
        <Disclosure
            key={keyAnchor.remountKey}
            defaultOpen={keyAnchor.defaultOpen}
        >
            <Disclosure.Button>Key</Disclosure.Button>
            <Disclosure.Panel>
                <p id="key-item-on-hit">
                    Applied if the target fails a Dodge roll.
                </p>
            </Disclosure.Panel>
        </Disclosure>
    );
}

function renderAt(entry: string) {
    return render(
        <MemoryRouter initialEntries={[entry]}>
            <KeyPanel />
        </MemoryRouter>
    );
}

describe("useKeyAnchor driving a Disclosure", () => {
    it("renders the panel open when the hash names one of its keys", () => {
        renderAt("/rulebook/items#key-item-on-hit");

        expect(screen.getByText(/fails a Dodge roll/)).toBeInTheDocument();
    });

    it("leaves the panel unmounted with no hash", () => {
        renderAt("/rulebook/items");

        expect(screen.queryByText(/fails a Dodge roll/)).toBeNull();
    });

    it("leaves the panel unmounted for another source's key", () => {
        renderAt("/rulebook/items#key-spell-reaction");

        expect(screen.queryByText(/fails a Dodge roll/)).toBeNull();
    });
});
