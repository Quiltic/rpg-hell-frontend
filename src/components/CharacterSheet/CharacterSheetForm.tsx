import React, { useState, useEffect } from "react";
import { Creature } from "../../client";
import CharacterSheetStatIncrementor from "./CharacterSheetStatIncrementor";
import { classNames, getPersistentPinnedNames } from "../../util/tableTools";
import { Listbox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import useSkills from "../../hooks/useSkills";

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
    "mythic",
];

export default function CharacterSheetForm() {
    const [characterSheetFormData, SetCharacterSheetFormData] =
        useState(initialFormData);

    const placeholderTrue = true;

    const [selectedLineage, setSelectedLineage] = useState("Select a Lineage");

    const {
        body,
        mind,
        soul,
        arcana,
        charm,
        crafting,
        medicine,
        nature,
        thievery,
        level,
        skillPointsAvailible,
        subSkillPointsAvailible,
        skillMaxAtCurrentLevel,
        increment,
        decrement,
        resetToInitial,
        levelUp,
    } = useSkills();

    // useEffect(() => {
    //     async function getTraits() {
    //         const persistentPinnedNames =
    //             window.localStorage.getItem("pinnedTraitNames");

    //         if (persistentPinnedNames) {
    //             const splitNames = persistentPinnedNames.split(";|;");
    //             initialFormData.traits = splitNames;
    //         }
    //     }

    //     async function getSpells() {
    //         const persistentPinnedNames =
    //             window.localStorage.getItem("pinnedSpellNames");

    //         if (persistentPinnedNames) {
    //             const splitNames = persistentPinnedNames.split(";|;");
    //             initialFormData.spells = splitNames;
    //         }
    //     }

    //     async function getItems() {
    //         const persistentPinnedNames =
    //             window.localStorage.getItem("pinnedItemNames");

    //         if (persistentPinnedNames) {
    //             const splitNames = persistentPinnedNames.split(";|;");
    //             initialFormData.items = splitNames;
    //         }
    //     }

    //     getTraits();
    //     getSpells();
    //     getItems();
    // }, [characterSheetFormData]);

    return (
        <div className="grid auto-rows-auto grid-cols-6 gap-3 p-2">
            <h1 className="col-span-6">Create New Level 1 Character</h1>
            <input
                placeholder="Name"
                name="name"
                className="col-span-6 h-10 w-full rounded-lg bg-body-700/40 p-2 active:ring-2 active:ring-dark-700 dark:bg-soul-700/10 dark:active:ring-light-600 md:col-span-3"
            ></input>

            <div className="col-span-6 md:col-span-3">
                <Listbox value={selectedLineage} onChange={setSelectedLineage}>
                    <div className="relative">
                        <Listbox.Button className="h-10 w-full rounded-lg bg-body-700/40 pl-2 text-left capitalize active:ring-2 active:ring-dark-700 dark:bg-soul-700/10 dark:active:ring-light-600">
                            <span className="block truncate">
                                {selectedLineage}
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                    className="h-5 w-5 text-base"
                                    aria-hidden="true"
                                />
                            </span>
                        </Listbox.Button>
                        <Listbox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-body-700/40 py-1 text-light ring-1 ring-dark/5 backdrop-blur-lg focus:outline-none dark:bg-dark dark:bg-soul-700/10 sm:text-sm">
                            {lineageList.map((l, i) => (
                                <Listbox.Option
                                    key={i}
                                    value={l}
                                    className={({ active }) =>
                                        classNames(
                                            "cursor-pointer px-2 py-1 capitalize text-dark dark:text-light",
                                            active
                                                ? "bg-body-700/40 dark:bg-soul-700/10"
                                                : ""
                                        )
                                    }
                                >
                                    {l}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </div>
                </Listbox>
            </div>

            <div className="col-span-3 mb-4 flex flex-row items-center justify-between rounded-lg bg-body-700/40 px-4 py-1 text-xl dark:bg-soul-700/10">
                <div className="overflow-ellipsis p-1">
                    Remaining Skill increases:
                </div>{" "}
                <div
                    className={classNames(
                        "flex h-8 w-8 items-center justify-center rounded-lg p-1 text-light",
                        skillPointsAvailible > 0 ? "bg-nature" : "bg-medicine"
                    )}
                >
                    {skillPointsAvailible}
                </div>
            </div>
            <div className="col-span-3 mb-4 flex flex-row items-center justify-between rounded-lg bg-body-700/40 px-4 py-1 text-xl dark:bg-soul-700/10">
                <div className="overflow-ellipsis p-1">
                    Remaining Sub-skill increases:
                </div>{" "}
                <div
                    className={classNames(
                        "flex h-8 w-8 items-center justify-center rounded-lg p-1 text-light",
                        subSkillPointsAvailible > 0
                            ? "bg-nature"
                            : "bg-medicine"
                    )}
                >
                    {subSkillPointsAvailible}
                </div>
            </div>

            <div className="col-span-6 row-span-3 grid grid-cols-1 justify-items-center gap-3 md:row-span-1 md:grid-cols-3">
                <CharacterSheetStatIncrementor
                    color="bg-body-700 dark:bg-body-500"
                    statName="body"
                    statScore={body}
                    maxValue={skillMaxAtCurrentLevel}
                    incrementDisabled={
                        body == skillMaxAtCurrentLevel ||
                        skillPointsAvailible == 0
                    }
                    onIncrementClick={() => {
                        increment("body");
                    }}
                    onDecrementClick={() => {
                        decrement("body");
                    }}
                />
                <CharacterSheetStatIncrementor
                    color="bg-mind-700 dark:bg-mind-500"
                    statName="mind"
                    statScore={mind}
                    maxValue={skillMaxAtCurrentLevel}
                    incrementDisabled={
                        mind == skillMaxAtCurrentLevel ||
                        skillPointsAvailible == 0
                    }
                    onIncrementClick={() => {
                        increment("mind");
                    }}
                    onDecrementClick={() => {
                        decrement("mind");
                    }}
                />
                <CharacterSheetStatIncrementor
                    color="bg-soul-700 dark:bg-soul-500"
                    statName="soul"
                    statScore={soul}
                    maxValue={skillMaxAtCurrentLevel}
                    incrementDisabled={
                        soul == skillMaxAtCurrentLevel ||
                        skillPointsAvailible == 0
                    }
                    onIncrementClick={() => {
                        increment("soul");
                    }}
                    onDecrementClick={() => {
                        decrement("soul");
                    }}
                />
            </div>
            <div className="col-span-6 -my-3 px-12">
                <hr className="w-full" />
            </div>
            <div className="col-span-6 row-span-3 grid grid-cols-1 justify-items-center gap-3 md:row-span-1 md:grid-cols-3">
                <CharacterSheetStatIncrementor
                    color="bg-arcana-700 dark:bg-arcana-500"
                    statName="arcana"
                    statScore={arcana}
                    maxValue={skillMaxAtCurrentLevel}
                    incrementDisabled={
                        arcana == skillMaxAtCurrentLevel ||
                        subSkillPointsAvailible == 0
                    }
                    onIncrementClick={() => {
                        increment("arcana");
                    }}
                    onDecrementClick={() => {
                        decrement("arcana");
                    }}
                />
                <CharacterSheetStatIncrementor
                    color="bg-crafting-700 dark:bg-crafting-500"
                    statName="crafting"
                    statScore={crafting}
                    maxValue={skillMaxAtCurrentLevel}
                    incrementDisabled={
                        crafting == skillMaxAtCurrentLevel ||
                        subSkillPointsAvailible == 0
                    }
                    onIncrementClick={() => {
                        increment("crafting");
                    }}
                    onDecrementClick={() => {
                        decrement("crafting");
                    }}
                />
                <CharacterSheetStatIncrementor
                    color="bg-charm-700 dark:bg-charm-500"
                    statName="charm"
                    statScore={charm}
                    maxValue={skillMaxAtCurrentLevel}
                    incrementDisabled={
                        charm == skillMaxAtCurrentLevel ||
                        subSkillPointsAvailible == 0
                    }
                    onIncrementClick={() => {
                        increment("charm");
                    }}
                    onDecrementClick={() => {
                        decrement("charm");
                    }}
                />
            </div>
            <div className="col-span-6 row-span-3 grid grid-cols-1 justify-items-center gap-3 md:row-span-1 md:grid-cols-3">
                <CharacterSheetStatIncrementor
                    color="bg-nature-700 dark:bg-nature-500"
                    statName="nature"
                    statScore={nature}
                    maxValue={skillMaxAtCurrentLevel}
                    incrementDisabled={
                        nature == skillMaxAtCurrentLevel ||
                        subSkillPointsAvailible == 0
                    }
                    onIncrementClick={() => {
                        increment("nature");
                    }}
                    onDecrementClick={() => {
                        decrement("nature");
                    }}
                />
                <CharacterSheetStatIncrementor
                    color="bg-medicine-700 dark:bg-medicine-500"
                    statName="medicine"
                    statScore={medicine}
                    maxValue={skillMaxAtCurrentLevel}
                    incrementDisabled={
                        medicine == skillMaxAtCurrentLevel ||
                        subSkillPointsAvailible == 0
                    }
                    onIncrementClick={() => {
                        increment("medicine");
                    }}
                    onDecrementClick={() => {
                        decrement("medicine");
                    }}
                />
                <CharacterSheetStatIncrementor
                    color="bg-thieving-700 dark:bg-thieving-500"
                    statName="thievery"
                    statScore={thievery}
                    maxValue={skillMaxAtCurrentLevel}
                    incrementDisabled={
                        thievery == skillMaxAtCurrentLevel ||
                        subSkillPointsAvailible == 0
                    }
                    onIncrementClick={() => {
                        increment("thievery");
                    }}
                    onDecrementClick={() => {
                        decrement("thievery");
                    }}
                />
            </div>
        </div>
    );
}
