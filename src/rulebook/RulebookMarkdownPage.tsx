import RulebookNavigation from "../components/RulebookPages/RulebookNav";
import MarkdownRenderer from "./MarkdownRenderer";
import { RulebookPageSlug, markdownFor } from "./pages";

export default function RulebookMarkdownPage({
    slug,
}: {
    slug: RulebookPageSlug;
}) {
    const markdown = markdownFor(slug);
    if (markdown === undefined) {
        throw new Error(`rulebook page "${slug}" has no markdown file`);
    }
    return (
        <>
            <RulebookNavigation />
            <MarkdownRenderer markdown={markdown} />
        </>
    );
}
