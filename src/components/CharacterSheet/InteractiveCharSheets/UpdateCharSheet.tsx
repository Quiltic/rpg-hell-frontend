

import { useEffect, useState} from "react";
import {Creature } from "../../../client";
import { classNames} from "../../../util/tableTools";
import CleanCombobox from "../../joshhellscapePages/CleanCombobox";
import { eApiClass } from "../../../types/ApiClassUnions";
import SearchGroup from "../../search/SearchGroup";
import { Tab } from "@headlessui/react";
import { useCreatures } from "../../../hooks/useCreatures";
import CreaturesTable from "./CreaturesTable";
import { Button } from "../../ui/Button/Button";
import { Trait, Item, Spell } from "../../../client";


const IterativeCreatureLevels = [
        "Humanoid",
        "Animal",
        "Construct",
        "Monstrosity",
        "Planar",
        "Undead",
        "Mythic",
    ];


const example_displayedCreature = {
    "name":"",
    "level":1,
    "health":0,
    "shielding":0,
    "dodge":0,
    "ward":0,
    "strain":0,
    "speed":6,
    "stats": {
       "body":0,
        "mind":0,
        "soul":0,
        "arcana":0,
        "crafting":0,
        "charm":0,
        "nature":0,
        "medicine":0,
        "thieving":0 
    },
    "traits":"",
    "arts":"",
    "items":"",
    "stories":"",
    "description":"",
    "notes":""
}

type Props = {
    _displayedCreature: any;
    traits: Trait[];
    arts: Spell[];
    items: Item[];
};

export default function InteractiveCharSheet({
    _displayedCreature: _displayedCreature = example_displayedCreature,
}: Props) {  



    const [curCreature, setCurCreature] = useState( _displayedCreature );


    const [maxMain, setMaxMain] = useState(2);

    useEffect(() => {
        setMaxMain(2+Math.floor((curCreature.level-1)/2));
    }, [curCreature.level]);


    return (
        <div className="flex flex-col">
            <div className="flex flex-col bg-dark-400 rounded-md border-solid border-2 border-body-700/20 m-4" >
                
                {/* Name/Level/Types */}
                <div className="flex flex-row items-center bg-dark rounded-md">
                    
                    <div className="w-[50%] rounded-lg bg-dark-400 p-2 m-2 ">
                        <input
                            type="text"
                            placeholder="NAME"
                            className="h-9 w-[100%] p-2 rounded-lg shadow-md"
                            value={curCreature.name}
                            onChange={(e) => setCurCreature({...curCreature, name: e.target.value})}
                        />
                    </div>
                    
                
                    <div className="w-[17%] flex flex-row items-center rounded-md bg-dark-400 items-center capitalize p-2 m-2">
                        Level: 
                        <input
                            type="number"
                            className="h-9 w-[100%] rounded-lg p-2 mt-1 shadow-md justify-end m-1"
                            value={curCreature.level}
                            min="1"
                            max="10"
                            onChange={(e) => setCurCreature({...curCreature, level: parseFloat(e.target.value)})}
                        />
                    </div>
                    {/* <div className="w-[33%] flex flex-row items-center capitalize rounded-md bg-dark-400 p-2 m-2">
                        <input
                            type="text"
                            placeholder="Types"
                            className="h-9 rounded-lg p-2 m-1 shadow-md"
                            value={curCreature.types}
                            onChange={(e) => setCurCreature({...curCreature, types: e.target.value})}
                        />
                        <CleanCombobox
                            items={IterativeCreatureLevels}
                            className=""
                            selected={""}
                            setSelected={(val) => {
                                if (curCreature.types == "") {
                                    setCurCreature({...curCreature, types: val});
                                } else {
                                    setCurCreature({...curCreature, types: curCreature.types.concat(", ", val)});
                                }
                            }}
                        />
                    </div> */}
                </div>
                <div className="grid grid-cols-2 gap-1  bg-dark">
                    {/* Stats */}
                    <div className="flex flex-col justify-between m-1 p-1">

                        {/* Scores */}
                        <div className="grid grid-cols-3 gap-1 justify-left bg-dark-400 p-3 rounded-md flex-wrap w-full m-2 mt-0">    
                            <div className="bg-body font-bold rounded-xl p-1 m-1 pl-2 pr-2">
                                Body:
                                <input
                                    type="number"
                                    className="bg-body h-9 rounded-lg justify-end m-1 p-2"
                                    value={curCreature.stats.body}
                                    min="0"
                                    max={maxMain - (curCreature.stats.mind+curCreature.stats.soul)}
                                    onChange={(e) => setCurCreature({...curCreature, stats: {...curCreature.stats, body: parseFloat(e.target.value)}})}
                                />
                            </div>
                            <div className="bg-mind font-bold rounded-xl p-1 m-1 pl-2 pr-2">
                                Mind:
                                <input
                                    type="number"
                                    className="bg-mind h-9 rounded-lg justify-end m-1 p-2"
                                    value={curCreature.stats.mind}
                                    min="0"
                                    max={maxMain - (curCreature.stats.body+curCreature.stats.soul)}
                                    onChange={(e) => setCurCreature({...curCreature, stats: {...curCreature.stats, mind: parseFloat(e.target.value)}})}
                                />
                            </div>
                            <div className="bg-soul font-bold rounded-xl p-1 m-1 pl-2 pr-2">
                                Soul:
                                <input
                                    type="number"
                                    className="bg-soul h-9 rounded-lg justify-end m-1 p-2"
                                    value={curCreature.stats.soul}
                                    min="0"
                                    max={maxMain - (curCreature.stats.body+curCreature.stats.mind)}
                                    onChange={(e) => setCurCreature({...curCreature, stats: {...curCreature.stats, soul: parseFloat(e.target.value)}})}
                                />
                            </div>
                            <div className="bg-arcana font-bold rounded-xl p-1 m-1 pl-2 pr-2">
                                Arcana:
                                <input
                                    type="number"
                                    className="bg-arcana h-9 rounded-lg justify-end m-1 p-2"
                                    value={curCreature.stats.arcana}
                                    min="-4"
                                    max="6"
                                    onChange={(e) => setCurCreature({...curCreature, stats: {...curCreature.stats, arcana: parseFloat(e.target.value)}})}
                                />
                            </div>
                            <div className="bg-charm font-bold rounded-xl p-1 m-1 pl-2 pr-2">
                                Charm:
                                <input
                                    type="number"
                                    className="bg-charm h-9 rounded-lg justify-end m-1 p-2"
                                    value={curCreature.stats.charm}
                                    min="-4"
                                    max="6"
                                    onChange={(e) => setCurCreature({...curCreature, stats: {...curCreature.stats, charm: parseFloat(e.target.value)}})}
                                />
                            </div>
                            <div className="bg-crafting font-bold rounded-xl p-1 m-1 pl-2 pr-2">
                                Crafting:
                                <input
                                    type="number"
                                    className="bg-crafting h-9 rounded-lg justify-end m-1 p-2"
                                    value={curCreature.stats.crafting}
                                    min="-4"
                                    max="6"
                                    onChange={(e) => setCurCreature({...curCreature, stats: {...curCreature.stats, crafting: parseFloat(e.target.value)}})}
                                />
                            </div>
                            <div className="bg-medicine font-bold rounded-xl p-1 m-1 pl-2 pr-2">
                                Medicine:
                                <input
                                    type="number"
                                    className="bg-medicine h-9 rounded-lg justify-end m-1 p-2"
                                    value={curCreature.stats.medicine}
                                    min="-4"
                                    max="6"
                                    onChange={(e) => setCurCreature({...curCreature, stats: {...curCreature.stats, medicine: parseFloat(e.target.value)}})}
                                />
                            </div>
                            <div className="bg-nature font-bold rounded-xl p-1 m-1 pl-2 pr-2">
                                Nature: 
                                <input
                                    type="number"
                                    className="bg-nature h-9 rounded-lg justify-end m-1 p-2"
                                    value={curCreature.stats.nature}
                                    min="-4"
                                    max="6"
                                    onChange={(e) => setCurCreature({...curCreature, stats: {...curCreature.stats, nature: parseFloat(e.target.value)}})}
                                />
                            </div>
                            <div className="flex flex-row items-center bg-thieving font-bold rounded-xl p-1 m-1 pl-2 pr-2">
                                Thieving:
                                <input
                                    type="number"
                                    className="bg-thieving h-9 rounded-lg justify-end m-1 p-2"
                                    value={curCreature.stats.thieving}
                                    min="-4"
                                    max="6"
                                    onChange={(e) => setCurCreature({...curCreature, stats: {...curCreature.stats, thieving: parseFloat(e.target.value)}})}
                                />
                            </div>
                        </div>

                        {/* HP/Shielding/Dodge/Ward */}
                        <div className="flex flex-col justify-between bg-dark-400 m-2 p-2 w-full rounded-md">
                            
                            <div className="flex flex-row w-full justify-between">
                                {curCreature.health != 0 && 
                                    <div className="bg-dark-300 p-2 rounded-md">
                                        HEALTH: {curCreature.health}
                                    </div>
                                }
                                {curCreature.health == 0 &&
                                    <div className="bg-dark-300 p-2 rounded-md">
                                        HEALTH: {4*curCreature.stats.body+3*curCreature.stats.mind+2*curCreature.stats.soul+Math.ceil(curCreature.level)}
                                    </div>
                                }
                                <div className="bg-dark-300 p-2 rounded-md">
                                    <div className="flex flex-row items-center">
                                        SHIELDING: 
                                        <input
                                            type="number"
                                            className="flex flex-row h-9 rounded-lg p-2 mt-1 shadow-md justify-end m-1"
                                            value={curCreature.shielding}
                                            min="0"
                                            onChange={(e) => setCurCreature({...curCreature, shielding: parseFloat(e.target.value)})}
                                        />
                                    </div>
                                </div>
                            </div>
                            

                            <div className="bg-dark-300 p-2 rounded-md">
                                <div className="flex flex-row items-center">
                                    DODGE: 
                                </div>
                            </div>
                            
                            { curCreature.ward > 0 &&
                                <div className="bg-dark-300 p-2 rounded-md">
                                    WARD: {curCreature.ward}
                                </div>
                            }
                        </div>

                        {/* Strain/Speed/Combat Dice */}
                        <div className="flex flex-col justify-between">
                            {curCreature.strain != 0 && 
                                <div className="bg-dark-300 p-2 rounded-md">
                                    STRAIN: {curCreature.strain}
                                </div>
                            }
                            {curCreature.strain == 0 &&
                                <div className="bg-dark-300 p-2 rounded-md">
                                    STRAIN: {2*curCreature.stats.body+3*curCreature.stats.mind+4*curCreature.stats.soul+Math.ceil(curCreature.level)}
                                </div>
                            }
                            
                            <div className="flex flex-col bg-dark-300 p-2 rounded-md">
                                <div className="flex flex-row items-center">
                                    SPEED: 
                                    <input
                                        type="number"
                                        className="flex flex-row h-9 rounded-lg p-2 mt-1 shadow-md justify-end m-1"
                                        value={curCreature.speed}
                                        min="0"
                                        onChange={(e) => setCurCreature({...curCreature, speed: parseFloat(e.target.value)})}
                                    />
                                </div>
                                
                                
                                
                                {/* { curCreature.passives.includes("swim") &&
                                <div>Can Swim</div>
                                }
                                
                                {curCreature.passives.includes("climb") &&
                                <div>Can Climb</div>
                                }
                                
                                {(curCreature.passives.includes("flight") || curCreature.passives.includes("fly")) &&
                                <div>Can Fly</div>
                                } */}
                            </div>

                            <div className="flex flex-row items-center bg-dark-300 p-2 rounded-md">
                                CD: {4+Math.floor(curCreature.level/2)}
                            </div>

                        </div>

                    </div>
                    {/* Stories */}
                    <div className="flex flex-col bg-dark-400 rounded-md p-1 m-2">
                        <h3 className="font-bold bg-dark-300 rounded-md p-1 m-1">
                            <a href="https://quiltic.github.io/rpg-hell-frontend/rulebook/character-creation#stories">
                                Stories
                            </a>
                        </h3>
                        <textarea
                            placeholder="Here is a spot for your Stories!
There is a link above for what a Story is!"
                            className="bg-dark-300 h-full rounded-lg p-1 m-1"
                            value={curCreature.stories}
                            onChange={(e) => setCurCreature({...curCreature, stories: e.target.value})}
                        />
                    </div>
                </div>

                {/* Descriptor/How Act */}
                {/* <div className="flex flex-row italic bg-dark-400 m-2 ptlr-2">
                    <textarea
                        placeholder="Description of the creature and hints for narration for the GM."
                        className="bg-dark-300 h-22 w-[100%] rounded-lg p-1 m-1"
                        value={curCreature.descriptor}
                        onChange={(e) => setCurCreature({...curCreature, descriptor: e.target.value})}
                    />
                </div>
                <div className="flex flex-row italic bg-dark-400 pl-12">
                    <textarea
                        placeholder="How the creature should act; Group, Dangerous, Fishlike, Hungry"
                        className="bg-dark-300 h-9 w-[50%] rounded-lg p-1 m-1"
                        value={curCreature.how_act}
                        onChange={(e) => setCurCreature({...curCreature, how_act: e.target.value})}
                    />
                </div> */}


                {/* Line */}
                <div className="flex flex-row items-center bg-dark-400 border-2 border-body-700/20 m-2"></div>

                

                <div className="grid grid-cols-2 items-center bg-dark rounded-md justify-between">
                    {/* Active */}
                    <div className="flex flex-col bg-dark-400 rounded-md p-1 m-2">
                        <h3 className="font-bold bg-dark-300 rounded-md p-1 m-1">ACTIVES</h3>
                        <textarea
                            placeholder="**Reminder** - Spend ## and 3 Strain; You this is how actives should look."
                            className="bg-dark-300 h-44 rounded-lg p-1 m-1"
                            value={curCreature.arts}
                            onChange={(e) => setCurCreature({...curCreature, arts: e.target.value})}
                        />
                    </div>
                        
                    {/* Passive */}
                    <div className="flex flex-col bg-dark-400 rounded-md p-1 m-2">
                        <h3 className="font-bold bg-dark-300 rounded-md p-1 m-1">PASSIVES</h3>
                        <textarea
                            placeholder="**Reminder** - You this is how passives should look."
                            className="bg-dark-300 h-44 rounded-lg p-1 m-1"
                            value={curCreature.traits}
                            onChange={(e) => setCurCreature({...curCreature, traits: e.target.value})}
                        />
                    </div>
                </div>

            </div>

            <textarea name="json" id="json" className="bg-dark-600 rounded-md border-solid border-2 border-body-700/20 h-44 m-4 p-2" value={JSON.stringify(curCreature).concat(",")}/>

            <div className="flex justify-center">
                <Button
                    title="Clear"
                    className="w-[20%]"
                    variant={"medicine"}
                    onClick={() => {setCurCreature(_displayedCreature)}}
                >
                    Clear
                </Button>
            </div>
        </div>
    );
}


