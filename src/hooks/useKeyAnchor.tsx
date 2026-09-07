import { useLocation } from "react-router-dom";

// The two prefixes remarkContentDirectives gives key list items, via
// contentDirectives.ts `idOf`. See util/contentDirectives.ts.
export type KeyAnchorPrefix = "key-item-" | "key-spell-";

export type KeyAnchorState = {
    defaultOpen: boolean;
    remountKey: string;
};

// Pure half, so it can be tested without a router.
export function keyAnchorState(
    hash: string,
    prefix: KeyAnchorPrefix
): KeyAnchorState {
    const anchor = hash.replace(/^#/, "");
    const matches = anchor.startsWith(prefix);

    return { defaultOpen: matches, remountKey: matches ? anchor : "closed" };
}

// The spell and item key lists live inside a collapsed <Disclosure>, which
// unmounts its panel, so /rulebook/items#key-item-on-hit would otherwise scroll
// to nothing. This returns the two props that open it for a matching hash.
//
// `remountKey` exists because Disclosure reads `defaultOpen` only on mount and
// @headlessui/react 1.7 gives it no controlled `open` prop. Without it the
// same-page case fails: following a tooltip's link while already on this page
// changes the hash but not the route, so nothing remounts and the panel stays
// shut. Changing the key remounts the Disclosure open.
//
// Scrolling needs no code here. Opening the panel mounts a fresh
// MarkdownRenderer, which already scrolls to location.hash once its markdown
// has loaded.
export function useKeyAnchor(prefix: KeyAnchorPrefix): KeyAnchorState {
    const { hash } = useLocation();
    return keyAnchorState(hash, prefix);
}
