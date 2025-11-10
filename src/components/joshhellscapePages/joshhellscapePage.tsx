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


// import traitJson from "../../assets/OfflineJsons/traits.json";


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


    return (
        <div>
            <TraitCard _trait={traitsList[0]}></TraitCard>
        </div>
    );
}


