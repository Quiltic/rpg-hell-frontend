import React, { useState, useEffect } from "react";
import { Button } from "../ui/Button/Button";
import json from "../../assets/OfflineJsons/traits.json";
import useApi from "../../hooks/useApi";
import { Creature, Item, Spell, Trait } from "../../client";
import { sortArrayByReqs, sortItems } from "../../util/sortingTools";
import { classNames, getNames } from "../../util/tableTools";
import {
    createItemLines,
    createTraitLines,
    dictionaryItems,
    sumTags,
    upgradeItem,
} from "../../util/creatureHelpers";
import { useSpells } from "../../hooks/useSpells";
import { useTraits } from "../../hooks/useTraits";
import { useItems } from "../../hooks/useItems";
import { CreatureNew } from "../../client/models/CreatureNew";
import CleanCombobox from "../joshhellscapePages/CleanCombobox";
import TraitCard from "../TraitsPages/TraitCardStuff/traitCard";
import { list } from "postcss";
import TraitCardHolder from "../RulebookPages/TraitCardStuff/traitCardHolder";
import TraitsTablePage from "../TraitsPages/TraitsTablePage";
import { eApiClass } from "../../types/ApiClassUnions";
import Search from "../search/Search";

import {
    FunnelIcon,
    MagnifyingGlassIcon,
    XMarkIcon,
    UserIcon,
    PlusIcon,
} from "@heroicons/react/20/solid";
import ItemsTable from "../ItemPages/ItemsTable";
import Popup from "../ui/Popups/Popup";
import SearchGroup from "../search/SearchGroup";
import { Tab } from "@headlessui/react";
import DicePopup from "../ui/Popups/rootDicePopup";
import DicePopup2 from "../ui/Popups/dicePopup";
import { minusIcon, plusIcon } from "../../assets/IconSVGs/heroiconsSVG";
import { ClassDictionary } from "clsx";
import Checkbox from "../ui/Checkbox";

// const wep4ListReaching = [
//     "4-: you do not gain the benefit of Reaching. You have a Range of 1 instead of 2.",
// ];

// const displayedCreature = {
//         "name":"template thing",
//         "race":"animal,construct,monstrosity,planar,undead,mythic",
//         "level":10,
//         "body":3,
//         "mind":2,
//         "soul":1,
//         "arcana":4,
//         "crafting":3,
//         "charm":2,
//         "nature":4,
//         "medicine":3,
//         "thieving":2,
//         "augments":["heavy defense - armor 2,ward 1,dodge 2"],
//         "traits":"trained medic;|;spell manipulator;|;climber;|;swimmer;|;flight;|;rage targeting;|;deathless;|;construct;|;boss monster;|;battle hardened armor;|;large;|;turreted weapon;|;spectral artillery",
//         "arts":"conjure fog;|;ground slam;|;piercing shot",
//         "items":"popshard rifle;|;fists;|;heavy defense",
//         "notes":"A creation from an age long gone. Wandering aimlessly in pursuit of a new home and a new war to jump into.\n(The tank uses 4 Popshard Turreted Weapons, and has 2 mounted Popcannons. The Cannons cannot become Turrets.)"
//         }

type dictItem = {
    [name: string]: any;
};

type Props = {
    displayedCreature: Creature;
    traitsList: Array<Trait>;
    spellsList: Array<Spell>;
    itemsList: Array<Item>;
};

export default function UpdatedCharacterSheet({
    displayedCreature: displayedCreature,
    traitsList: traitsList,
    spellsList: spellsList,
    itemsList: itemsList,
}: Props) {
    // const {allTraits: traitsList} = useTraits();
    // const {allSpells: spellsList} = useSpells();
    // const {allItems: itemsList} = useItems();

    const [health, setHealth] = useState(0);
    const [maxHealth, setMaxHealth] = useState(0);
    const [armor, setArmor] = useState(0);
    const [maxArmor, setMaxArmor] = useState(0);

    const [strain, setStrain] = useState(0);
    const [maxStrain, setMaxStrain] = useState(0);

    const [dodge, setDodge] = useState(0);
    const [restDodge, setRestDodge] = useState(0);
    const [ward, setWard] = useState(0);
    const [restWard, setRestWard] = useState(0);

    const [speed, setSpeed] = useState(0);

    const [items, setItems] = useState<Array<dictItem>>();
    const [traits, setTraits] = useState<Array<dictItem>>();

    const [activesItems, setActivesItems] = useState<Array<any>>([]);
    const [passivesItems, setPassivesItems] = useState<Array<any>>([]);

    const [activesTraits, setActivesTraits] = useState<Array<any>>([]);
    const [passivesTraits, setPassivesTraits] = useState<Array<any>>([]);

    const formatTags = (tags: { [key: string]: number }): string =>
        Object.entries(tags)
            .map(([key, value]) => `${key} ${value}`)
            .join(", ");

    // Startup stat update
    useEffect(() => {
        let hpBonus = displayedCreature.traits.includes("hearty")
            ? displayedCreature.body
            : 0;

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

        setStrain(startingStrain);
        setMaxStrain(startingStrain);

        setHealth(maxHealth);
        setMaxHealth(maxHealth);

        if (itemsList.length > 0) {
            let tempItems = dictionaryItems(
                getNames(displayedCreature.items, itemsList) as Item[]
            );
            tempItems = upgradeItem(tempItems, displayedCreature.augments);
            const itemTags = sumTags(tempItems);
            setItems(Object.values(tempItems));

            const tempArmor =
                ("armor" in itemTags
                    ? itemTags["armor"] * displayedCreature.level
                    : 0) +
                ("heavy armor" in itemTags
                    ? itemTags["heavy armor"] * displayedCreature.level +
                      4 * displayedCreature.body +
                      3 * displayedCreature.mind
                    : 0) +
                ("medium armor" in itemTags
                    ? itemTags["medium armor"] * displayedCreature.level +
                      2 * displayedCreature.body +
                      2 * displayedCreature.mind
                    : 0);
            setArmor(tempArmor);
            setMaxArmor(tempArmor);

            const tempWard = "ward" in itemTags ? itemTags["ward"] : 0;
            const tempDodge = "dodge" in itemTags ? itemTags["dodge"] : 0;
            setWard(tempWard);
            setRestWard(tempWard);
            setDodge(tempDodge);
            setRestDodge(tempDodge);

            setSpeed(
                6 +
                    ("speed" in itemTags ? itemTags["speed"] : 0) +
                    (displayedCreature.traits.includes("quick runner") ? 1 : 0)
            );

            // console.log(tempItems,itemTags)
        }
        if (traitsList.length > 0) {
            setTraits(
                getNames(displayedCreature.traits, traitsList) as Trait[]
            );
            // console.log(getNames(displayedCreature.traits, traitsList) as Trait[])
        }
    }, [displayedCreature, itemsList, traitsList]);

    // Strain dmg
    useEffect(() => {
        if (strain < 0) {
            setHealth(health + strain);
        }
    }, [strain]);

    // Set Actives/Passives for items
    useEffect(() => {
        if (items != undefined) {
            let actives: any[] = [];
            let passives: any[] = [];

            const itemCheckList = [
                "weapon",
                "grenade",
                "throwable",
                "potion",
                "medicine",
            ];

            let isactive = false;

            items.forEach((item) => {
                isactive = false;
                itemCheckList.forEach((tag) => {
                    if (tag in item.tags) isactive = true;
                });

                if (isactive) actives.push(item);
                else passives.push(item);
            });

            setActivesItems(actives);
            setPassivesItems(passives);
        }
    }, [items]);

    // set actives/passives for traits
    useEffect(() => {
        if (traits != undefined) {
            let actives: any[] = [];
            let passives: any[] = [];

            const traitCheckList = "flight,climber,swimmer";

            traits.forEach((trait) => {
                if (!traitCheckList.includes(trait.name.toLowerCase())) {
                    if (trait.effect.toLowerCase().includes("spend"))
                        actives.push(trait);
                    else passives.push(trait);
                }
            });

            setActivesTraits(actives);
            setPassivesTraits(passives);
        }
    }, [traits]);

    function getTraitCost(traitEffect: string) {
        const strain =
            traitEffect.match(/spend\s.*([0-9]+)\sstrain/i)?.[1] || "";
        const dice = traitEffect.match(/spend\s(#*)/i)?.[1] || "";
        return strain.concat(dice != "" && strain != "" ? ", " : "", dice);
    }

    function openPopup(type: number) {
        setNumDice([0, 0]);
        setDiceBonus(type);
        setDicePopupOpen(true);
    }
    const [diceBonus, setDiceBonus] = useState<number>(0);
    const [numDice, setNumDice] = useState<Array<number>>([0, 0]);
    const [dicePopupOpen, setDicePopupOpen] = useState(false);

    function resetStats() {
        setArmor(maxArmor);
        setDodge(restDodge);
        setWard(restWard);
        setHealth(maxHealth);
        setStrain(maxStrain);
    }

    const [restPopupOpen, setRestPopupOpen] = useState(false);
    const [checkbox, setCheckbox] = useState(false);

    return (
        <div>
            <DicePopup2
                startingDice={numDice}
                startingBonus={diceBonus}
                setBonus={setDiceBonus}
                isOpen={dicePopupOpen}
                setIsOpen={setDicePopupOpen}
            />

            {/* RestPopup */}
            <Popup
                isOpen={restPopupOpen}
                setIsOpen={setRestPopupOpen}
                displayedContentName="Do Rest?"
                displayedContent={
                    <div className="">
                        <div className="m-2 rounded-lg bg-dark-400 p-2">
                            <div className="rounded-lg bg-dark-300 p-2 text-lg">
                                Doing this action will reset your Health, Armor,
                                Ward, Dodge, and Strain.
                            </div>
                        </div>
                        <div className="m-2 grid grid-cols-4 rounded-lg bg-dark-400">
                            <Button
                                variant={"nature"}
                                className={
                                    "m-2 grid grid-cols-1 rounded-lg rounded-lg bg-nature p-2"
                                }
                                onClick={() => {
                                    resetStats();
                                    setRestPopupOpen(false);
                                }}
                            >
                                Rest
                            </Button>
                            <Button
                                variant={"medicine"}
                                className={
                                    "m-2 grid grid-cols-1 rounded-lg rounded-lg bg-medicine p-2"
                                }
                                onClick={() => {
                                    setRestPopupOpen(false);
                                }}
                            >
                                Dont Rest
                            </Button>
                            <div></div>{" "}
                            {/* Just a hollow thing for formating. */}
                            <Checkbox
                                isChecked={checkbox}
                                setIsChecked={setCheckbox}
                                text="Do not show this again."
                            />
                        </div>
                    </div>
                }
            />

            {/* Header */}
            <div className="m-2 grid grid-cols-2 rounded-lg bg-dark-400">
                <h2 className="m-2 flex items-center justify-center rounded-lg bg-dark-300 p-2 capitalize">
                    {displayedCreature.name}
                </h2>

                <div className="m-2 grid grid-cols-1 rounded-lg bg-dark-300 p-2">
                    <div className="grid justify-end text-xs">
                        Level: {displayedCreature.level}
                    </div>

                    <div className="grid justify-end text-xs capitalize">
                        {/* I am so lazy here id rather split then recombine than do something smarter (its 11 pm) */}
                        {displayedCreature.race
                            .toString()
                            .split(",")
                            .join(", ")}
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
                {/* 9 Stat List */}
                <div className="m-2 rounded-lg bg-dark-400">
                    <div className="justify-left m-2 grid grid-cols-3 gap-4 rounded-lg bg-dark-300 p-4">
                        <Button
                            variant={"body"}
                            className={"rounded-lg p-2 text-xl font-bold"}
                            onClick={() => {
                                openPopup(displayedCreature.body);
                            }}
                        >
                            Body {displayedCreature.body}
                        </Button>

                        <Button
                            variant={"mind"}
                            className={"rounded-lg p-2 text-xl font-bold"}
                            onClick={() => {
                                openPopup(displayedCreature.mind);
                            }}
                        >
                            Mind {displayedCreature.mind}
                        </Button>

                        <Button
                            variant={"soul"}
                            className={
                                "rounded-lg bg-soul p-2 text-xl font-bold"
                            }
                            onClick={() => {
                                openPopup(displayedCreature.soul);
                            }}
                        >
                            Soul {displayedCreature.soul}
                        </Button>
                    </div>

                    <div className="justify-left m-2 grid grid-cols-3 gap-4 rounded-lg bg-dark-300 p-6">
                        <Button
                            variant={"arcana"}
                            className={"rounded-lg p-2"}
                            onClick={() => {
                                openPopup(displayedCreature.arcana);
                            }}
                        >
                            Arcana {displayedCreature.arcana}
                        </Button>

                        <Button
                            variant={"charm"}
                            className={"rounded-lg p-2"}
                            onClick={() => {
                                openPopup(displayedCreature.charm);
                            }}
                        >
                            Charm {displayedCreature.charm}
                        </Button>

                        <Button
                            variant={"crafting"}
                            className={"rounded-lg p-2"}
                            onClick={() => {
                                openPopup(displayedCreature.crafting);
                            }}
                        >
                            Crafting {displayedCreature.crafting}
                        </Button>

                        <Button
                            variant={"nature"}
                            className={"rounded-lg p-2"}
                            onClick={() => {
                                openPopup(displayedCreature.nature);
                            }}
                        >
                            Nature {displayedCreature.nature}
                        </Button>

                        <Button
                            variant={"medicine"}
                            className={"rounded-lg p-2"}
                            onClick={() => {
                                openPopup(displayedCreature.medicine);
                            }}
                        >
                            Medicine {displayedCreature.medicine}
                        </Button>

                        <Button
                            variant={"thieving"}
                            className={"rounded-lg p-2"}
                            onClick={() => {
                                openPopup(displayedCreature.thieving);
                            }}
                        >
                            Thieving {displayedCreature.thieving}
                        </Button>
                    </div>
                </div>

                {/* Other Stats */}
                <div className="m-2 grid grid-cols-3 rounded-lg bg-dark-400">
                    {/* Health/Armor/Ward/Dodge */}
                    <div className="col-span-2 flex flex-col">
                        {/* Armor */}
                        {maxArmor > 0 && (
                            <div className="m-2 flex grid grid-cols-4 items-center justify-end rounded-lg bg-dark-300 p-2">
                                <div className="flex justify-start font-bold capitalize">
                                    Armor:
                                </div>

                                <input
                                    type="number"
                                    className="m-1 mt-1 flex h-9 flex-row justify-end rounded-lg p-2 shadow-md"
                                    value={armor}
                                    min="0"
                                    onChange={(e) =>
                                        setArmor(parseInt(e.target.value))
                                    }
                                />
                                <div className="flex justify-start">
                                    / {maxArmor}
                                </div>

                                <div className="flex flex-row">
                                    <Button
                                        leftIcon={plusIcon}
                                        variant="subtle"
                                        className="flex h-8 w-8 justify-center rounded-l-full rounded-r-none"
                                        onClick={() => {
                                            setArmor(armor + 1);
                                        }}
                                    ></Button>
                                    <Button
                                        leftIcon={minusIcon}
                                        variant="subtle"
                                        className="flex h-8 w-8 justify-center rounded-l-none rounded-r-full"
                                        onClick={() => {
                                            setArmor(armor - 1);
                                        }}
                                    ></Button>
                                </div>
                            </div>
                        )}

                        {/* Health */}
                        <div className="m-2 flex grid grid-cols-4 items-center justify-end rounded-lg bg-dark-300 p-2">
                            <div className="flex font-bold capitalize">
                                Health:
                            </div>

                            <input
                                type="number"
                                className="m-1 mt-1 flex h-9 flex-row justify-end rounded-lg p-2 shadow-md"
                                value={health}
                                min="0"
                                onChange={(e) =>
                                    setHealth(parseInt(e.target.value))
                                }
                            />
                            <div className="flex justify-start">
                                / {maxHealth}
                            </div>

                            <div className="flex flex-row">
                                <Button
                                    leftIcon={plusIcon}
                                    variant="subtle"
                                    className="flex h-8 w-8 justify-center rounded-l-full rounded-r-none"
                                    onClick={() => {
                                        setHealth(health + 1);
                                    }}
                                ></Button>
                                <Button
                                    leftIcon={minusIcon}
                                    variant="subtle"
                                    className="flex h-8 w-8 justify-center rounded-l-none rounded-r-full"
                                    onClick={() => {
                                        setHealth(health - 1);
                                    }}
                                ></Button>
                            </div>
                        </div>

                        {/* Dodge */}
                        {restDodge > 0 && (
                            <div className="m-2 flex grid grid-cols-4 items-center justify-end rounded-lg bg-dark-300 p-2">
                                <div className="flex font-bold capitalize">
                                    Dodge:
                                </div>

                                <input
                                    type="number"
                                    className="m-1 mt-1 flex h-9 flex-row justify-end rounded-lg p-2 shadow-md"
                                    value={dodge}
                                    min="0"
                                    onChange={(e) =>
                                        setHealth(parseInt(e.target.value))
                                    }
                                />

                                <div></div>

                                <div className="flex flex-row">
                                    <Button
                                        leftIcon={plusIcon}
                                        variant="subtle"
                                        className="flex h-8 w-8 justify-center rounded-l-full rounded-r-none"
                                        onClick={() => {
                                            setDodge(dodge + 1);
                                        }}
                                    ></Button>
                                    <Button
                                        leftIcon={minusIcon}
                                        variant="subtle"
                                        className="flex h-8 w-8 justify-center rounded-l-none rounded-r-full"
                                        onClick={() => {
                                            setDodge(dodge - 1);
                                        }}
                                    ></Button>
                                </div>
                            </div>
                        )}
                        {/* Ward */}
                        {restWard > 0 && (
                            <div className="m-2 flex grid grid-cols-4 items-center justify-end rounded-lg bg-dark-300 p-2">
                                <div className="flex font-bold capitalize">
                                    Ward:
                                </div>

                                <input
                                    type="number"
                                    className="m-1 mt-1 flex h-9 flex-row justify-end rounded-lg p-2 shadow-md"
                                    value={ward}
                                    min="0"
                                    onChange={(e) =>
                                        setHealth(parseInt(e.target.value))
                                    }
                                />

                                <div></div>

                                <div className="flex flex-row">
                                    <Button
                                        leftIcon={plusIcon}
                                        variant="subtle"
                                        className="flex h-8 w-8 justify-center rounded-l-full rounded-r-none"
                                        onClick={() => {
                                            setWard(ward + 1);
                                        }}
                                    ></Button>
                                    <Button
                                        leftIcon={minusIcon}
                                        variant="subtle"
                                        className="flex h-8 w-8 justify-center rounded-l-none rounded-r-full"
                                        onClick={() => {
                                            setWard(ward - 1);
                                        }}
                                    ></Button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Speed/Swim/Climb/Fly Rest and Combat Buttons*/}
                    <div className="flex flex-col">
                        <div className="m-2 flex items-center justify-center rounded-lg bg-dark-300 p-2 text-lg font-bold">
                            Speed: {speed}
                        </div>

                        {/* Swim/CLimb/Fly */}
                        {(displayedCreature.traits.includes("swimmer") ||
                            displayedCreature.traits.includes("climber") ||
                            displayedCreature.traits.includes("flight")) && (
                            <div className="m-2 flex flex-col justify-start rounded-lg bg-dark-300 p-2">
                                {displayedCreature.traits.includes(
                                    "swimmer"
                                ) && <div className="mb-2">Can Swim</div>}
                                {displayedCreature.traits.includes(
                                    "climber"
                                ) && <div className="mb-2">Can Climb</div>}
                                {displayedCreature.traits.includes(
                                    "flight"
                                ) && <div className="mb-2">Can Fly</div>}
                            </div>
                        )}

                        <Button
                            variant={"medicine"}
                            className={"m-2 rounded-lg p-2"}
                            onClick={() => {
                                setNumDice(
                                    Array.apply(
                                        null,
                                        Array(
                                            4 +
                                                Math.floor(
                                                    displayedCreature.level / 2
                                                )
                                        )
                                    ).map(Number.prototype.valueOf, 0)
                                );
                                setDiceBonus(0);
                                setDicePopupOpen(true);
                            }}
                        >
                            Combat Dice{" "}
                            {4 + Math.floor(displayedCreature.level / 2)}
                        </Button>

                        <Button
                            variant={"mind"}
                            className={"m-2 rounded-lg p-2"}
                            onClick={() => {
                                if (checkbox) resetStats();
                                else setRestPopupOpen(true);
                            }}
                        >
                            Rest
                        </Button>
                    </div>
                </div>
            </div>

            {/* Actives Bar */}
            {/* <div className="grid grid-cols-2 bg-dark-400 rounded-lg m-2 mt-10">
                <h2 className="flex justify-center items-center bg-dark-300 rounded-lg m-2">
                    Actives
                </h2>
                <div className="bg-dark-300 rounded-lg m-2 grid grid-cols-2 justify-end">
                { maxStrain > 0 &&
                        <div className="bg-dark-300 rounded-lg flex flex-row justify-center items-center">
                            <div className="flex capitalize font-bold justify-start p-2">
                                Strain:
                            </div>
                            
                            <input
                                type="number"
                                className="flex flex-row h-9 w-20 rounded-lg p-2 shadow-md justify-end m-1"
                                value={strain}
                                max={maxStrain}
                                onChange={(e) => setStrain(parseInt(e.target.value))}
                            />
                            <div className="flex justify-start">
                                / {maxStrain}
                            </div>

                            <div className="flex flex-row p-2">
                                <Button  
                                    leftIcon={plusIcon} 
                                    variant="subtle"
                                    className="flex justify-center rounded-l-full rounded-r-none h-8 w-8"
                                    onClick={() => {
                                        setStrain(strain+1);
                                        }
                                    }>
                                </Button>
                                <Button 
                                    leftIcon={minusIcon} 
                                    variant="subtle"
                                    className="flex justify-center rounded-r-full rounded-l-none h-8 w-8"
                                    onClick={() => {
                                        setStrain(strain-1);
                                        }
                                    }>
                                </Button>
                            </div>
                        </div>
                    }
                </div>

            </div> */}
            <div className="m-2 mt-10 rounded-lg bg-dark-400 p-1">
                <h2 className="m-2 flex items-center justify-center rounded-lg bg-dark-300 p-1">
                    Actives
                </h2>
            </div>

            {/* Items */}
            {activesItems != undefined &&
                activesItems.map((item) => {
                    return (
                        <div className="m-2 grid grid-cols-12 rounded-lg bg-dark-400">
                            <div className="col-span-2 m-2 flex items-center justify-center rounded-lg bg-dark-300 p-2 font-bold capitalize">
                                {item.name}
                            </div>
                            <div className="col-span-1 m-2 flex items-center justify-center rounded-lg bg-dark-300 p-2">
                                {"weapon" in item.tags
                                    ? "##"
                                    : "throwable" in item.tags
                                      ? "##"
                                      : "grenade" in item.tags
                                        ? "##"
                                        : "#"}
                            </div>
                            <div className="col-span-3 m-2 rounded-lg bg-dark-300 p-2 capitalize">
                                {formatTags(item.tags)
                                    .replace(/ 0/gi, "")
                                    .replace(/, weapon/gi, "")
                                    .replace(/, common/gi, "")
                                    .replace(/, uncommon/gi, "")
                                    .replace(/, rare/gi, "")
                                    .replace(/, legendary/gi, "")}
                            </div>
                            <div className="col-span-6 m-2 overflow-y-auto whitespace-pre-wrap rounded-lg bg-dark-300 p-2 text-left">
                                {item.effect}
                            </div>
                        </div>
                    );
                })}

            {/* Traits */}
            {activesTraits != undefined &&
                activesTraits.map((trait) => {
                    return (
                        <div className="m-2 grid grid-cols-12 rounded-lg bg-dark-400">
                            <div className="col-span-2 m-2 flex items-center justify-center rounded-lg bg-dark-300 p-2 font-bold capitalize">
                                {trait.name}
                            </div>
                            <div className="col-span-1 m-2 flex items-center justify-center rounded-lg bg-dark-300 p-2">
                                {getTraitCost(trait.effect.toLowerCase())}
                            </div>
                            <div
                                className={"col-span-9 m-2 overflow-y-auto whitespace-pre-wrap rounded-lg bg-dark-300 p-2 text-left ".concat(
                                    trait.effect.length > 250 ? "text-sm" : ""
                                )}
                            >
                                {trait.effect}
                            </div>
                        </div>
                    );
                })}

            {/* Arts Bar */}
            <div className="m-2 mt-5 grid grid-cols-2 rounded-lg bg-dark-400">
                <h2 className="m-2 flex items-center justify-center rounded-lg bg-dark-300">
                    Arts
                </h2>
                <div className="m-2 flex grid grid-cols-1 flex-row justify-end rounded-lg bg-dark-300">
                    {maxStrain > 0 && (
                        <div className="flex flex-row items-center justify-center rounded-lg bg-dark-300">
                            <div className="flex justify-start p-2 font-bold capitalize">
                                Strain:
                            </div>

                            <input
                                type="number"
                                className="m-1 flex h-9 w-20 flex-row justify-end rounded-lg p-2 shadow-md"
                                value={strain}
                                max={maxStrain}
                                onChange={(e) =>
                                    setStrain(parseInt(e.target.value))
                                }
                            />
                            <div className="flex justify-start">
                                / {maxStrain}
                            </div>

                            <div className="flex flex-row p-2">
                                <Button
                                    leftIcon={plusIcon}
                                    variant="subtle"
                                    className="flex h-8 w-8 justify-center rounded-l-full rounded-r-none"
                                    onClick={() => {
                                        setStrain(strain + 1);
                                    }}
                                ></Button>
                                <Button
                                    leftIcon={minusIcon}
                                    variant="subtle"
                                    className="flex h-8 w-8 justify-center rounded-l-none rounded-r-full"
                                    onClick={() => {
                                        setStrain(strain - 1);
                                    }}
                                ></Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Arts */}
            {displayedCreature.arts &&
                spellsList.length > 0 &&
                (getNames(displayedCreature.arts, spellsList) as Spell[]).map(
                    (art) => {
                        return (
                            <div className="m-2 grid grid-cols-12 rounded-lg bg-dark-400">
                                <div className="col-span-2 m-2 flex items-center justify-center overflow-y-auto whitespace-pre-wrap rounded-lg bg-dark-300 p-2 font-bold capitalize">
                                    {art.name}
                                    {art.tags.includes("focus")
                                        ? "\n(Focus)"
                                        : ""}
                                </div>
                                <div
                                    className={"col-span-1 m-2 flex items-center justify-center rounded-lg p-2 font-bold hover:ring-2 hover:ring-light/75 ".concat(
                                        art.tags.includes("technique")
                                            ? "bg-body hover:bg-body-600"
                                            : art.tags.includes("insight")
                                              ? "bg-mind hover:bg-mind-600"
                                              : "bg-soul hover:bg-soul-600"
                                    )}
                                    onClick={() => {
                                        setStrain(strain - (art.level ?? 0));
                                    }}
                                >
                                    {art.level}
                                    {", "}
                                    {"#".repeat(art.dice ?? 1) ?? "P"}
                                </div>
                                <div
                                    className={"col-span-8 m-2 overflow-y-auto whitespace-pre-wrap rounded-lg bg-dark-300 p-2 text-left ".concat(
                                        art.effect.length > 250 ? "text-sm" : ""
                                    )}
                                >
                                    {art.effect}
                                </div>
                                <div className="col-span-1 m-2 rounded-lg bg-dark-300 p-2 text-xs capitalize">
                                    {art.tags.join(", ")}
                                </div>
                            </div>
                        );
                    }
                )}

            {/* Passives Bar */}
            <div className="m-2 mt-10 grid grid-cols-2 rounded-lg bg-dark-400">
                <h2 className="m-2 flex items-center justify-center rounded-lg bg-dark-300">
                    Passives
                </h2>
                <div className="m-2 grid grid-cols-2 justify-end rounded-lg bg-dark-300"></div>
            </div>

            {/* Items */}
            {passivesItems != undefined &&
                passivesItems.map((item) => {
                    return (
                        <div className="m-2 grid grid-cols-12 rounded-lg bg-dark-400">
                            <div className="col-span-2 m-2 flex items-center justify-center rounded-lg bg-dark-300 p-2 font-bold capitalize">
                                {item.name}
                            </div>
                            <div className="col-span-3 m-2 rounded-lg bg-dark-300 p-2 capitalize">
                                {formatTags(item.tags)
                                    .replace(/ 0/gi, "")
                                    .replace(/, weapon/gi, "")
                                    .replace(/, common/gi, "")
                                    .replace(/, uncommon/gi, "")
                                    .replace(/, rare/gi, "")
                                    .replace(/, legendary/gi, "")}
                            </div>
                            <div className="col-span-7 m-2 overflow-y-auto whitespace-pre-wrap rounded-lg bg-dark-300 p-2 text-left">
                                {item.effect}
                            </div>
                        </div>
                    );
                })}

            {/* Traits */}
            {passivesTraits != undefined &&
                passivesTraits.map((trait) => {
                    return (
                        <div className="m-2 grid grid-cols-12 rounded-lg bg-dark-400">
                            <div className="col-span-2 m-2 flex items-center justify-center rounded-lg bg-dark-300 p-2 font-bold capitalize">
                                {trait.name}
                            </div>
                            <div className="col-span-10 m-2 overflow-y-auto whitespace-pre-wrap rounded-lg bg-dark-300 p-2 text-left">
                                {trait.effect}
                            </div>
                        </div>
                    );
                })}

            {/* Arts Bar */}
            {/* <div className="grid grid-cols-2 bg-dark-400 rounded-lg m-2 mt-10">
                <h2 className="flex justify-center items-center bg-dark-300 rounded-lg m-2">
                    Arts
                </h2>
                <div className="bg-dark-300 rounded-lg m-2 grid grid-cols-1 flex flex-row justify-end">
                { maxStrain > 0 &&
                        <div className="bg-dark-300 rounded-lg flex flex-row justify-center items-center">
                            <div className="flex capitalize font-bold justify-start p-2">
                                Strain:
                            </div>
                            
                            <input
                                type="number"
                                className="flex flex-row h-9 w-20 rounded-lg p-2 shadow-md justify-end m-1"
                                value={strain}
                                max={maxStrain}
                                onChange={(e) => setStrain(parseInt(e.target.value))}
                            />
                            <div className="flex justify-start">
                                / {maxStrain}
                            </div>

                            <div className="flex flex-row p-2">
                                <Button  
                                    leftIcon={plusIcon} 
                                    variant="subtle"
                                    className="flex justify-center rounded-l-full rounded-r-none h-8 w-8"
                                    onClick={() => {
                                        setStrain(strain+1);
                                        }
                                    }>
                                </Button>
                                <Button 
                                    leftIcon={minusIcon} 
                                    variant="subtle"
                                    className="flex justify-center rounded-r-full rounded-l-none h-8 w-8"
                                    onClick={() => {
                                        setStrain(strain-1);
                                        }
                                    }>
                                </Button>
                            </div>
                        </div>
                    }
                </div>
            </div> */}

            {/* Arts */}
            {/* {displayedCreature.arts && spellsList.length > 0 && (getNames(displayedCreature.arts, spellsList) as Spell[]).map((art) => {

            return(
            <div className="bg-dark-400 grid grid-cols-12 rounded-lg m-2">
                <div className="capitalize font-bold bg-dark-300 rounded-lg p-2 m-2 col-span-2 whitespace-pre-wrap overflow-y-auto flex items-center justify-center">
                    {art.name}
                    { art.tags.includes("focus") ? "\n(Focus)" : ""}
                </div>
                <div className={"font-bold rounded-lg rounded-lg p-2 m-2 col-span-1 flex items-center justify-center hover:ring-2 hover:ring-light/75 ".concat(
                            (art.tags.includes("technique") ? "bg-body hover:bg-body-600" : (art.tags.includes("insight") ? "bg-mind hover:bg-mind-600" : "bg-soul hover:bg-soul-600"))) 
                        }
                    onClick={() => {setStrain(strain-(art.level ?? 0));}}>
                    {art.level}{", "}{"#".repeat(art.dice ?? 1) ?? "P"}
                </div>
                <div className="bg-dark-300 rounded-lg p-2 m-2 col-span-8 whitespace-pre-wrap overflow-y-auto text-left">
                    {art.effect}
                </div>
                <div className="capitalize bg-dark-300 rounded-lg p-2 m-2 col-span-1 text-xs">
                    {art.tags.join(', ')}
                </div>

            </div>);

            })} */}
        </div>
    );
}
