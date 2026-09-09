import combat from "../../../assets/RulebookFiles/markdown/combat.md";
import MarkdownRenderer from "../../../rulebook/MarkdownRenderer";
import RulebookNavigation from "../RulebookNav";

export default function CombatPage() {
    return (
        <>
            <RulebookNavigation />
            <MarkdownRenderer markdown={combat as string} />
        </>
    );
}
