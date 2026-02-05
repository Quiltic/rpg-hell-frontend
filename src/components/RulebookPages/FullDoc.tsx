import RulebookNavigation from "./RulebookNav";

import intro from "../../assets/RulebookFiles/markdown/intro.md";
import core from "../../assets/RulebookFiles/markdown/core_rules.md";
import combat from "../../assets/RulebookFiles/markdown/combat.md";
import char_creation from "../../assets/RulebookFiles/markdown/character_creation.md";
import effects from "../../assets/RulebookFiles/markdown/effects.md";
import mysc from "../../assets/RulebookFiles/markdown/mysc_rules.md";
import gm from "../../assets/RulebookFiles/markdown/for_gms.md";
// import traitKey from "../../assets/RulebookFiles/markdown/trait_key.md";
import artKey from "../../assets/RulebookFiles/markdown/spell_key.md";
import itemKey from "../../assets/RulebookFiles/markdown/item_key.md";
// import creatureKey from "../../assets/RulebookFiles/markdown/creature_key.md";

import MarkdownRenderer from "../../util/MarkdownRenderer";
import { useTraits } from "../../hooks/useTraits";
import { useItems } from "../../hooks/useItems";
import { useSpells } from "../../hooks/useSpells";
// import { useCreatures } from "../../hooks/useCreatures";
import TraitCardHolder from "../TraitsPages/TraitCardStuff/traitCardHolder";
import SpellCardHolder from "../SpellsPages/SpellCardStuff/artCardHolder";
import ItemCardHolder from "../ItemPages/ItemCardStuff/itemCardHolder";


export default function FullDoc() {

    const {
        displayedTraits
    } = useTraits();

    const {
        displayedSpells
    } = useSpells();
    
    const {
        displayedItems
    } = useItems();

    // const {
    //     displayedCreatures
    // } = useCreatures();

    return (
        <>
            <RulebookNavigation />
            <MarkdownRenderer markdown={intro as string} have_header={false} />
            <MarkdownRenderer markdown={core as string} have_header={false} />
            <MarkdownRenderer markdown={combat as string} have_header={false} />
            <MarkdownRenderer markdown={char_creation as string} have_header={false} />
            <MarkdownRenderer markdown={effects as string} have_header={false} />
            <MarkdownRenderer markdown={mysc as string} have_header={false} />
            <MarkdownRenderer markdown={gm as string} have_header={false} />

            <div className="break-inside-avoid">
                <h1>Traits</h1>
                {/* <MarkdownRenderer markdown={traitKey as string} have_header={false} /> */}
                <TraitCardHolder shownTraits={displayedTraits} header={""} subNotes={[]}></TraitCardHolder>
            </div>
            
            <div className="break-inside-avoid">
                <h1>Arts</h1>
                <MarkdownRenderer markdown={artKey as string} have_header={false} />
                <SpellCardHolder shownSpells={displayedSpells}></SpellCardHolder>
            </div>

            <div className="break-inside-avoid">
                <h1>Items</h1>
                <MarkdownRenderer markdown={itemKey as string} have_header={false} />
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
