import { useState, useEffect } from "react";
import { Trait } from "../../client";

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";

import useApi from "../../hooks/useApi";

import { Tab } from "@headlessui/react";

import TraitsTable from "./TraitsTable";

import json from "../../assets/OfflineJsons/Traits.json";

export default function TraitsTablePage() {
    const { TraitsService } = useApi();

    const [searchValue, setSearchValue] = useState("");
    const [allTraits, setAllTraits] = useState<Array<Trait>>([]);
    const [displayedTraits, setDisplayedTraits] = useState<Array<Trait>>([]);
    const [clearButtonVisibility, setClearButtonVisibility] =
        useState("hidden");

    useEffect(() => {
        async function getTraits() {
            let traits;
            try {
                const traitsRaw = await TraitsService.getAllTraits();
                traits = Object.values(traitsRaw);
            } catch (e) {
                if (e instanceof Error && e.message == "Network Error") {
                    console.log(
                        "WARNING YOU ARE OFFLINE! A backup is being used, however it is not up to date and may have incorect data."
                    );
                    traits = Object.values(json);
                }
            }
            traits = traits?.filter((s) => {
                if (s.req) {
                    return s.req?.toString().includes("monster") || s.req?.toString().includes("broken") ? "":s.req;
                }
            });

            const traitsSortedByReq = traits?.sort((t1, t2) => {
                // console.log(t.name);
                return (t1.req ?? "") < (t2.req ?? "0") ? -1 : 1;
            });
            setAllTraits(traitsSortedByReq ?? []);
            // setTraitsObjectSorted(traitsSortedByReq);
            setDisplayedTraits(traitsSortedByReq ?? []);
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

    const IterativeTraitLevels = ["Body", 'Mind', 'Soul', 'Arcana', 'Charm', 'Crafting', 'Nature', 'Medicine', 'Thieving'];

    // Styling:

    return (
        <>
            <h1 className="text-3xl font-bold">Traits</h1>

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
                        {IterativeTraitLevels.map((n) => {
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
                        <TraitsTable displayedTraits={displayedTraits} />
                    </Tab.Panel>
                    {IterativeTraitLevels.map((n) => {
                        return (
                            <Tab.Panel>
                                <TraitsTable
                                    displayedTraits={displayedTraits.filter(
                                        (s) => {
                                            return s.req?.toString().includes(n.toLowerCase());
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
