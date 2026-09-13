import { useState } from "react";
import { Item } from "../../../client";
import { useItems } from "../../../hooks/useItems";
import { playerCharacterType } from "../../../types/playerCharacterType";
import { Button } from "../../ui/Button/Button";
import Popup from "../../ui/Popups/Popup";
import { changeItemInArray } from "../../../util/creatureHelpers";
import ItemCard from "../../ItemPages/ItemCardStuff/itemCard";
import { PlusIcon } from "@heroicons/react/24/outline";

type Props = {
    player: playerCharacterType;
    setPlayer: (player: playerCharacterType) => void;
    setStepnum: () => void;
};

type statline =
    | ""
    | "body"
    | "mind"
    | "soul"
    | "arcana"
    | "charm"
    | "finesse"
    | "nature";

export default function BuilderStep6({
    player: player,
    setPlayer: setPlayer,
    setStepnum: setStepnum,
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

    // filterItems((item:Item)=>{return(item.tier <= 1)});

    const [isOpen, setIsOpen] = useState(false);
    const [itemType, setItemType] = useState("");
    const [picking, setPicking] = useState(0);

    const [chosenItems, setChosenItems] = useState<Array<Item>>([
        {
            name: "",
            description: "",
            effect: "",
            upgrades: [""],
            tags: "",
            rarity: "",
            cost: 0,
            tier: 0,
        }, // wep 1
        {
            name: "",
            description: "",
            effect: "",
            upgrades: [""],
            tags: "",
            rarity: "",
            cost: 0,
            tier: 0,
        }, // wep 2
        {
            name: "",
            description: "",
            effect: "",
            upgrades: [""],
            tags: "",
            rarity: "",
            cost: 0,
            tier: 0,
        }, // armor
    ]);

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

                                    let reqlist: Array<string> = [];
                                    item.tags
                                        ?.toLowerCase()
                                        .split(", ")
                                        .forEach((tag) => {
                                            if (
                                                "body mind soul arcana charm finesse nature".includes(
                                                    tag.substring(
                                                        0,
                                                        tag.length - 1
                                                    )
                                                )
                                            ) {
                                                reqlist.push(tag);
                                            }
                                        });
                                    if (reqlist.length) {
                                        reqlist.forEach((tag) => {
                                            const stat: statline =
                                                tag.split(" ")[0];
                                            const val = tag.split(" ")[1];
                                            console.log(player.stats[stat]);
                                            reqMet =
                                                reqMet &&
                                                player.stats[stat] >=
                                                    parseInt(val);
                                        });
                                    }

                                    return (
                                        item.tags.includes(itemType) && reqMet
                                    );
                                })
                                .map((item, i) => {
                                    if (item.name != "Error") {
                                        return (
                                            <div
                                                className="clickable"
                                                onClick={() => {
                                                    setChosenItems(
                                                        changeItemInArray(
                                                            chosenItems,
                                                            picking,
                                                            item
                                                        )
                                                    );
                                                    setPlayer({
                                                        ...player,
                                                        equipped:
                                                            changeItemInArray(
                                                                player.equipped,
                                                                picking,
                                                                item.name
                                                            ),
                                                    });
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
            <div className="m-4 items-center justify-center rounded-md border-2 border-solid border-body-700/20 bg-dark-400">
                <h1 className="m-2 rounded-md bg-dark-300 p-2">
                    Step 6: Gear & Items
                </h1>

                <div className="grid grid-cols-3 items-center justify-items-center">
                    {player.equipped[0] == "" && (
                        <div
                            className="clickable m-4 flex
                                    w-48 items-center justify-center rounded-md border-2 border-solid border-body-700/10 
                                    bg-dark-300 p-2"
                            onClick={() => {
                                setPicking(0);
                                setItemType("weapon");
                                setIsOpen(true);
                            }}
                        >
                            Weapon
                            <PlusIcon className="h-12 w-12" />
                        </div>
                    )}

                    {player.equipped[0] != "" && (
                        <div
                            className="clickable"
                            onClick={() => {
                                setPicking(0);
                                setItemType("weapon");
                                setIsOpen(true);
                            }}
                        >
                            <ItemCard
                                _item={chosenItems[0]}
                                showUpgrades={false}
                            />
                        </div>
                    )}

                    {player.equipped[1] == "" && (
                        <div
                            className="clickable m-4 flex
                                    w-48 items-center justify-center rounded-md border-2 border-solid border-body-700/10 
                                    bg-dark-300 p-2"
                            onClick={() => {
                                setPicking(1);
                                setItemType("weapon");
                                setIsOpen(true);
                            }}
                        >
                            Weapon or Shield
                            <PlusIcon className="h-12 w-12" />
                        </div>
                    )}

                    {player.equipped[1] != "" && (
                        <div
                            className="clickable"
                            onClick={() => {
                                setPicking(1);
                                setItemType("weapon");
                                setIsOpen(true);
                            }}
                        >
                            <ItemCard
                                _item={chosenItems[1]}
                                showUpgrades={false}
                            />
                        </div>
                    )}
                    {player.equipped[2] == "" && (
                        <div
                            className="clickable m-4 flex
                                    w-48 items-center justify-center rounded-md border-2 border-solid border-body-700/10 
                                    bg-dark-300 p-2"
                            onClick={() => {
                                setPicking(2);
                                setItemType("armor");
                                setIsOpen(true);
                            }}
                        >
                            Armor
                            <PlusIcon className="h-12 w-12" />
                        </div>
                    )}

                    {player.equipped[2] != "" && (
                        <div
                            className="clickable"
                            onClick={() => {
                                setPicking(2);
                                setItemType("armor");
                                setIsOpen(true);
                            }}
                        >
                            <ItemCard
                                _item={chosenItems[2]}
                                showUpgrades={false}
                            />
                        </div>
                    )}
                </div>
            </div>
            {/* Top Bar */}
            <div className="m-2 flex flex-row items-center justify-center rounded-md bg-dark-400">
                <Button
                    disabled={
                        player.items.includes("") || player.arts.includes("")
                    }
                    variant="nature"
                    className="m-2 ml-4 flex items-center justify-center"
                    onClick={setStepnum}
                >
                    Continue
                </Button>
            </div>
            Weapon - Req Weapon or Shield Armor - Req Tool Pack Bag of Coin -
            set Bandage - set textarea for anything else
        </div>
    );
}
