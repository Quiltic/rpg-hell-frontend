import React from "react";
import character_creation from "../../../assets/RulebookFiles/markdown/character_creation.md";
import MarkdownRenderer from "../../../util/MarkdownRenderer";
import RulebookNavigation from "../RulebookNav";

export default function CharacterCreationRulebookPage() {
    return (
        <>
            <RulebookNavigation />
            <MarkdownRenderer markdown={character_creation as string} />
        </>
    );
}
