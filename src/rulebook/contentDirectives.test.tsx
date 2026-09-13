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
        expect(items).toHaveLength(3);
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
        expect(items).toHaveLength(10);
        expect(items[0].querySelector("p")).not.toBeNull();
        expect(c.querySelector("#key-item-on-hit strong em")?.textContent).toBe(
            "On Hit"
        );
        expect(c.querySelector("#key-item-reaching-x")).not.toBeNull();
    });

    it("keeps a key and an effect with the same name apart by id", () => {
        const c = renderMd(
            '::keys{source="spell" name="focus"}\n\n::effects{name="focus"}'
        );
        expect(c.querySelector("#key-spell-focus")).not.toBeNull();
        expect(c.querySelector("#effect-focus")).not.toBeNull();
    });

    it("registers a directive for every glossary source", () => {
        const c = renderMd('::effects{name="burn"}\n\n::keys{name="side"}');
        expect(c.querySelector("#effect-burn")).not.toBeNull();
        expect(c.querySelector("#key-item-side")).not.toBeNull();
    });

    it("fails loud for an unknown source", () => {
        const c = renderMd('::keys{source="creature"}');
        expect(c.querySelector("li")).toBeNull();
        expect(c.textContent).toBe('[keys: no entries for source="creature"]');
    });
});
