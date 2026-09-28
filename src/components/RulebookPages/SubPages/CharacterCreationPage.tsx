import React from "react";
import character_creation from "../../../assets/RulebookFiles/markdown/character_creation.md";
import MarkdownRenderer from "../../../util/MarkdownRenderer";
import RulebookNavigation from "../RulebookNav";
import { download } from "../../../util/tableTools";
import { Button } from "../../ui/Button/Button";

import Character_Sheet from "../../../assets/Character Sheet V2.pdf"

export default function CharacterCreationRulebookPage() {
    return (
        <>
            <RulebookNavigation />

            <Button
                onClick={() =>
                    download(
                        Character_Sheet,
                        "Character_Sheet_V2.pdf",
                        "application/pdf"
                    )
                }
                variant="thieving"
            >
                Download Character Sheet
            </Button>
            <MarkdownRenderer markdown={character_creation as string} />
        </>
    );
}
