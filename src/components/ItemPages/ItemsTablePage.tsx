import { useState, useEffect } from "react";
import { Item } from "../../client";

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";

import useApi from "../../hooks/useApi";

import { Tab } from "@headlessui/react";

import ItemsTable from "./ItemsTable";

import json from "../../assets/OfflineJsons/Items.json";

export default function ItemsTablePage() {
    const { ItemsService } = useApi();

    const [searchValue, setSearchValue] = useState("");
    const [allItems, setAllItems] = useState<Array<Item>>([]);
    const [displayedItems, setDisplayedItems] = useState<Array<Item>>([]);
    const [clearButtonVisibility, setClearButtonVisibility] =
        useState("hidden");

    useEffect(() => {
        async function getItems() {
            
            let items;
            try {
                const itemsRaw = await ItemsService.getAllItems();
                items = Object.values(itemsRaw);
            } catch (e) {
                if (e instanceof Error && e.message == "Network Error") {
                    console.log(
                        "WARNING YOU ARE OFFLINE! A backup is being used, however it is not up to date and may have incorect data."
                    );
                    items = Object.values(json);
                }
            }
            console.log(items);
            items = items?.filter((s) => {
                if (s.req) {
                    return s.req?.toString().includes("MONSTER") || s.req?.toString().includes("BROKEN") ? "":s.req;
                }
            });

            const itemsSortedByReq = items?.sort((t1, t2) => {
                // console.log(t.name);
                return (t1.name ?? "") < (t2.name ?? "") ? -1 : 1;
            });
            setAllItems(itemsSortedByReq ?? []);
            // setItemsObjectSorted(items);
            setDisplayedItems(itemsSortedByReq ?? []);
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

    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(" ");
    }

    const IterativeItemLevels = ["Weapon", 'Armor', 'Item', 'Rune', 'Consumable', 'Lesser', 'Greater'];

    // Styling:

    return (
        <>
            <h1 className="text-3xl font-bold">Items</h1>

            <Tab.Group as="div" className="w-full ">
                <div className="flex flex-column justify-between py-1 w-full align-middle">
                    <Tab.List className="flex space-x-1 p-1 gap-1">
                        <Tab
                            className={({ selected }) =>
                                classNames(
                                    "hover:font-bold px-2 py-1 dark:bg-dark-600 bg-light-600 rounded-md ring-light",
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
                        <ItemsTable displayedItems={displayedItems} />
                    </Tab.Panel>
                    {IterativeItemLevels.map((n) => {
                        return (
                            <Tab.Panel>
                                <ItemsTable
                                    displayedItems={displayedItems.filter(
                                        (s) => {
                                            return s.tags?.toString().toLowerCase().includes(n.toLowerCase());
                                        }
                                    )}
                                />
                            </Tab.Panel>
                        );
                    })}
                </Tab.Panels>
            </Tab.Group>
        </>
    );
}
