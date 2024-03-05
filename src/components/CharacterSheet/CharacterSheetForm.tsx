import React, { useState, useEffect } from "react";
import { Creature } from "../../client";
import CharacterSheetStatIncrementor from "./CharacterSheetStatIncrementor";
import { getPersistentPinnedNames } from "../../util/tableTools";
import CleanCombobox from "../joshhellscapePages/CleanCombobox";

const initialFormData: Creature = {
    name: "",
    types: [],
    level: 1,
    body: 0,
    mind: 0,
    soul: 0,
    arcana: 0,
    crafting: 0,
    charm: 0,
    thieving: 0,
    nature: 0,
    medicine: 0,
    traits: [],
    spells: [],
    items: [],
    notes: "",
};

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
    "monstrosity",
    "planar",
    "undead",
    "mythic"
];

export default function CharacterSheetForm() {
    const [characterSheetFormData, SetCharacterSheetFormData] =
        useState(initialFormData);
    
    
        useEffect(() => {
            async function getTraits() {
                const persistentPinnedNames = window.localStorage.getItem("pinnedTraitNames");

                if (persistentPinnedNames) {
                    const splitNames = persistentPinnedNames.split(";|;");
                    initialFormData.traits = splitNames;
                }
            }

            async function getSpells() {
                const persistentPinnedNames = window.localStorage.getItem("pinnedSpellNames");

                if (persistentPinnedNames) {
                    const splitNames = persistentPinnedNames.split(";|;");
                    initialFormData.spells = splitNames;
                }
            }

            async function getItems() {
                const persistentPinnedNames = window.localStorage.getItem("pinnedItemNames");

                if (persistentPinnedNames) {
                    const splitNames = persistentPinnedNames.split(";|;");
                    initialFormData.items = splitNames;
                }
            }

            getTraits();
            getSpells();
            getItems();
        }, [characterSheetFormData]);
    

    return (
        <div className="grid auto-rows-auto grid-cols-6 gap-3 p-2">
            <h1 className="col-span-4">Create New Level 1 Character</h1>
            <input
                placeholder="Name"
                name="name"
                className="bg-body-700/40 dark:bg-soul-700/10 col-span-3 p-2 active:ring-dark-700 dark:active:ring-light-600 active:ring-2 rounded-lg"
            ></input>
            
            <div className="md:col-span-3">
                <div className="">Lineage Selector</div>
                    <input
                        type="text"
                        className="flex flex-row h-9 rounded-lg p-2 mt-1 w-[100%] shadow-md"
                        value={characterSheetFormData.types}
                        onChange={(e) => console.log(e.target.value)}
                    />
                    <CleanCombobox
                        items={lineageList}
                        className="flex flex-row"
                        selected={""}
                        setSelected={(val) => {
                            //setTags(SetCharacterSheetFormData.types.concat(",", val));
                            console.log(val);
                        }}
                    />
                </div>
            <div className="col-span-6 row-span-3 md:row-span-1 grid grid-cols-1 md:grid-cols-3 justify-items-center gap-3">
                <CharacterSheetStatIncrementor
                    color="bg-body-700 dark:bg-body-500"
                    statName="body"
                    statScore={1}
                    maxValue={6}
                    incrementDisabled={false}
                    onIncrementClick={() => {
                        console.log("increment");
                    }}
                    onDecrementClick={() => {
                        console.log("decrement");
                    }}
                />
                <CharacterSheetStatIncrementor
                    color="bg-mind-700 dark:bg-mind-500"
                    statName="mind"
                    statScore={0}
                    maxValue={6}
                    incrementDisabled={false}
                    onIncrementClick={() => {
                        console.log("increment");
                    }}
                    onDecrementClick={() => {
                        console.log("decrement");
                    }}
                />
                <CharacterSheetStatIncrementor
                    color="bg-soul-700 dark:bg-soul-500"
                    statName="soul"
                    statScore={0}
                    maxValue={6}
                    incrementDisabled={false}
                    onIncrementClick={() => {
                        console.log("increment");
                    }}
                    onDecrementClick={() => {
                        console.log("decrement");
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
                    statScore={0}
                    maxValue={6}
                    incrementDisabled={false}
                    onIncrementClick={() => {
                        console.log("increment");
                    }}
                    onDecrementClick={() => {
                        console.log("decrement");
                    }}
                />
                <CharacterSheetStatIncrementor
                    color="bg-crafting-700 dark:bg-crafting-500"
                    statName="crafting"
                    statScore={0}
                    maxValue={6}
                    incrementDisabled={false}
                    onIncrementClick={() => {
                        console.log("increment");
                    }}
                    onDecrementClick={() => {
                        console.log("decrement");
                    }}
                />
                <CharacterSheetStatIncrementor
                    color="bg-charm-700 dark:bg-charm-500"
                    statName="charm"
                    statScore={0}
                    maxValue={6}
                    incrementDisabled={false}
                    onIncrementClick={() => {
                        console.log("increment");
                    }}
                    onDecrementClick={() => {
                        console.log("decrement");
                    }}
                />
            </div>
            <div className="col-span-6 row-span-3 md:row-span-1 grid grid-cols-1 md:grid-cols-3 justify-items-center gap-3">
                <CharacterSheetStatIncrementor
                    color="bg-nature-700 dark:bg-nature-500"
                    statName="nature"
                    statScore={0}
                    maxValue={6}
                    incrementDisabled={false}
                    onIncrementClick={() => {
                        console.log("increment");
                    }}
                    onDecrementClick={() => {
                        console.log("decrement");
                    }}
                />
                <CharacterSheetStatIncrementor
                    color="bg-medicine-700 dark:bg-medicine-500"
                    statName="medicine"
                    statScore={0}
                    maxValue={6}
                    incrementDisabled={false}
                    onIncrementClick={() => {
                        console.log("increment");
                    }}
                    onDecrementClick={() => {
                        console.log("decrement");
                    }}
                />
                <CharacterSheetStatIncrementor
                    color="bg-thieving-700 dark:bg-thieving-500"
                    statName="thieving"
                    statScore={0}
                    maxValue={6}
                    incrementDisabled={false}
                    onIncrementClick={() => {
                        console.log("increment");
                    }}
                    onDecrementClick={() => {
                        console.log("decrement");
                    }}
                />
            </div>
        </div>
    );
}
