import { useState, useEffect } from "react";
import { Item } from "../../client";

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";

import useApi from "../../hooks/useApi";

import { Tab, Disclosure } from "@headlessui/react";

import ItemsTable from "./ItemsTable";

import json from "../../assets/OfflineJsons/Items.json";
import { Button } from "../ui/Button/Button";
import { filterBROKENandMONSTER, sortArrayByReqs } from "../../util/sortingTools";
import { getPersistentPinnedNames } from "../../util/tableTools";

import { ChevronIcon } from "../../assets/IconSVGs/heroiconsSVG";


function getTabWidth(lengthOfName: number) {
    return lengthOfName < 5 ? "w-14" : lengthOfName < 8 ? "w-20" : "w-28";
}

export default function ItemsTablePage() {
    const { ItemsService } = useApi();

    const [searchValue, setSearchValue] = useState("");
    const [allItems, setAllItems] = useState<Array<Item>>([]);
    const [pinnedItems, setPinnedItems] = useState<Array<Item>>([]);
    const [displayedItems, setDisplayedItems] = useState<Array<Item>>([]);
    const [clearButtonVisibility, setClearButtonVisibility] =
        useState("hidden");


    useEffect(() => {
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

            items = filterBROKENandMONSTER(items);

            items = sortArrayByReqs(items ?? []);

            setAllItems(items);
            setDisplayedItems(items);

            const persistentPinnedItems = getPersistentPinnedNames("pinnedItemNames",items);

            if (persistentPinnedItems) {
                setPinnedItems(persistentPinnedItems);
            }
            
        }
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

    function updatePersistantPinnedItems() {
        const pinnedItemNames: string[] = pinnedItems.map((i) => {
            return i.name;
        });
        window.localStorage.setItem(
            "pinnedItemNames",
            pinnedItemNames.join(";|;")
        );
    }

    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(" ");
    }

    function addToPinnedItems(i: Item) {
        setPinnedItems(sortArrayByReqs([...pinnedItems, i]));
        updatePersistantPinnedItems();
    }

    function removeFromPinnedItems(i: Item) {
        const idx = pinnedItems.indexOf(i);
        const remainingItems = pinnedItems.slice();
        remainingItems.splice(idx, 1);
        setPinnedItems(remainingItems);
        updatePersistantPinnedItems();
    }

    const IterativeItemLevels = [
        "Weapon",
        "Armor",
        "Rune",
        "Potion",
        "Grenade",
        "Non-magic",
        "Lesser",
        "Greater",
    ];

    return (
        <>
            <h1>Items</h1>

            {pinnedItems.length > 0 && (
                <>
                    <div className="justify-start">
                        <Disclosure defaultOpen>
                            {({ open }) => (
                                <>
                                    <Disclosure.Button>
                                        <Button
                                            variant={"soul"}
                                            className="mb-2"
                                            open={open}
                                            rightIcon={ChevronIcon}
                                        >
                                            Pinned Items
                                        </Button>
                                    </Disclosure.Button>
                                    <Disclosure.Panel>
                                        <ItemsTable
                                            displayedItems={pinnedItems}
                                            moveItem={(item) => {
                                                removeFromPinnedItems(item);
                                            }}
                                            moveIsAdd={false}
                                        />
                                        <hr className="h-px my-4 border-0 bg-dark-600" />
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    </div>
                </>
            )}

            <Tab.Group as="div" className="w-full ">
                <div className="flex flex-column justify-between py-1 w-full align-middle">
                    <Tab.List className="flex space-x-1 p-1 gap-1">
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
                        {IterativeItemLevels.map((n) => {
                            return (
                                <Tab
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
                    <div className="flex flex-column items-center px-2 py-1 bg-dark-700 rounded-full">
                        <MagnifyingGlassIcon className="h-6 w-6" />

                        <input
                            value={searchValue}
                            type="text"
                            name="search"
                            placeholder="Search"
                            className="bg-dark-700 pl-1"
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
                                addToPinnedItems(item);
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
                                        addToPinnedItems(item);
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