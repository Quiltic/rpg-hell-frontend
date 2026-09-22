import { useEffect, useMemo, useState } from "react";
import { Item } from "../../../client";
import { useItems } from "../../../hooks/useItems";
import { playerCharacterType } from "../../../types/playerCharacterType";
import { Button } from "../../ui/Button/Button";
import Popup from "../../ui/Popups/Popup";
import { changeItemInArray } from "../../../util/creatureHelpers";
import ItemCard from "../../ItemPages/ItemCardStuff/itemCard";
import PickerPart from "./Parts/PickerPart";

type Props = {
    player: playerCharacterType;
    // setPlayer: (player: playerCharacterType) => void;
    chosenItems: Array<Item>;
    setChosenItems: (item: Array<Item>) => void;
    continueButton: () => void;
    backButton: () => void;
};

type statline = "body" | "mind" | "soul" | "arcana" | "charm" | "finesse" | "nature";

export default function BuilderStep6({
    player: player,
    // setPlayer: setPlayer,
    continueButton: continueButton,
    backButton: backButton,
    chosenItems: chosenItems,
    setChosenItems: setChosenItems,
}: Props) {
    const {
        allItems,
        pinnedItems,
        displayedItems,
        addToPinnedItems,
        removeFromPinnedItems,
        filterItems,
        resetFilterItems,
    } = useItems();

    const [isOpen, setIsOpen] = useState(false);
    const [itemType, setItemType] = useState("");
    const [picking, setPicking] = useState(0);

    useEffect(() => {
        filterItems((item) => {
            return item.tier <= 1;
        });
        // console.log(displayedItems);
    }, [allItems]);
    // console.log(player.stats.mind);

    return (
        <div>
            <Popup
                displayedContentName={`Pick a ${itemType}`}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                isSmol={false}
                displayedContent={
                    <>
                        <div className="grid grid-cols-2">
                            {displayedItems
                                .filter((item) => {
                                    let reqMet = true;

                                    // See if the item has any stat req
                                    const reqlist: Array<string> = [];
                                    item.tags
                                        ?.toLowerCase()
                                        .split(", ")
                                        .forEach((tag) => {
                                            if (
                                                "body mind soul arcana charm finesse nature".includes(
                                                    tag.substring(0, tag.length - 1)
                                                )
                                            ) {
                                                reqlist.push(tag);
                                            }
                                        });

                                    // See if we meet any stat req
                                    if (reqlist.length) {
                                        reqlist.forEach((tag) => {
                                            const stat: statline = tag.split(" ")[0] as statline;
                                            const val = tag.split(" ")[1];
                                            // console.log(player.stats.mind);
                                            // console.log(player.stats[stat]);
                                            reqMet = reqMet && player.stats[stat] >= parseInt(val);
                                        });
                                    }

                                    // look through all search types to see if its what we want
                                    const multiSearch = itemType.split(" | ");
                                    let foundSearch = false;
                                    multiSearch.forEach((search: string) => {
                                        foundSearch = foundSearch || item.tags.includes(search);
                                    });

                                    //if req are met and its of the type we are looking for
                                    return reqMet && foundSearch;
                                    // }
                                })
                                .map((item, i) => {
                                    if (item.name != "Error") {
                                        return (
                                            <div
                                                className="clickable"
                                                onClick={() => {
                                                    setChosenItems(changeItemInArray(chosenItems, picking, item));
                                                    // setPlayer({
                                                    //     ...player,
                                                    //     equipped: changeItemInArray(
                                                    //         player.equipped,
                                                    //         picking,
                                                    //         item.name
                                                    //     ),
                                                    // });
                                                    setIsOpen(false);
                                                }}
                                            >
                                                <ItemCard
                                                    _item={item}
                                                    showUpgrades={false}
                                                    key={i}
                                                />
                                            </div>
                                        );
                                    }
                                })}
                        </div>
                    </>
                }
            />

            {/* Top Bar */}
            <div className="m-2 flex flex-row items-center justify-center rounded-md bg-dark-400">
                <Button
                    variant="link-medicine"
                    className="m-2 flex items-center justify-center border-2 border-solid border-medicine-400"
                    onClick={backButton}
                >
                    Back
                </Button>
                <Button
                    disabled={chosenItems.find((item) => item.name == "") ? true : false}
                    variant="nature"
                    className="m-2 ml-4 flex items-center justify-center"
                    onClick={continueButton}
                >
                    Continue
                </Button>
            </div>

            <div className="m-4 items-center justify-center rounded-md border-2 border-solid border-body-700/20 bg-dark-400">
                <h1 className="m-2 rounded-md bg-dark-300 p-2">Step 6: Gear & Items</h1>

                <div className="grid grid-cols-3 items-center justify-items-center">
                    <PickerPart
                        useEmpty={chosenItems[0].name == ""}
                        emptyButton={() => {
                            setPicking(0);
                            setItemType("weapon");
                            setIsOpen(true);
                        }}
                        emptyText="Weapon"
                        filled={
                            <ItemCard
                                _item={chosenItems[0]}
                                showUpgrades={false}
                            />
                        }
                        filledButton={() => {
                            setPicking(0);
                            setItemType("weapon");
                            setIsOpen(true);
                        }}
                    />
                    <PickerPart
                        useEmpty={chosenItems[1].name == ""}
                        emptyButton={() => {
                            setPicking(1);
                            setItemType("weapon | shield");
                            setIsOpen(true);
                        }}
                        emptyText="Weapon or Shield"
                        filled={
                            <ItemCard
                                _item={chosenItems[1]}
                                showUpgrades={false}
                            />
                        }
                        filledButton={() => {
                            setPicking(1);
                            setItemType("weapon | shield");
                            setIsOpen(true);
                        }}
                    />
                    <PickerPart
                        useEmpty={chosenItems[2].name == ""}
                        emptyButton={() => {
                            setPicking(2);
                            setItemType("armor");
                            setIsOpen(true);
                        }}
                        emptyText="Armor"
                        filled={
                            <ItemCard
                                _item={chosenItems[2]}
                                showUpgrades={false}
                            />
                        }
                        filledButton={() => {
                            setPicking(2);
                            setItemType("armor");
                            setIsOpen(true);
                        }}
                    />
                </div>

                <div className="grid grid-cols-3">
                    <PickerPart
                        useEmpty={chosenItems[3].name == ""}
                        emptyButton={() => {
                            setPicking(3);
                            setItemType("tool");
                            setIsOpen(true);
                        }}
                        emptyText="Tool"
                        filled={
                            <ItemCard
                                _item={chosenItems[3]}
                                showUpgrades={false}
                            />
                        }
                        filledButton={() => {
                            setPicking(3);
                            setItemType("tool");
                            setIsOpen(true);
                        }}
                    />
                    <PickerPart
                        useEmpty={chosenItems[4].name == ""}
                        emptyButton={() => {
                            setPicking(4);
                            setItemType("pack");
                            setIsOpen(true);
                        }}
                        emptyText="Pack"
                        filled={
                            <ItemCard
                                _item={chosenItems[4]}
                                showUpgrades={false}
                            />
                        }
                        filledButton={() => {
                            setPicking(4);
                            setItemType("pack");
                            setIsOpen(true);
                        }}
                    />

                    <ItemCard
                        _item={allItems.find((item) => item.name == "bandage")} // yeah so it should always find this
                        showUpgrades={false}
                    />
                </div>
            </div>
        </div>
    );
}
