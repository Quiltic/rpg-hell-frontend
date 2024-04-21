import { useState, useEffect, useContext } from "react";
import { Item } from "../../client";

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";

import useApi from "../../hooks/useApi";

import { Tab, Disclosure } from "@headlessui/react";

import ItemsTable from "./ItemsTable";

import json from "../../assets/OfflineJsons/items.json";
import { Button } from "../ui/Button/Button";
import {
    filterBROKENandMONSTERreq,
    sortArrayByReqs,
} from "../../util/sortingTools";
import {
    classNames,
    download,
    getPersistentPinnedNames,
} from "../../util/tableTools";

import { ChevronIcon } from "../../assets/IconSVGs/heroiconsSVG";
import { AuthContext } from "../../context/AuthProvider";
import { useItems } from "../../hooks/useItems";
import Search from "../search/Search";
import { eApiClass } from "../../types/ApiClassUnions";

function getTabWidth(lengthOfName: number) {
    return lengthOfName < 5 ? "w-14" : lengthOfName < 8 ? "w-20" : "w-28";
}

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

export default function ItemsTablePage() {
    const {
        allItems,
        pinnedItems,
        displayedItems,
        addToPinnedItems,
        removeFromPinnedItems,
        filterItems,
        resetFilterItems,
    } = useItems();

    return (
        <>
            <h1>Items</h1>
            {/* (auth.isAuthenticated || (window.localStorage.getItem("db_access") == "IWANTMYCOOKIE")) &&  */}
            {
                <Button
                    onClick={() =>
                        download(
                            JSON.stringify(allItems, null, 2),
                            "items.json",
                            "text/json"
                        )
                    }
                    variant="link-soul"
                >
                    Download Items Json
                </Button>
            }

            {pinnedItems.length > 0 && (
                <>
                    <div className="justify-start">
                        <Disclosure defaultOpen>
                            {({ open }) => (
                                <>
                                    <Disclosure.Button>
                                        <Button
                                            variant={"dark"}
                                            className="mb-2 w-full"
                                            size={"xl"}
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
                                        <hr />
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    </div>
                </>
            )}

            <Tab.Group as="div" className="w-full ">
                <div className="md:flex-column w-full py-1 align-middle md:flex md:justify-between">
                    <Tab.List className="flex flex-wrap gap-2 p-1">
                        <Tab
                            key={0}
                            className={({ selected }) =>
                                classNames(
                                    "w-10 rounded-md bg-body-700/20 px-2 py-1 ring-body-700 hover:font-bold dark:bg-dark-600 dark:ring-light",
                                    selected ? "ring-2" : ""
                                )
                            }
                        >
                            All
                        </Tab>
                        {IterativeItemLevels.map((n, i) => {
                            return (
                                <Tab
                                    key={i + 1}
                                    className={({ selected }) =>
                                        classNames(
                                            "rounded-md bg-body-700/20 px-2 py-1 ring-body-700 hover:font-bold dark:bg-dark-600 dark:ring-light",
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
                    <Search
                        filter={filterItems}
                        resetFilter={resetFilterItems}
                        filterClass={eApiClass.Item}
                    />
                </div>
                <Tab.Panels>
                    <Tab.Panel>
                        <ItemsTable
                            displayedItems={displayedItems}
                            moveItem={(item) => {
                                removeFromPinnedItems(item);
                            }}
                        />
                    </Tab.Panel>
                    {IterativeItemLevels.map((n, i) => {
                        return (
                            <Tab.Panel key={i}>
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
