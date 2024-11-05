import React, { useState, useEffect } from "react";
import { Button } from "../ui/Button/Button";
import json from "../../assets/OfflineJsons/traits.json";
import useApi from "../../hooks/useApi";
import { Item } from "../../client";
import { sortItems } from "../../util/sortingTools";
import { classNames } from "../../util/tableTools";


import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";
import ItemsTable from "./ItemsTable";
import { Tab } from "@headlessui/react";
import CleanCombobox from "../joshhellscapePages/CleanCombobox";
import { useItems } from "../../hooks/useItems";
import { eApiClass } from "../../types/ApiClassUnions";
import SearchGroup from "../search/SearchGroup";

const IterativeItemLevels = [
    "Weapon"
];

// pick 1
const wepBaseList = [
    "2 damage, two handed",
    "1 damage, (ignore 4 or less)",
    "1 damage, reaching, two handed",
    "1 damage, throw range 6",
    "1 damage, range 12, loading 1, autoload",
];

// Pick at most 2:
const wepSecList = [
    "",
    "+body, +1 damage ",
    "+body, +throw range 6",
    "+mind, +6 range, two handed",
    "+mind, +5 loading, -1 autoload",
    "+mind, -1 loading, -2 range, -1 autoload",
    "+soul, +glow",
];

// const wepSecListLoading = [
//     "+autoload",
// ];

const wepSecListRange = [
    "+launcher",
];


// "+soul, 9+: heal target for damage dealt",
// PICK 1
const wep9List = [ 
    "+soul, 9+: give the target 1 stack of Burn.",
    "9+: do 1 additional Damage",
    "9+: reduce the target's Armor by 2 then do damage.",
    "9+: give the target an additional 1 stack of Bleed.",
    "9+: Knockback the Target 2 tiles away from you.",
    "9+: give the target 1 stack of Stun. This effect does not stack on the same target.",
    "9+: you may Move 1 tile",
    "9+: give the target 1 stack of Slow.",
];


const wep9ListLoading = [ 
    "9+: roll a dice. If you roll less than or equal to the number of rounds left in this weapon, you may do another Attack with this weapon without spending more dice. This attack does not gain damage benefits such as ones gained from Rune of Power, Jackpot, or Critical. (Requires loading # (higher than 1))",
];

const wep9ListReaching = [ 
    "9+: you damage Target's in a line in front of you instead of just the first Target hit.",
];

// PICK 1
const wep4List = [ 
    "+soul, 4-: you mishandle the weapon, gain 1 stack of Burn.",
    "4-: you mishandle the weapon, gain 1 Bleed",
    "4-: you mishandle the weapon, gain 1 Slow",
];

const wep4ListLoading = [
    "4-: misfire spending 2 ammo instead of 1 on this shot.",
];

const wep4ListReaching = [
    "4-: you do not gain the benefit of Reaching. You have a Range of 1 instead of 2.",
];


export default function WepCreatorPage() {
    const { ItemsService } = useApi();

    const {
        allItems,
        pinnedItems,
        displayedItems,
        addToPinnedItems,
        removeFromPinnedItems,
        filterItems,
        resetFilterItems,
    } = useItems();


    const [curID, setCurID] = useState(0);
    const [nameText, setNameText] = useState("placeholder name");
    const [effectText, setEffectText] = useState("");
    const [reqs, setReqs] = useState("");
    const [craft, setCraft] = useState(0);
    const [cost, setCost] = useState(0);
    const [tags, setTags] = useState("tiny");
    const [curItem, setCurItem] = useState<Item>();


    const [wepBase, setWepBase] = useState("");
    const [wepSec, setWepSec] = useState("");
    const [wepSec2, setWepSec2] = useState("");
    const [wep9, setWep9] = useState("");
    const [wep4, setWep4] = useState("");
    const [wepSpecial, setWepSpecial] = useState("");
    


    function addToPinnedItem(s: Item) {
        setCurID(s.id);
        setNameText(s.name);
        setEffectText(s.effect.replace(/"/g, '') ?? "");
        setTags(s.tags.toString().replace(/ 0/gi, ""));
        setReqs(s.req.toString());
        setCost(s.cost);
        setCraft(s.craft);
    }

    function removeFromPinnedItem() {
        // Set inputs to nothing
        setCurID(0);
        setNameText("");
        // setEffectText("");
        // setTags("tiny");
        // setReqs("");
        setCost(0);
        setCraft(0);

        setWepBase("");
        setWepSec("");
        setWepSec2("");
        setWep9("");
        setWep4("");
        setWepSpecial("");
    }

    async function handleCreateNew() {
        console.log(curItem);
        if (curItem == undefined) {
            return;
        }
        if (curItem?.name != "") {
            const reply = await ItemsService.putItem({
                requestBody: curItem,
            });
            console.log(reply);
        }
        // Set inputs to nothing
        removeFromPinnedItem();
    }

    async function handleUpdate() {
        console.log(curItem);
        if (curItem == undefined) {
            return;
        }
        if (curItem?.name != "") {
            const reply = await ItemsService.updateItem({
                name: curItem?.name,
                requestBody: curItem,
            });
            console.log(reply);
        }
        // Set inputs to nothing
        removeFromPinnedItem();
    }

    async function handleDelete() {
        console.log(curItem);
        if (curItem?.id == undefined) {
            return;
        }
        if (curItem?.name != "") {
            const reply = await ItemsService.deleteItem({ id: curItem?.id });
            console.log(reply);
        }
        // Set inputs to nothing
        removeFromPinnedItem();
    }



    useEffect(() => {
         let tempEffect = (wepSpecial ? [wepSpecial] : []); // This is so we dont have a random empty newline at the beginning of the effect when there is no special text

        if (wepBase.includes("(ignore 4 or less)")){
            setEffectText([...tempEffect, wep9.replace("9+:","On a 9 or Higher:")].join("\n"));
        } else
            setEffectText([...tempEffect, wep4.replace("4-:","On a 4 or Less:"), wep9.replace("9+:","On a 9 or Higher:")].join("\n"));

        
    }, [wepBase, wep9, wep4, wepSpecial]);

    useEffect(() => {
        
        let parts = {
            "":0,
            "damage": 0,
            "throw": 0,
            "range": 0,
            "reaching": 0,
            "two": 0,
            "loading": 0,
            "autoload": 0,
            "glow": 0,
            "launcher": 0,
            "body": 0,
            "mind": 0,
            "soul": 0,
        };

        let tags = [...wepBase.split(", "),...wepSec.split(", "),...wepSec2.split(", ")];

        for(const tag of tags){
            // console.log(tag)
            const rxWord = /([a-z])\w+/g;
            const rxWordText = rxWord.exec(tag)
            const rxNum = /-?[0-9]\d*/g;
            const rxNumText = rxNum.exec(tag)
            
            // console.log(tag, rxWordText? rxWordText[0] : "", rxNumText? parseInt(rxNumText[0], 10) : 0)
            parts[String(rxWordText? rxWordText[0] : "")] += rxNumText? parseInt(rxNumText[0], 10) : 1 // idk why its grumpy
            
        }

        // console.log(parts)

        let finalTags = "";
        let reqTemp = "";

        for (const [key, value] of Object.entries(parts)) {
            // console.log(key, value);
            if (value > 0) {
                switch(key) {
                    case "": // just filler slots, does not need any code
                        break;
                    case "ignore": // just filler slots, does not need any code
                        break;
                    case "damage":
                        finalTags = finalTags.concat(",",String(value)," ",key)
                        break;
                    case "two":
                        finalTags = finalTags.concat(",","two handed")
                        break;
                    case "throw":
                        finalTags = finalTags.concat(",","throw range ",String(value))
                        break;
                    case "autoload":
                        finalTags = finalTags.concat(",","autoload")
                        break;
                    case "glow":
                        finalTags = finalTags.concat(",","glow")
                        break;
                    case "launcher":
                        finalTags = finalTags.concat(",","launcher")
                        break;
                    case "reaching":
                        finalTags = finalTags.concat(",","reaching")
                        break;
                    case "body":
                        reqTemp = reqTemp.concat(",","body ",String(value))
                        break;
                    case "mind":
                        reqTemp = reqTemp.concat(",","mind ",String(value))
                        break;
                    case "soul":
                        reqTemp = reqTemp.concat(",","soul ",String(value))
                        break;
                    default:
                        finalTags = finalTags.concat(",",key," ",String(value))
                } 
            }
        }
        // console.log(finalTags)
        setTags(finalTags.concat(",weapon,common"));
        setReqs(reqTemp);
        
    }, [wepBase, wepSec, wepSec2]);

    useEffect(() => {
        // console.log(mainStat,secondStat,otherDrop);
        const item = {
            id: curID,
            name: nameText.toLowerCase(),
            effect: effectText.replace(/"/g, ''),
            req: reqs.split(","),
            cost: cost,
            craft: craft,
            tags: tags.replace(/, /g, ',').split(","),
        };

        item.tags = item.tags.filter((str) => str !== "");
        item.req = item.req.filter((str) => str !== "");

        setCurItem(item);
    }, [curID, nameText, effectText, tags, reqs, cost, craft]);
    
    
    

    return (
        <div>
            <div className="bg-dark-400 rounded-lg p-4">

                {/* Name, Base, Core Bonuses */}
                <div className="flex justify-center content-center grid grid-cols-3 gap-4 w-[100%] bg-dark-300 rounded-lg p-4">
                    <div className="flex flex-col p-2">
                        <div>Name</div>
                        <input
                            type="text"
                            placeholder="Feather"
                            className="flex flex-row h-9 rounded-lg p-2 mt-1 w-[100%] shadow-md"
                            value={nameText}
                            onChange={(e) => setNameText(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex flex-col p-2">
                        <div >Pick 1 Base:</div>
                        <CleanCombobox
                            items={wepBaseList}
                            className="flex flex-row"
                            selected={wepBase}
                            setSelected={(val) => {
                                setWepBase(val);
                            }}
                        />
                    </div>

                    <div className="flex flex-col p-2">
                        <div>Pick up to 2 core bonuses:</div>
                        <CleanCombobox
                            items={[...wepSecList,...(tags.includes("range") ? wepSecListRange : [])]} // ,...(tags.includes("loading") ? wepSecListLoading : [])
                            className="flex flex-row"
                            selected={wepSec}
                            setSelected={(val) => {
                                setWepSec(val);
                            }}
                        />
                        <CleanCombobox
                            items={[...wepSecList,...(tags.includes("range") ? wepSecListRange : [])]} // ,...(tags.includes("loading") ? wepSecListLoading : [])
                            className="flex flex-row"
                            selected={wepSec2}
                            setSelected={(val) => {
                                setWepSec2(val);
                            }}
                        />
                    </div>
                    
                </div>
                
                {/* 9+/4- */}
                <div className="bg-dark-300 rounded-lg p-4 m-4">
                    <div className="flex flex-col p-2">
                        <div>Pick 1 9+:</div>
                        <CleanCombobox
                            items={[...wep9List,...(tags.includes("reaching") ? wep9ListReaching : []),...(tags.includes("loading") ? wep9ListLoading : [])]}
                            className="flex flex-row"
                            selected={wep9}
                            setSelected={(val) => {
                                setWep9(val);
                            }}
                        />
                    </div>
                    
                    <div className="flex flex-col p-2">
                        <div>Pick 1 4-:</div>
                        <CleanCombobox
                            items={[...wep4List,...(tags.includes("reaching") ? wep4ListReaching : []),...(tags.includes("loading") ? wep4ListLoading : []), ,...(tags.includes("1 damage") ? [] : ["4-: do 1 less Damage"])]}
                            className="flex flex-row"
                            selected={wep4}
                            setSelected={(val) => {
                                setWep4(val);
                            }}
                        />
                    </div>

                </div>

                <div className="">Bonus Effect:</div>
                <textarea
                    placeholder="A light little feather."
                    className="bg-dark-300 h-15 rounded-lg p-2 w-[95%] m-4"
                    value={wepSpecial}
                    onChange={(e) => setWepSpecial(e.target.value)}
                />
                {/* Button Set */}
                <div className="grid grid-cols-3 gap-4">
                    {displayedItems.filter((t) => t.name == curItem?.name)
                        .length > 0 ? (
                        <>
                            <span />
                            <Button
                                title="Delete"
                                className="flex flex-row"
                                variant={"body"}
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>
                            <Button
                                title="Update"
                                className="flex flex-row"
                                variant={"soul"}
                                onClick={handleUpdate}
                            >
                                Update
                            </Button>
                        </>
                    ) : (
                        <>
                            <span />
                            <span />
                            <Button
                                title="Create New"
                                className="flex flex-row"
                                variant={"nature"}
                                onClick={handleCreateNew}
                            >
                                Create New
                            </Button>
                        </>
                    )}
                </div>
            </div>

            <h1>Items</h1>

            {/* Main item */}
            {curItem?.tags && (
                <>
                    <div className="justify-start">
                        <h1>Active Item</h1>
                        <ItemsTable
                            displayedItems={[curItem]}
                            moveItem={()=>{
                                removeFromPinnedItem()
                            }}
                            moveIsAdd={false}
                        />
                        <hr />
                    </div>
                </>
            )}

            {/* wep list */}
            <Tab.Group as="div" className="w-full ">
                <div className="md:flex md:flex-column md:justify-between py-1 w-full align-middle">
                    <Tab.List className="p-1 gap-2 flex flex-wrap">
                        
                        {IterativeItemLevels.map((n, i) => {
                            return (
                                <Tab
                                    key={i}
                                    className={({ selected }) =>
                                        classNames(
                                            "hover:font-bold px-2 py-1 dark:bg-dark-600 bg-grey-400 rounded-md ring-light w-15",
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
                        tagList={[]}
                    />
                </div>
                <Tab.Panels>
                    
                    {IterativeItemLevels.map((n) => {
                        return (
                            <Tab.Panel>
                                <ItemsTable
                                    displayedItems={displayedItems.filter(
                                        (s) => {
                                            return s.tags
                                                ?.toString()
                                                .toLowerCase()
                                                .includes(n.toLowerCase());
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


