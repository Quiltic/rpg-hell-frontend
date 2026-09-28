import { Button } from "../ui/Button/Button";
// import json from "../../assets/OfflineJsons/traits.json";
// import useApi from "../../hooks/useApi";
// import { sortArrayByReqs, sortItems } from "../../util/sortingTools";
// import { formatEffectString, toPillElement } from "../../util/textFormatting";
// import { createItemLines, createCreatureLines, dictionaryItems, sumTags, upgradeItem } from "../../util/creatureHelpers";
import { useSpells } from "../../hooks/useSpells";
import { useTraits } from "../../hooks/useTraits";
// import { useItems } from "../../hooks/useItems";
// import { CreatureNew } from "../../client/models/CreatureNew";
// import TraitCard from "../RulebookPages/TraitCardStuff/traitCard";
// import { list } from "postcss";
// import CreatureCardHolder from "../RulebookPages/CreatureCardStuff/traitCardHolder";
// import CreaturesTablePage from "../CreaturesPages/CreaturesTablePage";
// import Search from "../search/Search";

// import { FunnelIcon, MagnifyingGlassIcon, XMarkIcon, UserIcon, PlusIcon } from "@heroicons/react/20/solid";
// import ItemsTable from "../ItemPages/ItemsTable";
// import Popup from "../ui/Popups/Popup";
// import DicePopup from "../ui/Popups/dicePopup";
// import DicePopup2 from "../ui/Popups/dicePopup2";
// import { minusIcon, plusIcon } from "../../assets/IconSVGs/heroiconsSVG";
// import { ClassDictionary } from "clsx";
// import Checkbox from "../ui/Checkbox";
// import CreatureSimpleListing from "../RulebookPages/CreatureCardStuff/traitSimpleListing";
// import Markdown from "react-markdown";
// import rehypeRaw from "rehype-raw";
// import remarkGfm from "remark-gfm";
// import CreatureSheet from "../CreaturesPages/creatureSheet";
// import StatsPage from "../RulebookPages/SubPages/StatsPage";

import example_char_sheets from "../../assets/OfflineJsons/example_char_sheets.json"



import React, { useState, useEffect } from "react";
import { Trait, Item, Spell, Creature } from "../../client";
import { classNames, getNames } from "../../util/tableTools";
import CleanCombobox from "./CleanCombobox";
import { eApiClass } from "../../types/ApiClassUnions";
import SearchGroup from "../search/SearchGroup";
import { Disclosure, Tab } from "@headlessui/react";
import { useCreatures } from "../../hooks/useCreatures";
import CreaturesTable from "../CreaturesPages/CreaturesTable";


import { SparklesIcon } from "@heroicons/react/24/outline";
import { TicketIcon } from "@heroicons/react/24/outline";
import ArtCard from "../SpellsPages/SpellCardStuff/artCard";
import { formatEffectString, toPillElement } from "../../util/textFormatting";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Link } from "react-router-dom";
import TooltipSpell from "../SpellsPages/tooltipSpell";
import Tooltip from "../ui/Tooltip";
import TraitCard from "../TraitsPages/TraitCardStuff/traitCard";
import ItemCard from "../ItemPages/ItemCardStuff/itemCard";
import ItemCardHolder from "../ItemPages/ItemCardStuff/itemCardHolder";
import { useItems } from "../../hooks/useItems";
import InteractiveCharSheet from "../CharacterSheet/InteractiveCharSheets/UpdateCharSheet";
import ExampleCharSheet from "../CharacterSheet/InteractiveCharSheets/ExampleCharSheet";
import PinnedCharSheet from "../CharacterSheet/InteractiveCharSheets/pinnedCharSheet";


// i fucking hate typescript, without this worthless variable the colors will simply NOT WORK
// const STUPID_COLOR_TYPESCRIPT_BS = [

// import traitJson from "../../assets/OfflineJsons/traits.json";

// const IterativeCreatureLevels = [
//     "Body",
//     "Mind",
//     "Soul",
//     "Arcana",
//     "Charm",
//     "Crafting",
//     "Medicine",
//     "Nature",
//     "Thieving",
//     // "Monster",
// ];
const IterativeCreatureLevels = [
        "Humanoid",
        "Animal",
        "Construct",
        "Monstrosity",
        "Planar",
        "Undead",
        "Mythic",
    ];



const charLevelTraits = {1:["battle ready","frenzy, braced for impact"],2:["field repair, trained medic"],3:["defender, whirlwind"]}


const levelArts = {1:["overwatch","fortify","charge, flex","motivate, medical leeches"]}


const displayedCreature = {
    "name":"",
    "types":"",
    "level":0,
    "health":0,
    "shielding":0,
    "dodge":0,
    "cd":4,
    "ward":0,
    "strain":0,
    "speed":6,
    "stats": {
       "body":0,
        "mind":0,
        "soul":0,
        "arcana":0,
        "crafting":0,
        "charm":0,
        "nature":0,
        "medicine":0,
        "thieving":0 
    },
    "actives":"",
    "passives":"",
    "descriptor":"",
    "how_act":""
}

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

function getTabWidth(lengthOfName: number) {
    return lengthOfName < 5 ? "w-12" : lengthOfName < 7 ? "w-16" : "w-20";
}

export default function JoshhellscapePage() {



    const [curCreature, setCurCreature] = useState( example_displayedCreature );
    const [curArt, setCurArt] = useState<Spell>( {"name":"Loading","level":1,"stat":"body","tags":"","strain":0,"dice":0,"effect":"Tis Loading","activators":1} );
    const [curTrait, setCurTrait] = useState<Trait>( {"name":"Loading","extra":"","req":"body","tags":"","effect":"Tis Loading"} );

    // const {
    //     allCreatures,
    //     pinnedCreatures,
    //     displayedCreatures,
    //     addToPinnedCreatures,
    //     removeFromPinnedCreatures,
    //     filterCreatures,
    //     resetFilterCreatures,
    // } = useCreatures();

    // const {
    //     allSpells,
    //     pinnedSpells,
    //     displayedSpells,
    //     addToPinnedSpells,
    //     removeFromPinnedSpells,
    //     filterSpells,
    //     resetFilterSpells,
    // } = useSpells();
    
    // const {
    //     allItems,
    //     pinnedItems,
    //     displayedItems,
    //     addToPinnedItems,
    //     removeFromPinnedItems,
    //     filterItems,
    //     resetFilterItems,
    // } = useItems();

    // const {
    //     allTraits,
    //     pinnedTraits,
    //     displayedTraits,
    //     addToPinnedTraits,
    //     removeFromPinnedTraits,
    //     filterTraits,
    //     resetFilterTraits,
    // } = useTraits();


    
    // useEffect(() => {
    //     if (strain < 0) {
    //         setHealth(health+strain);
    //     }        
    // }, [strain]);

    // useEffect(() => {
    //     const filtered = displayedSpells.filter( (s) => { return levelArts[1][0].toLowerCase().includes(s.name);})
    //     setCurArt(filtered.length ? filtered[0] : curArt)
    // }, [allSpells]);

    // useEffect(() => {
    //     const filtered = displayedTraits.filter( (s) => { return charLevelTraits[1][0].toLowerCase().includes(s.name);})
    //     setCurTrait(filtered.length ? filtered[0] : curTrait)
    // }, [allTraits]);


    // console.log(example_char_sheets);



    // filter(
    //     (t) => {
    //         try {
    //             const temp = [t.name.toLowerCase(),(t as Creature).effect?.toLowerCase().replace("\n","")," "].join(";|;");
    //             return (temp.match(new RegExp(realSearchValue, "g"))?.length != undefined ? true : false)
    //         } catch (error) {
    //             console.error('Bad regex:', error);
    //         }
    //         return (false)
    //     }
    //         // t.name.toLowerCase().includes(searchValue) ||
    //         // (t as Creature).effect?.toLowerCase().includes(searchValue)
    // );
    // return;

    return (
        <div className="flex flex-col">
{/* 
            <Tooltip text={
                <Link
                    to={"/rulebook/spells"}
                    className={`tooltip_main capitalize text-${curTrait.req}`}
                    aria-current={undefined}
                >
                    {curTrait.name}
                </Link>
            } 
            display={
                <TraitCard _trait={curTrait} />
            }/>

            <p className="flex flex-row items-center justify-center">
                hello this is a test <TooltipSpell name="mark"/>  MABY THINGS WILL WORK OUT  <Tooltip text={
                <Link
                    to={"/rulebook/spells"}
                    className={`tooltip_main capitalize text-${curTrait.req}`}
                    aria-current={undefined}
                >
                    {curTrait.name}
                </Link>
            } 
            display={
                <TraitCard _trait={curTrait} />
            }/>
            </p> */}

            <PinnedCharSheet/>

            
        </div>
    );
}


