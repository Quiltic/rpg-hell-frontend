import React, { useEffect, useState } from "react";
import { formatEffectString } from "../util/textFormatting";
import { Heading } from "../types/Heading";
import { extractHeadings } from "../util/MarkdownHeaderParsing";

// import md from "../assets/markdown/md"
export default function useMarkdown(md: string) {
    const [rawMarkdown, setRawMarkdown] = useState("");
    const [formattedMarkdown, setFormattedMarkdown] = useState("");
    const [headings, setHeadings] = useState<Heading[]>([]);

    useEffect(() => {
        fetch(md)
            .then((res) => res.text())
            .then((text) => setRawMarkdown(text));
    }, [md]);

    useEffect(() => {
        setFormattedMarkdown(formatEffectString(rawMarkdown));
    }, [rawMarkdown]);

    useEffect(() => {
        if (formattedMarkdown) {
            const extracted = extractHeadings(formattedMarkdown);
            setHeadings(extracted);
        }
    }, [formattedMarkdown]);

    // add glossary formatter here

    return { formattedMarkdown, rawMarkdown, headings };
}
