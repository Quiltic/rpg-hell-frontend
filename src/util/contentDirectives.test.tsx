import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render } from "@testing-library/react";
import Markdown from "react-markdown";
import remarkDirective from "remark-directive";
import rehypeRaw from "rehype-raw";
import { contentDirectives } from "./contentDirectives";

function renderMd(markdown: string) {
    return render(
        <Markdown
            remarkPlugins={[remarkDirective, contentDirectives]}
            rehypePlugins={[rehypeRaw]}
        >
            {markdown}
        </Markdown>
    ).container;
}

describe("::keys", () => {
    beforeEach(() => {
        vi.spyOn(console, "warn").mockImplementation(() => {});
    });
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("renders the spell key as a tight list", () => {
        const c = renderMd('::keys{source="spell" tight}');
        const items = c.querySelectorAll("li");
        expect(items).toHaveLength(4);
        expect(items[0].id).toBe("key-spell-reaction");
        // tight: no <p> inside the <li>
        expect(items[0].querySelector("p")).toBeNull();
        expect(items[0].querySelector("strong em")?.textContent).toBe(
            "Reaction"
        );
    });

    it("renders the item key as a loose list", () => {
        const c = renderMd('::keys{source="item"}');
        const items = c.querySelectorAll("li");
        expect(items).toHaveLength(11);
        expect(items[0].querySelector("p")).not.toBeNull();
        expect(c.querySelector("#key-item-on-hit strong em")?.textContent).toBe(
            "On Hit"
        );
        expect(c.querySelector("#key-item-reaching-x")).not.toBeNull();
    });

    it("keeps the item Glow separate from the effect Glow", () => {
        const c = renderMd(
            '::keys{source="item" name="glow"}\n\n::effects{name="glow"}'
        );
        expect(c.querySelector("#key-item-glow")?.textContent).toMatch(
            /illuminate/
        );
        expect(c.querySelector("#effect-glow")?.textContent).toMatch(
            /emit light/
        );
    });

    it("fails loud for an unknown source", () => {
        const c = renderMd('::keys{source="creature"}');
        expect(c.querySelector("li")).toBeNull();
        expect(c.textContent).toBe('[keys: no entries for source="creature"]');
    });
});
