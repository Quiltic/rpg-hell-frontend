import RulebookNavigation from "./RulebookNav";

import intro from "../../assets/RulebookFiles/markdown/intro.md";
import MarkdownRenderer from "../../util/MarkdownRenderer";

export default function RulebookPage() {
    return (
        <>
            <RulebookNavigation />

            <MarkdownRenderer markdown={intro as string} />
        </>
    );
}
