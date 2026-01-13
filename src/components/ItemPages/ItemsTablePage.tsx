import { Tab, Disclosure } from "@headlessui/react";
import ItemsTable from "./ItemsTable";
import { Button } from "../ui/Button/Button";
import { classNames, download } from "../../util/tableTools";
import { ChevronIcon } from "../../assets/IconSVGs/heroiconsSVG";
import { useItems } from "../../hooks/useItems";
import { eApiClass } from "../../types/ApiClassUnions";
import SearchGroup from "../search/SearchGroup";


const tagList = [
    "weapon",
    "armor",
    "medicine",
    "alchemical",
    "consumable",
    "tool",
    "mysc",
    "magical",
    "body _",
    "mind _",
    "soul _",
    "arcana _",
    "charm _",
    "crafting _",
    "medicine _",
    "nature _",
    "thieving _",
    "MONSTER",
    "BROKEN",
    "OOC",
    "tiny",
    "small",
    "medium",
    "large",
    "huge",
    "bigabongus",
    "complex",
    "vehicle",
    "bound",
    "loading _",
    "range _",
    "two handed",
    "throw range _",
    "glow",
    "side",
    "upgraded",
    "unique",
];

const IterativeItemLevels = [
    "weapon",
    "armor",
    "medicine",
    "alchemical",
    "consumable",
    "tool",
    "mysc",
    "magical",
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
                <div className="md:flex md:flex-column md:justify-between py-1 w-full align-middle">
                    <Tab.List className="flex flex-wrap gap-2 p-1">
                        <Tab
                            className={({ selected }) =>
                                classNames(
                                    "w-10 rounded-md bg-body-700/20 px-2 py-1 ring-aabase hover:font-bold dark:bg-dark-600",
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
                                            "w-16 rounded-md bg-body-700/20 p-2 px-1 py-1 ring-aabase hover:font-bold dark:bg-dark-600 capitalize w-auto",
                                            `text-${n.toLowerCase()} dark:text-${n.toLowerCase()}-700 ring-${n.toLowerCase()}-600 dark:ring-${n.toLowerCase()}-600`,
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
                                            return s.tags.includes(n);
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
