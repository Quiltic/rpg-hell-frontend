import { useState, useEffect } from "react";
import { Trait } from "../../client";

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";

import useApi from "../../hooks/useApi";

import { Tab, Disclosure } from "@headlessui/react";

import TraitsTable from "./TraitsTable";

import json from "../../assets/OfflineJsons/Traits.json";
import { Button } from "../ui/Button/Button";
import { filterBROKENandMONSTERreq, sortArrayByReqs } from "../../util/sortingTools";
import { getPersistentPinnedNames } from "../../util/tableTools";

import { ChevronIcon } from "../../assets/IconSVGs/heroiconsSVG";

function getTabWidth(lengthOfName: number) {
    return lengthOfName < 5 ? "w-12" : lengthOfName < 7 ? "w-16" : "w-20";
}

export default function TraitsTablePage() {
    const { TraitsService } = useApi();

    const [searchValue, setSearchValue] = useState("");
    const [allTraits, setAllTraits] = useState<Array<Trait>>([]);
    const [pinnedTraits, setPinnedTraits] = useState<Array<Trait>>([]);
    const [displayedTraits, setDisplayedTraits] = useState<Array<Trait>>([]);
    const [clearButtonVisibility, setClearButtonVisibility] =
        useState("hidden");

    useEffect(() => {
        async function getTraits() {
            let traits: Trait[];
            // try {
            //     const traitsRaw = await TraitsService.getAllTraits();
            //     traits = Object.values(traitsRaw);
            // } catch (e) {
            //     if (e instanceof Error && e.message == "Network Error") {
                    console.log(
                        "WARNING YOU ARE OFFLINE! A backup is being used, however it is not up to date and may have incorect data."
                    );
                    traits = Object.values(json);
            //     } else {
            //         return;
            //     }
            // }
            traits = filterBROKENandMONSTERreq(traits);

            traits = sortArrayByReqs(traits);

            

            setAllTraits(traits);
            setDisplayedTraits(traits);

            const persistentPinnedTraits = getPersistentPinnedNames("pinnedTraitNames", traits);
            if (persistentPinnedTraits) {
                setPinnedTraits(persistentPinnedTraits);
            }
        }

        getTraits();
    }, [TraitsService]);

    useEffect(() => {
        if (searchValue == "") {
            setDisplayedTraits(allTraits);
            setClearButtonVisibility("hidden");
            return;
        }

        setClearButtonVisibility("visible");
        const filteredTraits = allTraits.filter((s) => {
            return (
                s.name.toLowerCase().includes(searchValue) ||
                s.effect?.toLowerCase().includes(searchValue)
            );
        });

        setDisplayedTraits(filteredTraits);
    }, [allTraits, searchValue]);

    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(" ");
    }

    function updatePersistantPinnedTraits(n: Trait[]) {
        const pinnedTraitNames: string[] = n.map((s) => {
            return s.name;
        });
        window.localStorage.setItem(
            "pinnedTraitNames",
            pinnedTraitNames.join(";|;")
        );
    }

    function addToPinnedTraits(s: Trait) {
        const newPersist = [...pinnedTraits, s];
        setPinnedTraits(sortArrayByReqs(newPersist));
        updatePersistantPinnedTraits(newPersist);
    }

    function removeFromPinnedTraits(s: Trait) {
        const idx = pinnedTraits.indexOf(s);
        const remainingTraits = pinnedTraits.slice();
        remainingTraits.splice(idx, 1);
        setPinnedTraits(remainingTraits);
        updatePersistantPinnedTraits(remainingTraits);
    }

    const IterativeTraitLevels = [
        "Body",
        "Mind",
        "Soul",
        "Arcana",
        "Charm",
        "Crafting",
        "Nature",
        "Medicine",
        "Thieving",
    ];

    // Styling:

    return (
        <>
            <h1>Traits</h1>

            {pinnedTraits.length > 0 && (
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
                                            Pinned Traits
                                        </Button>
                                    </Disclosure.Button>
                                    <Disclosure.Panel>
                                        <TraitsTable
                                            displayedTraits={pinnedTraits}
                                            moveTrait={(trait) => {
                                                removeFromPinnedTraits(trait);
                                            }}
                                            moveIsAdd={false}
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
                        <TraitsTable
                            displayedTraits={displayedTraits}
                            moveTrait={(trait) => {
                                addToPinnedTraits(trait);
                            }}
                        />
                    </Tab.Panel>
                    {IterativeTraitLevels.map((n) => {
                        return (
                            <Tab.Panel>
                                <TraitsTable
                                    displayedTraits={displayedTraits.filter(
                                        (s) => {
                                            return s.req
                                                ?.toString()
                                                .includes(n.toLowerCase());
                                        }
                                    )}
                                    moveTrait={(trait) => {
                                        addToPinnedTraits(trait);
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
