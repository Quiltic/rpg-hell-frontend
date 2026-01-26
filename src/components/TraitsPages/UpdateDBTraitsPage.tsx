import { useState, useEffect } from "react";
import { Trait } from "../../client";

import useApi from "../../hooks/useApi";

import { Tab } from "@headlessui/react";

import TraitsTable from "./TraitsTable";
import { Button } from "../ui/Button/Button";
import { classNames } from "../../util/tableTools";

import CleanCombobox from "../joshhellscapePages/CleanCombobox";
import { useTraits } from "../../hooks/useTraits";
import { eApiClass } from "../../types/ApiClassUnions";
import SearchGroup from "../search/SearchGroup";

function getTabWidth(lengthOfName: number) {
    return lengthOfName < 5 ? "w-12" : lengthOfName < 7 ? "w-16" : "w-20";
}


const displayedTrait = {
    "name":"",
    "req":"",
    
    "tags":"",

    "effect":"",
    "extra":"",
}


const statSkillList = [
    "",
    "base 0",
    "body 1",
    "mind 1",
    "soul 1",
    "arcana 1",
    "charm 1",
    "crafting 1",
    "medicine 1",
    "nature 1",
    "thieving 1",
    "body 2",
    "mind 2",
    "soul 2",
    "arcana 2",
    "charm 2",
    "crafting 2",
    "medicine 2",
    "nature 2",
    "thieving 2",
    "body 3",
    "mind 3",
    "soul 3",
    "arcana 3",
    "charm 3",
    "crafting 3",
    "medicine 3",
    "nature 3",
    "thieving 3",
    "body 4",
    "mind 4",
    "soul 4",
    "arcana 4",
    "charm 4",
    "crafting 4",
    "medicine 4",
    "nature 4",
    "thieving 4",
    "MONSTER 0",
];

const tagList = [
    "BROKEN",
];


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
    "MONSTER",
];

export default function UpdateDBTraitsPage() {

    const [curTrait, setCurTrait] = useState<Trait>( displayedTrait );


    const {
        displayedTraits,
        filterTraits,
        resetFilterTraits,
    } = useTraits();


    function addToPinnedTrait(t: Trait) {
        setCurTrait(t);
    }

    return (
        <>
            <div className="flex flex-col bg-dark-400 rounded-md border-solid border-2 border-body-700/20 m-4">
                <div className="grid w-full grid-cols-[1fr_1fr_1fr] items-center bg-dark rounded-md justify-between">
                    {/* Name */}
                    <div className="bg-dark-400 rounded-md m-2 p-2">
                        <div className="bg-dark-300 p-2 m-2 rounded-md">
                            <input
                                type="text"
                                placeholder="Name"
                                className="h-9 rounded-lg p-2 m-1 w-full shadow-md"
                                value={curTrait.name}
                                onChange={(e) => setCurTrait({...curTrait, name: e.target.value.toLowerCase()})}
                            />
                        </div>
                    </div>
                    {/* Req */}
                    <div className="bg-dark-400 rounded-md m-2 p-2"> 
                        <div className="flex flex-row bg-dark-300 rounded-md m-2 p-2">
                            <input
                                type="text"
                                placeholder="Body"
                                className="h-9 rounded-lg p-2 m-1 w-[100%] shadow-md"
                                value={curTrait.req}
                                onChange={(e) => setCurTrait({...curTrait, req: e.target.value})}
                            />
                            <CleanCombobox
                                items={statSkillList}
                                className="flex flex-row"
                                selected={""}
                                setSelected={(val) => {
                                    if (curTrait.req == "") {
                                        setCurTrait({...curTrait, req: val});
                                    } else {
                                        setCurTrait({...curTrait, req: curTrait.req?.concat(", ", val)});
                                    }
                                }}
                            />
                        </div>
                    </div>
                    {/* tags */}
                    <div className="bg-dark-400 rounded-md m-2 p-2"> 
                        <div className="flex flex-row bg-dark-300 rounded-md m-2 p-2">
                            <input
                                type="text"
                                placeholder="Tags"
                                className="h-9 rounded-lg p-2 m-1 w-[100%] shadow-md"
                                value={curTrait.tags}
                                onChange={(e) => setCurTrait({...curTrait, tags: e.target.value})}
                            />
                            <CleanCombobox
                                items={tagList}
                                className="flex flex-row"
                                selected={""}
                                setSelected={(val) => {
                                    if (curTrait.tags == "") {
                                        setCurTrait({...curTrait, tags: val});
                                    } else {
                                        setCurTrait({...curTrait, tags: curTrait.tags?.concat(", ", val)});
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
                        placeholder="**Reminder** - Whip around like a Yoyo!

Upgrade ? - Weeeee!"
                        className="bg-dark-300 h-44 rounded-lg p-1 m-1"
                        value={curTrait.effect}
                        onChange={(e) => setCurTrait({...curTrait, effect: e.target.value})}
                    />
                </div>

                {/* <Popup displayedContentName={popupName} displayedContent={popupData} popupIsOpen={popupIsOpen} setPopupIsOpen={(val) => {setPopupIsOpen(val);}} /> */}
            </div>
            
            
            <textarea name="json" id="json" className="w-full bg-dark-600 rounded-md border-solid border-2 border-body-700/20 h-44 m-4 p-2" value={JSON.stringify(curTrait).concat(",")}/>
            
            <div className="flex justify-center">
                <Button
                    title="Clear"
                    className="w-[20%]"
                    variant={"medicine"}
                    onClick={() => { setCurTrait(displayedTrait);}}
                >
                    Clear
                </Button>
            </div>


            <h1>Traits</h1>

            <Tab.Group as="div" className="w-full ">
                <div className="md:flex md:flex-column md:justify-between py-1 w-full align-middle">
                    <Tab.List className="p-1 gap-2 flex flex-wrap">
                        <Tab
                            className={({ selected }) =>
                                classNames(
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
                                        classNames(
                                            "hover:font-bold px-1 py-1 w-16 bg-dark-600 rounded-md ring-light",
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
                    <SearchGroup 
                        filter={filterTraits} 
                        resetFilter={resetFilterTraits}
                        filterClass={eApiClass.Trait}
                        tagList={[]}
                    />
                </div>
                <Tab.Panels>
                    <Tab.Panel>
                        <TraitsTable
                            displayedTraits={displayedTraits}
                            moveTrait={(trait) => {
                                addToPinnedTrait(trait);
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
                                                .toLowerCase()
                                                .includes(n.toLowerCase());
                                        }
                                    )}
                                    moveTrait={(trait) => {
                                        addToPinnedTrait(trait);
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
