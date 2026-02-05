import { Button } from "../ui/Button/Button";
import { useSpells } from "../../hooks/useSpells";

import { useState } from "react";
// import { Spell} from "../../client";
import { classNames, download } from "../../util/tableTools";
import { eApiClass } from "../../types/ApiClassUnions";
import SearchGroup from "../search/SearchGroup";
import { Disclosure, Switch, Tab } from "@headlessui/react";
import SpellsTable from "../SpellsPages/SpellsTable";
import SpellCardHolder from "../SpellsPages/SpellCardStuff/artCardHolder";
import { ChevronIcon } from "../../assets/IconSVGs/heroiconsSVG";
import MarkdownRenderer from "../../util/MarkdownRenderer";
import art_key from "../../assets/RulebookFiles/markdown/spell_key.md";

const tagList = [
    "elemental",
    "divine",
    "utility",
    "creation",
    "control",
    "divination",
    "protection",
    "power",
    "healing",
    "illusion",
    "ranged",
    "touch",
    "self",
    "focus",
    "reaction",
    "damage",
    "technique",
    "aura",
    "insight",
    "dice",
    "spell",
    "weapon",
    "movement",
    "buff",
    "debuff",
    "aoe",
    "MONSTER",
    "BROKEN",
];

const statList = [
    "body",
    "mind",
    "soul",
    "arcana",
    "charm",
    "crafting",
    "medicine",
    "nature",
    "thieving",
    // "Monster",
];
const IterativeSpellLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function getTabWidth(lengthOfName: number) {
    return lengthOfName < 5 ? "w-12" : lengthOfName < 7 ? "w-16" : "w-20";
}

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

    const [enabled, setEnabled] = useState(false);
    const [searchLvl, setSearchLvl] = useState(0);

    return (
        <>
            <h1 className="capitalize">Arts</h1>

            {/* Download/Switch */}
            <div className="flex flex-col items-center justify-center">
                <div className="m-2 rounded-md bg-dark-400 p-2 pl-4">
                    <div className="flex flex-row items-center justify-center">
                        <Button
                            onClick={() =>
                                download(
                                    JSON.stringify(allSpells, null, 2),
                                    "spells.json",
                                    "text/json"
                                )
                            }
                            variant="thieving"
                        >
                            Download Arts Json
                        </Button>

                        <div className="m-2 flex flex-row items-center justify-center rounded-md bg-dark-300 p-2">
                            {enabled && (
                                <p className="m-2 flex flex-row items-center justify-center">
                                    Switch to Table
                                </p>
                            )}
                            {!enabled && (
                                <p className="m-2 flex flex-row items-center justify-center">
                                    Switch to Block
                                </p>
                            )}

                            <Switch
                                checked={enabled}
                                onChange={setEnabled}
                                className={`${
                                    enabled ? "bg-body" : "bg-dark-700"
                                } relative inline-flex h-6 w-11 items-center rounded-full`}
                            >
                                <span className="sr-only">
                                    Switch to Block Mode
                                </span>
                                <span
                                    className={`${
                                        enabled
                                            ? "translate-x-6"
                                            : "translate-x-1"
                                    } inline-block h-4 w-4 transform rounded-full bg-light transition`}
                                />
                            </Switch>
                        </div>

                        {/* Line */}
                        {/* <div className="flex flex-row items-center bg-dark-600 border-2 border-body-700/20 mt-6 mb-6 w-full"></div> */}
                    </div>

                    <Disclosure defaultOpen={false}>
                        {({ open }) => (
                            <>
                                <Disclosure.Button>
                                    <Button
                                        variant={"thieving"}
                                        size={"md"}
                                        className="mb-2"
                                        open={open}
                                        rightIcon={ChevronIcon}
                                    >
                                        Key
                                    </Button>
                                </Disclosure.Button>
                                <Disclosure.Panel>
                                    <MarkdownRenderer
                                        markdown={art_key as string}
                                        have_header={false}
                                    />
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                </div>
            </div>

            {/* Pinned */}
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
                                            Pinned Arts
                                        </Button>
                                    </Disclosure.Button>
                                    <Disclosure.Panel>
                                        {enabled && (
                                            <SpellCardHolder
                                                shownSpells={pinnedSpells}
                                                moveSpell={(spell) => {
                                                    removeFromPinnedSpells(
                                                        spell
                                                    );
                                                }}
                                            />
                                        )}
                                        {!enabled && (
                                            <SpellsTable
                                                displayedSpells={pinnedSpells}
                                                moveSpell={(spell) => {
                                                    removeFromPinnedSpells(
                                                        spell
                                                    );
                                                }}
                                                moveIsAdd={false}
                                            />
                                        )}

                                        {/* <hr /> */}
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    </div>
                    {/* Line */}
                    <div className="mb-6 mt-6 flex w-full flex-row items-center border-2 border-body-700/20 bg-dark-600"></div>
                </>
            )}

            <Tab.Group as="div" className="w-full ">
                <div className="md:flex-column w-full py-1 align-middle md:flex md:justify-between">
                    <Tab.List className="flex flex-wrap gap-2 p-1">
                        <Tab
                            className={({ selected }) =>
                                classNames(
                                    "w-10 rounded-md bg-dark-600 px-2 py-1 ring-aabase hover:font-bold",
                                    selected ? "ring-2" : ""
                                )
                            }
                        >
                            All
                        </Tab>
                        {statList.map((n, i) => {
                            return (
                                <Tab
                                    key={i}
                                    className={({ selected }) =>
                                        classNames(
                                            "rounded-md bg-dark-600 px-1 py-1 capitalize ring-aabase hover:font-bold",
                                            getTabWidth(n.length),
                                            `text-${n.toLowerCase()}-700 ring-${n.toLowerCase()}-600`, //text-${n.toLowerCase()} dark:
                                            selected ? "ring-2" : ""
                                        )
                                    }
                                >
                                    {n}
                                </Tab>
                            );
                        })}
                    </Tab.List>
                    {/* Level */}
                    <div className="m-1 flex flex-row items-center justify-center rounded-md bg-dark-600">
                        <div className="m-1 ml-2 capitalize">Level</div>
                        <input
                            type="number"
                            className="m-1 flex h-6 w-16 flex-row rounded-lg p-2 shadow-md"
                            value={searchLvl}
                            min="0"
                            onChange={(e) =>
                                setSearchLvl(parseInt(e.target.value))
                            }
                        />
                    </div>
                    <SearchGroup
                        filter={filterSpells}
                        resetFilter={resetFilterSpells}
                        filterClass={eApiClass.Spell}
                        tagList={tagList}
                    />
                </div>
                <Tab.Panel>
                    {enabled && (
                        <SpellCardHolder
                            shownSpells={displayedSpells.filter((s) => {
                                if (searchLvl) return s.level == searchLvl;
                                return true;
                            })}
                            moveSpell={(spell) => {
                                addToPinnedSpells(spell);
                            }}
                        />
                    )}
                    {!enabled && (
                        <SpellsTable
                            displayedSpells={displayedSpells.filter((s) => {
                                if (searchLvl) return s.level == searchLvl;
                                return true;
                            })}
                            moveSpell={(spell) => {
                                addToPinnedSpells(spell);
                            }}
                        />
                    )}
                </Tab.Panel>
                {statList.map((n, i) => {
                    return (
                        <Tab.Panel key={i}>
                            {enabled && (
                                <SpellCardHolder
                                    shownSpells={displayedSpells.filter((s) => {
                                        if (searchLvl) {
                                            return (
                                                s.stat == n &&
                                                s.level == searchLvl
                                            );
                                        }
                                        return s.stat == n;
                                    })}
                                    key={i}
                                    moveSpell={(spell) => {
                                        addToPinnedSpells(spell);
                                    }}
                                />
                            )}
                            {!enabled && (
                                <SpellsTable
                                    displayedSpells={displayedSpells.filter(
                                        (s) => {
                                            if (searchLvl) {
                                                return (
                                                    s.stat == n &&
                                                    s.level == searchLvl
                                                );
                                            }
                                            return s.stat == n;
                                        }
                                    )}
                                    moveSpell={(spell) => {
                                        addToPinnedSpells(spell);
                                    }}
                                />
                            )}
                        </Tab.Panel>
                    );
                })}
            </Tab.Group>
        </>
    );
}
