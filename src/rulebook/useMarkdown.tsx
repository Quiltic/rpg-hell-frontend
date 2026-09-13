import { useMemo } from "react";
import { Heading, extractHeadings } from "./headings";

export default function useMarkdown(markdown: string): { headings: Heading[] } {
    const headings = useMemo(() => extractHeadings(markdown), [markdown]);
    return { headings };
}
