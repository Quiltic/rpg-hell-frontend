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

const otherListCore = ["", "BROKEN 0", "combat 0", "ooc 0"];

const diceCostListCore = ["P", "#", "##", "###"];

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
    const { TraitsService } = useApi();

    const [changeToRefresh, setChangeToRefresh] = useState(0);

    const {
        displayedTraits,
        filterTraits,
        resetFilterTraits,
    } = useTraits(changeToRefresh);

    
    const [curID, setCurID] = useState(0);
    const [nameText, setNameText] = useState("");
    const [mainStat, setMainStat] = useState("");
    const [secondStat, setSecondStat] = useState("");
    const [diceCost, setDiceCost] = useState("P");
    const [otherDrop, setOtherDrop] = useState("");
    const [effectText, setEffectText] = useState("");
    const [curTrait, setCurTrait] = useState<Trait>();

    

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
        setNameText("");
        setEffectText("");
        setMainStat("");
        setSecondStat("");
        setDiceCost("P");
        setOtherDrop("");
        setEffectText("");
    }

    async function handleCreateNew() {
        console.log(curTrait);
        if (curTrait == undefined) {
            return;
        }
        if (curTrait?.name != "") {
            const reply = await TraitsService.putTrait({
                requestBody: curTrait,
            });
            console.log(reply);
        }
        // Set inputs to nothing
        removeFromPinnedTrait();
        setChangeToRefresh(changeToRefresh+1);
    }

    async function handleUpdate() {
        console.log(curTrait);
        if (curTrait == undefined) {
            return;
        }
        if (curTrait?.name != "") {
            const reply = await TraitsService.updateTrait({
                name: curTrait?.name,
                requestBody: curTrait,
            });
            console.log(reply);
        }
        // Set inputs to nothing
        removeFromPinnedTrait();
        setChangeToRefresh(changeToRefresh+1);
    }

    async function handleDelete() {
        console.log(curTrait);
        if (curTrait?.id == undefined) {
            return;
        }
        if (curTrait?.name != "") {
            const reply = await TraitsService.deleteTrait({ id: curTrait?.id });
            console.log(reply);
        }
        // Set inputs to nothing
        removeFromPinnedTrait();
        setChangeToRefresh(changeToRefresh+1);
    }

    useEffect(() => {
        // console.log(mainStat,secondStat,otherDrop);
        const trait = {
            id: curID,
            name: nameText.toLowerCase(),
            effect: effectText,
            req: [mainStat, secondStat, otherDrop],
            dice: 0,
            is_passive: true,
        };

        if (diceCost != "P") {
            trait.is_passive = false;
            trait.dice = diceCost.split("#").length - 1;
        }

        // remove the empty stuffs
        trait.req = trait.req.filter((str) => str !== "");

        setCurTrait(trait);
    }, [
        nameText,
        diceCost,
        mainStat,
        secondStat,
        otherDrop,
        effectText,
        curID,
    ]);

    // Styling:

    return (
        <>
            <div className="grid  gap-4 p-4 bg-dark-400 rounded-md">
                <div className="grid grid-cols-1 grid-rows-5 md:grid-rows-1 md:grid-cols-9 gap-4 p-2 bg-dark-300 rounded-lg">
                    <div className="col-span-1 md:col-span-2">
                        <div className="capitalize flex flex-row">Name</div>
                        <input
                            type="text"
                            placeholder="Yoyo"
                            className="flex flex-row h-9 rounded-lg p-2 mt-1 w-[100%] shadow-md"
                            value={nameText}
                            onChange={(e) => setNameText(e.target.value)}
                        />
                    </div>
                    <div className="col-span-1">
                        <div className="capitalize flex flex-row">
                            Dice Cost
                        </div>
                        <CleanCombobox
                            items={diceCostListCore}
                            className="flex flex-row w-[100%]"
                            selected={diceCost}
                            setSelected={(val) => {
                                setDiceCost(val);
                            }}
                        />
                    </div>
                    <div className="col-span-1 md:col-span-2">
                        <div className="capitalize flex flex-row">
                            Main Stat/Skill
                        </div>
                        <CleanCombobox
                            items={statSkillList}
                            className="flex flex-row w-[100%]"
                            selected={mainStat}
                            setSelected={(val) => {
                                setMainStat(val);
                            }}
                        />
                    </div>
                    <div className="col-span-1 md:col-span-2">
                        <div className="capitalize flex flex-row">
                            Secondary Stat/Skill
                        </div>
                        <CleanCombobox
                            items={statSkillList}
                            className="flex flex-row w-[100%]"
                            selected={secondStat}
                            setSelected={(val) => {
                                setSecondStat(val);
                            }}
                        />
                    </div>
                    <div className="col-span-1 md:col-span-2">
                        <div className="capitalize flex flex-row">Other</div>
                        <CleanCombobox
                            items={otherListCore}
                            className="flex flex-row w-[100%]"
                            selected={otherDrop}
                            setSelected={(val) => {
                                setOtherDrop(val);
                            }}
                        />
                    </div>
                </div>

                <div className="">Effect</div>
                <textarea
                    placeholder="Whip around like a yoyo"
                    className="bg-dark-300 h-44 rounded-lg p-2"
                    value={effectText}
                    onChange={(e) => setEffectText(e.target.value)}
                />

                <div className="grid grid-cols-3 gap-4">
                    {displayedTraits.filter((t) => t.name == curTrait?.name)
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
                {/* <Popup displayedContentName={popupName} displayedContent={popupData} popupIsOpen={popupIsOpen} setPopupIsOpen={(val) => {setPopupIsOpen(val);}} /> */}
            </div>

            <h1>Traits</h1>

            {curTrait?.name && (
                <>
                    <div className="justify-start">
                        <h1>Active Trait</h1>
                        <TraitsTable
                            displayedTraits={[curTrait]}
                            moveTrait={removeFromPinnedTrait}
                            moveIsAdd={false}
                        />
                        <hr />
                    </div>
                </>
            )}

            <Tab.Group as="div" className="w-full ">
                <div className="md:flex md:flex-column md:justify-between py-1 w-full align-middle">
                    <Tab.List className="p-1 gap-2 flex flex-wrap">
                        <Tab
                            className={({ selected }) =>
                                classNames(
                                    "hover:font-bold px-2 w-10 py-1 dark:bg-dark-600 bg-body-700/20 rounded-md ring-body-700 dark:ring-light",
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
                                            "hover:font-bold px-1 py-1 w-16 dark:bg-dark-600 bg-body-700/20 rounded-md ring-body-700 dark:ring-light",
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
