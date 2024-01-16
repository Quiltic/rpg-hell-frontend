import { useState, useEffect } from "react";
import { Spell, Trait, Item, Creature } from "../../client";

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";

import useApi from "../../hooks/useApi";

import { Tab, Disclosure } from "@headlessui/react";

import CreatureTable from "./CreaturesTable";

import jsonTraits from "../../assets/OfflineJsons/Traits.json";
import jsonSpells from "../../assets/OfflineJsons/Spells.json";
import jsonItems from "../../assets/OfflineJsons/Items.json";
import jsonCreatures from "../../assets/OfflineJsons/Creatures.json";



import { Button } from "../ui/Button/Button";
import { filterBROKENandMONSTERreq, sortArrayByLevel, sortArrayByReqs } from "../../util/sortingTools";
import { getPersistentPinnedNames } from "../../util/tableTools";

import { ChevronIcon } from "../../assets/IconSVGs/heroiconsSVG";

function getTabWidth(lengthOfName: number) {
    return lengthOfName < 5 ? "w-12" : lengthOfName < 7 ? "w-16" : lengthOfName < 12 ? "w-24" : "w-32";
}

export default function CreatureTablePage() {
    // const { TraitsService } = useApi();

    const [searchValue, setSearchValue] = useState("");
    const [allCreatures, setAllCreatures] = useState<Array<Creature>>([]);
    const [pinnedCreatures, setPinnedCreatures] = useState<Array<Creature>>([]);
    
    const [displayedCreatures, setDisplayedCreatures] = useState<Array<Creature>>([]);
    const [clearButtonVisibility, setClearButtonVisibility] =
        useState("hidden");

    
    const { SpellsService, TraitsService, ItemsService } = useApi();

    const [spells, setSpells] = useState<Array<Spell>>([]);
    const [traits, setTraits] = useState<Array<Trait>>([]);
    const [items, setItems] = useState<Array<Item>>([]);


    useEffect(() => {
        async function getCreatures() {
            let creatures: Creature[];
            // try {
            //     const spellsRaw = await SpellsService.getAllSpells();

            //     spells = Object.values(spellsRaw);
            // } catch (e) {
            //     if (e instanceof Error && e.message == "Network Error") {
            //         console.log(
            //             "WARNING YOU ARE OFFLINE! A backup is being used, however it is not up to date and may have incorect data."
            //         );
            creatures = Object.values(jsonCreatures);
            //     } else {
            //         return;
            //     }
            // }

            creatures = sortArrayByLevel(creatures);
            setAllCreatures(creatures);

        }

        getCreatures();
    }, []);

    useEffect(() => {
        async function getSpells() {
            let spells: Spell[];
            try {
                const spellsRaw = await SpellsService.getAllSpells();

                spells = Object.values(spellsRaw);
            } catch (e) {
                if (e instanceof Error && e.message == "Network Error") {
                    console.log(
                        "WARNING YOU ARE OFFLINE! A backup is being used, however it is not up to date and may have incorect data."
                    );
                    spells = Object.values(jsonSpells);
                } else {
                    return;
                }
            }

            spells = sortArrayByLevel(spells);
            setSpells(spells);

        }

        getSpells();
    }, [SpellsService]);

    useEffect(() => {
        async function getTraits() {
            let traits: Trait[];
            try {
                const traitsRaw = await TraitsService.getAllTraits();
                traits = Object.values(traitsRaw);
            } catch (e) {
                if (e instanceof Error && e.message == "Network Error") {
                    console.log(
                        "WARNING YOU ARE OFFLINE! A backup is being used, however it is not up to date and may have incorect data."
                    );
                    traits = Object.values(jsonTraits);
                } else {
                    return;
                }
            }
            traits = sortArrayByReqs(traits);
            setTraits(traits);
        }
        
        getTraits();
    }, [TraitsService]);

    useEffect(() => {
        async function getItems() {
            let items: Item[];
            try {
                const itemsRaw = await ItemsService.getAllItems();
                items = Object.values(itemsRaw);
            } catch (e) {
                if (e instanceof Error && e.message == "Network Error") {
                    console.log(
                        "WARNING YOU ARE OFFLINE! A backup is being used, however it is not up to date and may have incorect data."
                    );
                    items = Object.values(jsonItems);
                } else {
                    return;
                }
            }
            items = sortArrayByReqs(items ?? []);

            setItems(items);
            
        }

        getItems();
    }, [ItemsService]);

    useEffect(() => {
        if (searchValue == "") {
            setDisplayedCreatures(allCreatures);
            setClearButtonVisibility("hidden");
            return;
        }

        setClearButtonVisibility("visible");
        const filteredCreatures = allCreatures.filter((s) => {
            return (
                s.name.toLowerCase().includes(searchValue) //||
                // s.effect?.toLowerCase().includes(searchValue)
            );
        });

        setDisplayedCreatures(filteredCreatures);
    }, [allCreatures, searchValue]);

    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(" ");
    }

    function updatePersistantPinnedCreatures(n: Creature[]) {
        const pinnedTraitNames: string[] = n.map((s) => {
            return s.name;
        });
        window.localStorage.setItem(
            "pinnedCreatureNames",
            pinnedTraitNames.join(";|;")
        );
    }

    function addToPinnedCreatures(s: Creature) {
        const newPersist = [...pinnedCreatures, s];
        setPinnedCreatures(sortArrayByReqs(newPersist));
        updatePersistantPinnedCreatures(newPersist);
    }

    function removeFromPinnedCreatures(s: Creature) {
        const idx = pinnedCreatures.indexOf(s);
        const remainingTraits = pinnedCreatures.slice();
        remainingTraits.splice(idx, 1);
        setPinnedCreatures(remainingTraits);
        updatePersistantPinnedCreatures(remainingTraits);
    }

    const IterativeTraitLevels = [
        "Humanoid",
        "Animal",
        "Monstrosity",
        "Planar",
        "Undead",
        "Mythic"
    ];

    // Styling:

    return (
        <>
            <h1>Creatures</h1>

            {pinnedCreatures.length > 0 && (
                <>
                    <div className="justify-start">
                        <Disclosure defaultOpen>
                            {({ open }) => (
                                <>
                                    <Disclosure.Button>
                                        <Button
                                            variant={"soul"}
                                            className="mb-2"
                                            open={open}
                                            rightIcon={ChevronIcon}
                                        >
                                            Pinned Creatures
                                        </Button>
                                    </Disclosure.Button>
                                    <Disclosure.Panel>
                                        <CreatureTable
                                            displayedCreatures={pinnedCreatures}
                                            moveCreature={(creature) => {
                                                removeFromPinnedCreatures(creature);
                                            }}
                                            moveIsAdd={false}
                                            traitsList={traits}
                                            spellsList={spells}
                                            itemsList={items}
                                        />
                                        <hr className="h-px my-4 border-0 bg-dark-600" />
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    </div>
                </>
            )}

            <Tab.Group as="div" className="w-full ">
                <div className="flex flex-column justify-between py-1 w-full align-middle">
                    <Tab.List className="flex space-x-1 p-1 gap-1">
                        <Tab
                            className={({ selected }) =>
                                classNames(
                                    "hover:font-bold px-2 w-10 py-1 dark:bg-dark-600 bg-light-600 rounded-md ring-light",
                                    selected ? "ring-2" : ""
                                )
                            }
                        >
                            All
                        </Tab>
                        {IterativeTraitLevels.map((n) => {
                            return (
                                <Tab
                                    className={({ selected }) =>
                                        classNames(
                                            "hover:font-bold px-1 py-1 w-16 dark:bg-dark-600 bg-light-600 rounded-md",
                                            getTabWidth(n.length),
                                            `text-${n.toLowerCase()}-700 ring-${n.toLowerCase()}-600`,
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
                        <CreatureTable
                            displayedCreatures={displayedCreatures}
                            moveCreature={(creature) => {
                                addToPinnedCreatures(creature);
                            }}
                            traitsList={traits}
                            spellsList={spells}
                            itemsList={items}
                        />
                    </Tab.Panel>
                    {IterativeTraitLevels.map((n) => {
                        return (
                            <Tab.Panel>
                                <CreatureTable
                                    displayedCreatures={displayedCreatures.filter(
                                        (s) => {
                                            return s.race
                                                ?.toString()
                                                .includes(n.toLowerCase());
                                        }
                                    )}
                                    moveCreature={(creature) => {
                                        addToPinnedCreatures(creature);
                                    }}
                                    traitsList={traits}
                                    spellsList={spells}
                                    itemsList={items}
                                />
                            </Tab.Panel>
                        );
                    })}
                </Tab.Panels>
            </Tab.Group>
        </>
    );
}
