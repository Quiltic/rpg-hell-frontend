import { Button } from "../ui/Button/Button";
import { useSpells } from "../../hooks/useSpells";

import { useState, useEffect } from "react";
import { Spell } from "../../client";
import { classNames } from "../../util/tableTools";
import { eApiClass } from "../../types/ApiClassUnions";
import SearchGroup from "../search/SearchGroup";
import { Tab } from "@headlessui/react";
import SpellsTable from "./SpellsTable";
import CleanCombobox from "../joshhellscapePages/CleanCombobox";


const displayedArt = {
    "name":"",
    "level":1,
    "stat":"body",
    
    "tags":"",
    "strain":0,
    "dice":0,

    "effect":"Spend ## and 1 Strain; ",
    "activators":0
}

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
    "follower",
    "MONSTER",
    "BROKEN",
];

const IterativeSpellLevels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function getTabWidth(lengthOfName: number) {
    return lengthOfName < 5 ? "w-12" : lengthOfName < 7 ? "w-16" : "w-20";
}

export default function UpdateArtPage() {
    
    const [curArt, setCurArt] = useState<Spell>( displayedArt );
    
    const [gestureCheck, setgesCheck] = useState<boolean>( false );
    const [verbalCheck, setVerbalCheck] = useState<boolean>( false );
    const [lightCheck, setLightCheck] = useState<boolean>( false );

    const [searchLvl, setSearchLvl] = useState(0);

    
    const {
            displayedSpells,
            filterSpells,
            resetFilterSpells,
        } = useSpells();

    function addToPinnedSpell(s: Spell) {
        setCurArt(s);
    }

    useEffect(() => {
        
        var snipit = curArt.effect.substring(0,curArt.effect.indexOf(";"));
        
        var strainSnip = snipit.search(/([0-9]*) Strain/g);
        var strain = parseInt(snipit.substring(strainSnip,strainSnip+8).replace(" Strain",""));
        // console.log(!isNaN(strain));

        var dice = snipit.match(/#/g)?.length;
        
        setCurArt({...curArt, strain: !isNaN(strain) ? strain : 0, dice: dice ? dice : 0})
    }, [curArt.effect]);

    return (
        <div className="flex flex-col">

            {/* Updater */}
            <div className="flex flex-col bg-dark-400 rounded-md border-solid border-2 border-body-700/20 m-4" >
                <div className="grid w-full grid-cols-[3fr_1fr_2fr] items-center bg-dark rounded-md justify-between">
                    {/* Name/Activators/Level/Stat */}
                    <div className="flex flex-col bg-dark-400 rounded-md m-2 p-2">
                        {/* Name */}
                        <div className="bg-dark-300 p-2 m-1 rounded-md">
                            <input
                                type="text"
                                placeholder="Name"
                                className="h-9 rounded-lg p-2 m-1 w-[100%] shadow-md"
                                value={curArt.name}
                                onChange={(e) => setCurArt({...curArt, name: e.target.value.toLowerCase()})}
                            />
                        </div>
                        

                        {/* Activators/Level/Stat */}
                        <div className="flex flex-row justify-center items-center">
                            {/* Activators */}
                            <div className="flex flex-row justify-left items-center bg-dark-300 rounded-md w-auto m-1 p-2 ">
                                <input id="gesture"
                                    type="checkbox" 
                                    className="w-4 h-4 accent-body"
                                    checked={gestureCheck}
                                    onChange={() => {
                                        setgesCheck(!gestureCheck);
                                        setCurArt({...curArt, activators: curArt.activators+(gestureCheck ? -1 : 1)});
                                    }}
                                    />
                                <label htmlFor="gesture" 
                                    className="ms-2 text-sm font-medium ">
                                    Gesture
                                </label>
                            </div>
                            <div className="flex flex-row justify-left items-center bg-dark-300 rounded-md w-auto m-1 p-2 ">
                                <input id="gesture"
                                    type="checkbox" 
                                    className="w-4 h-4 accent-mind"
                                    checked={verbalCheck}
                                    onChange={() => {
                                        setVerbalCheck(!verbalCheck);
                                        setCurArt({...curArt, activators: curArt.activators+(verbalCheck ? -2 : 2)});
                                    }}
                                    />
                                <label htmlFor="gesture" 
                                    className="ms-2 text-sm font-medium ">
                                    Verbal
                                </label>
                            </div>
                            <div className="flex flex-row justify-left items-center bg-dark-300 rounded-md w-auto m-1 p-2 ">
                                <input id="gesture"
                                    type="checkbox" 
                                    className="w-4 h-4 accent-soul"
                                    checked={lightCheck}
                                    onChange={() => {
                                        setLightCheck(!lightCheck);
                                        setCurArt({...curArt, activators: curArt.activators+(lightCheck ? -4 : 4)});
                                    }}
                                    />
                                <label htmlFor="gesture" 
                                    className="ms-2 text-sm font-medium ">
                                    Light
                                </label>
                            </div>
                            
                            {/* Stat */}
                            <CleanCombobox
                                items={statList}
                                className="m-1 mb-2"
                                selected={curArt.stat}
                                setSelected={(val) => {
                                    setCurArt({...curArt, stat: val})
                                }}
                            />

                            {/* Level */}
                            <div className="flex flex-row justify-center items-center bg-dark-300 rounded-md m-1">
                                <div className="capitalize m-1 ml-2">
                                    Level
                                </div>
                                <input
                                    type="number"
                                    className="flex flex-row h-9 rounded-lg p-2 m-1 w-16 shadow-md"
                                    value={curArt.level}
                                    min="1"
                                    onChange={(e) => setCurArt({...curArt, level: parseInt(e.target.value)})}
                                />
                            </div>
                        </div>
                            
                    </div>
                    {/* Dice/Strain */}
                    <div className="flex flex-col bg-dark-400 rounded-md m-2 p-2">
                        <p className="bg-dark-300 rounded-md m-2 p-2">
                            Dice {curArt.dice}
                        </p>
                        <p className="bg-dark-300 rounded-md m-2 p-2">
                            Strain {curArt.strain}
                        </p>
                    </div>
                    {/* Tags */}
                    <div className="bg-dark-400 rounded-md m-2 p-2"> 
                        <div className="flex flex-col bg-dark-300 rounded-md m-2 p-2">
                            <input
                                type="text"
                                placeholder="Tags"
                                className="flex flex-row h-9 rounded-lg p-2 mt-1 w-[100%] shadow-md"
                                value={curArt.tags}
                                onChange={(e) => setCurArt({...curArt, tags: e.target.value})}
                            />
                            <CleanCombobox
                                items={tagList}
                                className="flex flex-row"
                                selected={""}
                                setSelected={(val) => {
                                    if (curArt.tags == "") {
                                        setCurArt({...curArt, tags: val});
                                    } else {
                                        setCurArt({...curArt, tags: curArt.tags?.concat(", ", val)});
                                    }
                                }}
                            />
                        </div>
                        
                    </div>

                </div>
                {/* Effect */}
                <div className="flex flex-col bg-dark-400 rounded-md p-1 m-2">
                    <h3 className="font-bold bg-dark-300 rounded-md p-1 m-1">EFFECT</h3>
                    <textarea
                        placeholder="**Reminder** - Spend ## and 3 Strain;"
                        className="bg-dark-300 h-44 rounded-lg p-1 m-1"
                        value={curArt.effect}
                        onChange={(e) => setCurArt({...curArt, effect: e.target.value})}
                    />
                </div>

            </div>
            

            


            <textarea name="json" id="json" className="bg-dark-600 rounded-md border-solid border-2 border-body-700/20 h-44 m-4 p-2" value={JSON.stringify(curArt).concat(",")}/>

            <div className="flex justify-center">
                <Button
                    title="Clear"
                    className="w-[20%]"
                    variant={"medicine"}
                    onClick={() => { setCurArt(displayedArt); setgesCheck(false); setVerbalCheck(false); setLightCheck(false); }}
                >
                    Clear
                </Button>
            </div>
            
            
            <h1>Arts</h1>

            <Tab.Group as="div" className="w-full ">
                <div className="md:flex md:flex-column md:justify-between py-1 w-full align-middle">
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
                <Tab.Panels>
                    <Tab.Panel>
                        <SpellsTable
                            displayedSpells={displayedSpells.filter(
                                (s) => {
                                    if (searchLvl)
                                        return s.level == searchLvl;
                                    return true;
                                }
                            )}
                            moveSpell={(spell) => {
                                addToPinnedSpell(spell);
                            }}
                        />
                    </Tab.Panel>
                    {statList.map((n, i) => {
                        return (
                            <Tab.Panel key={i}>
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
                                        addToPinnedSpell(spell);
                                    }}
                                />
                            </Tab.Panel>
                        );
                    })}
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
}


