import React, { useState, useEffect } from "react";
import { Button } from "../ui/Button/Button";
import json from "../../assets/OfflineJsons/traits.json";
import useApi from "../../hooks/useApi";
import { Creature, Item, Spell, Trait } from "../../client";
import { sortArrayByReqs, sortItems } from "../../util/sortingTools";
import { formatEffectString, toPillElement } from "../../util/textFormatting";
import { classNames, getNames } from "../../util/tableTools";
import { createItemLines, createTraitLines, dictionaryItems, sumTags, upgradeItem } from "../../util/creatureHelpers";
import { useSpells } from "../../hooks/useSpells";
import { useTraits } from "../../hooks/useTraits";
import { useItems } from "../../hooks/useItems";
import { CreatureNew } from "../../client/models/CreatureNew";
import CleanCombobox from "./CleanCombobox";
import TraitCard from "../RulebookPages/TraitCardStuff/traitCard";
import { list } from "postcss";
import TraitCardHolder from "../RulebookPages/TraitCardStuff/traitCardHolder";
import TraitsTablePage from "../TraitsPages/TraitsTablePage";
import { eApiClass } from "../../types/ApiClassUnions";
import Search from "../search/Search";

import { FunnelIcon, MagnifyingGlassIcon, XMarkIcon, UserIcon, PlusIcon } from "@heroicons/react/20/solid";
import ItemsTable from "../ItemPages/ItemsTable";
import Popup from "../ui/Popups/Popup";
import SearchGroup from "../search/SearchGroup";
import { Tab } from "@headlessui/react";
import DicePopup from "../ui/Popups/dicePopup";
import DicePopup2 from "../ui/Popups/dicePopup2";
import { minusIcon, plusIcon } from "../../assets/IconSVGs/heroiconsSVG";
import { ClassDictionary } from "clsx";


// const wep4ListReaching = [
//     "4-: you do not gain the benefit of Reaching. You have a Range of 1 instead of 2.",
// ];

const displayedCreature = {
        "name":"template thing",
        "race":"animal,construct,monstrosity,planar,undead,mythic",
        "level":10,
        "body":3,
        "mind":2,
        "soul":1,
        "arcana":4,
        "crafting":3,
        "charm":2,
        "nature":4,
        "medicine":3,
        "thieving":2,
        "augments":["heavy defense - armor 2,ward 1,dodge 2"],
        "traits":"climber;|;swimmer;|;flight;|;rage targeting;|;deathless;|;construct;|;boss monster;|;battle hardened armor;|;large;|;turreted weapon;|;spectral artillery",
        "arts":"conjure fog;|;ground slam;|;piercing shot",
        "items":"popshard rifle;|;fists;|;heavy defense",
        "notes":"A creation from an age long gone. Wandering aimlessly in pursuit of a new home and a new war to jump into.\n(The tank uses 4 Popshard Turreted Weapons, and has 2 mounted Popcannons. The Cannons cannot become Turrets.)"
        }


type dictItem = {
    [name: string]: any;
}
type fakeItem = {
    id: number;
    effect: string;
    cost: number;
    craft: number;
    req: Array<string>;
    tags: dictItem;
}




export default function JoshhellscapePage() {

    const {allTraits: traitsList} = useTraits();
    const {allSpells: spellsList} = useSpells();
    const {allItems: itemsList} = useItems();


    const [health, setHealth] = useState(0);
    const [maxHealth, setMaxHealth] = useState(0);
    const [armor, setArmor] = useState(0);
    const [maxArmor, setMaxArmor] = useState(0);

    const [dodge, setDodge] = useState(0);
    const [restDodge, setRestDodge] = useState(0);
    const [ward, setWard] = useState(0);
    const [restWard, setRestWard] = useState(0);

    const [speed, setSpeed] = useState(0);
    
    const [items, setItems] = useState<Array<dictItem>>();


    const formatTags = (tags: { [key: string]: number }): string => Object.entries(tags).map(([key, value]) => `${key} ${value}`).join(', ');



    useEffect(() => {




        let hpBonus = (displayedCreature.traits.includes("hearty") ? displayedCreature.body : 0);
        
        let startingStrain = Math.ceil(
            displayedCreature.soul * 4 +
            displayedCreature.mind * 3 +
            displayedCreature.body * 2 
        );

        if (displayedCreature.traits.includes("blood magic")) {
            hpBonus += startingStrain;
            startingStrain = 0;
        }
    
        const maxHealth = Math.ceil(
            displayedCreature.level +
            displayedCreature.body * 4 +
            displayedCreature.mind * 3 +
            displayedCreature.soul * 2 +
            hpBonus
        );

        setHealth(maxHealth);
        setMaxHealth(maxHealth);


        if (itemsList.length > 0) {
            let tempItems = dictionaryItems(getNames(displayedCreature.items, itemsList) as Item[]);
            tempItems = upgradeItem(tempItems, displayedCreature.augments);
            const itemTags = sumTags(tempItems);
            setItems(Object.values(tempItems));

        
            const tempArmor = ("armor" in itemTags ? itemTags["armor"]*displayedCreature.level : 0) + ("heavy armor" in itemTags ? itemTags["heavy armor"]*displayedCreature.level + 4*displayedCreature.body + 3*displayedCreature.mind : 0) + ("medium armor" in itemTags ? itemTags["medium armor"]*displayedCreature.level + 2*displayedCreature.body + 2*displayedCreature.mind : 0);
            setArmor(tempArmor);
            setMaxArmor(tempArmor);

            const tempWard = "ward" in itemTags ? itemTags["ward"] : 0;
            const tempDodge = "dodge" in itemTags ? itemTags["dodge"] : 0;
            setWard(tempWard);
            setRestWard(tempWard);
            setDodge(tempDodge);
            setRestDodge(tempDodge);
            
            setSpeed(6 + ("speed" in itemTags ? itemTags["speed"] : 0) + (displayedCreature.traits.includes("quick runner") ? 1 : 0));


            // console.log(tempItems,itemTags)
        }

    }, [displayedCreature, itemsList, traitsList]); 


    // const { ItemsService } = useApi();

    // const [searchValue, setSearchValue] = useState("");
    
    // useEffect(() => {
    //      let tempEffect = (wepSpecial ? [wepSpecial] : []); // This is so we dont have a random empty newline at the beginning of the effect when there is no special text

    //     if (wepBase.includes("(ignore 4 or less)")){
    //         setEffectText([...tempEffect, wep9.replace("9+:","On a 9 or Higher:")].join("\n"));
    //     } else
    //         setEffectText([...tempEffect, wep4.replace("4-:","On a 4 or Less:"), wep9.replace("9+:","On a 9 or Higher:")].join("\n"));

        
    // }, [wepBase, wep9, wep4, wepSpecial]);


    
    // const traits = getNames(displayedCreature.traits, traitsList) as Trait[];
    // const spells = getNames(displayedCreature.arts, spellsList) as Spell[];
    
    
    
    
    
    
    // let [activeLines, passiveLines, itemLines] = createItemLines(items);

    // createTraitLines(traits,activeLines,passiveLines);
    
    // let spellLines = [
    //     ...spells.map((s) => {
    //         return `${s.name.toUpperCase()} - ${s.level} - ${"#".repeat(s.dice ?? 1) ?? "P"}\n${s.effect}\n`;
    //     }),
    // ];
    // if (spellLines.length > 0) {
    //     if (spellLines[0].includes('Object "" not found.')) {
    //         spellLines = [];
    //     }
    // }
    
    function openPopup (type:number) {
        setNumDice([0,0]);
        setDiceBonus(type);
        setPopupOpen(true);
    }
    const [diceBonus, setDiceBonus] = useState<number>(0);
    const [numDice, setNumDice] = useState<Array<number>>([0,0]);
    const [popupOpen, setPopupOpen] = useState(false);

    

    return (
        <div>
            <DicePopup2 startingDice={numDice} startingBonus={diceBonus} setBonus={setDiceBonus} isOpen={popupOpen} setIsOpen={setPopupOpen}/>
            
            {/* Header */}
            <div className="grid grid-cols-2 bg-dark-400 rounded-lg m-2">
                <h2 className="bg-dark-300 rounded-lg p-4 m-2 justify-center items-center flex capitalize">
                    {displayedCreature.name}
                </h2>

                <div className="bg-dark-300 rounded-lg p-2 m-2 grid grid-cols-1">
                    <div className="justify-end grid">
                        Level: {displayedCreature.level}
                    </div>

                    <div className="capitalize justify-end grid">
                        {/* I am so lazy here id rather split then recombine than do something smarter (its 11 pm) */}
                        {displayedCreature.race.toString().split(",").join(", ")}
                    </div>
                </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
                
                {/* 9 Stat List */}
                <div className="bg-dark-400 rounded-lg m-2">
                    <div className="grid grid-cols-3 gap-4 justify-left bg-dark-300 rounded-lg m-2 p-4">
                        <Button
                            variant={"body"}
                            className={
                                "text-xl font-bold rounded-lg p-2"
                            }
                            onClick={() => {openPopup(displayedCreature.body)}}
                        >Body {displayedCreature.body}</Button>

                        <Button
                            variant={"mind"}
                            className={
                                "text-xl font-bold rounded-lg p-2"
                            }
                            onClick={() => {openPopup(displayedCreature.mind)}}
                        >Mind {displayedCreature.mind}</Button>

                        <Button
                            variant={"soul"}
                            className={
                                "text-xl font-bold bg-soul rounded-lg p-2"
                            }
                            onClick={() => {openPopup(displayedCreature.soul)}}
                        >Soul {displayedCreature.soul}</Button>
                    </div>

                    <div className="grid grid-cols-3 gap-4 justify-left bg-dark-300 rounded-lg m-2 p-6">

                        <Button
                            variant={"arcana"}
                            className={
                                "rounded-lg p-2"
                            }
                            onClick={() => {openPopup(displayedCreature.arcana)}}
                        >Arcana {displayedCreature.arcana}</Button>

                        <Button
                            variant={"charm"}
                            className={
                                "rounded-lg p-2"
                            }
                            onClick={() => {openPopup(displayedCreature.charm)}}
                        >Charm {displayedCreature.charm}</Button>

                        <Button
                            variant={"crafting"}
                            className={
                                "rounded-lg p-2"
                            }
                            onClick={() => {openPopup(displayedCreature.crafting)}}
                        >Crafting {displayedCreature.crafting}</Button>

                        <Button
                            variant={"nature"}
                            className={
                                "rounded-lg p-2"
                            }
                            onClick={() => {openPopup(displayedCreature.nature)}}
                        >Nature {displayedCreature.nature}</Button>

                        <Button
                            variant={"medicine"}
                            className={
                                "rounded-lg p-2"
                            }
                            onClick={() => {openPopup(displayedCreature.medicine)}}
                        >Medicine {displayedCreature.medicine}</Button>

                        <Button
                            variant={"thieving"}
                            className={
                                "rounded-lg p-2"
                            }
                            onClick={() => {openPopup(displayedCreature.thieving)}}
                        >Thieving {displayedCreature.thieving}</Button>
                        
                    </div>
                </div>

                {/* Other Stats */}
                <div className="grid grid-cols-3 bg-dark-400 rounded-lg m-2">
                    
                    {/* Health/Armor/Ward/Dodge */}
                    <div className="flex flex-col col-span-2">
                        {/* Armor */}
                        { maxArmor > 0 &&
                            <div className="bg-dark-300 rounded-lg p-2 m-2 grid grid-cols-4 flex justify-end items-center">
                                <div className="flex capitalize font-bold justify-start">
                                    Armor:
                                </div>
                                
                                <input
                                    type="number"
                                    className="flex flex-row h-9 rounded-lg p-2 mt-1 shadow-md justify-end m-1"
                                    value={armor}
                                    min="0"
                                    onChange={(e) => setArmor(parseInt(e.target.value))}
                                />
                                <div className="flex justify-start">
                                    / {maxArmor}
                                </div>

                                <div className="flex flex-row">
                                    <Button  
                                        leftIcon={plusIcon} 
                                        variant="subtle"
                                        className="flex justify-center rounded-l-full rounded-r-none h-8 w-8"
                                        onClick={() => {
                                            setArmor(armor+1);
                                            }
                                        }>
                                    </Button>
                                    <Button 
                                        leftIcon={minusIcon} 
                                        variant="subtle"
                                        className="flex justify-center rounded-r-full rounded-l-none h-8 w-8"
                                        onClick={() => {
                                            setArmor(armor-1);
                                            }
                                        }>
                                    </Button>
                                </div>

                            </div>
                        }
                        
                        {/* Health */}
                        <div className="bg-dark-300 rounded-lg p-2 m-2 grid grid-cols-4 flex justify-end items-center">
                            <div className="flex capitalize font-bold">
                                Health:
                            </div>
                            
                            <input
                                type="number"
                                className="flex flex-row h-9 rounded-lg p-2 mt-1 shadow-md justify-end m-1"
                                value={health}
                                min="0"
                                onChange={(e) => setHealth(parseInt(e.target.value))}
                            />
                            <div className="flex justify-start">
                                / {maxHealth}
                            </div>

                            <div className="flex flex-row">
                                <Button  
                                    leftIcon={plusIcon} 
                                    variant="subtle"
                                    className="flex justify-center rounded-l-full rounded-r-none h-8 w-8"
                                    onClick={() => {
                                        setHealth(health+1);
                                        }
                                    }>
                                </Button>
                                <Button 
                                    leftIcon={minusIcon} 
                                    variant="subtle"
                                    className="flex justify-center rounded-r-full rounded-l-none h-8 w-8"
                                    onClick={() => {
                                        setHealth(health-1);
                                        }
                                    }>
                                </Button>
                            </div>
                        </div>
                        
                        
                        {/* Dodge */}
                        { restDodge > 0 &&
                            <div className="bg-dark-300 rounded-lg p-2 m-2 grid grid-cols-4 flex justify-end items-center">
                                <div className="flex capitalize font-bold">
                                    Dodge:
                                </div>
                                
                                <input
                                    type="number"
                                    className="flex flex-row h-9 rounded-lg p-2 mt-1 shadow-md justify-end m-1"
                                    value={dodge}
                                    min="0"
                                    onChange={(e) => setHealth(parseInt(e.target.value))}
                                />

                                <div></div>

                                <div className="flex flex-row">
                                    <Button  
                                        leftIcon={plusIcon} 
                                        variant="subtle"
                                        className="flex justify-center rounded-l-full rounded-r-none h-8 w-8"
                                        onClick={() => {
                                            setDodge(dodge+1);
                                            }
                                        }>
                                    </Button>
                                    <Button 
                                        leftIcon={minusIcon} 
                                        variant="subtle"
                                        className="flex justify-center rounded-r-full rounded-l-none h-8 w-8"
                                        onClick={() => {
                                            setDodge(dodge-1);
                                            }
                                        }>
                                    </Button>
                                </div>
                            </div>
                        }
                        {/* Ward */}
                        { restWard > 0 &&
                            <div className="bg-dark-300 rounded-lg p-2 m-2 grid grid-cols-4 flex justify-end items-center">
                                <div className="flex capitalize font-bold">
                                    Ward:
                                </div>
                                
                                <input
                                    type="number"
                                    className="flex flex-row h-9 rounded-lg p-2 mt-1 shadow-md justify-end m-1"
                                    value={ward}
                                    min="0"
                                    onChange={(e) => setHealth(parseInt(e.target.value))}
                                />
                                
                                <div></div>

                                <div className="flex flex-row">
                                    <Button  
                                        leftIcon={plusIcon} 
                                        variant="subtle"
                                        className="flex justify-center rounded-l-full rounded-r-none h-8 w-8"
                                        onClick={() => {
                                            setWard(ward+1);
                                            }
                                        }>
                                    </Button>
                                    <Button 
                                        leftIcon={minusIcon} 
                                        variant="subtle"
                                        className="flex justify-center rounded-r-full rounded-l-none h-8 w-8"
                                        onClick={() => {
                                            setWard(ward-1);
                                            }
                                        }>
                                    </Button>
                                </div>

                            </div>
                        }
                        
                    </div>
                    
                    {/* Speed/Swim/Climb/Fly */}
                    <div className="flex flex-col">
                        <div className="bg-dark-300 rounded-lg p-2 m-2 flex justify-center font-bold text-lg items-center">
                            Speed: {speed}
                        </div>

                        {/* Swim/CLimb/Fly */}
                        { (displayedCreature.traits.includes("swimmer") || displayedCreature.traits.includes("climber") || displayedCreature.traits.includes("flight")) &&
                            <div className="bg-dark-300 rounded-lg p-2 m-2 flex justify-start flex-col">
                                { displayedCreature.traits.includes("swimmer") &&
                                <div className="mb-2" >Can Swim</div>
                                }
                                {displayedCreature.traits.includes("climber") &&
                                <div className="mb-2" >Can Climb</div>
                                }
                                {displayedCreature.traits.includes("flight") &&
                                <div className="mb-2" >Can Fly</div>
                                }
                            </div>
                        }
                        
                    </div>
                    
                </div>

            </div>

            <div className="bg-dark-400 rounded-lg m-2 p-1">
                <div className="bg-dark-300 rounded-lg m-1 p-2 flex flex-row">
                    <div className="flex justify-start font-bold">
                        Actives
                    </div>
                    <div className="flex flex-row justify-end">
                        <Button
                            variant={"subtle"}
                            className={
                                "rounded-lg p-2"
                            }
                            onClick={() => {
                                setNumDice(Array.apply(null, Array(4+Math.floor(displayedCreature.level/2))).map(Number.prototype.valueOf,0))
                                setDiceBonus(0)
                                setPopupOpen(true)
                            }}
                        >Combat Dice {4+Math.floor(displayedCreature.level/2)}</Button>
                    </div>
                </div>
            </div>

            {items!=undefined && items.map((item) => {

            return(
            <div className="bg-dark-400 grid grid-cols-12 rounded-lg m-2">
                <div className="capitalize font-bold bg-dark-300 rounded-lg p-2 m-2 col-span-2">
                    {item.name}
                </div>
                {'weapon' in item.tags && 
                    <div className="bg-dark-300 rounded-lg p-2 m-2 col-span-1">
                        ##
                    </div>
                }
                <div className="capitalize bg-dark-300 rounded-lg p-2 m-2 col-span-3">
                    {formatTags(item.tags).replace(/ 0/gi,"").replace(/, weapon/gi,"").replace(/, common/gi,"").replace(/, uncommon/gi,"").replace(/, rare/gi,"").replace(/, legendary/gi,"")}
                </div>
                <div className="bg-dark-300 rounded-lg p-2 m-2 col-span-6 whitespace-pre-wrap overflow-y-auto text-left">
                    {item.effect}
                </div>


            </div>);

            })}

        </div>
    );
}


