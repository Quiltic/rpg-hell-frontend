import { useState, useEffect } from "react";
import { Item } from "../../client";

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";

import useApi from "../../hooks/useApi";

import { Tab, Disclosure } from "@headlessui/react";

import ItemsTable from "./ItemsTable";

import json from "../../assets/OfflineJsons/Items.json";
import { Button } from "../ui/Button/Button";
import { sortArrayByLevel, sortArrayByReqs } from "../../util/sortingTools";
import { classNames, getPersistentPinnedNames } from "../../util/tableTools";

import { ChevronIcon } from "../../assets/IconSVGs/heroiconsSVG";
import CleanCombobox from "../joshhellscapePages/CleanCombobox";
import Popup from "../ui/Popups/Popup";

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
    "body 5",
    "mind 5",
    "soul 5",
    "arcana 5",
    "charm 5",
    "crafting 5",
    "medicine 5",
    "nature 5",
    "thieving 5",
    "body 6",
    "mind 6",
    "soul 6",
    "arcana 6",
    "charm 6",
    "crafting 6",
    "medicine 6",
    "nature 6",
    "thieving 6",
    "MONSTER 0",
    "BROKEN 0",
    "OOC 0",
];

const tagList = [
    "tiny",
    "small",
    "medium",
    "large",
    "huge",
    "bigabongus",
    "grenade",
    "medicine",
    "item",
    "weapon",
    "potion",
    "tool",
    "rune",
    "heavy armor",
    "medium armor",
    "light armor",
    "unarmored",
    "non-magic",
    "magical",
    "lesser",
    "greater",
    "legendary",
    "consumable",
    "complex",
    "vehicle",
    "bound",
    "1 damage",
    "loading _",
    "range _",
    "two handed",
    "throw range _",
    "glow",
    "ward _",
    "dodge _",
    "speed _",
];

const IterativeItemLevels = [
    "Weapon",
    "Armor",
    "Rune",
    "Medicine",
    "Potion",
    "Grenade",
    "Tool",
    "Item",
    "Magical",
];

export default function UpdateDBItemsPage() {
    const { ItemsService } = useApi();

    const [popupIsOpen, setPopupIsOpen] = useState(false);
    const [popupName, setPopupName] = useState("");
    const [popupData, setPopupData] = useState("");

    const [searchValue, setSearchValue] = useState("");
    const [allItems, setAllItems] = useState<Array<Item>>([]);
    const [displayedItems, setDisplayedItems] = useState<Array<Item>>([]);
    const [clearButtonVisibility, setClearButtonVisibility] =
        useState("hidden");

    // const [tempTag, setTempTag] = useState("");
    // const [mainstatSkillList, setMainstatSkillList] = useState(statSkillList);
    // const [secondstatSkillList, setSecondstatSkillList] = useState(statSkillList);
    // const [otherList, setOtherList] = useState(otherListCore);
    // const [diceCostList, setDiceCostList] = useState(diceCostListCore);
    const [curID, setCurID] = useState(0);
    const [nameText, setNameText] = useState("");
    const [effectText, setEffectText] = useState("");
    const [reqs, setReqs] = useState("");
    const [craft, setCraft] = useState(0);
    const [cost, setCost] = useState(0);
    const [tags, setTags] = useState("tiny");
    const [curItem, setCurItem] = useState<Item>();

    async function getItems() {
        let items: Item[];
        try {
            const itemsRaw = await ItemsService.getAllItems();
            items = Object.values(itemsRaw);
        } catch (e) {
            if (e instanceof Error && e.message == "Network Error") {
                console.log(
                    "WARNING YOU ARE OFFLINE! A backup is being used, however it is not up to date and may have incorect data."
                );
                items = Object.values(json);
            } else {
                return;
            }
        }

        items = sortArrayByReqs(items);

        setAllItems(items);
        setDisplayedItems(items);
    }

    useEffect(() => {
        getItems();
    }, [ItemsService]);

    useEffect(() => {
        if (searchValue == "") {
            setDisplayedItems(allItems);
            setClearButtonVisibility("hidden");
            return;
        }

        setClearButtonVisibility("visible");
        const filteredItems = allItems.filter((s) => {
            return (
                s.name.toLowerCase().includes(searchValue) ||
                s.effect?.toLowerCase().includes(searchValue)
            );
        });

        setDisplayedItems(filteredItems);
    }, [allItems, searchValue]);

    function addToPinnedItem(s: Item) {
        setCurID(s.id);
        setNameText(s.name);
        setEffectText(s.effect ?? "");
        setTags(s.tags.toString().replace(/ 0/gi, ""));
        setReqs(s.req.toString());
        setCost(s.cost);
        setCraft(s.craft);
    }

    function removeFromPinnedItem() {
        // Set inputs to nothing
        setCurID(0);
        setNameText("");
        setEffectText("");
        setTags("tiny");
        setReqs("");
        setCost(0);
        setCraft(0);
        setEffectText("");
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
            setPopupData(reply);
            setPopupName("Create New");
            setPopupIsOpen(true);
            console.log(reply);
        }
        // Set inputs to nothing
        removeFromPinnedItem();
        getItems();
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
            setPopupData(reply);
            setPopupName("Update");
            setPopupIsOpen(true);
            console.log(reply);
        }
        // Set inputs to nothing
        removeFromPinnedItem();
        getItems();
    }

    async function handleDelete() {
        console.log(curItem);
        if (curItem?.id == undefined) {
            return;
        }
        if (curItem?.name != "") {
            const reply = await ItemsService.deleteItem({ id: curItem?.id });
            setPopupData(reply);
            setPopupName("Delete");
            setPopupIsOpen(true);
            console.log(reply);
        }
        // Set inputs to nothing
        removeFromPinnedItem();
        getItems();
    }

    useEffect(() => {
        // console.log(mainStat,secondStat,otherDrop);
        const item = {
            id: curID,
            name: nameText.toLowerCase(),
            effect: effectText,
            req: reqs.split(","),
            cost: cost,
            craft: craft,
            tags: tags.split(","),
        };

        item.tags = item.tags.filter((str) => str !== "");
        item.req = item.req.filter((str) => str !== "");

        setCurItem(item);
    }, [curID, nameText, effectText, tags, reqs, cost, craft]);

    // Styling:

    return (
        <>
            <div className="grid grid-rows-auto-auto-auto-1fr-auto gap-4 p-4 bg-dark-400 rounded-md">
                <div className="grid grid-cols-1 grid-rows-3 md:grid-rows-1 md:grid-cols-8 gap-4 p-2 bg-dark-300 rounded-lg">
                    <div className="md:col-span-2 md:row-span-2 justify-center">
                        <div className="flex flex-row capitalize">Name</div>
                        <input
                            type="text"
                            placeholder="Feather"
                            className="flex flex-row h-9 rounded-lg p-2 mt-1 w-[100%] shadow-md"
                            value={nameText}
                            onChange={(e) => setNameText(e.target.value)}
                        />
                    </div>
                    <div className="md:col-span-2">
                        <div className="flex flex-row capitalize">
                            Requirements
                        </div>
                        <input
                            type="text"
                            className="flex flex-row h-9 rounded-lg p-2 mt-1 w-[100%] shadow-md"
                            value={reqs}
                            onChange={(e) => setReqs(e.target.value)}
                        />
                        <CleanCombobox
                            items={statSkillList}
                            className="flex flex-row"
                            selected={""}
                            setSelected={(val) => {
                                setReqs(reqs.concat(",", val));
                            }}
                        />
                    </div>
                    <div className="md:col-span-2">
                        <div className="flex flex-row capitalize">tags</div>
                        <input
                            type="text"
                            className="flex flex-row h-9 rounded-lg p-2 mt-1 w-[100%] shadow-md"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                        />
                        <CleanCombobox
                            items={tagList}
                            className="flex flex-row"
                            selected={""}
                            setSelected={(val) => {
                                setTags(tags.concat(",", val));
                            }}
                        />
                    </div>
                    <div className="md:col-span-1 md:row-span-2">
                        <div className="flex flex-row capitalize">cost</div>
                        <input
                            type="number"
                            className="flex flex-row h-9 rounded-lg p-2 mt-1 w-[100%] shadow-md"
                            value={cost}
                            min="0"
                            onChange={(e) => setCost(parseInt(e.target.value))}
                        />
                    </div>
                    <div className="md:col-span-1 md:row-span-2">
                        <div className="flex flex-row capitalize">craft</div>
                        <input
                            type="number"
                            className="flex flex-row h-9 rounded-lg p-2 mt-1 w-[100%] shadow-md"
                            value={craft}
                            min="0"
                            max="9"
                            onChange={(e) => setCraft(parseInt(e.target.value))}
                        />
                    </div>
                </div>

                <div className="">Effect</div>
                <textarea
                    placeholder="A light little feather."
                    className="bg-dark-300 h-44 rounded-lg p-2"
                    value={effectText}
                    onChange={(e) => setEffectText(e.target.value)}
                />

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
                {/* <Popup displayedContentName={popupName} displayedContent={popupData} popupIsOpen={popupIsOpen} setPopupIsOpen={(val) => {setPopupIsOpen(val);}} /> */}
            </div>

            <h1>Items</h1>

            {curItem?.name && (
                <>
                    <div className="justify-start">
                        <h1>Active Item</h1>
                        <ItemsTable
                            displayedItems={[curItem]}
                            moveItem={removeFromPinnedItem}
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
                                    "hover:font-bold px-2 py-1 w-10 dark:bg-dark-600 bg-light-600 rounded-md ring-light",
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
                                            "hover:font-bold px-2 py-1 dark:bg-dark-600 bg-light-600 rounded-md ring-light",
                                            getTabWidth(n.length),
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
                        <ItemsTable
                            displayedItems={displayedItems}
                            moveItem={(item) => {
                                addToPinnedItem(item);
                            }}
                        />
                    </Tab.Panel>
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
        </>
    );
}
