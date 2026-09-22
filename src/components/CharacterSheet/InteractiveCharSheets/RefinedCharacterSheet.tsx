import { useEffect, useState } from "react";
import { Trait, Item, Spell } from "../../../client";
import ItemCard from "../../ItemPages/ItemCardStuff/itemCard";
import TraitCard from "../../TraitsPages/TraitCardStuff/traitCard";
import ArtCard from "../../SpellsPages/SpellCardStuff/artCard";
import DicePopup from "../../ui/Popups/dicePopup";
import { capitalize } from "../../../util/textFormatting";
import Tooltip from "../../ui/Tooltip";
import { playerCharacterType } from "../../../types/playerCharacterType";
import { useItems } from "../../../hooks/useItems";
import { useSpells } from "../../../hooks/useSpells";
import { useTraits } from "../../../hooks/useTraits";
import DamageTaker from "./DamageTaker";
import Statblock from "../../CreaturesPages/Parts/StatblockPart";
import { Tab } from "@headlessui/react";
import { cn } from "../../../styling/utilites";
import DiceRoller from "../../ui/DiceRoller";

import pathJson from "../../../assets/OfflineJsons/paths.json";

type Props = {
    player: playerCharacterType;
    setPlayer: (player: playerCharacterType) => void;
};

export default function RefinedCharacterSheet({ player: player, setPlayer: setPlayer }: Props) {
    const {
        allTraits,
        pinnedTraits,
        displayedTraits,
        addToPinnedTraits,
        removeFromPinnedTraits,
        filterTraits,
        resetFilterTraits,
    } = useTraits();
    const {
        allSpells,
        pinnedSpells,
        displayedSpells,
        addToPinnedSpells,
        removeFromPinnedSpells,
        filterSpells,
        resetFilterSpells,
    } = useSpells();
    const {
        allItems,
        pinnedItems,
        displayedItems,
        addToPinnedItems,
        removeFromPinnedItems,
        filterItems,
        resetFilterItems,
    } = useItems();

    const [openDice, setOpenDice] = useState(false);
    const [dice, setDice] = useState([1]);
    const [diceBonus, setDiceBonus] = useState(0);

    const [itemString, setItemString] = useState("");
    const [equItems, setEquItems] = useState<Array<string>>([]);

    // idk how to load this without a useEffect :)
    useEffect(() => {
        // console.log(allItems.length)
        // console.log(player.items);
        if (allItems.length != 0 && player.items.length != 0) {
            // console.log(player.items);
            getItemString(player.items);
            // console.log(player.items);
        }
    }, [allItems]);

    function getItemString(items: Array<string>) {
        let theBigstring = "";
        const equArray: Array<string> = [];
        // console.log(items);
        items.forEach((item: string) => {
            if (item != "") {
                const theItem = allItems.find(
                    (searchingItem) => searchingItem.name == item.replace("(equ)", "").replace("\n", "").toLowerCase()
                );

                // console.log(theItem);
                if (theItem) {
                    theBigstring += capitalize(item) + " (found) -> ";
                    if (theItem.tags.includes("weapon")) theBigstring += theItem.tags.replace(/weapon../, "") + " - ";
                    theBigstring += theItem.effect + "\n\n";
                } else {
                    theBigstring = theBigstring + item + "\n\n";
                }

                if (item.includes("(equ)")) equArray.push(item);
            }
        });
        setEquItems(equArray);
        // console.log(theBigstring);
        setItemString(theBigstring);
        // modifyPlayerStatsBasedOnItems();
    }

    function cleanupItems() {
        // getItemString(player.items);
        // console.log(itemString);
        const itemArray: Array<string> = [];

        itemString.split("\n\n").forEach((line) => {
            // if it fails to split then it is a custom item, otherwise its a found item
            const splitItem = line.split(" (found) -> ");
            if (splitItem.length > 1) {
                // console.log(splitItem[1].split(" - ").at(-1));
                // dont want to del a deliberate change
                if (
                    allItems.find((searchingItem) => searchingItem.effect == splitItem[1].split(" - ").at(-1)) !=
                    undefined
                )
                    itemArray.push(splitItem[0].toLowerCase());
                else itemArray.push(line.replace(" (found) -> ", " (modified) -> "));
            } else itemArray.push(line);
        });
        // console.log(itemArray);
        setPlayer({
            ...player,
            items: itemArray.filter((item) => item != "" && item != "\n"),
            calculatedStats: modifyPlayerStatsBasedOnItems(),
        });
    }

    // FINE ILL TEST OUT AN AI CODE.
    function extractNumber(text: string, regex: RegExp): number {
        const match = text.match(regex);

        if (!match) {
            return 0;
        }

        // console.log("wha?",match);

        // Prefer the first capturing group; otherwise use the full match.
        const numberText = match[1] ?? match[0];
        const value = Number.parseFloat(numberText);

        return Number.isNaN(value) ? 0 : value;
    }

    // Put this on the onBlur for items
    function modifyPlayerStatsBasedOnItems() {
        // longwindedNameButYouKnowItDoesSayWhatItIs

        const hp = 4 * player.stats.body + 3 * player.stats.mind + 2 * player.stats.soul + player.level;
        const strain = 2 * player.stats.body + 3 * player.stats.mind + 4 * player.stats.soul + player.level;

        const newCalculatedStats = {
            speed: 6,
            dodge: 0,
            shielding: 0,

            maxHp: hp,
            maxStrain: strain,

            curHp: player.calculatedStats.curHp,
            curStrain: player.calculatedStats.curStrain,
        };

        // console.log(equItems);
        equItems.forEach((equItem: string) => {
            const foundItem = allItems.find((item) => item.name == equItem.replace("(equ)", ""));
            // console.log(foundItem);
            let item = equItem.toLowerCase();
            if (foundItem) item = foundItem.effect.toLowerCase();

            // console.log(item.replace("level",player.level.toString()),extractNumber(item.replace("level",player.level.toString()),
            //     /\d max health/));
            // console.log(item,extractNumber(item,/.\d dodge/))

            newCalculatedStats.speed += extractNumber(item, /.\d speed/);
            newCalculatedStats.dodge += extractNumber(item, /.\d dodge/);
            newCalculatedStats.shielding += extractNumber(item, /.\d shielding/);

            newCalculatedStats.maxHp += extractNumber(item.replace("level", player.level.toString()), /.\d max health/);
            newCalculatedStats.maxStrain += extractNumber(
                item.replace("level", player.level.toString()).toLowerCase(),
                /.\d max strain/
            );
        });

        // console.log(newCalculatedStats)
        return newCalculatedStats;
        // if (newCalculatedStats != player.calculatedStats)
        //     setPlayer({ ...player, calculatedStats: newCalculatedStats });
    }

    return (
        <div className="flex flex-col">
            <DicePopup
                startingDice={dice}
                startingBonus={diceBonus}
                isOpen={openDice}
                setIsOpen={setOpenDice}
                setDice={setDice}
                setBonus={setDiceBonus}
            />

            <div className="m-4 flex flex-col rounded-md border-2 border-solid border-body-700/20 bg-dark-400">
                {/* Name/Level/Types */}
                <div className="grid grid-cols-2 rounded-md bg-dark-400">
                    <div className="center m-2 flex rounded-lg bg-dark-300 p-2 ">
                        <input
                            type="text"
                            placeholder={"Name"}
                            className="w-full rounded-lg p-2 shadow-md"
                            value={player.name}
                            onChange={(e) => setPlayer({ ...player, name: e.target.value })}
                        />
                    </div>

                    <div className="m-2 flex flex-row items-center justify-end rounded-md bg-dark-400 p-2 capitalize">
                        <div className="ml-2 mr-2 rounded-md bg-dark-300 p-2 text-lg font-bold md:text-xl">
                            Level: {player.level}
                        </div>
                        <div className="text-mg ml-2 mr-2 rounded-md bg-nature-300 p-2 md:text-lg">Lvl Up</div>
                        <div className="text-mg ml-2 mr-2 rounded-md bg-body-300 p-2 md:text-lg">Break</div>
                        <div className="text-mg ml-2 mr-2 rounded-md bg-medicine-300 p-2 md:text-lg">Rest</div>
                        <div className="text-mg ml-2 mr-2 rounded-md bg-dark-300 p-2 md:text-lg">Print</div>
                    </div>
                </div>
                {/* Top Section -> Stats and Tabs */}
                <div className="bg-dark lg:grid lg:grid-cols-2 lg:gap-1">
                    {/* Stats */}
                    <Statblock
                        player={player}
                        setPlayer={setPlayer}
                    />
                    {/* Tabs -> Dice/Dmg */}
                    <Tab.Group
                        as="div"
                        className="m-4 hidden md:block"
                        defaultIndex={0}
                    >
                        <div className="md:flex-column mb-0 ml-6 w-full align-middle md:flex md:justify-between">
                            <Tab.List className="flex flex-wrap gap-2">
                                <Tab
                                    className={({ selected }) =>
                                        cn(
                                            "rounded-t-md px-2 py-1 ring-aabase hover:font-bold",
                                            selected ? "bg-dark-400 ring-2" : "bg-dark-600"
                                        )
                                    }
                                >
                                    {/* The aim was to have it be a link if you already have it selected (one that opens a new tab) */}
                                    {/* <a href="https://quiltic.github.io/rpg-hell-frontend/rulebook/character-creation#stories"> */}
                                    Stories
                                    {/* </a> */}
                                </Tab>
                                <Tab
                                    className={({ selected }) =>
                                        cn(
                                            "rounded-t-md bg-dark-600 px-2 py-1 ring-aabase hover:font-bold",
                                            selected ? "bg-dark-400 ring-2" : "bg-dark-600"
                                        )
                                    }
                                >
                                    Items
                                </Tab>
                                <Tab
                                    className={({ selected }) =>
                                        cn(
                                            "rounded-t-md bg-dark-600 px-2 py-1 ring-aabase hover:font-bold",
                                            selected ? "bg-dark-400 ring-2" : "bg-dark-600"
                                        )
                                    }
                                >
                                    Notes
                                </Tab>
                                <Tab
                                    className={({ selected }) =>
                                        cn(
                                            "rounded-t-md px-2 py-1 ring-aabase hover:font-bold",
                                            selected ? "bg-dark-400 ring-2" : "bg-dark-600"
                                        )
                                    }
                                >
                                    Dice
                                </Tab>
                                <Tab
                                    className={({ selected }) =>
                                        cn(
                                            "rounded-t-md bg-dark-600 px-2 py-1 ring-aabase hover:font-bold",
                                            selected ? "bg-dark-400 ring-2" : "bg-dark-600"
                                        )
                                    }
                                >
                                    Healing & Damage
                                </Tab>
                            </Tab.List>
                        </div>
                        <Tab.Panels>
                            <Tab.Panel className={"m-1 rounded-md p-2 ring-2 ring-aabase"}>
                                <textarea
                                    placeholder="Here is a spot for your Stories!
There is a link above for what a Story is!"
                                    className="m-1 h-64 w-full rounded-lg bg-dark-300 p-1"
                                    value={player.stories}
                                    onChange={(text) => setPlayer({ ...player, stories: text.target.value })}
                                />
                            </Tab.Panel>
                            <Tab.Panel className={"m-1 rounded-md p-2 ring-2 ring-aabase"}>
                                <textarea
                                    placeholder="You gots no Items!"
                                    className="m-1 h-64 w-full rounded-lg bg-dark-300 p-1"
                                    value={itemString}
                                    onChange={(text) => setItemString(text.target.value)}
                                    onBlur={() => cleanupItems()}
                                    onFocus={() => getItemString(player.items)}
                                />
                            </Tab.Panel>
                            <Tab.Panel className={"m-1 rounded-md p-2 ring-2 ring-aabase"}>
                                <textarea
                                    placeholder="Here lies Notes... May they rest in piece."
                                    className="m-1 h-64 w-full rounded-lg bg-dark-300 p-1"
                                    value={player.notes}
                                    onChange={(text) => setPlayer({ ...player, notes: text.target.value })}
                                />
                            </Tab.Panel>
                            <Tab.Panel className={"m-1 rounded-md p-2 ring-2 ring-aabase"}>
                                <DiceRoller
                                    startingDice={dice}
                                    startingBonus={diceBonus}
                                    isOpen={true}
                                    setDice={setDice}
                                    setBonus={setDiceBonus}
                                />
                            </Tab.Panel>
                            <Tab.Panel className={"m-1 rounded-md p-2 ring-2 ring-aabase"}>
                                <DamageTaker
                                    player={player}
                                    setPlayer={setPlayer}
                                />
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>
                {/* Stories/Items(string)/Notes */}
                <Tab.Group
                    as="div"
                    className="m-4"
                    defaultIndex={0}
                >
                    <div className="md:flex-column ml-6 w-full align-middle md:flex md:justify-between">
                        <Tab.List className="flex flex-wrap gap-2">
                            <Tab
                                className={({ selected }) =>
                                    cn(
                                        "rounded-t-md bg-dark-600 px-2 py-1 ring-aabase hover:font-bold",
                                        selected ? "bg-dark-400 ring-2" : "bg-dark-600"
                                    )
                                }
                            >
                                Closed
                            </Tab>
                            <Tab
                                className={({ selected }) =>
                                    cn(
                                        "rounded-t-md px-2 py-1 ring-aabase hover:font-bold",
                                        selected ? "bg-dark-400 ring-2" : "bg-dark-600"
                                    )
                                }
                            >
                                {/* The aim was to have it be a link if you already have it selected (one that opens a new tab) */}
                                {/* <a href="https://quiltic.github.io/rpg-hell-frontend/rulebook/character-creation#stories"> */}
                                Stories
                                {/* </a> */}
                            </Tab>
                            <Tab
                                className={({ selected }) =>
                                    cn(
                                        "rounded-t-md bg-dark-600 px-2 py-1 ring-aabase hover:font-bold",
                                        selected ? "bg-dark-400 ring-2" : "bg-dark-600"
                                    )
                                }
                            >
                                Items
                            </Tab>
                            <Tab
                                className={({ selected }) =>
                                    cn(
                                        "rounded-t-md bg-dark-600 px-2 py-1 ring-aabase hover:font-bold",
                                        selected ? "bg-dark-400 ring-2" : "bg-dark-600"
                                    )
                                }
                            >
                                Notes
                            </Tab>
                        </Tab.List>
                    </div>
                    <Tab.Panels>
                        <Tab.Panel className={"m-1 rounded-md p-2 ring-2 ring-aabase"}>
                            <div></div>
                        </Tab.Panel>
                        <Tab.Panel className={"m-1 rounded-md p-2 ring-2 ring-aabase"}>
                            <textarea
                                placeholder="Here is a spot for your Stories!
There is a link above for what a Story is!"
                                className="m-1 h-32 w-full rounded-lg bg-dark-300 p-1"
                                value={player.stories}
                                onChange={(text) => setPlayer({ ...player, stories: text.target.value })}
                            />
                        </Tab.Panel>
                        <Tab.Panel className={"m-1 rounded-md p-2 ring-2 ring-aabase"}>
                            <textarea
                                placeholder="You gots no Items!"
                                className="m-1 h-32 w-full rounded-lg bg-dark-300 p-1"
                                value={itemString}
                                onChange={(text) => setItemString(text.target.value)}
                                onBlur={() => cleanupItems()}
                                onFocus={() => getItemString(player.items)}
                            />
                        </Tab.Panel>
                        <Tab.Panel className={"m-1 rounded-md p-2 ring-2 ring-aabase"}>
                            <textarea
                                placeholder="Here lies Notes... May they rest in piece."
                                className="m-1 h-32 w-full rounded-lg bg-dark-300 p-1"
                                value={player.notes}
                                onChange={(text) => setPlayer({ ...player, notes: text.target.value })}
                            />
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>

                {/* Line */}
                <div className="m-2 flex flex-row items-center border-2 border-body-700/20 bg-dark-400"></div>

                {/* Traits/Arts/Equ items */}
                <div className="center flex flex-row rounded-md bg-dark-400">
                    {player.paths.map((pathName: string, id: number) => {
                        const path = pathJson.find((p) => {
                            return p.name == pathName;
                        });
                        return (
                            <div
                                key={id}
                                className={`m-2 rounded-md p-2 text-lg font-bold md:text-xl bg-${path ? path?.color : "dark-300"}`}
                            >
                                {path ? `${path.icon} ${capitalize(path.name)} ${path.icon}` : `${pathName}`}
                            </div>
                        );
                    })}
                </div>
                <div className="grid grid-cols-2">
                    <div className="m-2 rounded-md bg-dark-400 p-2">
                        <div className="m-2 rounded-md bg-dark-300 p-2">
                            <h2 className="mt-0">Equipped Items</h2>
                            {equItems.map((equItem: string, id: number) => {
                                let HTML = <></>;

                                // { name: "", description: "", effect: "", upgrades: [""], tags: "", rarity: "", cost: 0, tier: 0 }
                                // const equItem = invItem.includes("(equ)") ? invItem : "";
                                // if (equItem) {
                                const foundItem = allItems.find((item) => item.name == equItem.replace("(equ)", ""));
                                if (foundItem) {
                                    // modifyPlayerStatsBasedOnItems(foundItem.effect);
                                    HTML = (
                                        <div key={id}>
                                            <ItemCard
                                                _item={foundItem}
                                                showUpgrades={false}
                                            />
                                        </div>
                                    );
                                } else {
                                    // modifyPlayerStatsBasedOnItems(equItem);

                                    HTML = (
                                        <div
                                            key={id}
                                            className="m-4 rounded-md border-2 border-solid border-body-700/20 bg-dark-400 p-2"
                                        >
                                            {equItem}
                                        </div>
                                    );
                                }

                                return HTML;
                                // }
                                // need the thing before this to make it not explode
                                // if (equItem)
                            })}
                        </div>

                        {/* Traits */}
                        <div className="center m-2 flex flex-col rounded-md bg-dark-300 p-2">
                            <h2 className="mt-0">Traits</h2>
                            {allTraits
                                .filter((t) => {
                                    return player.traits.includes(t.name);
                                })
                                .map((trait: Trait, id: number) => {
                                    return (
                                        <div key={id}>
                                            {
                                                trait.effect.toLowerCase().includes("refund") ? (
                                                    <TraitCard
                                                        _trait={trait}
                                                        moveTrait={() => {
                                                            const ref = trait.effect.toLowerCase().search(/refund \d/);
                                                            const num = parseInt(
                                                                trait.effect.substring(ref + 7, ref + 8)
                                                            );
                                                            const strainChange = Math.min(
                                                                player.calculatedStats.curStrain + num,
                                                                player.calculatedStats.maxStrain // cant have more than max
                                                            );
                                                            setPlayer({
                                                                ...player,
                                                                calculatedStats: {
                                                                    ...player.calculatedStats,
                                                                    curStrain: strainChange,
                                                                },
                                                            });
                                                        }}
                                                    />
                                                ) : (
                                                    <TraitCard _trait={trait} />
                                                ) // no need to click if no refund
                                            }
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                    <div className="m-2 rounded-md bg-dark-400 p-2">
                        {/* Arts */}
                        <div className="m-2 grid grid-cols-2 rounded-md bg-dark-300 p-2">
                            <h2 className="center mt-0 flex">Arts</h2>
                            <div className="m-2 rounded-md bg-soul p-2 text-lg font-bold md:text-xl">
                                Strain {player.calculatedStats.curStrain} / {player.calculatedStats.maxStrain}
                            </div>
                            {allSpells
                                .filter((a) => {
                                    return player.arts.includes(a.name);
                                })
                                .map((art: Spell, id: number) => {
                                    return (
                                        <div key={id}>
                                            <ArtCard
                                                _spell={art}
                                                moveSpell={() => {
                                                    const strainChange = player.calculatedStats.curStrain - art.strain;
                                                    const hpChange =
                                                        strainChange < 0
                                                            ? player.calculatedStats.curHp + strainChange // negative strain = dmg
                                                            : player.calculatedStats.curHp;

                                                    setPlayer({
                                                        ...player,
                                                        calculatedStats: {
                                                            ...player.calculatedStats,
                                                            curStrain: strainChange,
                                                            curHp: hpChange,
                                                        },
                                                    });
                                                }}
                                            />
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
