import React, { useState, useEffect, useMemo } from "react";
import { Creature, Trait } from "../../client";
import CharacterSheetStatIncrementor from "./CharacterSheetStatIncrementor";
import { classNames, getPersistentPinnedNames } from "../../util/tableTools";
import { Listbox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import useSkills from "../../hooks/useSkills";
import { useTraits } from "../../hooks/useTraits";

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

    const [selectedLineageTrait, setSelectedLineageTrait] = useState("");
    const [selectedHumanoidTrait, setSelectedHumanoidTrait] = useState("");

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
        // level,
        skillPointsAvailible,
        subSkillPointsAvailible,
        skillMaxAtCurrentLevel,
        increment,
        decrement,
        // resetToInitial,
        // levelUp,
    } = useSkills();

    const { displayedTraits, allTraits, filterTraits, resetFilterTraits } =
        useTraits();

    const lineageTraitOptions: Trait[] = useMemo(() => {
        const ts = allTraits.filter((t) => {
            return t.req?.includes("base 0");
        });
        ts.sort(function (x, y) {
            const textA = x.name.toUpperCase();
            const textB = y.name.toUpperCase();
            return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
        const first = "generic humanoid";
        return ts.sort(function (x, y) {
            return x.name == first ? -1 : y.name == first ? 1 : 0;
        });
    }, [allTraits]);

    const humanoidTraitOptions: Trait[] = useMemo(() => {
        const requirements = [
            ...(body > 0 ? ["body 1"] : []),
            ...(mind > 0 ? ["mind 1"] : []),
            ...(soul > 0 ? ["soul 1"] : []),
        ];

        return allTraits.filter((t) => {
            if (t.req == undefined) {
                return false;
            }
            return (
                t.req.some((r) => requirements.includes(r)) && t.req.length == 1
            );
        });
    }, [allTraits, body, mind, soul]);

    return (
        <div className="grid auto-rows-auto grid-cols-6 gap-3 p-2">
            <h1 className="col-span-6">Create New Level 1 Character</h1>
            <input
                placeholder="Name"
                name="name"
                className="col-span-6 h-10 w-full rounded-lg bg-body-700/40 p-2 active:ring-2 active:ring-dark-700 dark:bg-soul-700/10 dark:active:ring-light-600 md:col-span-3"
            ></input>
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
            <h1 className="col-span-6">Traits</h1>
            <h2 className="col-span-6">Lineage Trait</h2>
            <div className="col-span-6 ">
                <Listbox
                    value={selectedLineageTrait}
                    onChange={setSelectedLineageTrait}
                >
                    <div className="relative">
                        <Listbox.Button className="h-14 w-full rounded-lg bg-body-700/40 pl-2 text-left capitalize active:ring-2 active:ring-dark-700 dark:bg-soul-700/10 dark:active:ring-light-600">
                            <span className="block truncate">
                                {selectedLineageTrait == ""
                                    ? "Select a Lineage"
                                    : selectedLineageTrait}
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                    className="h-6 w-6 text-base"
                                    aria-hidden="true"
                                />
                            </span>
                        </Listbox.Button>
                        <Listbox.Options className="absolute z-20 mb-4 mt-1 max-h-60 w-full overflow-auto rounded-md bg-light-600 py-1 text-dark ring-1 ring-dark/5 focus:outline-none dark:bg-dark-400 dark:text-light sm:text-sm">
                            {lineageTraitOptions.map((lt, i) => (
                                <Listbox.Option
                                    key={i}
                                    value={lt.name}
                                    className={({ active }) =>
                                        classNames(
                                            "cursor-pointer px-2 py-1 text-left text-dark dark:text-light",
                                            active
                                                ? "bg-body-700/40 dark:bg-soul-700/10"
                                                : ""
                                        )
                                    }
                                >
                                    {
                                        <div className="flex w-full flex-col">
                                            <div className="font-bold capitalize">
                                                {lt.name}
                                            </div>
                                            <div>{lt.effect}</div>
                                        </div>
                                    }
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </div>
                </Listbox>
            </div>
            {selectedLineageTrait == "generic humanoid" && (
                <div className="col-span-6 ">
                    <Listbox
                        value={selectedHumanoidTrait}
                        onChange={setSelectedHumanoidTrait}
                    >
                        <div className="relative">
                            <Listbox.Button className="h-14 w-full rounded-lg bg-body-700/40 pl-2 text-left capitalize active:ring-2 active:ring-dark-700 dark:bg-soul-700/10 dark:active:ring-light-600">
                                <span className="block truncate">
                                    {selectedHumanoidTrait == ""
                                        ? "Select a Generic Humanoid Trait"
                                        : selectedHumanoidTrait}
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronUpDownIcon
                                        className="h-6 w-6 text-base"
                                        aria-hidden="true"
                                    />
                                </span>
                            </Listbox.Button>
                            <Listbox.Options className="absolute z-20 mb-4 mt-1 max-h-60 w-full overflow-auto rounded-md bg-light-600 py-1 text-dark ring-1 ring-dark/5 focus:outline-none dark:bg-dark-400 dark:text-light sm:text-sm">
                                {humanoidTraitOptions.length > 0 ? (
                                    humanoidTraitOptions.map((lt, i) => (
                                        <Listbox.Option
                                            key={i}
                                            value={lt.name}
                                            className={({ active }) =>
                                                classNames(
                                                    "cursor-pointer px-2 py-1 text-left text-dark dark:text-light",
                                                    active
                                                        ? "bg-body-700/40 dark:bg-soul-700/10"
                                                        : ""
                                                )
                                            }
                                        >
                                            {
                                                <div className="flex w-full flex-col">
                                                    <div className="font-bold capitalize">
                                                        {lt.name}
                                                    </div>
                                                    <div>{lt.effect}</div>
                                                </div>
                                            }
                                        </Listbox.Option>
                                    ))
                                ) : (
                                    <Listbox.Option disabled={true} value={""}>
                                        <div className="h-12 cursor-not-allowed">
                                            You are missing stat requirements to
                                            pick a trait
                                        </div>
                                    </Listbox.Option>
                                )}
                            </Listbox.Options>
                        </div>
                    </Listbox>
                </div>
            )}
            <div className="col-span-6 -my-3 px-12">
                <hr className="w-full" />
            </div>
            <h2 className="col-span-6">Level 1 Traits</h2>
        </div>
    );
}
