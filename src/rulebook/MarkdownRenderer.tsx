import React, { useEffect, useMemo } from "react";
import useMarkdown from "./useMarkdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkDirective from "remark-directive";
import { contentDirectives } from "./contentDirectives";
import { remarkHighlightKeywords } from "./remarkHighlightKeywords";
import Markdown from "react-markdown";
import HeadingJumpTo from "./HeadingJumpTo";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const flatten = (text: string, child: any) => {
    return typeof child === "string"
        ? text + child
        : React.Children.toArray(child.props.children).reduce(flatten, text);
};

type markdownRendererProps = {
    markdown: string;
    have_header?: boolean;
};

export default function MarkdownRenderer({
    markdown,
    have_header = true,
}: markdownRendererProps) {
    const { headings } = useMarkdown(markdown);

    const HeadingRenderer = useMemo(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        () => (props: any) => {
            const children = React.Children.toArray(props.children);
            const text = children.reduce(flatten, "");

            const headingData = headings.find((h) => h.text === text);
            const slug = headingData ? headingData.slug : undefined;

            return React.createElement(
                props.node.tagName,
                { id: slug },
                props.children
            );
        },
        [headings]
    );

    useEffect(() => {
        const anchor = window.location.hash.split("#")[1];
        const timer = setTimeout(() => {
            if (anchor) {
                const anchorEl = document.getElementById(anchor);
                if (anchorEl) {
                    anchorEl.scrollIntoView({ behavior: "smooth" });
                }
            }
        }, 100); // Wait for the markdown library to actually render the element
        return () => clearTimeout(timer);
    }, [markdown]);

    return (
        <div className="markdown-styles mx-auto max-w-4xl break-inside-avoid text-left">
            {have_header && <HeadingJumpTo headings={headings} />}

            <Markdown
                remarkPlugins={[
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
                        <ul className="md_list" {...props} />
                    ),
                }}
            >
                {markdown}
            </Markdown>
        </div>
    );
}
