import { useState, useEffect } from "react";
import { playerCharacterType } from "../../../types/playerCharacterType";
import { Item } from "../../../client";
import { Button } from "../../ui/Button/Button";
import RefinedCharacterSheet from "../InteractiveCharSheets/RefinedCharacterSheet";
import BuilderStep_Stats from "./BuilderStep_Stats";
import BuilderStep_Paths from "./BuilderStep_Paths";
import BuilderStep_Traits_Arts from "./BuilderStep_Traits_Arts";
import BuilderStep_Items from "./BuilderStep_Items";
import BuilderStep_Name_Stories from "./BuilderStep_Name_Stories";

const playerCharacter: playerCharacterType = {
    name: "",
    level: 1,
    stats: {
        body: 0,
        mind: 0,
        soul: 0,
        arcana: 0,
        charm: 0,
        finesse: 0,
        nature: 0,
    },
    calculatedStats: {
        // can be modified by player but is auto calculated if not
        speed: 6,
        dodge: 0,
        shielding: 0,

        maxHp: 0,
        curHp: 0,
        maxStrain: 0,
        curStrain: 0,
    },
    items: ["$ - 1 bag", "bandage"], // any number of items, auto lookup if short, otherwise its "Name - description" as made by player

    paths: ["", "", "Locked until Lvl 3"], // get two at lvl 1 then one more at lvl 3
    traits: ["", ""], // # of traits per tier, 3,3,2,2,1
    arts: ["", "", "", ""], // # of Arts per tier, 5,3,2,2,1

    stories: "",
    description: "",
    notes: "",
};

type statline = "" | "body" | "mind" | "soul" | "arcana" | "charm" | "finesse" | "nature";

export default function CharacterBuilderPage() {
    // const [curCreature, setCurCreature] = useState<Creature>( displayedCreature );
    const [player, setPlayer] = useState(playerCharacter);
    const [chosenStats, setChosenStats] = useState<Array<statline>>(["", "", "", "", "", ""]); // bms -> bms -> strength -> flaw
    const [chosenItems, setChosenItems] = useState<Array<Item>>([
        { name: "", description: "", effect: "", upgrades: [""], tags: "", rarity: "", cost: 0, tier: 0 }, // wep 1
        { name: "", description: "", effect: "", upgrades: [""], tags: "", rarity: "", cost: 0, tier: 0 }, // wep 2
        { name: "", description: "", effect: "", upgrades: [""], tags: "", rarity: "", cost: 0, tier: 0 }, // armor
        { name: "", description: "", effect: "", upgrades: [""], tags: "", rarity: "", cost: 0, tier: 0 }, // tool
        { name: "", description: "", effect: "", upgrades: [""], tags: "", rarity: "", cost: 0, tier: 0 }, // pack
    ]);

    const [stepnum, setStepnum] = useState(1);

    // update the stats based on what you chose
    useEffect(() => {
        const tempStats = {
            "": 0,
            body: 0,
            mind: 0,
            soul: 0,
            arcana: 0,
            charm: 0,
            finesse: 0,
            nature: 0,
        };

        // main stats
        tempStats[chosenStats[0]] += 1;
        tempStats[chosenStats[1]] += 1;

        // sub stats
        tempStats[chosenStats[2]] += 1;
        tempStats[chosenStats[3]] -= 1;

        // deep learning
        tempStats[chosenStats[4]] += 1;
        tempStats[chosenStats[5]] -= 1;

        const hp = 4 * player.stats.body + 3 * player.stats.mind + 2 * player.stats.soul + player.level;
        const strain = 2 * player.stats.body + 3 * player.stats.mind + 4 * player.stats.soul + player.level;

        setPlayer({
            ...player,
            stats: tempStats,
            calculatedStats: { ...player.calculatedStats, curHp: hp, maxHp: hp, curStrain: strain, maxStrain: strain },
        });
    }, [chosenStats]);

    useEffect(() => {
        let itemList: Array<string> = ["$ - 1 bag", "bandage"];

        chosenItems.forEach((item, id) => {
            if (item.name != "") {
                if (id <= 2) itemList.push(item.name + "(equ)");
                else itemList.push(item.name);
            }
        });

        setPlayer({ ...player, items: itemList });
    }, [chosenItems]);

    useEffect(() => {
        if (player.traits.includes("magical knowledge")) {
            if (player.arts.length <= 4) setPlayer({ ...player, arts: player.arts.concat(["", ""]) });
        } else {
            if (player.arts.length > 4) setPlayer({ ...player, arts: player.arts.slice(0, 4) });
        }
    }, [player.traits]);

    return (
        <div className="">
            {stepnum == 1 && (
                <BuilderStep_Paths
                    player={player}
                    setPlayer={setPlayer}
                    continueButton={() => setStepnum(2)}
                    backButton={() => {}}
                />
            )}

            {stepnum == 2 && (
                <BuilderStep_Traits_Arts
                    player={player}
                    setPlayer={setPlayer}
                    continueButton={() => setStepnum(3)}
                    backButton={() => setStepnum(1)}
                />
            )}

            {stepnum == 3 && (
                <BuilderStep_Stats
                    chosenStats={chosenStats}
                    setChosenStats={setChosenStats}
                    player={player}
                    continueButton={() => setStepnum(4)}
                    backButton={() => setStepnum(2)}
                />
            )}

            {stepnum == 4 && (
                <BuilderStep_Items
                    player={player}
                    // setPlayer={setPlayer}
                    chosenItems={chosenItems}
                    setChosenItems={setChosenItems}
                    continueButton={() => setStepnum(5)}
                    backButton={() => setStepnum(3)}
                />
            )}

            {stepnum == 5 && (
                <BuilderStep_Name_Stories
                    player={player}
                    setPlayer={setPlayer}
                    continueButton={() => {
                        setStepnum(6);
                        let allSavedCharacters = window.localStorage.getItem(`saved-characters`)?.split(";|;");
                        if (!allSavedCharacters) allSavedCharacters = [];

                        if (!allSavedCharacters.includes(`character-${player.name}`)) {
                            allSavedCharacters.push(`character-${player.name.toLowerCase().replace(" ", "~")}`);
                            window.localStorage.setItem(`saved-characters`, allSavedCharacters.join(";|;"));
                        }

                        window.localStorage.setItem(
                            `character-${player.name.toLowerCase().replace(" ", "~")}`,
                            JSON.stringify(player)
                        );
                    }} // We need to add them to the save data here (if they dont exist yet)
                    backButton={() => setStepnum(4)}
                />
            )}

            {stepnum == 6 && (
                <>
                    <div className="center m-2 flex flex-row bg-dark-400 p-2">
                        <Button
                            variant="link-medicine"
                            className="m-2 flex items-center justify-center border-2 border-solid border-medicine-400"
                            onClick={() => setStepnum(5)}
                        >
                            Back
                        </Button>
                    </div>
                    <RefinedCharacterSheet
                        player={player}
                        setPlayer={setPlayer}
                    ></RefinedCharacterSheet>
                </>
            )}
        </div>
    );
}
