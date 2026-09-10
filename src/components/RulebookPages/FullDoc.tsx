import RulebookNavigation from "./RulebookNav";

import MarkdownRenderer from "../../rulebook/MarkdownRenderer";
import { markdownFile, markdownFor } from "../../rulebook/pages";
import { useTraits } from "../../hooks/useTraits";
import { useItems } from "../../hooks/useItems";
import { useSpells } from "../../hooks/useSpells";
// import { useCreatures } from "../../hooks/useCreatures";
import TraitCardHolder from "../TraitsPages/TraitCardStuff/traitCardHolder";
import SpellCardHolder from "../SpellsPages/SpellCardStuff/artCardHolder";
import ItemCardHolder from "../ItemPages/ItemCardStuff/itemCardHolder";

export default function FullDoc() {
    const { displayedTraits } = useTraits();

    const { displayedSpells } = useSpells();

    const { displayedItems } = useItems();

    // const {
    //     displayedCreatures
    // } = useCreatures();

    return (
        <>
            <RulebookNavigation />
            <MarkdownRenderer
                markdown={markdownFor("intro")!}
                have_header={false}
            />
            <MarkdownRenderer
                markdown={markdownFor("core-rules")!}
                have_header={false}
            />
            <MarkdownRenderer
                markdown={markdownFor("combat")!}
                have_header={false}
            />
            <MarkdownRenderer
                markdown={markdownFor("character-creation")!}
                have_header={false}
            />
            <MarkdownRenderer
                markdown={markdownFor("effects")!}
                have_header={false}
            />
            <MarkdownRenderer
                markdown={markdownFor("misc-rules")!}
                have_header={false}
            />
            <MarkdownRenderer
                markdown={markdownFor("for-gms")!}
                have_header={false}
            />

            <div className="break-inside-avoid">
                <h1>Traits</h1>
                {/* <MarkdownRenderer markdown={traitKey as string} have_header={false} /> */}
                <TraitCardHolder
                    shownTraits={displayedTraits}
                    header={""}
                    subNotes={[]}
                ></TraitCardHolder>
            </div>

            <div className="break-inside-avoid">
                <h1>Arts</h1>
                <MarkdownRenderer
                    markdown={markdownFile("spell_key.md")}
                    have_header={false}
                />
                <SpellCardHolder
                    shownSpells={displayedSpells}
                ></SpellCardHolder>
            </div>

            <div className="break-inside-avoid">
                <h1>Items</h1>
                <MarkdownRenderer
                    markdown={markdownFile("item_key.md")}
                    have_header={false}
                />
                <ItemCardHolder shownItems={displayedItems}></ItemCardHolder>
            </div>

            {/* <div className="break-inside-avoid"> */}
            {/* <h1>Creatures</h1> */}
            {/* <MarkdownRenderer markdown={creatureKey as string} have_header={false} /> */}
            {/* <CreatureCardHolder shownItems={displayedCreatures}></CreatureCardHolder> */}
            {/* </div> */}
        </>
    );
}
