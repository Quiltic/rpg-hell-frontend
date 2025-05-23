import { Tab, Disclosure } from "@headlessui/react";
import ItemsTable from "./ItemsTable";
import { Button } from "../ui/Button/Button";
import { classNames, download } from "../../util/tableTools";
import { ChevronIcon } from "../../assets/IconSVGs/heroiconsSVG";
import { useItems } from "../../hooks/useItems";
import { eApiClass } from "../../types/ApiClassUnions";
import SearchGroup from "../search/SearchGroup";

function getTabWidth(lengthOfName: number) {
    return lengthOfName < 5 ? "w-14" : lengthOfName < 8 ? "w-20" : "w-28";
}

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
    "alchemical",
    "tool",
    "rune",
    "armor _",
    "magical",
    "common",
    "uncommon",
    "rare",
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
    "Alchemical",
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
                    <SearchGroup 
                        filter={filterItems} 
                        resetFilter={resetFilterItems}
                        filterClass={eApiClass.Item}
                        tagList={tagList}
                    />
                    
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
