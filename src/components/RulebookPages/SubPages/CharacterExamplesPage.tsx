import { useState } from "react";
import character_examples from "../../../assets/RulebookFiles/markdown/character_examples.md";
import MarkdownRenderer from "../../../util/MarkdownRenderer";
import RulebookNavigation from "../RulebookNav";
import { useSpells } from "../../../hooks/useSpells";
import { useItems } from "../../../hooks/useItems";
import { useTraits } from "../../../hooks/useTraits";
import ExampleCharSheet from "../../CharacterSheet/InteractiveCharSheets/ExampleCharSheet";
import { Button } from "../../ui/Button/Button";
import example_char_sheets from "../../../assets/OfflineJsons/example_char_sheets.json"
import Tooltip from "../../ui/Tooltip";

const example_displayedCreature = {
        "name": "",
        "stats": {
            "body": 0,
            "mind": 0,
            "soul": 0,
            "arcana": 0,
            "crafting": 0,
            "charm": 0,
            "nature": 0,
            "medicine": 0,
            "thieving": 0
        },
        "items": "",
        "quick_exp": "",
        "level_explanation": ["","",""],
        "traits": [["",""],[""],[""]],
        "arts": [["","","",""],[""],[""]]
    }

export default function CharacterExamplesPage() {
    const [curCreature, setCurCreature] = useState( example_displayedCreature );

    const {
        displayedSpells
    } = useSpells();
    
    const {
        displayedItems
    } = useItems();

    const {
        displayedTraits
    } = useTraits();
    
    return (
        <div className="flex flex-col">
            {/* <RulebookNavigation /> */}

            {curCreature.name == "" &&
                <MarkdownRenderer markdown={character_examples as string} have_header={false} />
            }

            <div className="grid grid-cols-3 justify-between rounded-md bg-dark-400 m-2 p-2">
                {curCreature.name == "" && example_char_sheets.map((char, id) => {
                        return (
                        <Button key={id} variant={char.mainStat}
                            onClick={() => {setCurCreature(char)}}
                            className="m-2 p-2"
                        >
                            <Tooltip text={char.name} display={<div className="italic">{char.quick_exp}</div>}/>
                        </Button>
                    )})
                }
            </div>

            

            {curCreature.name != "" &&
            
                <div className="flex flex-col">
                    <Button variant={"thieving"}
                        onClick={() => {setCurCreature(example_displayedCreature)}}
                    >
                        Back
                    </Button>
                    <ExampleCharSheet 
                        _displayedCreature={curCreature} 
                        traits={displayedTraits.filter((t) => {return curCreature.traits.join(". ").includes(t.name)})}
                        arts={displayedSpells.filter((a) => {return curCreature.arts.join(". ").includes(a.name)})}
                        items={displayedItems.filter((i) => {return curCreature.items.split(". ").includes(i.name)})}
                    />
                </div>
            
            }
        </div>
    );
}


