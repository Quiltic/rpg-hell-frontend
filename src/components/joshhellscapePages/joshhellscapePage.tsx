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
import Checkbox from "../ui/Checkbox";
import TraitSimpleListing from "../RulebookPages/TraitCardStuff/traitSimpleListing";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import CreatureSheet from "../CreaturesPages/creatureSheet";

// i fucking hate typescript, without this worthless variable the colors will simply NOT WORK
// const STUPID_COLOR_TYPESCRIPT_BS = [

// import traitJson from "../../assets/OfflineJsons/traits.json";

const IterativeTraitLevels = [
    "Body",
    "Mind",
    "Soul",
    "Arcana",
    "Charm",
    "Crafting",
    "Medicine",
    "Nature",
    "Thieving",
    // "Monster",
];



const displayedCreature = {
    "name":"Decaying Zombie",
    "types":"Undead",
    "level":0.5,
    "health":0,
    "shielding":2,
    "dodge":-1,
    "ward":0,
    "strain":0,
    "speed":5,
    "stats": {
       "body":1,
        "mind":0,
        "soul":0,
        "arcana":-2,
        "crafting":0,
        "charm":-2,
        "nature":0,
        "medicine":0,
        "thieving":0 
    },
    "actives":"**Decaying Claws** - Spend ##; Melee Attack. On Hit: Do 3 damage, and the target cannot Heal until the start of your next turn. Bonus: Gain +2 damage.\n\n**Lunge** - Spend ## and 1 Strain; Move 3 tiles then do a Decaying Claws Attack.",
    "passives":"**Undying Form** - At 0 Health roll 1d6. On a 2 or higher it lives on 1 hp. Increase this difficulty by 1 each time it survives.",
    "descriptor":"A dead and decaying reanimated corpse of some creature. They are usually found near older necromantic powers or after said powers have stopped.",
    "how_act":"Group, Overwhelm, Dim Witted"
}


export default function JoshhellscapePage() {

    const {allTraits: traitsList} = useTraits();
    const {allSpells: spellsList} = useSpells();
    const {allItems: itemsList} = useItems();




    // console.log(traitsList[0]);

    
    // useEffect(() => {
    //     if (strain < 0) {
    //         setHealth(health+strain);
    //     }        
    // }, [strain]);


    // filter(
    //     (t) => {
    //         try {
    //             const temp = [t.name.toLowerCase(),(t as Trait).effect?.toLowerCase().replace("\n","")," "].join(";|;");
    //             return (temp.match(new RegExp(realSearchValue, "g"))?.length != undefined ? true : false)
    //         } catch (error) {
    //             console.error('Bad regex:', error);
    //         }
    //         return (false)
    //     }
    //         // t.name.toLowerCase().includes(searchValue) ||
    //         // (t as Trait).effect?.toLowerCase().includes(searchValue)
    // );
    // return;

    // IterativeTraitLevels.map((n, i) => {
    //                         return (
    //                             <Tab.Panel key={i}>
    //                                 <TraitsTable
    //                                     displayedTraits={displayedTraits.filter(
    //                                         (s) => {
    //                                             return s.req
    //                                                     ?.toString()
    //                                                     .includes(n.toLowerCase());
    //                                         }
    //                                     )}
                                        
    //                                     moveTrait={(trait) => {
    //                                         addToPinnedTraits(trait);
    //                                     }}
    //                                 />
    //                             </Tab.Panel>
    //                         );
    //                     })

    // const traits = traitsList.filter( (t) => {return t.req?.toString().includes('body')} );
    // console.log(traits);

    return (
        <div className="flex flex-row">
            <CreatureSheet
                displayedCreature={displayedCreature}
            />
            <CreatureSheet
                displayedCreature={displayedCreature}
            />
        </div>
    );
}


