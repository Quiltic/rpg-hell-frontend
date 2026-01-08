import effects from "../../../assets/RulebookFiles/markdown/effects.md";
import MarkdownRenderer from "../../../util/MarkdownRenderer";
import RulebookNavigation from "../RulebookNav";

export default function EffectsPage() {
    return (
        <>
            <RulebookNavigation />
            <MarkdownRenderer markdown={effects as string} />
        </>
    );
}
