import { useState, useEffect } from "react";
import { Spell } from "../../client";

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";

import useApi from "../../hooks/useApi";

import { Tab } from "@headlessui/react";

import SpellsTable from "./SpellsTable";

import json from "../../assets/OfflineJsons/Spells.json";

export default function SpellsTablePage() {
    const { SpellsService } = useApi();

    const [searchValue, setSearchValue] = useState("");
    const [allSpells, setAllSpells] = useState<Array<Spell>>([]);
    const [displayedSpells, setDisplayedSpells] = useState<Array<Spell>>([]);
    const [clearButtonVisibility, setClearButtonVisibility] =
        useState("hidden");

    useEffect(() => {
        async function getSpells() {
            let spells;
            try {
                const spellsRaw = await SpellsService.getAllSpells();
                spells = Object.values(spellsRaw);

            } catch (e) {
                if (e instanceof Error && e.message == "Network Error") {
                    console.log(
                        "WARNING YOU ARE OFFLINE! A backup is being used, however it is not up to date and may have incorect data."
                    );
                    spells = Object.values(json);
                }
            }

            spells = spells?.filter((s) => {
                if (s.tags) {
                    return s.tags.includes("monster") || s.tags.includes("broken") ? "":s.tags;
                }
            });

            const spellsSortedByLevel = spells?.sort((t1, t2) => {
                // console.log(t.name);
                return (t1.level ?? 0) - (t2.level ?? 0);
            });
            setAllSpells(spellsSortedByLevel ?? []);
            // setSpellsObjectSorted(spells);
            setDisplayedSpells(spellsSortedByLevel ?? []);
        }
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

    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(" ");
    }

    const IterativeSpellLevels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    // Styling:

    return (
        <>
            <h1 className="text-3xl font-bold">Spells</h1>

            <Tab.Group as="div" className="w-full ">
                <div className="flex flex-column justify-between py-1 w-full align-middle">
                    <Tab.List className="flex space-x-1 p-1 gap-1">
                        <Tab
                            className={({ selected }) =>
                                classNames(
                                    "hover:font-bold px-2 py-1 dark:bg-dark-600 bg-light-600 rounded-md ring-light",
                                    selected ? "ring-2" : ""
                                )
                            }
                        >
                            All
                        </Tab>
                        {IterativeSpellLevels.map((n) => {
                            return (
                                <Tab
                                    className={({ selected }) =>
                                        classNames(
                                            "hover:font-bold px-2 py-1 dark:bg-dark-600 bg-light-600 rounded-md ring-light",
                                            selected ? "ring-2" : ""
                                        )
                                    }
                                >
                                    {n}
                                </Tab>
                            );
                        })}
                    </Tab.List>
                    <div className="flex flex-column items-center px-2 py-1 bg-dark-700 rounded-full">
                        <MagnifyingGlassIcon className="h-6 w-6" />

                        <input
                            value={searchValue}
                            type="text"
                            name="search"
                            placeholder="Search"
                            className="bg-dark-700 pl-1"
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
                        <SpellsTable displayedSpells={displayedSpells} />
                    </Tab.Panel>
                    {IterativeSpellLevels.map((n) => {
                        return (
                            <Tab.Panel>
                                <SpellsTable
                                    displayedSpells={displayedSpells.filter(
                                        (s) => {
                                            return s.level == n;
                                        }
                                    )}
                                />
                            </Tab.Panel>
                        );
                    })}
                </Tab.Panels>
            </Tab.Group>
        </>
    );
}
