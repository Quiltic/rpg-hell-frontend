import { useState, useEffect } from "react";
import { Item } from "../../client";

import useApi from "../../hooks/useApi";

import { Tab } from "@headlessui/react";

import ItemsTable from "./ItemsTable";
import { Button } from "../ui/Button/Button";
import { classNames } from "../../util/tableTools";

import CleanCombobox from "../joshhellscapePages/CleanCombobox";
import { eApiClass } from "../../types/ApiClassUnions";
import SearchGroup from "../search/SearchGroup";
import { useItems } from "../../hooks/useItems";

const displayedItem = {
        "name": "",
        "description": "",
        "effect": "",
        "upgrades": [
            ""
        ],
        "tags": "",
        "rarity": "mundane",
        "cost": 0
    }

const rarityTiers = [
    "mundane",
    "common",
    "uncommon",
    "rare",
    "legendary"
]

const tagList = [
    "weapon",
    "armor",
    "medicine",
    "alchemical",
    "consumable",
    "tool",
    "mysc",
    "magical",
    "body _",
    "mind _",
    "soul _",
    "arcana _",
    "charm _",
    "crafting _",
    "medicine _",
    "nature _",
    "thieving _",
    "MONSTER",
    "BROKEN",
    "OOC",
    "tiny",
    "small",
    "medium",
    "large",
    "huge",
    "bigabongus",
    "complex",
    "vehicle",
    "bound",
    "loading _",
    "range _",
    "two handed",
    "throw range _",
    "glow",
    "side",
    "upgraded",
    "unique",
];

const IterativeItemLevels = [
    "weapon",
    "armor",
    "medicine",
    "alchemical",
    "consumable",
    "tool",
    "mysc",
    "magical",
];

export default function UpdateDBItemsPage() {
    
    const [curItem, setCurItem] = useState<Item>( displayedItem );

    const [searchRare, setSearchRare] = useState("");


    function addToPinnedItem(s: Item) {
        setCurItem(s);
    }
    
    const {
        displayedItems,
        filterItems,
        resetFilterItems,
    } = useItems();

    return (
        <div className="flex flex-col">
            {/* Updater */}
            <div className="flex flex-col bg-dark-400 rounded-md border-solid border-2 border-body-700/20 m-4" >
                <div className="grid w-full grid-cols-[3fr_1fr] items-center bg-dark rounded-md justify-between">
                    {/* Name/Activators/Level/Stat */}
                    <div className="flex flex-col bg-dark-400 rounded-md m-2 p-2">
                        {/* Name */}
                        <div className="bg-dark-300 p-2 m-1 rounded-md">
                            <input
                                type="text"
                                placeholder="Name"
                                className="h-9 rounded-lg p-2 m-1 w-[100%] shadow-md"
                                value={curItem.name}
                                onChange={(e) => setCurItem({...curItem, name: e.target.value.toLowerCase()})}
                            />
                        </div>
                        

                        {/* Tags */}
                        <div className="flex flex-row justify-center items-center w-auto">
                            <div className="grid w-full grid-cols-[3fr_1fr] bg-dark-300 rounded-md m-2 p-2">
                                <input
                                    type="text"
                                    placeholder="Tags"
                                    className="h-9 rounded-lg p-1 mt-1 w-auto shadow-md m-1"
                                    value={curItem.tags}
                                    onChange={(e) => setCurItem({...curItem, tags: e.target.value})}
                                />
                                <CleanCombobox
                                    items={tagList}
                                    className=""
                                    selected={""}
                                    setSelected={(val) => {
                                        if (curItem.tags == "") {
                                            setCurItem({...curItem, tags: val});
                                        } else {
                                            setCurItem({...curItem, tags: curItem.tags?.concat(", ", val)});
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col bg-dark-400 rounded-md m-2 p-2">
                        <div className="flex flex-row justify-center items-center bg-dark-300 rounded-md m-1">
                            {/* rarity */}
                            <CleanCombobox
                                items={rarityTiers}
                                className="m-1 mb-2 w-auto"
                                selected={curItem.rarity}
                                setSelected={(val) => {
                                    setCurItem({...curItem, rarity: val})
                                }}
                            />
                        </div>

                        {/* cost */}
                        <div className="flex flex-row justify-center items-center bg-dark-300 rounded-md m-1">
                            <div className="capitalize m-1 ml-2">
                                Cost
                            </div>
                            <input
                                type="number"
                                className="flex flex-row h-9 rounded-lg p-2 m-1 w-16 shadow-md"
                                value={curItem.cost}
                                min="0"
                                onChange={(e) => setCurItem({...curItem, cost: parseInt(e.target.value)})}
                            />
                        </div>
                    </div>

                </div>
                {/* Effect */}
                <div className="flex flex-col bg-dark-400 rounded-md p-1 m-2">
                    <h3 className="font-bold bg-dark-300 rounded-md p-1 m-1">EFFECT</h3>
                    <textarea
                        placeholder="What item do?"
                        className="bg-dark-300 h-44 rounded-lg p-1 m-1"
                        value={curItem.effect}
                        onChange={(e) => setCurItem({...curItem, effect: e.target.value})}
                    />
                </div>
                <div className="grid w-full grid-cols-[1fr_1fr]">
                    {/* Description */}
                    <div className="flex flex-col bg-dark-400 rounded-md p-1 m-2">
                        <h3 className="font-bold bg-dark-300 rounded-md p-1 m-1">Description</h3>
                        <textarea
                            placeholder="**Reminder** - Text here will become italics, use this for how to describe the item"
                            className="bg-dark-300 h-22 rounded-lg p-1 m-1"
                            value={curItem.description}
                            onChange={(e) => setCurItem({...curItem, description: e.target.value})}
                        />
                    </div>
                    {/* Upgrades */}
                    <div className="flex flex-col bg-dark-400 rounded-md p-1 m-2">
                        <h3 className="font-bold bg-dark-300 rounded-md p-1 m-1">Upgrades</h3>
                        <textarea
                            placeholder="**Reminder** (right now there is only 1 upgrade in this slot. IM LAZY) - Upgrade_Name - Effect"
                            className="bg-dark-300 h-22 rounded-lg p-1 m-1"
                            value={curItem.upgrades}
                            onChange={(e) => setCurItem({...curItem, upgrades: [e.target.value]})}
                        />
                    </div>
                </div>

            </div>
            

            


            <textarea name="json" id="json" className="bg-dark-600 rounded-md border-solid border-2 border-body-700/20 h-44 m-4 p-2" value={JSON.stringify(curItem).concat(",")}/>

            <div className="flex justify-center">
                <Button
                    title="Clear"
                    className="w-[20%]"
                    variant={"medicine"}
                    onClick={() => { setCurItem(displayedItem);}}
                >
                    Clear
                </Button>
            </div>
            
            
            <h1>Items</h1>

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
                        {IterativeItemLevels.map((n, i) => {
                            return (
                                <Tab
                                    key={i}
                                    className={({ selected }) =>
                                        classNames(
                                            "w-16 rounded-md bg-body-700/20 p-2 px-1 py-1 ring-aabase hover:font-bold dark:bg-dark-600 capitalize w-auto",
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
                    <SearchGroup 
                        filter={filterItems} 
                        resetFilter={resetFilterItems}
                        filterClass={eApiClass.Item}
                        tagList={tagList}
                    />
                </div>
                <Tab.Panels>
                    <Tab.Panel>
                        <ItemsTable
                            displayedItems={displayedItems}
                            moveItem={(item) => {
                                addToPinnedItem(item);
                            }}
                        />
                    </Tab.Panel>
                    {IterativeItemLevels.map((n, i) => {
                        return (
                            <Tab.Panel key={i}>
                                <ItemsTable
                                    displayedItems={displayedItems.filter(
                                        (s) => {
                                            return s.tags.includes(n);
                                        }
                                    )}
                                    moveItem={(item) => {
                                        addToPinnedItem(item);
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
