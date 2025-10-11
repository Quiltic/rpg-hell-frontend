import { useState } from "react";
import { formatEffectString } from "../util/textFormatting";

// import md from "../assets/markdown/md"
export default function useMarkdown(md: string) {
    const [rawMarkdown, setMarkdown] = useState("");
    const [formattedMarkdown, setFormattedMarkdown] = useState("");

    fetch(md)
        .then((res) => res.text())
        .then((text) => setMarkdown(text));

    // add glossary formatter here
    setFormattedMarkdown(formatEffectString(rawMarkdown));

    return { formattedMarkdown, rawMarkdown };
}
