import { Tab, Disclosure, Switch } from "@headlessui/react";
import ItemsTable from "./ItemsTable";
import { Button } from "../ui/Button/Button";
import { classNames, download } from "../../util/tableTools";
import { ChevronIcon } from "../../assets/IconSVGs/heroiconsSVG";
import { useItems } from "../../hooks/useItems";
import { eApiClass } from "../../types/ApiClassUnions";
import SearchGroup from "../search/SearchGroup";
import { useState } from "react";
import MarkdownRenderer from "../../util/MarkdownRenderer";
import item_key from "../../assets/RulebookFiles/markdown/item_key.md";


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

    const [enabled, setEnabled] = useState(false);

    return (
        <>
            <h1>Items</h1>

            {/* Download/Switch */}
            <div className="flex flex-col justify-center items-center">
                <div className="bg-dark-400 rounded-md pl-4 p-2 m-2">
                <div className="flex flex-row justify-center items-center m-2">
                    <Button
                        onClick={() =>
                            download(
                                JSON.stringify(allItems, null, 2),
                                "items.json",
                                "text/json"
                            )
                        }
                        variant="thieving"
                    >
                        Download Items Json
                    </Button>

                    {/* <div className="flex flex-row justify-center items-center bg-dark-300 rounded-md p-2 m-2">
                        {enabled && <p className="flex flex-row justify-center items-center m-2">Switch to Table</p>}
                        {!enabled && <p className="flex flex-row justify-center items-center m-2">Switch to Block</p>}
                        
                        <Switch
                            checked={enabled}
                            onChange={setEnabled}
                            className={`${
                                enabled ? 'bg-body' : 'bg-dark-700'
                            } relative inline-flex h-6 w-11 items-center rounded-full`}
                            >
                            <span className="sr-only">Switch to Block Mode</span>
                            <span
                                className={`${
                                enabled ? 'translate-x-6' : 'translate-x-1'
                                } inline-block h-4 w-4 transform rounded-full bg-light transition`}
                            />
                        </Switch>
                    </div> */}

                    {/* Line */}
                    {/* <div className="flex flex-row items-center bg-dark-600 border-2 border-body-700/20 mt-6 mb-6 w-full"></div> */}
                    
                </div>

                <Disclosure defaultOpen={false}>
                    {({ open }) => (
                        <>
                            <Disclosure.Button>
                                <Button
                                    variant={"thieving"}
                                    size={"md"}
                                    className="mb-2"
                                    open={open}
                                    rightIcon={ChevronIcon}
                                >
                                    Key
                                </Button>
                            </Disclosure.Button>
                            <Disclosure.Panel>
                                <MarkdownRenderer markdown={item_key as string} have_header={false} />
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>

                </div>

            </div>

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
