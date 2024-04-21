import useApi from "../../hooks/useApi";

import { Tab, Disclosure } from "@headlessui/react";

import TraitsTable from "./TraitsTable";

import { Button } from "../ui/Button/Button";

import { classNames, download } from "../../util/tableTools";

import { ChevronIcon } from "../../assets/IconSVGs/heroiconsSVG";
import Search from "../search/Search";
import { useApiClass } from "../../hooks/useApiClass";
import { eApiClass } from "../../types/ApiClassUnions";
import { useTraits } from "../../hooks/useTraits";

function getTabWidth(lengthOfName: number) {
    return lengthOfName < 5 ? "w-12" : lengthOfName < 7 ? "w-16" : "w-20";
}

const IterativeTraitLevels = [
    "Base",
    "Body",
    "Mind",
    "Soul",
    "Arcana",
    "Charm",
    "Crafting",
    "Nature",
    "Medicine",
    "Thieving",
    "Monster",
];

export default function TraitsTablePage() {
    const {
        allTraits,
        pinnedTraits,
        displayedTraits,
        addToPinnedTraits,
        removeFromPinnedTraits,
        filterTraits,
        resetFilterTraits,
    } = useTraits();

    return (
        <>
            <h1>Traits</h1>
            {/* (auth.isAuthenticated || (window.localStorage.getItem("db_access") == "IWANTMYCOOKIE")) &&  */}
            {
                <Button
                    onClick={() =>
                        download(
                            JSON.stringify(allTraits, null, 2),
                            "traits.json",
                            "text/json"
                        )
                    }
                    variant="link-body"
                >
                    Download Traits Json
                </Button>
            }
            {pinnedTraits.length > 0 && (
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
                                        <hr />
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    </div>
                </>
            )}

            <Tab.Group as="div" className="w-full ">
                <div className="md:flex-column w-full py-1 align-middle md:flex md:justify-between">
                    <Tab.List className="flex flex-wrap gap-2 p-1">
                        <Tab
                            className={({ selected }) =>
                                classNames(
                                    "w-10 rounded-md bg-body-700/20 px-2 py-1 ring-aabase hover:font-bold dark:bg-dark-600",
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
                                            "w-16 rounded-md bg-body-700/20 px-1 py-1 ring-aabase hover:font-bold dark:bg-dark-600",
                                            getTabWidth(n.length),
                                            `text-${n.toLowerCase()} dark:text-${n.toLowerCase()}-700 ring-${n.toLowerCase()}-600 dark:ring-${n.toLowerCase()}-600`,
                                            selected ? "ring-2" : ""
                                        )
                                    }
                                >
                                    {n}
                                </Tab>
                            );
                        })}
                    </Tab.List>
                    <Search
                        filter={filterTraits}
                        resetFilter={resetFilterTraits}
                        filterClass={eApiClass.Trait}
                    />
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
                    {IterativeTraitLevels.map((n, i) => {
                        return (
                            <Tab.Panel key={i}>
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
