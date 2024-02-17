import { useState, useEffect, useContext } from "react";
import { Item } from "../../client";

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";

import useApi from "../../hooks/useApi";

import { Tab, Disclosure } from "@headlessui/react";

import ItemsTable from "./ItemsTable";

import json from "../../assets/OfflineJsons/Items.json";
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
    const { ItemsService } = useApi();

    const [searchValue, setSearchValue] = useState("");
    const [allItems, setAllItems] = useState<Array<Item>>([]);
    const [pinnedItems, setPinnedItems] = useState<Array<Item>>([]);
    const [displayedItems, setDisplayedItems] = useState<Array<Item>>([]);
    const [clearButtonVisibility, setClearButtonVisibility] =
        useState("hidden");

    const [hasInitializedPersistedItems, setHasInitializedPersistedItems] =
        useState(false);
    const { auth, authLoading } = useContext(AuthContext);

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

            if (!auth.admin) {
                items = filterBROKENandMONSTERreq(items);
                // IterativeTraitLevels.push('MONSTER');
            }

            items = sortArrayByReqs(items ?? []);

            setAllItems(items);
            setDisplayedItems(items);

            const persistentPinnedItems = getPersistentPinnedNames(
                "pinnedItemNames",
                items
            ) as Item[];

            if (persistentPinnedItems) {
                setPinnedItems(persistentPinnedItems);
            }
            setHasInitializedPersistedItems(true);
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

    useEffect(() => {
        if (hasInitializedPersistedItems == false) {
            return;
        }
        const pinnedItemNames: string[] = pinnedItems.map((i) => {
            return i.name;
        });
        console.log(pinnedItems, pinnedItemNames);
        window.localStorage.setItem(
            "pinnedItemNames",
            pinnedItemNames.join(";|;")
        );
    }, [hasInitializedPersistedItems, pinnedItems]);

    function addToPinnedItems(i: Item) {
        setPinnedItems(sortArrayByReqs([...pinnedItems, i]));
        console.log(pinnedItems);
    }

    function removeFromPinnedItems(i: Item) {
        const idx = pinnedItems.indexOf(i);
        const remainingItems = pinnedItems.slice();
        remainingItems.splice(idx, 1);
        setPinnedItems(remainingItems);
    }

    return (
        <>
            <h1>Items</h1>
            {auth.isAuthenticated && (
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
            )}

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
                <div className="md:flex md:flex-column md:justify-between py-1 w-full align-middle">
                    <Tab.List className="p-1 gap-2 flex flex-wrap">
                        <Tab
                            key={0}
                            className={({ selected }) =>
                                classNames(
                                    "hover:font-bold px-2 py-1 w-10 dark:bg-dark-600 bg-body-700/20 rounded-md ring-body-700 dark:ring-light",
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
                                            "hover:font-bold px-2 py-1 dark:bg-dark-600 bg-body-700/20 rounded-md ring-body-700 dark:ring-light",
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
                        <MagnifyingGlassIcon className="h-6 w-6 text-light" />

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
