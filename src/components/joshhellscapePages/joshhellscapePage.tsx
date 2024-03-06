
import React, { useState, useEffect } from "react";
import { Creature } from "../../client";
import { getPersistentPinnedNames } from "../../util/tableTools";
import CleanCombobox from "../joshhellscapePages/CleanCombobox";
import CharacterSheetStatIncrementor from "../CharacterSheet/CharacterSheetStatIncrementor";

const initialFormData = {
    name: "",
    race: "",
    level: 0,
    body: 0,
    mind: 0,
    soul: 0,
    arcana: 0,
    crafting: 0,
    charm: 0,
    nature: 0,
    medicine: 0,
    thieving: 0,
    curHealth: 0,
    speedBonus: 0,
    stackEffects: [],
    traits: "",
    spells: "",
    items: "",
    notes: "",
    
};

// "1":{
//     "name": "dog",
//     "race": "animal",
//     "level": 0,
//     "body": 1,
//     "mind": 0,
//     "soul": 0,
//     "arcana": 0,
//     "charm": 1,
//     "crafting": 0,
//     "medicine": 0,
//     "nature": 1,
//     "thieving": 0,
//     "curHealth": 0,
//     "speedBonus": 1,
//     "stackEffects": ["dodge 2"],
//     "traits": "bloodhound;|;knowledge of the forest",
//     "spells": "",
//     "items": "bite;|;unarmored",
//     "notes": ""
// },

const lineageList = [
    "generic humanoid",
    "undergrounder",
    "aquatic",
    "avian",
    "beastkin",
    "draconic",
    "nagakin",
    "seeker",
    "natureborn elemental",
    "hellborn",
    "lightborn",
    "constructed",

    "animal",
    "construct",
    "humanoid",
    "monstrosity",
    "planar",
    "undead",
    "mythic"
];

export default function JoshhellscapePage() {
    const [characterSheetFormData, SetCharacterSheetFormData] =
        useState(initialFormData);

    // const [maxMain, setMaxMain] = useState(1);
    // const [maxSub, setMaxSub] = useState(2);
    const [json, setJson] = useState("");

    const [mainDisabled, setMainDisabled] = useState(false);
    const [subDisabled, setSubDisabled] = useState(false);




    useEffect(() => {
        let jsonString = JSON.stringify(characterSheetFormData);

        let re = /,\"/gi;
        jsonString = jsonString.replace(re, ",\n\"");

        setJson(jsonString);
    }, [characterSheetFormData]);
    
    
    useEffect(() => {
        async function getTraits() {
            const persistentPinnedNames = window.localStorage.getItem("pinnedTraitNames");
            let reset = characterSheetFormData;
            reset.traits = persistentPinnedNames ?? "";

            SetCharacterSheetFormData(reset);
        }
        async function getSpells() {
            const persistentPinnedNames = window.localStorage.getItem("pinnedSpellNames");
            let reset = characterSheetFormData;
            reset.spells = persistentPinnedNames ?? "";

            SetCharacterSheetFormData(reset);
        }
        async function getItems() {
            const persistentPinnedNames = window.localStorage.getItem("pinnedItemNames");
            let reset = characterSheetFormData;
            reset.items = persistentPinnedNames ?? "";

            SetCharacterSheetFormData(reset);
        }
        
        // getTraits("pinnedTraitNames",characterSheetFormData.traits); // this was the old better version that dident work
        getTraits();
        getSpells();
        getItems();
    }, []);


    useEffect(() => {
        setMainDisabled(
            ((characterSheetFormData.level+1) - 
                (characterSheetFormData.body
                +characterSheetFormData.mind
                +characterSheetFormData.soul)
            )==0 ? true : false);

    }, [characterSheetFormData.body, characterSheetFormData.mind, characterSheetFormData.soul,characterSheetFormData.level]);

    useEffect(() => {
        setSubDisabled(
            ((characterSheetFormData.level*2+2) - 
                (characterSheetFormData.arcana
                +characterSheetFormData.crafting
                +characterSheetFormData.charm
                +characterSheetFormData.nature
                +characterSheetFormData.medicine
                +characterSheetFormData.thieving)
            )==0 ? true : false);
    }, [characterSheetFormData.arcana, characterSheetFormData.crafting, characterSheetFormData.charm, 
        characterSheetFormData.nature, characterSheetFormData.medicine, characterSheetFormData.thieving, 
        characterSheetFormData.level]);

    

    return (
        <div className="grid auto-rows-auto grid-cols-6 gap-3 p-2">
            <h1 className="col-span-6">Create Creature</h1>

            <div className="md:col-span-2">
                <div className="">Name</div>
                <input
                    placeholder="Name"
                    name="name"
                    className="bg-body-700/40 dark:bg-soul-700/10 p-2 active:ring-dark-700 dark:active:ring-light-600 active:ring-2 rounded-lg"
                    onChange={(e) => { 
                        SetCharacterSheetFormData(prevCreature => ({
                            ...prevCreature,
                            name: e.target.value.toLowerCase(),
                        }));
                      }}
                ></input>
            </div>
            <div className="md:col-span-2">
                <CharacterSheetStatIncrementor
                    color="bg-dark-700 dark:bg-dark-400"
                    statName="Level"
                    statScore={characterSheetFormData.level}
                    maxValue={9}
                    incrementDisabled={false}
                    onIncrementClick={() => {
                            SetCharacterSheetFormData(prevCreature => ({
                                ...prevCreature,
                                level: prevCreature.level + 1,
                            }));
                    }}
                    onDecrementClick={() => {
                        SetCharacterSheetFormData(prevCreature => ({
                            ...prevCreature,
                            level: prevCreature.level - 1,
                        }));
                    }}
                />
            </div>
            <div className="md:col-span-2">
                <div className="">Creature Tags</div>
                    <input
                        type="text"
                        className="flex flex-row h-9 rounded-lg p-2 mt-1 w-[100%] shadow-md"
                        value={characterSheetFormData.race}
                        onChange={(e) => { 
                            SetCharacterSheetFormData(prevCreature => ({
                                ...prevCreature,
                                race: e.target.value,
                            }));
                          }}
                    />
                    <CleanCombobox
                        items={lineageList}
                        className="flex flex-row"
                        selected={""}
                        setSelected={(val) => { 
                            SetCharacterSheetFormData(prevCreature => ({
                                ...prevCreature,
                                race: prevCreature.race.concat(",", val),
                            }));
                          }}
                    />
                </div>
            <div className="col-span-6 row-span-3 md:row-span-1 grid grid-cols-1 md:grid-cols-3 justify-items-center gap-3">
                <CharacterSheetStatIncrementor
                    color="bg-body-700 dark:bg-body-500"
                    statName="body"
                    statScore={characterSheetFormData.body}
                    maxValue={(characterSheetFormData.level +1)}
                    incrementDisabled={mainDisabled}
                    onIncrementClick={() => {
                            SetCharacterSheetFormData(prevCreature => ({
                                ...prevCreature,
                                body: prevCreature.body + 1,
                            }));
                    }}
                    onDecrementClick={() => {
                        SetCharacterSheetFormData(prevCreature => ({
                            ...prevCreature,
                            body: prevCreature.body - 1,
                        }));
                    }}
                />
                <CharacterSheetStatIncrementor
                    color="bg-mind-700 dark:bg-mind-500"
                    statName="mind"
                    statScore={characterSheetFormData.mind}
                    maxValue={(characterSheetFormData.level +1)}
                    incrementDisabled={mainDisabled}
                    onIncrementClick={() => {
                        SetCharacterSheetFormData(prevCreature => ({
                            ...prevCreature,
                            mind: prevCreature.mind + 1,
                        }));
                    }}
                    onDecrementClick={() => {
                        SetCharacterSheetFormData(prevCreature => ({
                            ...prevCreature,
                            mind: prevCreature.mind - 1,
                        }));
                    }}
                />
                <CharacterSheetStatIncrementor
                    color="bg-soul-700 dark:bg-soul-500"
                    statName="soul"
                    statScore={characterSheetFormData.soul}
                    maxValue={(characterSheetFormData.level +1)}
                    incrementDisabled={mainDisabled}
                    onIncrementClick={() => {
                        SetCharacterSheetFormData(prevCreature => ({
                            ...prevCreature,
                            soul: prevCreature.soul + 1,
                        }));
                    }}
                    onDecrementClick={() => {
                        SetCharacterSheetFormData(prevCreature => ({
                            ...prevCreature,
                            soul: prevCreature.soul - 1,
                        }));
                    }}
                />
            </div>
            <div className="col-span-6 px-12 -my-3">
                <hr className="w-full" />
            </div>
            <div className="col-span-6 row-span-3 md:row-span-1 grid grid-cols-1 md:grid-cols-3 justify-items-center gap-3">
                <CharacterSheetStatIncrementor
                    color="bg-arcana-700 dark:bg-arcana-500"
                    statName="arcana"
                    statScore={characterSheetFormData.arcana}
                    maxValue={(characterSheetFormData.level +1)}
                    incrementDisabled={subDisabled}
                    onIncrementClick={() => {
                        SetCharacterSheetFormData(prevCreature => ({
                            ...prevCreature,
                            arcana: prevCreature.arcana + 1,
                        }));
                    }}
                    onDecrementClick={() => {
                        SetCharacterSheetFormData(prevCreature => ({
                            ...prevCreature,
                            arcana: prevCreature.arcana - 1,
                        }));
                    }}
                />
                <CharacterSheetStatIncrementor
                    color="bg-crafting-700 dark:bg-crafting-500"
                    statName="crafting"
                    statScore={characterSheetFormData.crafting}
                    maxValue={(characterSheetFormData.level +1)}
                    incrementDisabled={subDisabled}
                    onIncrementClick={() => {
                        SetCharacterSheetFormData(prevCreature => ({
                            ...prevCreature,
                            crafting: prevCreature.crafting + 1,
                        }));
                    }}
                    onDecrementClick={() => {
                        SetCharacterSheetFormData(prevCreature => ({
                            ...prevCreature,
                            crafting: prevCreature.crafting - 1,
                        }));
                    }}
                />
                <CharacterSheetStatIncrementor
                    color="bg-charm-700 dark:bg-charm-500"
                    statName="charm"
                    statScore={characterSheetFormData.charm}
                    maxValue={(characterSheetFormData.level +1)}
                    incrementDisabled={subDisabled}
                    onIncrementClick={() => {
                        SetCharacterSheetFormData(prevCreature => ({
                            ...prevCreature,
                            charm: prevCreature.charm + 1,
                        }));
                    }}
                    onDecrementClick={() => {
                        SetCharacterSheetFormData(prevCreature => ({
                            ...prevCreature,
                            charm: prevCreature.charm - 1,
                        }));
                    }}
                />
            </div>
            <div className="col-span-6 row-span-3 md:row-span-1 grid grid-cols-1 md:grid-cols-3 justify-items-center gap-3">
                <CharacterSheetStatIncrementor
                    color="bg-nature-700 dark:bg-nature-500"
                    statName="nature"
                    statScore={characterSheetFormData.nature}
                    maxValue={(characterSheetFormData.level +1)}
                    incrementDisabled={subDisabled}
                    onIncrementClick={() => {
                        SetCharacterSheetFormData(prevCreature => ({
                            ...prevCreature,
                            nature: prevCreature.nature + 1,
                        }));
                    }}
                    onDecrementClick={() => {
                        SetCharacterSheetFormData(prevCreature => ({
                            ...prevCreature,
                            nature: prevCreature.nature - 1,
                        }));
                    }}
                />
                <CharacterSheetStatIncrementor
                    color="bg-medicine-700 dark:bg-medicine-500"
                    statName="medicine"
                    statScore={characterSheetFormData.medicine}
                    maxValue={(characterSheetFormData.level +1)}
                    incrementDisabled={subDisabled}
                    onIncrementClick={() => {
                        SetCharacterSheetFormData(prevCreature => ({
                            ...prevCreature,
                            medicine: prevCreature.medicine + 1,
                        }));
                    }}
                    onDecrementClick={() => {
                        SetCharacterSheetFormData(prevCreature => ({
                            ...prevCreature,
                            medicine: prevCreature.medicine - 1,
                        }));
                    }}
                />
                <CharacterSheetStatIncrementor
                    color="bg-thieving-700 dark:bg-thieving-500"
                    statName="thieving"
                    statScore={characterSheetFormData.thieving}
                    maxValue={(characterSheetFormData.level +1)}
                    incrementDisabled={subDisabled}
                    onIncrementClick={() => {
                        SetCharacterSheetFormData(prevCreature => ({
                            ...prevCreature,
                            thieving: prevCreature.thieving + 1,
                        }));
                    }}
                    onDecrementClick={() => {
                        SetCharacterSheetFormData(prevCreature => ({
                            ...prevCreature,
                            thieving: prevCreature.thieving - 1,
                        }));
                    }}
                />
            </div>

            <div className="col-span-6">Effect</div>
                <textarea
                    placeholder="Whip around like a yoyo"
                    className="bg-dark-300 h-44 rounded-lg p-2 col-span-6"
                    value={json}
                    onChange={(e) => setJson(e.target.value)}
                />
        </div>
    );
}
