import { useState, useEffect, useContext } from "react";
import { Spell } from "../../client";

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";

import useApi from "../../hooks/useApi";

import { Tab, Disclosure } from "@headlessui/react";

import SpellsTable from "./SpellsTable";

import json from "../../assets/OfflineJsons/spells.json";
import { Button } from "../ui/Button/Button";

import {
    filterBROKENandMONSTER,
    sortArrayByLevel,
} from "../../util/sortingTools";
import {
    classNames,
    download,
    getPersistentPinnedNames,
} from "../../util/tableTools";

import { ChevronIcon } from "../../assets/IconSVGs/heroiconsSVG";
import { AuthContext } from "../../context/AuthProvider";

export default function SpellsTablePage() {
    const { SpellsService } = useApi();

    const [searchValue, setSearchValue] = useState("");
    const [allSpells, setAllSpells] = useState<Array<Spell>>([]);
    const [pinnedSpells, setPinnedSpells] = useState<Array<Spell>>([]);
    const [displayedSpells, setDisplayedSpells] = useState<Array<Spell>>([]);
    const [clearButtonVisibility, setClearButtonVisibility] =
        useState("hidden");

    const [hasInitializedPersistedSpells, setHasInitializedPersistedSpells] =
        useState(false);

    const { auth, authLoading } = useContext(AuthContext);

    useEffect(() => {
        async function getSpells() {
            let spells: Spell[];
            try {
                if (window.localStorage.getItem("useBackup") == "true"){
                    throw new Error('Use Backup');
                }

                const spellsRaw = await SpellsService.getAllSpells();

                spells = Object.values(spellsRaw);
            } catch (e) {
                // if (e instanceof Error && e.message == "Network Error") {
                    console.log(
                        "WARNING YOU ARE OFFLINE! A backup is being used, however it is not up to date and may have incorrect data."
                    );
                    spells = Object.values(json);
                // } else {
                //     return;
                // }
            }

            // if (!auth.admin) {
            //     spells = filterBROKENandMONSTER(spells);
            //     // IterativeTraitLevels.push('MONSTER');
            // }

            spells = sortArrayByLevel(spells);

            setAllSpells(spells);
            // setSpellsObjectSorted(spells);
            setDisplayedSpells(spells);

            const persistentPinnedSpells = getPersistentPinnedNames(
                "pinnedSpellNames",
                spells
            ) as Spell[];
            if (persistentPinnedSpells) {
                setPinnedSpells(persistentPinnedSpells);
            }
            setHasInitializedPersistedSpells(true);
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

    useEffect(() => {
        if (hasInitializedPersistedSpells == false) {
            return;
        }
        const pinnedSpellNames: string[] = pinnedSpells.map((s) => {
            return s.name;
        });
        window.localStorage.setItem(
            "pinnedSpellNames",
            pinnedSpellNames.join(";|;")
        );
    }, [hasInitializedPersistedSpells, pinnedSpells]);

    function addToPinnedSpells(s: Spell) {
        const newPersist = [...pinnedSpells, s];
        setPinnedSpells(sortArrayByLevel(newPersist));
        // updatePersistantPinnedSpells(newPersist);
    }

    function removeFromPinnedSpells(s: Spell) {
        const idx = pinnedSpells.indexOf(s);
        const remainingSpells = pinnedSpells.slice();
        remainingSpells.splice(idx, 1);
        setPinnedSpells(remainingSpells);
        // updatePersistantPinnedSpells(remainingSpells);
    }

    const IterativeSpellLevels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <>
            <h1>Spells</h1>
            {auth.isAuthenticated && (
                <Button
                    onClick={() =>
                        download(
                            JSON.stringify(allSpells, null, 2),
                            "spells.json",
                            "text/json"
                        )
                    }
                    variant="link-mind"
                >
                    Download Spells Json
                </Button>
            )}

            {pinnedSpells.length > 0 && (
                <>
                    <div className="justify-start">
                        <Disclosure defaultOpen>
                            {({ open }) => (
                                <>
                                    <Disclosure.Button>
                                        <Button
                                            variant={"dark"}
                                            size={"xl"}
                                            className="mb-2"
                                            open={open}
                                            rightIcon={ChevronIcon}
                                        >
                                            Pinned Spells
                                        </Button>
                                    </Disclosure.Button>
                                    <Disclosure.Panel>
                                        <SpellsTable
                                            displayedSpells={pinnedSpells}
                                            moveSpell={(spell) => {
                                                removeFromPinnedSpells(spell);
                                            }}
                                            moveIsAdd={false}
                                        />
                                        <hr />
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
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
                            displayedSpells={displayedSpells}
                            moveSpell={(spell) => {
                                addToPinnedSpells(spell);
                            }}
                        />
                    </Tab.Panel>
                    {IterativeSpellLevels.map((n, i) => {
                        return (
                            <Tab.Panel key={i}>
                                <SpellsTable
                                    displayedSpells={displayedSpells.filter(
                                        (s) => {
                                            return s.level == n;
                                        }
                                    )}
                                    moveSpell={(spell) => {
                                        addToPinnedSpells(spell);
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
