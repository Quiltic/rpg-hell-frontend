import { useState } from "react";

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";

import { Tab, Disclosure } from "@headlessui/react";

import CreatureTable from "./CreaturesTable";

import { Button } from "../ui/Button/Button";

import { ChevronIcon } from "../../assets/IconSVGs/heroiconsSVG";
import { useCreatures } from "../../hooks/useCreatures";
import { cn } from "../../styling/utilites";


const IterativeTraitLevels = [
    "Humanoid",
    "Animal",
    "Construct",
    "Monstrosity",
    "Planar",
    "Undead",
    "Mythic",
];

export default function CreatureTablePage() {

    const {
        allCreatures,
        pinnedCreatures,
        displayedCreatures,
        addToPinnedCreatures,
        removeFromPinnedCreatures,
        filterCreatures,
        resetFilterCreatures,
    } = useCreatures();

    // const { TraitsService } = useApi();

    const [searchValue, setSearchValue] = useState("");
    const [clearButtonVisibility, setClearButtonVisibility] = useState("hidden");


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
                                cn(
                                    "hover:font-bold px-2 w-10 py-1 bg-dark-600 rounded-md ring-light",
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
                                        cn(
                                            "hover:font-bold px-1 py-1 w-16 bg-dark-600 rounded-md ring-light w-auto",
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
