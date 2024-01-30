import { useState, useEffect } from "react";
import { Trait } from "../../client";

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";

import useApi from "../../hooks/useApi";

import { Tab, Disclosure } from "@headlessui/react";

import TraitsTable from "./TraitsTable";

import json from "../../assets/OfflineJsons/Traits.json";
import { Button } from "../ui/Button/Button";
import {
    sortArrayByReqs,
} from "../../util/sortingTools";
import { classNames, getPersistentPinnedNames } from "../../util/tableTools";

import { ChevronIcon } from "../../assets/IconSVGs/heroiconsSVG";
import CleanCombobox from "../joshhellscapePages/CleanCombobox";

function getTabWidth(lengthOfName: number) {
    return lengthOfName < 5 ? "w-12" : lengthOfName < 7 ? "w-16" : "w-20";
}




const statSkillList = [
    'base 0',
    'body 1',
    'mind 1',
    'soul 1',
    'arcana 1',
    'charm 1',
    'crafting 1',
    'medicine 1',
    'nature 1',
    'thieving 1',
    'body 2',
    'mind 2',
    'soul 2',
    'arcana 2',
    'charm 2',
    'crafting 2',
    'medicine 2',
    'nature 2',
    'thieving 2',
    'body 3',
    'mind 3',
    'soul 3',
    'arcana 3',
    'charm 3',
    'crafting 3',
    'medicine 3',
    'nature 3',
    'thieving 3',
    'body 4',
    'mind 4',
    'soul 4',
    'arcana 4',
    'charm 4',
    'crafting 4',
    'medicine 4',
    'nature 4',
    'thieving 4',
    'body 5',
    'mind 5',
    'soul 5',
    'arcana 5',
    'charm 5',
    'crafting 5',
    'medicine 5',
    'nature 5',
    'thieving 5',
    'body 6',
    'mind 6',
    'soul 6',
    'arcana 6',
    'charm 6',
    'crafting 6',
    'medicine 6',
    'nature 6',
    'thieving 6',
    'MONSTER 0'
];

const otherListCore = [
    'BROKEN 0',
    'OOC 0'
];

const diceCostListCore = [
    'P',
    '#',
    '##',
    '###'
];

const IterativeTraitLevels = [
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
    const { TraitsService } = useApi();
    const { ObjectsService } = useApi();

    const [searchValue, setSearchValue] = useState("");
    const [allTraits, setAllTraits] = useState<Array<Trait>>([]);
    const [displayedTraits, setDisplayedTraits] = useState<Array<Trait>>([]);
    const [clearButtonVisibility, setClearButtonVisibility] = useState("hidden");

    // const [mainstatSkillList, setMainstatSkillList] = useState(statSkillList);
    // const [secondstatSkillList, setSecondstatSkillList] = useState(statSkillList);
    // const [otherList, setOtherList] = useState(otherListCore);
    // const [diceCostList, setDiceCostList] = useState(diceCostListCore);
    const [curID, setCurID] = useState(0);
    const [nameText, setNameText] = useState("");
    const [mainStat, setMainStat] = useState("");
    const [secondStat, setSecondStat] = useState("");
    const [diceCost, setDiceCost] = useState("");
    const [otherDrop, setOtherDrop] = useState("");
    const [effectText, setEffectText] = useState("");
    const [curTrait, setCurTrait] = useState<Trait>();

    useEffect(() => {
        async function getTraits() {
            let traits: Trait[];
            try {
                const traitsRaw = await TraitsService.getAllTraits();
                traits = Object.values(traitsRaw);
            } catch (e) {
                if (e instanceof Error && e.message == "Network Error") {
                    console.log(
                        "WARNING YOU ARE OFFLINE! A backup is being used, however it is not up to date and may have incorect data."
                    );
                    traits = Object.values(json);
                } else {
                    return;
                }
            }

            traits = sortArrayByReqs(traits);

            setAllTraits(traits);
            setDisplayedTraits(traits);
        }

        getTraits();
    }, [TraitsService]);

    useEffect(() => {
        if (searchValue == "") {
            setDisplayedTraits(allTraits);
            setClearButtonVisibility("hidden");
            return;
        }

        setClearButtonVisibility("visible");
        const filteredTraits = allTraits.filter((s) => {
            return (
                s.name.toLowerCase().includes(searchValue) ||
                s.effect?.toLowerCase().includes(searchValue)
            );
        });

        setDisplayedTraits(filteredTraits);
    }, [allTraits, searchValue]);

    function addToPinnedTrait(s: Trait) {

        setCurID(s.id);
        setNameText(s.name);
        setEffectText(s.effect ?? "");
        setMainStat(s.req[0]);

        if (s.req?.length > 1) {
            // setSecondstatSkillList([,...statSkillList]);
            setSecondStat(s.req[1]);
        } else {
            setSecondStat("");
        }
        if (s.req?.length > 2) {
            setOtherDrop(s.req[2]);
        } else {
            setOtherDrop("");
        }
        setDiceCost(s.dice ? "#".repeat(s.dice ?? 1) : "P");
    }

    function removeFromPinnedTrait() {
        // Set inputs to nothing
        setCurID(0);
        setNameText('');
        setEffectText('');
        setMainStat('');
        setSecondStat('');
        setDiceCost('');
        setOtherDrop('');
        setEffectText('');
    }


    
    function handleCreateNew() {
        console.log(curTrait);
        if (curTrait?.name != ""){
            TraitsService.putTrait(curTrait);
        }
        // Set inputs to nothing
        removeFromPinnedTrait();
    };


    function handleUpdate() {
        console.log(curTrait);
        if (curTrait?.name != ""){
            TraitsService.updateTrait(curTrait?.name, curTrait);
        }
        // Set inputs to nothing
        removeFromPinnedTrait();
    };


    function handleDelete() {
        console.log(curTrait);
        if (curTrait?.name != ""){
            TraitsService.deleteTrait(curTrait?.id);
        }
        // Set inputs to nothing
        removeFromPinnedTrait();
    };
    
    useEffect(() => {
        // console.log(mainStat,secondStat,otherDrop);
        let trait = {
            "id": curID,
            "name": nameText.toLowerCase(),
            "effect": effectText,
            "req": [mainStat,secondStat,otherDrop],
            "dice": 0,
            "is_passive": true
        };

        if (diceCost != "P") {
            trait.is_passive = false;
            trait.dice = diceCost.split("#").length - 1;
        }

        // remove the empty stuffs
        trait.req = trait.req.filter((str) => str !== '');

        setCurTrait(trait);

    }, [nameText,diceCost,mainStat,secondStat,otherDrop,effectText]);


    // Styling:

    return (
        <>

        <div className="grid grid-rows-auto-auto-auto-1fr-auto gap-4 p-4 bg-dark-400 rounded-md">
            <div className="grid grid-cols-5 gap-4 bg-dark-300">
                <div className="col-span-1">
                    <div className="flex flex-row capitalize">Name</div>
                    <input type="text" placeholder="Yoyo" className="flex flex-row" value={nameText}  onChange={(e) => setNameText(e.target.value)}/>
                </div>
                <div className="col-span-1">
                    <div className="flex flex-row capitalize">Dice Cost</div>
                    <CleanCombobox items={diceCostListCore} className="flex flex-row" selected={diceCost} setSelected={(val) => {setDiceCost(val);}}/>
                </div>
                <div className="col-span-1">
                    <div className="flex flex-row capitalize">Main Stat/Skill</div>
                    <CleanCombobox items={statSkillList} className="flex flex-row" selected={mainStat} setSelected={(val) => {setMainStat(val);}}/>
                </div>
                <div className="col-span-1">
                    <div className="flex flex-row capitalize">Secondary Stat/Skill</div>
                    <CleanCombobox items={statSkillList} className="flex flex-row" selected={secondStat} setSelected={(val) => {setSecondStat(val);}}/>
                </div>
                <div className="col-span-1">
                    <div className="flex flex-row capitalize">Other</div>
                    <CleanCombobox items={otherListCore} className="flex flex-row" selected={otherDrop} setSelected={(val) => {setOtherDrop(val);}}/>
                </div>
            </div>

            <div className="">Effect</div>
            <textarea rows={40} cols={50} placeholder="Whip around like a yoyo" className="bg-dark-300 h-44" value={effectText}  onChange={(e) => setEffectText(e.target.value)}/>

            <div className="grid grid-cols-3 gap-4">
                {displayedTraits.filter(t => (t.name == curTrait?.name)).length > 0 ? (
                    <>
                        <span />
                        <Button title="Delete" className="flex flex-row" variant={'body'} onClick={handleDelete}>Delete</Button>
                        <Button title="Update" className="flex flex-row" variant={"soul"} onClick={handleUpdate}>Update</Button>
                    </>
                 ): (<>
                    <span />
                    <span />
                    <Button title="Create New" className="flex flex-row" variant={'nature'} onClick={handleCreateNew}>Create New</Button>
                    </>)
                }
            </div>
        </div>

            <h1>Traits</h1>

            {curTrait?.name && (
                <>
                    <div className="justify-start">
                        <h1>
                            Active Trait
                        </h1>
                        <TraitsTable
                            displayedTraits={[curTrait]}
                            moveTrait={removeFromPinnedTrait}
                            moveIsAdd={false}
                        />
                        <hr className="h-px my-4 border-0 bg-dark-600" />
                                    
                    </div>
                </>
            )}

            <Tab.Group as="div" className="w-full ">
                <div className="md:flex md:flex-column md:justify-between py-1 w-full align-middle">
                    <Tab.List className="p-1 gap-2 flex flex-wrap">
                        <Tab
                            className={({ selected }) =>
                                classNames(
                                    "hover:font-bold px-2 w-10 py-1 dark:bg-dark-600 bg-light-600 rounded-md ring-light",
                                    selected ? "ring-2" : ""
                                )
                            }
                        >
                            All
                        </Tab>
                        {IterativeTraitLevels.map((n) => {
                            return (
                                <Tab
                                    className={({ selected }) =>
                                        classNames(
                                            "hover:font-bold px-1 py-1 w-16 dark:bg-dark-600 bg-light-600 rounded-md",
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
                    <div className="flex flex-column items-center px-2 py-1 bg-dark-700 rounded-full w-full md:w-56 max-h-10">
                        <MagnifyingGlassIcon className="h-6 w-6" />

                        <input
                            value={searchValue}
                            type="text"
                            name="search"
                            placeholder="Search"
                            className="bg-dark-700 pl-1 w-16 flex-grow"
                            onChange={(e) => {
                                setSearchValue(e.target.value.toLowerCase());
                            }}
                        />
                        <XMarkIcon
                            className="h-6 w-6 opacity-50 cursor-pointer"
                            visibility={clearButtonVisibility}
                            onClick={() => {
                                setSearchValue("");
                                setClearButtonVisibility("hidden");
                            }}
                        />
                    </div>
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
                    {IterativeTraitLevels.map((n) => {
                        return (
                            <Tab.Panel>
                                <TraitsTable
                                    displayedTraits={displayedTraits.filter(
                                        (s) => {
                                            return s.req
                                                ?.toString().toLowerCase()
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
