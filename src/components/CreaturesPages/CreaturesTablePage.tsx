import { useState, useEffect } from "react";
import { Creature } from "../../client";

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";

import { Tab, Disclosure } from "@headlessui/react";

import CreatureTable from "./CreaturesTable";

import jsonCreatures from "../../assets/OfflineJsons/creatures.json";

import { Button } from "../ui/Button/Button";
import { sortArrayByLevel, sortArrayByReqs } from "../../util/sortingTools";

import { ChevronIcon } from "../../assets/IconSVGs/heroiconsSVG";
import { useTraits } from "../../hooks/useTraits";
import { useSpells } from "../../hooks/useSpells";
import { useItems } from "../../hooks/useItems";

function getTabWidth(lengthOfName: number) {
    return lengthOfName < 5
        ? "w-12"
        : lengthOfName < 7
          ? "w-16"
          : lengthOfName < 12
            ? "w-24"
            : "w-32";
}

export default function CreatureTablePage() {
    // const { TraitsService } = useApi();

    const [searchValue, setSearchValue] = useState("");
    const [allCreatures, setAllCreatures] = useState<Array<Creature>>([]);
    const [pinnedCreatures, setPinnedCreatures] = useState<Array<Creature>>([]);

    const [displayedCreatures, setDisplayedCreatures] = useState<
        Array<Creature>
    >([]);
    const [clearButtonVisibility, setClearButtonVisibility] =
        useState("hidden");

    useEffect(() => {
        async function getCreatures() {
            let creatures: Creature[];
            creatures = Object.values(jsonCreatures) as Creature[];

            creatures = sortArrayByLevel(creatures);
            setAllCreatures(creatures);
        }

        getCreatures();
    }, []);

    

    useEffect(() => {
        if (searchValue == "") {
            setDisplayedCreatures(allCreatures);
            setClearButtonVisibility("hidden");
            return;
        }

        setClearButtonVisibility("visible");
        const filteredCreatures = allCreatures.filter((s) => {
            return s.name.toLowerCase().includes(searchValue); //||
            // s.effect?.toLowerCase().includes(searchValue)
        });

        setDisplayedCreatures(filteredCreatures);
    }, [allCreatures, searchValue]);

    useEffect(() => {
        const pinnedCreatureNames: string[] = pinnedCreatures.map((s) => {
            return s.name;
        });
        window.localStorage.setItem(
            "pinnedCreatureNames",
            pinnedCreatureNames.join(";|;")
        );
    }, [pinnedCreatures]);

    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(" ");
    }

    function addToPinnedCreatures(s: Creature) {
        const newPersist = [...pinnedCreatures, s];
        setPinnedCreatures(sortArrayByReqs(newPersist));
        // updatePersistantPinnedCreatures(newPersist);
    }

    function removeFromPinnedCreatures(s: Creature) {
        const idx = pinnedCreatures.indexOf(s);
        const remainingTraits = pinnedCreatures.slice();
        remainingTraits.splice(idx, 1);
        setPinnedCreatures(remainingTraits);
        // updatePersistantPinnedCreatures(remainingTraits);
    }

    const IterativeTraitLevels = [
        "Humanoid",
        "Animal",
        "Construct",
        "Monstrosity",
        "Planar",
        "Undead",
        "Mythic",
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
                                                removeFromPinnedCreatures(
                                                    creature
                                                );
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
                <div className="flex flex-column justify-between py-1 w-full align-middle">
                    <Tab.List className="flex space-x-1 p-1 gap-1">
                        <Tab
                            className={({ selected }) =>
                                classNames(
                                    "hover:font-bold px-2 w-10 py-1 dark:bg-dark-600 bg-body-700/20 rounded-md ring-body-700 dark:ring-light",
                                    selected ? "ring-2" : ""
                                )
                            }
                        >
                            All
                        </Tab>
                        {IterativeTraitLevels.map((n, i) => {
                            return (
                                <Tab
                                    key={i}
                                    className={({ selected }) =>
                                        classNames(
                                            "hover:font-bold px-1 py-1 w-16 dark:bg-dark-600 bg-body-700/20 rounded-md ring-body-700 dark:ring-light",
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
                        <MagnifyingGlassIcon className="h-6 w-6 text-light" />

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
                        />
                    </Tab.Panel>
                    {IterativeTraitLevels.map((n, i) => {
                        return (
                            <Tab.Panel key={i}>
                                <CreatureTable
                                    displayedCreatures={displayedCreatures.filter(
                                        (s) => {
                                            return s.types
                                                .toLowerCase()
                                                .includes(n.toLowerCase());
                                        }
                                    )}
                                    moveCreature={(creature) => {
                                        addToPinnedCreatures(creature);
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
