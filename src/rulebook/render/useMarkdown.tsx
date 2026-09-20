import { useMemo } from "react";
import { Heading, extractHeadings } from "../sections";

export default function useMarkdown(markdown: string): { headings: Heading[] } {
    const headings = useMemo(() => extractHeadings(markdown), [markdown]);
    return { headings };
}
