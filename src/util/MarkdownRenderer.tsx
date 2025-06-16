import React from "react";
import useMarkdown from "../hooks/useMarkdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Markdown from "react-markdown";
import HeadingRenderer from "../components/RulebookPages/headingRenderer";

type markdownRendererProps = {
    markdown: string;
};

export default function MarkdownRenderer({ markdown }: markdownRendererProps) {
    const { formattedMarkdown } = useMarkdown(markdown);

    return (
        <div className="markdown-styles mx-auto max-w-4xl text-left">
            <Markdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    h1: HeadingRenderer,
                    h2: HeadingRenderer,
                    h3: HeadingRenderer,
                    h4: HeadingRenderer,
                    h5: HeadingRenderer,
                    h6: HeadingRenderer,
                }}
            >
                {formattedMarkdown}
            </Markdown>
        </div>
    );
}
