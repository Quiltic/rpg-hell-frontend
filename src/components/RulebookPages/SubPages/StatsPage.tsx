import stats from "../../../assets/RulebookFiles/markdown/stats.md";
import MarkdownRenderer from "../../../util/MarkdownRenderer";
import RulebookNavigation from "../RulebookNav";

export default function StatsPage() {
    return (
        <>
            <RulebookNavigation />
            <MarkdownRenderer markdown={stats as string} />
        </>
    );
}
