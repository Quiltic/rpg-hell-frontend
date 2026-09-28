import React, { useEffect, useMemo, useRef } from "react";
import useMarkdown from "./useMarkdown";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import rehypeRaw from "rehype-raw";
import remarkDirective from "remark-directive";
import { contentDirectives } from "./contentDirectives";
import { remarkHighlightKeywords } from "./remarkHighlightKeywords";
import Markdown from "react-markdown";
import HeadingJumpTo from "./HeadingJumpTo";
import { useLocation } from "react-router-dom";
import { useQueryHighlight } from "./useQueryHighlight";

const SCROLL_RETRY_FRAMES = 60;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const flatten = (text: string, child: any) => {
    return typeof child === "string"
        ? text + child
        : React.Children.toArray(child.props.children).reduce(flatten, text);
};

const HEADINGS = "h1, h2, h3, h4, h5, h6";

// the first highlight in the anchor's section, when the heading alone would leave it off screen
function firstHighlightBelowFold(anchorEl: HTMLElement, ranges: Range[]): Element | undefined {
    const follows = (a: Node, b: Node) => Boolean(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING);
    const range = ranges.find((r) => follows(anchorEl, r.startContainer) && !anchorEl.contains(r.startContainer));
    const element = range?.startContainer.parentElement;
    if (!element) return undefined;
    const nextHeading = [...document.querySelectorAll(HEADINGS)].find((h) => follows(anchorEl, h));
    if (nextHeading && !follows(element, nextHeading)) return undefined;
    const distance = element.getBoundingClientRect().top - anchorEl.getBoundingClientRect().top;
    return distance > window.innerHeight ? element : undefined;
}

type markdownRendererProps = {
    markdown: string;
    have_header?: boolean;
    highlightQuery?: string;
};

export default function MarkdownRenderer({ markdown, have_header = true, highlightQuery }: markdownRendererProps) {
    const { headings } = useMarkdown(markdown);
    const { hash } = useLocation();
    const root = useRef<HTMLDivElement>(null);
    const highlighted = useQueryHighlight(root, highlightQuery, markdown);

    const HeadingRenderer = useMemo(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        () => (props: any) => {
            const children = React.Children.toArray(props.children);
            const text = children.reduce(flatten, "");

            const headingData = headings.find((h) => h.text === text);
            const slug = headingData ? headingData.slug : undefined;

            return React.createElement(props.node.tagName, { id: slug }, props.children);
        },
        [headings]
    );

    useEffect(() => {
        const anchor = hash.slice(1);
        if (!anchor) return;
        let frame = 0;
        let attempts = 0;
        const tryScroll = () => {
            const anchorEl = document.getElementById(anchor);
            if (anchorEl) {
                (firstHighlightBelowFold(anchorEl, highlighted.current) ?? anchorEl).scrollIntoView({
                    behavior: "smooth",
                });
                return;
            }
            attempts += 1;
            if (attempts < SCROLL_RETRY_FRAMES) {
                frame = requestAnimationFrame(tryScroll);
            }
        };
        frame = requestAnimationFrame(tryScroll);
        return () => cancelAnimationFrame(frame);
    }, [markdown, hash, highlightQuery, highlighted]);

    return (
        <div
            ref={root}
            className="markdown-styles mx-auto max-w-4xl break-inside-avoid text-left"
        >
            {have_header && <HeadingJumpTo headings={headings} />}

            <Markdown
                remarkPlugins={[
                    remarkFrontmatter,
                    remarkGfm,
                    remarkDirective,
                    contentDirectives,
                    remarkHighlightKeywords,
                ]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    h1: HeadingRenderer,
                    h2: HeadingRenderer,
                    h3: HeadingRenderer,
                    h4: HeadingRenderer,
                    h5: HeadingRenderer,
                    h6: HeadingRenderer,
                    ul: ({ node, ...props }) => (
                        <ul
                            className="md_list"
                            {...props}
                        />
                    ),
                }}
            >
                {markdown}
            </Markdown>
        </div>
    );
}
