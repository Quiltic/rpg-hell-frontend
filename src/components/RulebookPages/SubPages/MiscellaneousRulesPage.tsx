import mysc_rules from "../../../assets/RulebookFiles/markdown/mysc_rules.md";
import MarkdownRenderer from "../../../rulebook/MarkdownRenderer";
import RulebookNavigation from "../RulebookNav";

export default function MiscellaneousRulesPage() {
    return (
        <>
            <RulebookNavigation />
            <MarkdownRenderer markdown={mysc_rules as string} />
        </>
    );
}
