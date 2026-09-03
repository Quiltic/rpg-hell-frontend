import { Button } from "../ui/Button/Button";
// import json from "../../assets/OfflineJsons/traits.json";
// import useApi from "../../hooks/useApi";
// import { sortArrayByReqs, sortItems } from "../../util/sortingTools";
// import { formatEffectString, toPillElement } from "../../util/textFormatting";
// import { createItemLines, createCreatureLines, dictionaryItems, sumTags, upgradeItem } from "../../util/creatureHelpers";
// import { useSpells } from "../../hooks/useSpells";
// import { useTrait } from "../../hooks/useCreatures";
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



import React, { useState, useEffect } from "react";
import { Trait, Item, Spell, Creature } from "../../client";
import { classNames, getNames } from "../../util/tableTools";
import CleanCombobox from "./CleanCombobox";
import { eApiClass } from "../../types/ApiClassUnions";
import SearchGroup from "../search/SearchGroup";
import { Tab } from "@headlessui/react";
import { useCreatures } from "../../hooks/useCreatures";
import CreaturesTable from "../CreaturesPages/CreaturesTable";


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


const displayedCreature = {
    "name":"",
    "types":"",
    "level":0,
    "health":0,
    "shielding":0,
    "dodge":0,
    "ward":0,
    "strain":0,
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
    "traits":"",
    "arts":"",
    "items":"",
    "stories":"",
    "discription":"",
    "notes":""
}


export default function JoshhellscapePage() {



    // const [curCreature, setCurCreature] = useState<Creature>( displayedCreature );
    const [type, setType] = useState( 0 );


    // const {
    //     allCreatures,
    //     pinnedCreatures,
    //     displayedCreatures,
    //     addToPinnedCreatures,
    //     removeFromPinnedCreatures,
    //     filterCreatures,
    //     resetFilterCreatures,
    // } = useCreatures();

    // useEffect(() => {
    //         // console.log(mainStat,secondStat,otherDrop);
    //         const trait = {
    //             id: curID,
    //             name: nameText.toLowerCase(),
    //             effect: effectText,
    //             req: [mainStat, secondStat, otherDrop],
    //             dice: 0,
    //             is_passive: true,
    //         };
    
    //         if (diceCost != "P") {
    //             trait.is_passive = false;
    //             trait.dice = diceCost.split("#").length - 1;
    //         }
    
    //         // remove the empty stuffs
    //         trait.req = trait.req.filter((str) => str !== "");
    
    //         setCurCreature(trait);
    //     }, [
    //         nameText,
    //         diceCost,
    //         mainStat,
    //         secondStat,
    //         otherDrop,
    //         effectText,
    //         curID,
    //     ]);


    // console.log(traitsList[0]);

    
    // useEffect(() => {
    //     if (strain < 0) {
    //         setHealth(health+strain);
    //     }        
    // }, [strain]);


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

    // IterativeCreatureLevels.map((n, i) => {
    //                         return (
    //                             <Tab.Panel key={i}>
    //                                 <CreaturesTable
    //                                     displayedCreatures={displayedCreatures.filter(
    //                                         (s) => {
    //                                             return s.req
    //                                                     ?.toString()
    //                                                     .includes(n.toLowerCase());
    //                                         }
    //                                     )}
                                        
    //                                     moveCreature={(trait) => {
    //                                         addToPinnedCreatures(trait);
    //                                     }}
    //                                 />
    //                             </Tab.Panel>
    //                         );
    //                     })

    // const traits = traitsList.filter( (t) => {return t.req?.toString().includes('body')} );
    // console.log(traits);

    return (
        <div>

        <Button>
            
        </Button>
        </div>
    );
}


