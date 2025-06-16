import for_gms from "../../../assets/RulebookFiles/markdown/for_gms.md";
import MarkdownRenderer from "../../../util/MarkdownRenderer";
import RulebookNavigation from "../RulebookNav";

export default function ForGMsPage() {
    return (
        <>
            <RulebookNavigation />
            <MarkdownRenderer markdown={for_gms as string} />
        </>
    );
}
