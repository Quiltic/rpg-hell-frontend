// import { PinIcon, RemoveIcon } from "../../assets/IconSVGs/heroiconsSVG";
import { Spell, Trait, Item, Creature } from "../../client";
import { createItemLines, createTraitLines, dictionaryItems, sumTags, upgradeItem } from "../../util/creatureHelpers";
import { getNames } from "../../util/tableTools";

import { toPillElement } from "../../util/textFormatting";
// import { Button } from "../ui/Button/Button";

type Props = {
    displayedCreature: Creature;
    traitsList: Array<Trait>;
    spellsList: Array<Spell>;
    itemsList: Array<Item>;
};

export default function CreatureSheet({
    displayedCreature: displayedCreature,
    traitsList: traitsList,
    spellsList: spellsList,
    itemsList: itemsList,
}: Props) {


    const stats = toPillElement(
        `Body ${displayedCreature.body},Mind ${displayedCreature.mind},Soul ${displayedCreature.soul}`,
        ","
    );
    const skills = toPillElement(
        `Arcana ${displayedCreature.arcana},Charm ${displayedCreature.charm},Crafting ${displayedCreature.crafting}`,
        ","
    );
    const skills2 = toPillElement(
        `Nature ${displayedCreature.nature},Medicine ${displayedCreature.medicine},Thieving ${displayedCreature.thieving}`,
        ","
    );
    const race = displayedCreature.race?.toString().split(";|;").join(", ");

    
    const traits = getNames(displayedCreature.traits, traitsList) as Trait[];
    const spells = getNames(displayedCreature.arts, spellsList) as Spell[];
    let items = dictionaryItems(getNames(displayedCreature.items, itemsList) as Item[]);

    items = upgradeItem(items, displayedCreature.augments);

    
    let bonus = (displayedCreature.traits.includes("hearty") ? displayedCreature.body : 0);
    let soulStrain = (displayedCreature.soul*4 + displayedCreature.mind*3 + displayedCreature.body*2) //(displayedCreature.traits.includes("mental mage") ? displayedCreature.soul*4 : displayedCreature.soul*3);
    
    if (displayedCreature.traits.includes("blood magic")) {
        bonus += soulStrain;
        soulStrain = 0;
    };
    
    const health = Math.ceil(
        displayedCreature.level +
        displayedCreature.body * 4 +
        displayedCreature.mind * 3 +
        displayedCreature.soul * 2 +
        bonus
    );
    
    const itemTags = sumTags(items);
    
    const armor = ("armor" in itemTags ? itemTags["armor"]*displayedCreature.level : 0) + ("heavy armor" in itemTags ? itemTags["heavy armor"]*displayedCreature.level + 4*displayedCreature.body + 3*displayedCreature.mind : 0) + ("medium armor" in itemTags ? itemTags["medium armor"]*displayedCreature.level + 2*displayedCreature.body + 2*displayedCreature.mind : 0);
    const ward = ("ward" in itemTags ? itemTags["ward"] : 0);
    const dodge = ("dodge" in itemTags ? itemTags["dodge"] : 0);
    
    bonus = ("speed" in itemTags ? itemTags["speed"] : 0) + (displayedCreature.traits.includes("quick runner") ? 1 : 0);
    const speed = + 6 + bonus;
    
    
    let [activeLines, passiveLines, itemLines] = createItemLines(items);

    createTraitLines(traits,activeLines,passiveLines);
    
    let spellLines = [
        ...spells.map((s) => {
            return `${s.name.toUpperCase()} - ${s.level} - ${"#".repeat(s.dice ?? 1) ?? "P"}\n${s.effect}\n`;
        }),
    ];
    if (spellLines.length > 0) {
        if (spellLines[0].includes('Object "" not found.')) {
            spellLines = [];
        }
    }

    return (
        <div className="flex flex-col m-5 p-4 dark:bg-dark-400 rounded-md">
            <div className="flex justify-between mb-3">
                <div className="name capitalize font-bold">{displayedCreature.name}</div>
                <div className="level">LEVEL: {displayedCreature.level}</div>
            </div>
            <div className="mb-3 capitalize">Types: {race}</div>

            <div className="flex flex-row justify-between">

                <div className="col-span-2 bg-body/10 dark:bg-dark-300 p-3 rounded-md flex-wrap ">
                    <div className="flex flex-row capitalize gap-1 items-center">
                        {stats}
                    </div>
                    <div className="flex flex-row capitalize gap-1 items-center">
                        {skills}
                    </div>
                    <div className="flex flex-row capitalize gap-1 items-center">
                        {skills2}
                    </div>
                </div>

                <div className="flex flex-col mb-3 dark:bg-dark-300 p-3 rounded-md">
                    
                    <div>MAX HEALTH: {health}</div>

                    { armor > 0 &&
                    <div>ARMOR: {armor}</div>
                    }
                    { dodge > 0 &&
                    <div>DODGE: {dodge}</div>
                    }
                    { ward > 0 &&
                    <div>WARD: {ward}</div>
                    }
                </div>

                <div className="flex flex-col mb-3 dark:bg-dark-300 p-3 rounded-md">
                    <div>SPEED: {speed}</div>
                    { displayedCreature.traits.includes("swimmer") &&
                    <div>Can Swim</div>
                    }
                    {displayedCreature.traits.includes("climber") &&
                    <div>Can Climb</div>
                    }
                    {displayedCreature.traits.includes("flight") &&
                    <div>Can Fly</div>
                    }
                </div>

            </div>
            <div className="mb-3">
                <div className="font-bold mb-1">ACTIVES</div>
                <div className="flex justify-between mb-1 flex-grow p-4 bg-body/10 dark:bg-dark-300 whitespace-pre-wrap overflow-y-auto">
                    {activeLines.join("\n")}
                </div>
            </div>

            { passiveLines.length != 0 &&
                <div className="mb-3">
                    <div className="font-bold mb-1">PASSIVES</div>
                    <div className="flex justify-between mb-1 flex-grow p-4 bg-body/10 dark:bg-dark-300 whitespace-pre-wrap overflow-y-auto">
                        {passiveLines.join("\n")}
                    </div>
                </div>
            }

            { itemLines.length != 0 &&
                <div className="mb-3">
                    <div className="font-bold mb-1">ITEMS</div>
                    <div className="flex justify-between mb-1 flex-grow p-4 bg-body/10 dark:bg-dark-300 whitespace-pre-wrap overflow-y-auto">
                        {itemLines.join("\n")}
                    </div>
                </div>
            }
            
            { spellLines.length != 0 &&
                <div className="mb-3">
                    <div className="flex flex-row justify-between"> 
                        <div className="font-bold mb-1">ARTS</div>
                        <div className="font-bold mb-1">MAX STRAIN: {soulStrain}</div>
                    </div>
                    <div className="flex justify-between mb-1 flex-grow p-4 bg-body/10 dark:bg-dark-300 whitespace-pre-wrap overflow-y-auto">
                        {spellLines.join("\n")}
                    </div>
                </div>
            }

            
            
                { displayedCreature.notes != "" &&
                    <>
                        <div className="font-bold mb-1">NOTES</div>
                        <div className="flex justify-between mb-1 flex-grow p-4 bg-body/10 dark:bg-dark-300 whitespace-pre-wrap overflow-y-auto">
                            {displayedCreature.notes}
                        </div>
                    </>
                } 
            
        </div>
    );
}
