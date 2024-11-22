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

import { FunnelIcon, MagnifyingGlassIcon, XMarkIcon, UserIcon } from "@heroicons/react/20/solid";
import ItemsTable from "../ItemPages/ItemsTable";
import Popup from "../ui/Popups/Popup";
import SearchGroup from "../search/SearchGroup";
import { Tab } from "@headlessui/react";
import DicePopup from "../ui/Popups/dicePopup";
import DicePopup2 from "../ui/Popups/dicePopup2";


// const wep4ListReaching = [
//     "4-: you do not gain the benefit of Reaching. You have a Range of 1 instead of 2.",
// ];

const displayedCreature = {
        "name":"ancient beetle tank",
        "race":"construct,mythic",
        "level":18,
        "body":4,
        "mind":4,
        "soul":2,
        "arcana":4,
        "crafting":4,
        "charm":1,
        "nature":1,
        "medicine":1,
        "thieving":1,
        "augments":["heavy defense - armor 2"],
        "traits":"climber;|;rage targeting;|;deathless;|;construct;|;boss monster;|;battle hardened armor;|;large;|;turreted weapon;|;spectral artillery",
        "arts":"conjure fog;|;ground slam;|;piercing shot",
        "items":"popshard lever action repeater;|;popcannon;|;heavy defense;|;coil cannon",
        "notes":"A creation from an age long gone. Wandering aimlessly in pursuit of a new home and a new war to jump into.\n(The tank uses 4 Popshard Turreted Weapons, and has 2 mounted Popcannons. The Cannons cannot become Turrets.)"
        }


export default function JoshhellscapePage() {

    const {allTraits: traitsList} = useTraits();

    const {allSpells: spellsList} = useSpells();

    const {allItems: itemsList} = useItems();

    // const { ItemsService } = useApi();

    // const [searchValue, setSearchValue] = useState("");
    
    // useEffect(() => {
    //      let tempEffect = (wepSpecial ? [wepSpecial] : []); // This is so we dont have a random empty newline at the beginning of the effect when there is no special text

    //     if (wepBase.includes("(ignore 4 or less)")){
    //         setEffectText([...tempEffect, wep9.replace("9+:","On a 9 or Higher:")].join("\n"));
    //     } else
    //         setEffectText([...tempEffect, wep4.replace("4-:","On a 4 or Less:"), wep9.replace("9+:","On a 9 or Higher:")].join("\n"));

        
    // }, [wepBase, wep9, wep4, wepSpecial]);

    const stats = toPillElement(
        `Body ${displayedCreature.body},Mind ${displayedCreature.mind},Soul ${displayedCreature.soul},Arcana ${displayedCreature.arcana},Charm ${displayedCreature.charm},Crafting ${displayedCreature.crafting},Nature ${displayedCreature.nature},Medicine ${displayedCreature.medicine},Thieving ${displayedCreature.thieving}`,
        ","
    );
    // const race = displayedCreature.race?.toString().split(";|;").join(", ");

    
    // const traits = getNames(displayedCreature.traits, traitsList) as Trait[];
    // const spells = getNames(displayedCreature.arts, spellsList) as Spell[];
    // let items = dictionaryItems(getNames(displayedCreature.items, itemsList) as Item[]);

    // items = upgradeItem(items, displayedCreature.augments);

    
    // let bonus = (displayedCreature.traits.includes("hearty") ? displayedCreature.body : 0);
    // let soulStrain = (displayedCreature.soul*4 + displayedCreature.mind*3 + displayedCreature.body*2) //(displayedCreature.traits.includes("mental mage") ? displayedCreature.soul*4 : displayedCreature.soul*3);
    
    // if (displayedCreature.traits.includes("blood magic")) {
    //     bonus += soulStrain;
    //     soulStrain = 0;
    // };
    
    // const health = Math.ceil(
    //     displayedCreature.level +
    //     displayedCreature.body * 4 +
    //     displayedCreature.mind * 3 +
    //     displayedCreature.soul * 2 +
    //     bonus
    // );
    
    // const itemTags = sumTags(items);
    
    // const armor = ("armor" in itemTags ? itemTags["armor"]*displayedCreature.level : 0) + ("heavy armor" in itemTags ? itemTags["heavy armor"]*displayedCreature.level + 4*displayedCreature.body + 3*displayedCreature.mind : 0) + ("medium armor" in itemTags ? itemTags["medium armor"]*displayedCreature.level + 2*displayedCreature.body + 2*displayedCreature.mind : 0);
    // const ward = ("ward" in itemTags ? itemTags["ward"] : 0);
    // const dodge = ("dodge" in itemTags ? itemTags["dodge"] : 0);
    
    // bonus = ("speed" in itemTags ? itemTags["speed"] : 0) + (displayedCreature.traits.includes("quick runner") ? 1 : 0);
    // const speed = + 6 + bonus;
    
    
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
        SetBonus(type);
        setPopupOpen(true);
    }
    const [bonus, SetBonus] = useState<number>(0);
    const [popupOpen, setPopupOpen] = useState(false);

    

    return (
        <div>
            <DicePopup2 startingDice={[0,0]} startingBonus={bonus} setBonus={SetBonus} isOpen={popupOpen} setIsOpen={setPopupOpen}/>
            <div className="flex flex-row justify-left bg-dark-400 rounded-lg m-2">
                <div className="bg-dark-300 rounded-lg p-2 m-4">
                    test
                </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
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

                <div className="bg-dark-400 rounded-lg m-2">
                    <div className="bg-dark-300 rounded-lg p-2 m-2">
                        test
                    </div>
                </div>
            </div>
        </div>
    );
}


