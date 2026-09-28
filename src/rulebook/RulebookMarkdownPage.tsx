import { useSearchParams } from "react-router-dom";
import RulebookNavigation from "../components/RulebookPages/RulebookNav";
import MarkdownRenderer from "./render/MarkdownRenderer";
import { RulebookPageSlug, markdownFor } from "./pages";

export default function RulebookMarkdownPage({ slug }: { slug: RulebookPageSlug }) {
    const markdown = markdownFor(slug);
    const [searchParams] = useSearchParams();
    if (markdown === undefined) {
        throw new Error(`rulebook page "${slug}" has no markdown file`);
    }
    return (
        <>
            <RulebookNavigation />
            <MarkdownRenderer
                markdown={markdown}
                highlightQuery={searchParams.get("q") ?? undefined}
            />
        </>
    );
}
