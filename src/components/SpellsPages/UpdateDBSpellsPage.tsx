import { useState, useEffect } from "react";
import { Spell } from "../../client";

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";

import useApi from "../../hooks/useApi";

import { Tab, Disclosure } from "@headlessui/react";

import SpellsTable from "./SpellsTable";

import json from "../../assets/OfflineJsons/spells.json";
import { Button } from "../ui/Button/Button";
import { sortArrayByLevel, sortArrayByReqs } from "../../util/sortingTools";
import { classNames, getPersistentPinnedNames } from "../../util/tableTools";

import { ChevronIcon } from "../../assets/IconSVGs/heroiconsSVG";
import CleanCombobox from "../joshhellscapePages/CleanCombobox";
import Popup from "../ui/Popups/Popup";

function getTabWidth(lengthOfName: number) {
    return lengthOfName < 5 ? "w-12" : lengthOfName < 7 ? "w-16" : "w-20";
}

const tagList = [
    "elemental",
    "divine",
    "soul",
    "creation",
    "control",
    "divination",
    "protection",
    "power",
    "healing",
    "illusion",
    "ranged",
    "touch",
    "focus",
    "ritual",
    "windup",
    "technique",
    "insight",
    "MONSTER",
    "BROKEN",
];

const diceCostListCore = ["#", "##", "###"];

const IterativeSpellLevels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function UpdateDBSpellsPage() {
    const { SpellsService } = useApi();


    const [searchValue, setSearchValue] = useState("");
    const [allSpells, setAllSpells] = useState<Array<Spell>>([]);
    const [displayedSpells, setDisplayedSpells] = useState<Array<Spell>>([]);
    const [clearButtonVisibility, setClearButtonVisibility] =
        useState("hidden");

    const [curID, setCurID] = useState(0);
    const [nameText, setNameText] = useState("");
    const [tags, setTags] = useState("");
    const [level, setLevel] = useState(0);
    const [diceCost, setDiceCost] = useState("#");
    const [effectText, setEffectText] = useState("");
    const [curSpell, setCurSpell] = useState<Spell>();

    const [lookAtWhat, setLookAtWhat] = useState("spell");


    async function getSpells() {
        let spells: Spell[];
        try {
            const spellsRaw = await SpellsService.getAllSpells();
            spells = Object.values(spellsRaw);
        } catch (e) {
            // if (e instanceof Error && e.message == "Network Error") {
                console.log(
                    "WARNING YOU ARE OFFLINE! A backup is being used, however it is not up to date and may have incorect data."
                );
                spells = Object.values(json);
            // } else {
            //     return;
            // }
        }

        spells = sortArrayByLevel(spells);

        setAllSpells(spells);
        setDisplayedSpells(spells);
    }

    useEffect(() => {
        getSpells();
    }, [SpellsService]);

    useEffect(() => {
        if (searchValue == "") {
            setDisplayedSpells(allSpells);
            setClearButtonVisibility("hidden");
            return;
        }

        setClearButtonVisibility("visible");
        const filteredSpells = allSpells.filter((s) => {
            return (
                s.name.toLowerCase().includes(searchValue) ||
                s.effect?.toLowerCase().includes(searchValue)
            );
        });

        setDisplayedSpells(filteredSpells);
    }, [allSpells, searchValue]);

    function addToPinnedSpell(s: Spell) {
        setCurID(s.id);
        setNameText(s.name);
        setTags(s.tags.toString());
        setLevel(s.level);
        setDiceCost(s.dice ? "#".repeat(s.dice ?? 1) : "#");
        setEffectText(s.effect ?? "");
    }

    function removeFromPinnedSpell() {
        // Set inputs to nothing
        setCurID(0);
        setNameText("");
        setEffectText("");
        setTags(lookAtWhat!="spell" ? lookAtWhat : "");
        setLevel(0);
        setDiceCost("#");
        setEffectText("");
    }

    async function handleCreateNew() {
        console.log(curSpell);
        if (curSpell == undefined) {
            return;
        }
        if (curSpell?.name != "") {
            const reply = await SpellsService.putSpell({
                requestBody: curSpell,
            });
            console.log(reply);
        }
        // Set inputs to nothing
        removeFromPinnedSpell();
        getSpells();
    }

    async function handleUpdate() {
        console.log(curSpell);
        if (curSpell == undefined) {
            return;
        }
        if (curSpell?.name != "") {
            const reply = await SpellsService.updateSpell({
                name: curSpell?.name,
                requestBody: curSpell,
            });
            console.log(reply);
        }
        // Set inputs to nothing
        removeFromPinnedSpell();
        getSpells();
    }

    async function handleDelete() {
        console.log(curSpell);
        if (curSpell?.id == undefined) {
            return;
        }
        if (curSpell?.name != "") {
            const reply = await SpellsService.deleteSpell({ id: curSpell?.id });
            console.log(reply);
        }
        // Set inputs to nothing
        removeFromPinnedSpell();
        getSpells();
    }

    useEffect(() => {
        // console.log(mainStat,secondStat,otherDrop);
        const spell = {
            id: curID,
            name: nameText.toLowerCase(),
            effect: effectText,
            dice: diceCost.split("#").length - 1,
            level: level,
            tags: tags.split(","),
        };
        spell.tags = spell.tags.filter((str) => str !== "");

        setCurSpell(spell);
    }, [curID, nameText, effectText, diceCost, level, tags]);

    // Styling:

    return (
        <>
            <div className="grid grid-rows-auto-auto-auto-1fr-auto gap-4 p-4 bg-dark-400 rounded-md">
                <div className="grid grid-cols-1 grid-rows-auto md:grid-rows-1 md:grid-cols-6 gap-4 p-2 bg-dark-300 rounded-lg">
                    <div className="md:col-span-2">
                        <div className="flex flex-row capitalize">Name</div>
                        <input
                            type="text"
                            placeholder="Poprocks"
                            className="flex flex-row h-9 rounded-lg p-2 mt-1 w-[100%] shadow-md"
                            value={nameText}
                            onChange={(e) => setNameText(e.target.value)}
                        />
                    </div>
                    <div className="">
                        <div className="flex flex-row capitalize">
                            Strain
                        </div>
                        <input
                            type="number"
                            className="flex flex-row h-9 rounded-lg p-2 mt-1 w-[100%] shadow-md"
                            value={level}
                            min="0"
                            max="9"
                            onChange={(e) => setLevel(parseInt(e.target.value))}
                        />
                    </div>
                    <div className="">
                        <div className="flex flex-row capitalize">
                            Dice Cost
                        </div>
                        <CleanCombobox
                            items={diceCostListCore}
                            className="flex flex-row max-w-[100%] shadow-md"
                            selected={diceCost}
                            setSelected={(val) => {
                                setDiceCost(val);
                            }}
                        />
                    </div>
                    <div className="md:col-span-2">
                        <div className="flex flex-row capitalize">tags</div>
                        <input
                            type="text"
                            className="flex flex-row h-9 rounded-lg p-2 mt-1 w-[100%] shadow-md"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                        />
                        <CleanCombobox
                            items={tagList}
                            className="flex flex-row"
                            selected={""}
                            setSelected={(val) => {
                                setTags(tags.concat(",", val));
                            }}
                        />
                    </div>
                </div>

                <div className="">Effect</div>
                <textarea
                    placeholder="Whip around like a yoyo"
                    className="bg-dark-300 h-44 rounded-lg p-2"
                    value={effectText}
                    onChange={(e) => setEffectText(e.target.value)}
                />

                <div className="grid grid-cols-3 gap-4">
                    {displayedSpells.filter((t) => t.name == curSpell?.name)
                        .length > 0 ? (
                        <>
                            <span />
                            <Button
                                title="Delete"
                                className="flex flex-row"
                                variant={"body"}
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>
                            <Button
                                title="Update"
                                className="flex flex-row"
                                variant={"soul"}
                                onClick={handleUpdate}
                            >
                                Update
                            </Button>
                        </>
                    ) : (
                        <>
                            <span />
                            <span />
                            <Button
                                title="Create New"
                                className="flex flex-row"
                                variant={"nature"}
                                onClick={handleCreateNew}
                            >
                                Create New
                            </Button>
                        </>
                    )}
                </div>
            </div>

            <h1 className="capitalize">{lookAtWhat}s</h1>

            <div className="flex row justify-center gap-2 p-3">
                <Button
                    onClick={() =>
                        setLookAtWhat("technique")
                    }
                    variant="body"
                >
                    Techniques
                </Button>
                <Button
                        onClick={() =>
                            setLookAtWhat("insight")
                        }
                        variant="mind"
                    >
                        Insights
                </Button>
                <Button
                        onClick={() =>
                            setLookAtWhat("spell")
                        }
                        variant="soul"
                    >
                        Spells
                </Button>
            </div>

            {curSpell?.name && (
                <>
                    <div className="justify-start">
                        <h1>Active Spell</h1>
                        <SpellsTable
                            displayedSpells={[curSpell]}
                            moveSpell={removeFromPinnedSpell}
                            moveIsAdd={false}
                        />
                        <hr />
                    </div>
                </>
            )}

            <Tab.Group as="div" className="w-full ">
                <div className="md:flex md:flex-column md:justify-between py-1 w-full align-middle">
                    <Tab.List className="p-1 gap-2 flex flex-wrap">
                        <Tab
                            className={({ selected }) =>
                                classNames(
                                    "hover:font-bold px-2 py-1 dark:bg-dark-600 bg-body-700/20 rounded-md ring-body-700 dark:ring-light w-10",
                                    selected ? "ring-2" : ""
                                )
                            }
                        >
                            All
                        </Tab>
                        {IterativeSpellLevels.map((n, i) => {
                            return (
                                <Tab
                                    key={i}
                                    className={({ selected }) =>
                                        classNames(
                                            "hover:font-bold px-2 py-1 dark:bg-dark-600 bg-body-700/20 rounded-md ring-body-700 dark:ring-light w-6",
                                            selected ? "ring-2" : ""
                                        )
                                    }
                                >
                                    {n}
                                </Tab>
                            );
                        })}
                    </Tab.List>
                    <div className="flex flex-column items-center px-2 py-1 bg-dark-700 rounded-full w-full md:w-56 max-h-10">
                        <MagnifyingGlassIcon className="h-6 w-6 text-light" />

                        <input
                            value={searchValue}
                            type="text"
                            name="search"
                            placeholder="Search"
                            className="bg-dark-700 pl-1 w-16 flex-grow"
                            onChange={(e) => {
                                setSearchValue(e.target.value.toLowerCase());
                            }}
                        />
                        <XMarkIcon
                            className="h-6 w-6 opacity-50 cursor-pointer"
                            visibility={clearButtonVisibility}
                            onClick={() => {
                                setSearchValue("");
                                setClearButtonVisibility("hidden");
                            }}
                        />
                    </div>
                </div>
                <Tab.Panels>
                    <Tab.Panel>
                        <SpellsTable
                            displayedSpells={displayedSpells.filter(
                                (s) => {
                                    if (lookAtWhat == "spell") {
                                        return (!(s.tags.includes("technique")) && !(s.tags.includes("insight")));
                                    }
                                    return (s.tags.includes(lookAtWhat));
                                }
                            )}

                            moveSpell={(spell) => {
                                addToPinnedSpell(spell);
                            }}
                        />
                    </Tab.Panel>
                    {IterativeSpellLevels.map((n, i) => {
                        return (
                            <Tab.Panel key={i}>
                                <SpellsTable
                                    displayedSpells={displayedSpells.filter(
                                        (s) => {
                                            if (lookAtWhat == "spell") {
                                                return ((s.level == n) && !(s.tags.includes("technique")) && !(s.tags.includes("insight")));
                                            }
                                            return ((s.level == n) && (s.tags.includes(lookAtWhat)));
                                        }
                                    )}
                                    moveSpell={(spell) => {
                                        addToPinnedSpell(spell);
                                    }}
                                />
                            </Tab.Panel>
                        );
                    })}
                </Tab.Panels>
            </Tab.Group>
        </>
    );
}
