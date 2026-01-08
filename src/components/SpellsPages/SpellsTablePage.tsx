import { Button } from "../ui/Button/Button";
import { useSpells } from "../../hooks/useSpells";


import { useState} from "react";
// import { Spell} from "../../client";
import { classNames, download } from "../../util/tableTools";
import { eApiClass } from "../../types/ApiClassUnions";
import SearchGroup from "../search/SearchGroup";
import { Disclosure, Switch, Tab } from "@headlessui/react";
import SpellsTable from "../SpellsPages/SpellsTable";
import SpellCardHolder from "../SpellsPages/SpellCardStuff/artCardHolder";
import { ChevronIcon } from "../../assets/IconSVGs/heroiconsSVG";


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
    "Body",
    "Mind",
    "Soul",
    "Arcana",
    "Charm",
    "Crafting",
    "Medicine",
    "Nature",
    "Thieving",
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
            <div className="flex justify-center items-center">
                <div className="flex flex-row justify-center items-center bg-dark-400 rounded-md pl-4 p-2 m-2">
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

                    <div className="flex flex-row justify-center items-center bg-dark-300 rounded-md p-2 m-2">
                        {enabled && <p className="flex flex-row justify-center items-center m-2">Switch to Table</p>}
                        {!enabled && <p className="flex flex-row justify-center items-center m-2">Switch to Block</p>}
                        
                        <Switch
                            checked={enabled}
                            onChange={setEnabled}
                            className={`${
                                enabled ? 'bg-body' : 'bg-dark-700'
                            } relative inline-flex h-6 w-11 items-center rounded-full`}
                            >
                            <span className="sr-only">Switch to Block Mode</span>
                            <span
                                className={`${
                                enabled ? 'translate-x-6' : 'translate-x-1'
                                } inline-block h-4 w-4 transform rounded-full bg-light transition`}
                            />
                        </Switch>
                    </div>
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
                                        { enabled &&
                                            <SpellCardHolder 
                                                shownSpells={pinnedSpells}
                                                moveSpell={(spell) => {
                                                    removeFromPinnedSpells(spell);
                                                }}
                                            />
                                        }
                                        {!enabled &&
                                            <SpellsTable
                                                displayedSpells={pinnedSpells}
                                                moveSpell={(spell) => {
                                                    removeFromPinnedSpells(spell);
                                                }}
                                                moveIsAdd={false}
                                            />
                                        }
                                        
                                        {/* <hr /> */}
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    </div>
                    {/* Line */}
                    <div className="flex flex-row items-center bg-dark-600 border-2 border-body-700/20 mt-6 mb-6 w-full"></div>
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
                        {statList.map((n, i) => {
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
                    {/* Level */}
                    <div className="flex flex-row justify-center items-center bg-dark-600 rounded-md m-1">
                        <div className="capitalize m-1 ml-2">
                            Level
                        </div>
                        <input
                            type="number"
                            className="flex flex-row h-6 rounded-lg p-2 m-1 w-16 shadow-md"
                            value={searchLvl}
                            min="0"
                            onChange={(e) => setSearchLvl(parseInt(e.target.value))}
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
                    { enabled &&
                            <SpellCardHolder 
                                shownSpells={displayedSpells.filter(
                                    (s) => {
                                        if (searchLvl)
                                            return s.level == searchLvl;
                                        return true;
                                    }
                                )}
                                moveSpell={(spell) => {
                                    addToPinnedSpells(spell);
                                }}
                            />
                    }
                    {!enabled &&
                        <SpellsTable
                        displayedSpells={displayedSpells.filter(
                            (s) => {
                                if (searchLvl)
                                    return s.level == searchLvl;
                                return true;
                            }
                        )}
                        moveSpell={(spell) => {
                            addToPinnedSpells(spell);
                        }}
                    />
                    }
                    
                </Tab.Panel>
                {statList.map((n, i) => {
                    return (
                        <Tab.Panel key={i}>
                            { enabled &&
                                <SpellCardHolder shownSpells={displayedSpells.filter(
                                    (s) => {
                                        if (searchLvl){
                                            return (s.stat == n) && (s.level == searchLvl);
                                        }
                                        return s.stat == n;
                                    }
                                )} key={i}
                                moveSpell={(spell) => {
                                    addToPinnedSpells(spell);
                                }}
                                />
                            }
                            {!enabled &&
                                <SpellsTable
                                displayedSpells={displayedSpells.filter(
                                    (s) => {
                                        if (searchLvl){
                                            return (s.stat == n) && (s.level == searchLvl);
                                        }
                                        return s.stat == n;
                                    }
                                )}
                                moveSpell={(spell) => {
                                    addToPinnedSpells(spell);
                                }}
                                />
                            }
                        </Tab.Panel>
                    );
                })}
            </Tab.Group>


            
        </>
        
    );
}












