import combat from "../../../assets/RulebookFiles/markdown/combat.md";
import MarkdownRenderer from "../../../util/MarkdownRenderer";
import RulebookNavigation from "../RulebookNav";

export default function CombatPage() {
    return (
        <>
            <RulebookNavigation />
            <MarkdownRenderer markdown={combat as string} />
        </>
    );
}
