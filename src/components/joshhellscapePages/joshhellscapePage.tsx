import { Button } from "../ui/Button/Button";
import pathJson from "../../assets/OfflineJsons/paths.json";
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
import { Switch, Tab } from "@headlessui/react";
import { useCreatures } from "../../hooks/useCreatures";
import CreaturesTable from "../CreaturesPages/CreaturesTable";
import StatPillEditable from "./StatPillEditable";

import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { BaseButton } from "../ui/Button/BaseButton";
import { cn } from "../../styling/utilites";
import Pill from "../ui/Pill";
import BuilderStep1_2 from "../CharacterSheet/CharacterBuilder/BuilderStep1_2";
import { changeItemInArray } from "../../util/creatureHelpers";
import { capitalize } from "../../util/textFormatting";
import BuilderStep3 from "../CharacterSheet/CharacterBuilder/BuilderStep3";

import { PlusIcon } from "@heroicons/react/24/outline";
import { useTraits } from "../../hooks/useTraits";
import { playerCharacterType } from "../../types/playerCharacterType";
import BuilderStep4 from "../CharacterSheet/CharacterBuilder/BuilderComponentStep4";
import BuilderStep4_5 from "../CharacterSheet/CharacterBuilder/BuilderStep4_5";
import BuilderStep6 from "../CharacterSheet/CharacterBuilder/BuilderStep6";
import RefinedCharacterSheet from "../CharacterSheet/InteractiveCharSheets/RefinedCharacterSheet";

// i fucking hate typescript, without this worthless variable the colors will simply NOT WORK
// const STUPID_COLOR_TYPESCRIPT_BS = [

// import traitJson from "../../assets/OfflineJsons/traits.json";

const playerCharacter: playerCharacterType = {
    name: "",
    level: 1,
    stats: {
        body: 0,
        mind: 0,
        soul: 0,
        arcana: 0,
        charm: 0,
        finesse: 0,
        nature: 0,
    },
    calculatedStats: {
        // can be modified by player but is auto calculated if not
        speed: 6,
        dodge: 0,
        shielding: 0,

        maxHp: 0,
        curHp: 0,
        maxStrain: 0,
        curStrain: 0,
    },
    items: [""], // any number of items, auto lookup if short, otherwise its "Name - description" as made by player
    equipped: ["", "", ""], // lefthand, righthand, armor, mysc,,,,

    paths: ["", "", "Locked until Lvl 3"], // get two at lvl 1 then one more at lvl 3
    traits: ["", ""], // # of traits per tier, 3,3,2,2,1
    arts: ["", "", "", ""], // # of Arts per tier, 5,3,2,2,1

    stories: "",
    description: "",
    notes: "",
};

type statline = "" | "body" | "mind" | "soul" | "arcana" | "charm" | "finesse" | "nature";

export default function JoshhellscapePage() {
    // const [curCreature, setCurCreature] = useState<Creature>( displayedCreature );
    const [player, setPlayer] = useState(playerCharacter);
    const [chosenStats, setChosenStats] = useState<Array<statline>>(["", "", "", "", "", ""]); // bms -> bms -> strength -> flaw
    const [chosenItems, setChosenItems] = useState<Array<Item>>([
        { name: "", description: "", effect: "", upgrades: [""], tags: "", rarity: "", cost: 0, tier: 0 }, // wep 1
        { name: "", description: "", effect: "", upgrades: [""], tags: "", rarity: "", cost: 0, tier: 0 }, // wep 2
        { name: "", description: "", effect: "", upgrades: [""], tags: "", rarity: "", cost: 0, tier: 0 }, // armor
        { name: "", description: "", effect: "", upgrades: [""], tags: "", rarity: "", cost: 0, tier: 0 }, // tool
        { name: "", description: "", effect: "", upgrades: [""], tags: "", rarity: "", cost: 0, tier: 0 }, // pack
    ]);

    const [pointsLeft, setPointsLeft] = useState(2);
    const [stepnum, setStepnum] = useState(1);

    const pathList = pathJson.map((path) => path.name);

    // console.log(pathJson[0]);
    // const {
    //     allCreatures,
    //     pinnedCreatures,
    //     displayedCreatures,
    //     addToPinnedCreatures,
    //     removeFromPinnedCreatures,
    //     filterCreatures,
    //     resetFilterCreatures,
    // } = useCreatures();

    // update the stats based on what you chose
    useEffect(() => {
        const tempStats = {
            "": 0,
            body: 0,
            mind: 0,
            soul: 0,
            arcana: 0,
            charm: 0,
            finesse: 0,
            nature: 0,
        };

        // main stats
        tempStats[chosenStats[0]] += 1;
        tempStats[chosenStats[1]] += 1;

        // sub stats
        tempStats[chosenStats[2]] += 1;
        tempStats[chosenStats[3]] -= 1;

        // deep learning
        tempStats[chosenStats[4]] += 1;
        tempStats[chosenStats[5]] -= 1;

        const hp = 4 * player.stats.body + 3 * player.stats.mind + 2 * player.stats.soul + player.level;
        const strain = 2 * player.stats.body + 3 * player.stats.mind + 4 * player.stats.soul + player.level;

        setPlayer({
            ...player,
            stats: tempStats,
            calculatedStats: { ...player.calculatedStats, curHp: hp, maxHp: hp, curStrain: strain, maxStrain: strain },
        });
    }, [chosenStats]);

    useEffect(() => {
        let itemList: Array<string> = [];
        chosenItems.forEach((item) => {
            itemList.push(item.name);
        });

        setPlayer({ ...player, items: itemList });
    }, [chosenItems]);

    useEffect(() => {
        if (player.traits.includes("magical knowledge")) {
            if (player.arts.length <= 4) setPlayer({ ...player, arts: player.arts.concat(["", ""]) });
        } else {
            if (player.arts.length > 4) setPlayer({ ...player, arts: player.arts.slice(0, 4) });
        }
    }, [player.traits]);

    return (
        <div className="">
            {stepnum == 1 && (
                <BuilderStep1_2
                    chosenStats={chosenStats}
                    setChosenStats={setChosenStats}
                    player={player}
                    setStepnum={() => setStepnum(3)}
                />
            )}

            {stepnum == 3 && (
                <BuilderStep3
                    player={player}
                    setPlayer={setPlayer}
                    setStepnum={() => setStepnum(4)}
                />
            )}

            {stepnum == 4 && (
                <BuilderStep4_5
                    player={player}
                    setPlayer={setPlayer}
                    setStepnum={() => setStepnum(6)}
                />
            )}

            {stepnum == 6 && (
                <BuilderStep6
                    player={player}
                    setPlayer={setPlayer}
                    chosenItems={chosenItems}
                    setChosenItems={setChosenItems}
                    setStepnum={() => setStepnum(7)}
                />
            )}

            <RefinedCharacterSheet
                player={player}
                setPlayer={setPlayer}
            ></RefinedCharacterSheet>
        </div>
    );
}
