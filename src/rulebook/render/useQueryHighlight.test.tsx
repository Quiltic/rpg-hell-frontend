import { render } from "@testing-library/react";
import { useRef } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useQueryHighlight } from "./useQueryHighlight";

function Page({ query, text }: { query: string | null; text: string }) {
    const root = useRef<HTMLDivElement>(null);
    useQueryHighlight(root, query, text);
    return (
        <div ref={root}>
            <p>{text}</p>
        </div>
    );
}

const marks = (container: HTMLElement) => [...container.querySelectorAll("mark.search-query")];

/** jsdom has no CSS.highlights, so these run the mark fallback unless a test stubs the API. */
describe("useQueryHighlight", () => {
    afterEach(() => vi.unstubAllGlobals());

    it("marks every occurrence, whatever its case", () => {
        const { container } = render(
            <Page
                query="cover"
                text=" Cover is good. Take cover. "
            />
        );
        expect(marks(container).map((m) => m.textContent)).toEqual(["Cover", "cover"]);
        expect(container.textContent).toBe(" Cover is good. Take cover. ");
    });

    it("marks each word of the query and skips words under two letters", () => {
        const { container } = render(
            <Page
                query="a half-cover"
                text="a half of cover"
            />
        );
        expect(marks(container).map((m) => m.textContent)).toEqual(["half", "cover"]);
    });

    /** The words alone would leave the 's between them untinted. */
    it("marks the whole phrase as one span where it appears as written", () => {
        const { container } = render(
            <Page
                query="death's door"
                text="At Death’s Door you die. The door is shut."
            />
        );
        expect(marks(container).map((m) => m.textContent)).toEqual(["Death’s Door", "door"]);
    });

    /** "cover" sits inside "covering"; wrapping both would nest or throw. */
    it("keeps one mark where two words of the query overlap", () => {
        const { container } = render(
            <Page
                query="covering cover"
                text="covering fire from cover"
            />
        );
        expect(marks(container).map((m) => m.textContent)).toEqual(["covering", "cover"]);
    });

    it("leaves the text nodes as they were after the query goes away", () => {
        const { container, rerender } = render(
            <Page
                query="cover"
                text="Take cover now."
            />
        );
        rerender(
            <Page
                query={null}
                text="Take cover now."
            />
        );
        const p = container.querySelector("p");
        expect(marks(container)).toHaveLength(0);
        expect(p?.childNodes).toHaveLength(1);
        expect(p?.textContent).toBe("Take cover now.");
    });

    it("stops at 200 marks", () => {
        const { container } = render(
            <Page
                query="ab"
                text={"ab ".repeat(300)}
            />
        );
        expect(marks(container)).toHaveLength(200);
    });

    /** surroundContents leaves a range selecting the mark, whose start container would be the paragraph, not the text. */
    it("returns ranges inside each mark, in document order", () => {
        let found = { current: [] as Range[] };
        function Probe() {
            const root = useRef<HTMLDivElement>(null);
            found = useQueryHighlight(root, "cover", "x");
            return (
                <div ref={root}>
                    <p>Cover is good.</p>
                    <p>Take cover.</p>
                </div>
            );
        }
        const { container } = render(<Probe />);
        expect(found.current.map((r) => r.startContainer)).toEqual(marks(container));
        expect(found.current.map((r) => r.startContainer.parentElement?.tagName)).toEqual(["P", "P"]);
    });

    it("does nothing for an empty query", () => {
        const { container } = render(
            <Page
                query=" "
                text="Take cover."
            />
        );
        expect(marks(container)).toHaveLength(0);
    });

    it("uses the CSS Highlight API when the browser has it", () => {
        const highlights = new Map<string, { ranges: Range[] }>();
        vi.stubGlobal("CSS", { highlights });
        vi.stubGlobal(
            "Highlight",
            class {
                ranges: Range[];
                constructor(...ranges: Range[]) {
                    this.ranges = ranges;
                }
            }
        );
        const { container, unmount } = render(
            <Page
                query="cover"
                text="Cover is good. Take cover."
            />
        );

        expect(highlights.get("search-query")?.ranges).toHaveLength(2);
        expect(marks(container)).toHaveLength(0);

        unmount();
        expect(highlights.has("search-query")).toBe(false);
    });
});
