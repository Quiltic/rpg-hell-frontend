import { Tab, Disclosure } from "@headlessui/react";
import SpellsTable from "./SpellsTable";
import { Button } from "../ui/Button/Button";
import { classNames, download } from "../../util/tableTools";
import { ChevronIcon } from "../../assets/IconSVGs/heroiconsSVG";
import { useSpells } from "../../hooks/useSpells";
import { eApiClass } from "../../types/ApiClassUnions";
import { useState } from "react";
import SearchGroup from "../search/SearchGroup";

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
    "insight"
];

export default function SpellsTablePage() {
    const {
        allSpells,
        pinnedSpells,
        displayedSpells,
        addToPinnedSpells,
        removeFromPinnedSpells,
        filterSpells,
        resetFilterSpells,
    } = useSpells();

    const IterativeSpellLevels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    const [lookAtWhat, setLookAtWhat] = useState("spell");

    return (
        <>
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
            

            {/* (auth.isAuthenticated || (window.localStorage.getItem("db_access") == "IWANTMYCOOKIE")) &&  */}
            {
                <Button
                    onClick={() =>
                        download(
                            JSON.stringify(allSpells, null, 2),
                            "spells.json",
                            "text/json"
                        )
                    }
                    variant="subtle-nature"
                >
                    Download Arts Json
                </Button>
            }

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
                <div className="md:flex-column w-full py-1 align-middle md:flex md:justify-between">
                    <Tab.List className="flex flex-wrap gap-2 p-1">
                        <Tab
                            className={({ selected }) =>
                                classNames(
                                    "w-10 rounded-md bg-body-700/20 px-2 py-1 ring-body-700 hover:font-bold dark:bg-dark-600 dark:ring-light",
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
                                            "w-6 rounded-md bg-body-700/20 px-2 py-1 ring-body-700 hover:font-bold dark:bg-dark-600 dark:ring-light",
                                            selected ? "ring-2" : ""
                                        )
                                    }
                                >
                                    {n}
                                </Tab>
                            );
                        })}
                    </Tab.List>
                    <SearchGroup 
                        filter={filterSpells} 
                        resetFilter={resetFilterSpells}
                        filterClass={eApiClass.Spell}
                        tagList={tagList}
                    />
                </div>
                <Tab.Panels>
                    <Tab.Panel>
                        <SpellsTable
                            // displayedSpells={displayedSpells}

                            displayedSpells={displayedSpells.filter(
                                (s) => {
                                    if (lookAtWhat == "spell") {
                                        return (!(s.tags.includes("technique")) && !(s.tags.includes("insight")));
                                    }
                                    return (s.tags.includes(lookAtWhat));
                                }
                            )}

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
                                            if (lookAtWhat == "spell") {
                                                return ((s.level == n) && !(s.tags.includes("technique")) && !(s.tags.includes("insight")));
                                            }
                                            return ((s.level == n) && (s.tags.includes(lookAtWhat)));
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
