import core_rules from "../../../assets/RulebookFiles/markdown/core_rules.md";
import MarkdownRenderer from "../../../util/MarkdownRenderer";
import RulebookNavigation from "../RulebookNav";

export default function CoreRulesPage() {
    return (
        <>
            <RulebookNavigation />
            <MarkdownRenderer markdown={core_rules as string} />
        </>
    );
}
