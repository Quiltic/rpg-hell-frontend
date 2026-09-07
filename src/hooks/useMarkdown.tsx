import { useEffect, useState } from "react";
import { Heading } from "../types/Heading";
import { extractHeadings } from "../util/MarkdownHeaderParsing";

// Fetches a rulebook .md url and pulls its headings out for the jump-to nav.
export default function useMarkdown(md: string) {
    const [markdown, setMarkdown] = useState("");
    const [headings, setHeadings] = useState<Heading[]>([]);

    useEffect(() => {
        fetch(md)
            .then((res) => res.text())
            .then((text) => setMarkdown(text));
    }, [md]);

    useEffect(() => {
        if (markdown) {
            setHeadings(extractHeadings(markdown));
        }
    }, [markdown]);

    return { markdown, headings };
}
