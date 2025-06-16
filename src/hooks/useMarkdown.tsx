import { useEffect, useState } from "react";
import { formatEffectString } from "../util/textFormatting";

// import md from "../assets/markdown/md"
export default function useMarkdown(md: string) {
    const [rawMarkdown, setRawMarkdown] = useState("");
    const [formattedMarkdown, setFormattedMarkdown] = useState("");

    useEffect(() => {
        fetch(md)
            .then((res) => res.text())
            .then((text) => setRawMarkdown(text));
    }, [md]);

    useEffect(() => {
        setFormattedMarkdown(formatEffectString(rawMarkdown));
    }, [rawMarkdown]);

    // Add a turn string into array of the header strings to be anchorAref'd

    // add glossary formatter here

    return { formattedMarkdown, rawMarkdown };
}
