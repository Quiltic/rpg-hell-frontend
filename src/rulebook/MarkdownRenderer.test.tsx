import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, render } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import MarkdownRenderer from "./MarkdownRenderer";

const markdown = "# Combat\n\ntext\n\n## Cover\n\nmore\n\n## Initiative\n\nend\n";

const scrollIntoView = vi.fn();

function mount(url: string, text = markdown) {
    const router = createMemoryRouter([{ path: "/rulebook/combat", element: <MarkdownRenderer markdown={text} /> }], {
        initialEntries: [url],
    });
    const view = render(<RouterProvider router={router} />);
    return { router, ...view };
}

function scrolledIds(): string[] {
    return scrollIntoView.mock.contexts.map((el) => (el as HTMLElement).id);
}

beforeEach(() => {
    vi.useFakeTimers({
        toFake: ["requestAnimationFrame", "cancelAnimationFrame"],
    });
    scrollIntoView.mockClear();
    Element.prototype.scrollIntoView = scrollIntoView;
});

afterEach(() => {
    vi.useRealTimers();
});

describe("MarkdownRenderer frontmatter", () => {
    it("renders nothing for the frontmatter block", () => {
        const { container } = mount("/rulebook/combat", "---\ntitle: Combat\norder: 5\ntags: []\n---\n\n# Combat\n");
        expect(container.querySelector("hr")).toBeNull();
        expect(container.textContent).not.toContain("title: Combat");
        expect(container.querySelector("h1")?.id).toBe("combat");
    });
});

describe("MarkdownRenderer scrolling", () => {
    it("scrolls to the heading named by the hash once it is rendered", () => {
        mount("/rulebook/combat#cover");
        vi.advanceTimersToNextFrame();
        expect(scrolledIds()).toEqual(["cover"]);
    });

    /** Following a second result into the same page must scroll again. */
    it("scrolls again when only the hash changes", async () => {
        const { router } = mount("/rulebook/combat#cover");
        vi.advanceTimersToNextFrame();
        await act(() => router.navigate("/rulebook/combat#initiative"));
        vi.advanceTimersToNextFrame();
        expect(scrolledIds()).toEqual(["cover", "initiative"]);
    });

    it("does nothing without a hash", () => {
        mount("/rulebook/combat");
        vi.advanceTimersToNextFrame();
        vi.advanceTimersToNextFrame();
        expect(scrollIntoView).not.toHaveBeenCalled();
    });

    /** The element may appear a few frames after mount; keep looking. */
    it("retries until the element exists", () => {
        mount("/rulebook/combat#late");
        vi.advanceTimersToNextFrame();
        vi.advanceTimersToNextFrame();
        expect(scrollIntoView).not.toHaveBeenCalled();

        const late = document.createElement("div");
        late.id = "late";
        document.body.appendChild(late);
        vi.advanceTimersToNextFrame();
        expect(scrolledIds()).toEqual(["late"]);
        late.remove();
    });

    it("gives up after about a second", () => {
        mount("/rulebook/combat#never");
        for (let i = 0; i < 60; i++) vi.advanceTimersToNextFrame();

        const late = document.createElement("div");
        late.id = "never";
        document.body.appendChild(late);
        vi.advanceTimersToNextFrame();
        expect(scrollIntoView).not.toHaveBeenCalled();
        late.remove();
    });

    it("stops looking when unmounted", () => {
        const { unmount } = mount("/rulebook/combat#late");
        unmount();

        const late = document.createElement("div");
        late.id = "late";
        document.body.appendChild(late);
        vi.advanceTimersToNextFrame();
        expect(scrollIntoView).not.toHaveBeenCalled();
        late.remove();
    });
});
