import character_examples from "../../../assets/RulebookFiles/markdown/character_examples.md";
import MarkdownRenderer from "../../../util/MarkdownRenderer";
import RulebookNavigation from "../RulebookNav";

export default function CharacterExamplesPage() {
    return (
        <>
            <RulebookNavigation />
            <MarkdownRenderer markdown={character_examples as string} />
        </>
    );
}
