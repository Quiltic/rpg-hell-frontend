import React, { useState, useEffect } from "react";
import { Button } from "../ui/Button/Button";
import json from "../../assets/OfflineJsons/traits.json";
import useApi from "../../hooks/useApi";
import { Creature, Item, Spell, Trait } from "../../client";
import { sortArrayByReqs } from "../../util/sortingTools";
import { formatEffectString, toPillElement } from "../../util/textFormatting";
import { getNames } from "../../util/tableTools";
import { createItemLines, createTraitLines, dictionaryItems, sumTags, upgradeItem } from "../../util/creatureHelpers";
import { useSpells } from "../../hooks/useSpells";
import { useTraits } from "../../hooks/useTraits";
import { useItems } from "../../hooks/useItems";
import { CreatureNew } from "../../client/models/CreatureNew";
import CleanCombobox from "./CleanCombobox";
import TraitCard from "../RulebookPages/TraitCardStuff/traitCard";
import { list } from "postcss";
import TraitCardHolder from "../RulebookPages/TraitCardStuff/traitCardHolder";


// const familiarBase = {
//                 "id": 0,
//                 "name": "familiar",
//                 "types": ["animal","construct","monstrosity","planar","undead"],
//                 "level": 1,
//                 "body": 0,
//                 "mind": 1,
//                 "soul": 1,
//                 "arcana": -1,
//                 "charm": -1,
//                 "crafting": -1,
//                 "medicine": -1,
//                 "nature": -1,
//                 "thieving": -1,
//                 "augments": [],
//                 "traits": "telepathy;|;hidyhole;|;movement choice 1",
//                 "arts": "",
//                 "items": "rending strike;|;light defense",
//                 "notes": "Type - This creature is of a chosen Type (Animal, Construct, Monstrosity, Planar, or Undead)\nThe familiar's level is the same as its summoners level.\nSoul, and all skills (Arcana, Charm, Crafting, Nature, Medicine, and Thieving) are equal to half the summoner's respective scores (rounded up)."
//             }

// const statSkillList = [
//     "Flight",
//     "Swimmer & Climber",
//     "Speedy",
// ];

const theBIGList = [
    {
        wantedLoneList: "rune maker;|;runic carver;|;arcane eyes;|;runic master",
        wantedComboList: "arcane armory;|;ingredient scavenger;|;scroll crafting;|;placeholder;|;potions of power;|;spell manipulator;|;placeholder;|;complex brews;|;spell augmenter;|;runic augmentation;|;double dosing;|;rune gate",
        headers: ["arcana","runeblade","alchemist","lore master"],
        subNotes: ["Manipulation of the world by use of magical Runes.","Manipulation of idk.","Creating and using potions.","Augmenting Arts in weird ways."],
    },
    {
        wantedLoneList: "placeholder;|;jackpot;|;first impression;|;universal language",
        wantedComboList: "fancy feet;|;apprentice detective;|;ventriloquism;|;the show must go on;|;trained detective;|;body possession;|;placeholder;|;heart to heart;|;stolen dreams;|;placeholder;|;master detective;|;puppet master",
        headers: ["charm","performer","detective","puppeteer"],
        subNotes: ["Talk and manipulate others.","Give people a good show, and gain buffs while doing it.","Solve crimes, even if the local guard dont like it.","Control people, figuratively and literally."],
    },
    {
        wantedLoneList: "steam suit;|;crafting genius;|;explosive expert;|;placeholder",
        wantedComboList: "flaming blow;|;turreted weapon;|;abjurer;|;reforge;|;overclock;|;spectral artillery;|;placeholder;|;holes in the armor;|;magical craftsman;|;smithing master;|;placeholder;|;placeholder",
        headers: ["crafting","blacksmith","clockworks","artificer"],
        subNotes: ["Create powerful contraptions from simple parts.","Hone weapons and armor.","Use advanced gears and gyros to do impossible feats.","Magic explosions and items, what more could you ask for?"],
    },
    {
        wantedLoneList: "natures friend;|;heightened scenses;|;placeholder;|;one with nature",
        wantedComboList: "nature's bind;|;hidden in the bush;|;animal form;|;canopy;|;marked as prey;|;elementalist adept;|;overgrowth;|;elemental shots;|;updraft;|;warden's grasp;|;master huntsman;|;magical beast form",
        headers: ["nature","warden","hunter","druid"],
        subNotes: ["Work with nature to improve yourself.","Become a guardian of the forest (and your allies).","Hunt down any prey no matter how far.","Harness natures elements and become the monsters you fear most."],
    },
    {
        wantedLoneList: "field medicine;|;trained medic;|;recycled meds;|;resuscitate",
        wantedComboList: "blood magic;|;medical leaches;|;if these walls could talk;|;bloody mess;|;acupuncture;|;curse ward;|;placeholder;|;plague doctor;|;undead tinkerer;|;placeholder;|;placeholder;|;undead king",
        headers: ["medicine","blood magic","strange healers","necromancer"],
        subNotes: ["Become the doctor you always wanted to be.","Using blood for spells and effects.","There is more than one way to heal.","Stop dealth in its tracks, one way or another."],
    },
    {
        wantedLoneList: "apprentice thief;|;cat burgler;|;hidden in plain sight;|;master thief",
        wantedComboList: "bully;|;concealed item;|;apprentice spell thief;|;larceny;|;silent strike;|;spell thief;|;get rough;|;assassinate;|;obscured spell;|;placeholder;|;marked for death;|;placeholder",
        headers: ["thieving","thug","assasin","spellthief"],
        subNotes: ["Steal and kill without a trace.","Steal peoples lunch money and get away with it.","Efficent killer.","Steal and use other peoples spells."],
    },

];



export default function JoshhellscapePage() {

    const {
        allTraits,
        pinnedTraits,
        displayedTraits,
        addToPinnedTraits,
        removeFromPinnedTraits,
        filterTraits,
        resetFilterTraits,
    } = useTraits();


    // TODO: Talk to Etan about Below
    // TODO: Do Body Mind and Soul sections
    /*
    Problems to talk to Etan With
    - Better showing between sections
    - Better clarity for connected items (links to crafting, items, spells, etc)
    - Something to draw users attention in (idk, ask Tristo Again)
    - it doesent like big names, long req, or long text
    - make the text size auto change based on size of thing
    - Text is a little small, possibly pick shorter items or maby the text size will work
    - DOES NOT WORK IN MOBLE
    - FUCK LIGHT MODE
    - doesent like being squished when the window size changes
    - replace temp defs and names for more cohesive ones
    - so many holes in traits
    */


    return (
        
        <div>
            {theBIGList.map((stat, i) => {
                return (
                    <TraitCardHolder key={i} allTraits={allTraits} wantedLoneList={stat.wantedLoneList} wantedComboList={stat.wantedComboList} headers={stat.headers} subNotes={stat.subNotes}/>
                );
            })}
        </div>
        

    );


    // const [familiar, setFamiliar] = useState<CreatureNew>(familiarBase);
    // const [moveBonus, setMoveBonus] = useState("Flight");


    // const {allTraits} = useTraits();
    // const {allSpells} = useSpells();
    // const {allItems} = useItems();
    
    // // rending strike - 1 dmg, high: +1 dmg
    // // light defense - Gain 2 stacks of Dodge and Armor equal to your Level on Rest.

    // // checkboxes
    // // - movement choice - Flight, Swim/climb, or +2 speed
    // // - 


        
    //     const traits = getNames(familiar.traits ? familiar.traits : "", allTraits) as Trait[];
    //     const spells = getNames(familiar.arts ? familiar.arts : "", allSpells) as Spell[];
    //     let items = dictionaryItems(getNames(familiar.items ? familiar.items : "", allItems) as Item[]);

    //     items = upgradeItem(items, familiar.augments ? familiar.augments : []);

        
    //     const strain = Math.ceil(
    //         familiar.body * 2 +
    //         familiar.mind * 3 +
    //         familiar.soul * 4 
    //     );

    //     let bonus = (familiar.traits?.includes("hearty") ? familiar.body : 0);
    //     // let soulStrain = (familiar.traits.includes("mental mage") ? familiar.soul*3+2 : familiar.soul*3);
        
    //     // if (familiar.traits.includes("blood magic")) {
    //     //     bonus += soulStrain;
    //     //     soulStrain = 0;
    //     // };
        
    //     const health = Math.ceil(
    //         familiar.level +
    //         familiar.body * 4 +
    //         familiar.mind * 3 +
    //         familiar.soul * 2 +
    //         bonus
    //     );
        
    //     const itemTags = sumTags(items);
        
    //     let armor = (itemTags["armor"] ? itemTags["armor"] * familiar.level : 0);
    //     armor += (itemTags["heavy armor"] ? itemTags["heavy armor"] * familiar.level + 4*familiar.body + 3*familiar.mind : 0);
    //     armor += (itemTags["medium armor"] ? itemTags["medium armor"] * familiar.level + 2*familiar.body + 2*familiar.mind : 0);
        
    //     const ward = (itemTags["ward"] ? itemTags["ward"] : 0);
    //     const dodge = (itemTags["dodge"] ? itemTags["dodge"] : 0);
        
    //     bonus = (itemTags["speed"] ? itemTags["speed"] : 0) + (moveBonus.includes("Speedy") ? 2 : 0);
    //     const speed = 6 + bonus;
        
        
    //     let [activeLines, passiveLines, itemLines] = createItemLines(items);

    //     createTraitLines(traits,activeLines,passiveLines);
        
    //     let spellLines = [
    //         ...spells.map((s) => {
    //             return `${s.name.toUpperCase()} - ${"#".repeat(s.dice ?? 1) ?? "P"}, ST ${
    //                 s.level
    //             }\n${s.effect}\n`;
    //         }),
    //     ];
    //     if (spellLines.length > 0) {
    //         if (spellLines[0].includes('Object "" not found.')) {
    //             spellLines = [];
    //         }
    //     }

    //     return (
    //         <div className="flex flex-col m-5 p-4 dark:bg-dark-400 rounded-md">
    //             <div className="flex justify-between mb-3">
    //                 <div className="name capitalize font-bold">{familiar.name}</div>
    //                 <div className="level">LEVEL: {familiar.level}</div>
    //             </div>
    //             <div className="mb-3 capitalize">Types: {familiar.types.join(", ")}</div>

    //             <div className="flex flex-row justify-between">

    //                 <div className="col-span-2 bg-body/10 dark:bg-dark-300 p-3 rounded-md flex-wrap ">
    //                     <div className="flex flex-row capitalize gap-1 items-center">
    //                         {toPillElement(`Body ${familiar.body},Mind ${familiar.mind},Soul ${familiar.soul}`,",")}
    //                     </div>
    //                     <div className="flex flex-row capitalize gap-1 items-center">
    //                         {toPillElement(`Arcana ${familiar.arcana},Charm ${familiar.charm},Crafting ${familiar.crafting}`,",")}
    //                     </div>
    //                     <div className="flex flex-row capitalize gap-1 items-center">
    //                         {toPillElement(`Nature ${familiar.nature},Medicine ${familiar.medicine},Thieving ${familiar.thieving}`,",")}
    //                     </div>
    //                 </div>

    //                 <div className="flex flex-col mb-3 dark:bg-dark-300 p-3 rounded-md">
                        
    //                     <div>MAX HEALTH: {health}</div>

    //                     { armor > 0 &&
    //                     <div>ARMOR: {armor}</div>
    //                     }
    //                     { dodge > 0 &&
    //                     <div>DODGE: {dodge}</div>
    //                     }
    //                     { ward > 0 &&
    //                     <div>WARD: {ward}</div>
    //                     }
    //                 </div>

    //                 <div className="flex flex-col mb-3 dark:bg-dark-300 p-3 rounded-md">
    //                     <div>SPEED: {speed}</div>
    //                     { (familiar.traits?.includes("swimmer") || moveBonus.includes("Swimmer")) &&
    //                     <div>Can Swim</div>
    //                     }
    //                     {familiar.traits?.includes("climber") || moveBonus.includes("Climber")  &&
    //                     <div>Can Climb</div>
    //                     }
    //                     {familiar.traits?.includes("flight") || moveBonus.includes("Flight")  &&
    //                     <div>Can Fly</div>
    //                     }
    //                 </div>

    //             </div>
    //             <div className="mb-3">
    //                 <div className="font-bold mb-1">ACTIVES</div>
    //                 <div className="flex justify-between mb-1 flex-grow p-4 bg-body/10 dark:bg-dark-300 whitespace-pre-wrap overflow-y-auto">
    //                     {activeLines.join("\n")}
    //                 </div>
    //             </div>

    //             { passiveLines.length != 0 &&
    //                 <div className="mb-3">
    //                     <div className="font-bold mb-1">PASSIVES</div>
    //                     <div className="flex justify-between mb-1 flex-grow p-4 bg-body/10 dark:bg-dark-300 whitespace-pre-wrap overflow-y-auto">
    //                         {passiveLines.join("\n")}
    //                     </div>
    //                 </div>
    //             }

    //             { itemLines.length != 0 &&
    //                 <div className="mb-3">
    //                     <div className="font-bold mb-1">ITEMS</div>
    //                     <div className="flex justify-between mb-1 flex-grow p-4 bg-body/10 dark:bg-dark-300 whitespace-pre-wrap overflow-y-auto">
    //                         {itemLines.join("\n")}
    //                     </div>
    //                 </div>
    //             }
                
    //             { spellLines.length != 0 &&
    //                 <div className="mb-3">
    //                     <div className="flex flex-row justify-between"> 
    //                         <div className="font-bold mb-1">SPELLS</div>
    //                         <div className="font-bold mb-1">MAX STRAIN: {strain}</div>
    //                     </div>
    //                     <div className="flex justify-between mb-1 flex-grow p-4 bg-body/10 dark:bg-dark-300 whitespace-pre-wrap overflow-y-auto">
    //                         {spellLines.join("\n")}
    //                     </div>
    //                 </div>
    //             }

                
                
    //                 { familiar.notes != "" &&
    //                     <>
    //                         <div className="font-bold mb-1">NOTES</div>
    //                         <div className="flex justify-between mb-1 flex-grow p-4 bg-body/10 dark:bg-dark-300 whitespace-pre-wrap overflow-y-auto">
    //                             {familiar.notes}
    //                         </div>
    //                     </>
    //                 } 
    //             <div className="md:col-span-2">
    //                 <div className="flex flex-row capitalize">
    //                     Movement Choice
    //                 </div>
    //                 <CleanCombobox
    //                     items={statSkillList}
    //                     className="flex flex-row"
    //                     selected={moveBonus}
    //                     setSelected={(val) => {
    //                         // setFamiliar((prevCreature) => ({
    //                         //     ...prevCreature,
    //                         //     traits: prevCreature.traits?.concat(";|;", val.toLowerCase().replace(" & ",';|;')),
    //                         // })
    //                         // );
    //                         setMoveBonus(val)
    //                     }}
    //                 />
    //             </div>
    //         </div>

            /* <Button
                title="CheckList"
                className="flex flex-row"
                variant={"body"}
                onClick={(e) => {
                    allTraits.forEach((trait) => {
                        handleUpdate(trait);
                    });
                    // console.log(allTraits[60]);
                    // console.log(curTrait);
                    // setCurTrait(allTraits[60]);
                }}
            >
                CheckList
            </Button> */
        // </div>
    // );
}


