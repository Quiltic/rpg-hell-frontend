import intro from "../../../assets/RulebookFiles/markdown/intro.md";
import MarkdownRenderer from "../../../util/MarkdownRenderer";
import RulebookNavigation from "../RulebookNav";

export default function IntroPage() {
    return (
        <>
            <RulebookNavigation />
            <MarkdownRenderer markdown={intro as string} />
        </>
    );
}
