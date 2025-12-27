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

// i fucking hate typescript, without this worthless variable the colors will simply NOT WORK
const STUPID_COLOR_TYPESCRIPT_BS = [

    "bg-gradient-to-br from-body to-body p-2",
    "bg-gradient-to-br from-mind to-mind p-2",
    "bg-gradient-to-br from-soul to-soul p-2",
    
    "bg-gradient-to-br from-arcana to-arcana p-2",
    "bg-gradient-to-br from-charm to-charm p-2",
    "bg-gradient-to-br from-crafting to-crafting p-2",
    "bg-gradient-to-br from-nature to-nature p-2",
    "bg-gradient-to-br from-medicine to-medicine p-2",
    "bg-gradient-to-br from-thieving to-thieving p-2",
    
];


// type dictItem = {
//     [name: string]: any;
// }


// type Props = {
//     displayedCreature: Creature;
//     traitsList: Array<Trait>;
//     spellsList: Array<Spell>;
//     itemsList: Array<Item>;
// };


// export default function JoshhellscapePage({
//     displayedCreature: displayedCreature,
//     traitsList: traitsList,
//     spellsList: spellsList,
//     itemsList: itemsList,
// }: Props) {

export default function JoshhellscapePage () {

    // const {allTraits: traitsList} = useTraits();
    // const {allSpells: spellsList} = useSpells();
    // const {allItems: itemsList} = useItems();


    // const [health, setHealth] = useState(0);
    
    // // Strain dmg
    // useEffect(() => {
    //     if (strain < 0) {
    //         setHealth(health+strain);
    //     }        
    // }, [strain])

    // function resetStats() {
    //     setArmor(maxArmor);
    //     setDodge(restDodge);
    //     setWard(restWard);
    //     setHealth(maxHealth);
    //     setStrain(maxStrain);
    // }

    const _trait = {
        name: "test",
        effect: "This is a test.",
        req: ["body 2", "mind 2"]
    }

    const ee = formatEffectString(_trait.effect ?? "");
    const req = toPillElement(
        _trait.req?.toString().replace(" 0", "") ?? "",
        ","
    );

    // gives automatic gradients for trait color bar
    let graid = `bg-gradient-to-br from-${_trait.req[0].toString().replace(/[0-9\s]/g, '') ?? ""} to-${_trait.req[0]?.toString().replace(/[0-9\s]/g, '') ?? ""} p-2`;
    if (_trait.req.length > 1) {
        graid = `bg-gradient-to-br from-${_trait.req[0].toString().replace(/[0-9\s]/g, '') ?? ""} to-${_trait.req[1].toString().replace(/[0-9\s]/g, '') ?? ""} p-2`;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3">
            <div>
                <div className="flex flex-col bg-dark-400 rounded-md border-solid border-2 border-body-700/20 m-3" >
                    <div className="flex flex-row items-center bg-dark rounded-md justify-between">
                        <div className="text-lg font-bold capitalize p-2">
                            {_trait.name ?? ""}
                        </div>
                        <div className="flex flex-row items-center capitalize">
                            {req}
                        </div>
                        
                    </div>
                    
                    <div className={graid}/>
                    <div
                        dangerouslySetInnerHTML={{ __html: ee }}
                        className="whitespace-pre-wrap text-left m-5 indent-5 text-sm"
                    ></div>
                </div>
                <div className="flex justify-center">
                    <div className="-m-3.5 w-0 h-0 border-l-[35px] border-l-transparent border-r-[35px] border-r-transparent border-t-[35px] border-t-body"></div>
                </div>
                {/* <div className="-mt-10 z-0 w-20 h-20 rotate-45 bg-body"></div> */}
            </div>
            <div>
                <div className="flex flex-col bg-dark-400 rounded-md border-solid border-2 border-body-700/20" >
                    <div className="flex flex-row items-center bg-dark rounded-md justify-between">
                        <div className="text-lg font-bold capitalize p-2">
                            {_trait.name ?? ""}
                        </div>
                        <div className="flex flex-row items-center capitalize">
                            {req}
                        </div>
                        
                    </div>
                    
                    <div className={graid}/>
                    <div
                        dangerouslySetInnerHTML={{ __html: ee }}
                        className="whitespace-pre-wrap text-left m-5 indent-5 text-sm"
                    ></div>
                </div>
                {/* <div className={"-m-1 w-0 h-0 border-l-[10%] border-l-transparent border-r-[10%] border-r-transparent border-t-[20%] border-t-white"}></div> */}
                <div className="w-[20%] h-[20%] bg-body"></div>
            </div>
            <div>
                <div className="flex flex-col bg-dark-400 rounded-md border-solid border-2 border-body-700/20" >
                    <div className="flex flex-row items-center bg-dark rounded-md justify-between">
                        <div className="text-lg font-bold capitalize p-2">
                            {_trait.name ?? ""}
                        </div>
                        <div className="flex flex-row items-center capitalize">
                            {req}
                        </div>
                        
                    </div>
                    
                    <div className={graid}/>
                    <div
                        dangerouslySetInnerHTML={{ __html: ee }}
                        className="whitespace-pre-wrap text-left m-5 indent-5 text-sm"
                    ></div>
                </div>
                {/* <div className={"-m-1 w-0 h-0 border-l-[10%] border-l-transparent border-r-[10%] border-r-transparent border-t-[20%] border-t-white"}></div> */}
                <div className="w-[20%] h-[20%] bg-body"></div>
            </div>
        </div>
    );
}


