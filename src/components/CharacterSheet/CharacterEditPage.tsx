import { useState, useEffect } from "react";
import { Link, useBlocker, useParams } from "react-router-dom";
import { playerCharacterType } from "../../types/playerCharacterType";
import { Spell, Trait } from "../../client";
import { Button } from "../ui/Button/Button";
import Popup from "../ui/Popups/Popup";
import EditStats from "./CharacterBuilder/EditAndLevelupBits/EditStats";
import toast from "react-hot-toast";
import { useSpells } from "../../hooks/useSpells";
import { useTraits } from "../../hooks/useTraits";
import { titleCase } from "../../util/textFormatting";
import Statblock from "../CreaturesPages/Parts/StatblockPart";
import ArtCard from "../SpellsPages/SpellCardStuff/artCard";
import TraitCard from "../TraitsPages/TraitCardStuff/traitCard";
import SwapPopupPart from "./CharacterBuilder/Parts/SwapPopupPart";

type statline = "" | "body" | "mind" | "soul" | "arcana" | "charm" | "finesse" | "nature";

const blankPC: playerCharacterType = {
    name: "all",
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

    paths: ["", "", "🔒 Locked until Lvl 3 🔒"], // get two at lvl 1 then one more at lvl 3
    traits: ["", ""], // # of traits per tier, 3,3,2,2,1
    arts: ["", "", "", ""], // # of Arts per tier, 5,3,2,2,1

    stories: "",
    description: "",
    notes: "",
    choices: [],
};

export default function CharacterEditPage() {
    const { allTraits } = useTraits();
    const { allSpells } = useSpells();

    // const [curCreature, setCurCreature] = useState<Creature>( displayedCreature );
    const [player, setPlayer] = useState<playerCharacterType>(blankPC);

    const [showEditStats, setShowEditStats] = useState(false);
    const [showEditTraits, setShowEditTraits] = useState(false);
    const [showEditArts, setShowEditArts] = useState(false);

    const [chosenTraits, setChosenTraits] = useState<Array<Trait>>(Array<Trait>(player.traits.length));
    const [chosenArts, setChosenArts] = useState<Array<Spell>>(Array<Spell>(player.arts.length));

    const [picking, setPicking] = useState(0);
    const [pickingLook, setPickingLook] = useState<Array<Trait | Spell>>([]);

    const [chosenStats, setChosenStats] = useState<Array<statline>>([
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
    ]); // bms -> bms -> strength -> flaw

    // we do this as a failsafe in case something is given that doesent exist
    const { character } = useParams();
    useEffect(() => {
        // console.log(example);
        // setCurCharacter();
        const pc = window.localStorage.getItem(`${character?.toLowerCase()}`);
        // console.log(JSON.parse(pc),`character-${character?.toLowerCase()}`);

        if (pc) {
            const parsed: playerCharacterType = JSON.parse(pc);
            setPlayer(parsed);
            if (parsed.choices?.length) setChosenStats(parsed.choices as Array<statline>);
            // console.log(JSON.parse(pc),`huh?`);
        } else {
            setPlayer(blankPC);
        }

        // console.log(player);
    }, [character]);

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

        chosenStats.forEach((stat) => {
            const amount = stat.includes("-") ? -1 : 1;
            tempStats[stat.replace("-", "") as statline] += amount;
        });

        setPlayer((prev) => {
            const hp = 4 * tempStats.body + 3 * tempStats.mind + 2 * tempStats.soul + prev.level;
            const strain = 2 * tempStats.body + 3 * tempStats.mind + 4 * tempStats.soul + prev.level;
            return {
                ...prev,
                stats: tempStats,
                calculatedStats: {
                    ...prev.calculatedStats,
                    curHp: hp,
                    maxHp: hp,
                    curStrain: strain,
                    maxStrain: strain,
                },
                choices: chosenStats,
            };
        });
    }, [chosenStats]);

    useEffect(() => {
        if (player.traits.includes("magical knowledge")) {
            if (player.arts.length <= 4) setPlayer({ ...player, arts: player.arts.concat(["", ""]) });
        } else {
            if (player.arts.length > 4) setPlayer({ ...player, arts: player.arts.slice(0, 4) });
        }

        // if (player.traits.includes("body of iron")) {
        //     chosenItems[2] = {
        //         name: "body of iron",
        //         description: "This is not an actual item, just a placeholder for the trait 'Body of Iron'.",
        //         effect: "While you are not wearing armor, you have +1 Shielding, +1 Speed, and +LEVEL Max Health.",
        //         upgrades: [],
        //         tags: "armor, traitReq",
        //         rarity: "trait",
        //         cost: 0,
        //         tier: 1,
        //     }; // armor
        // }

        // setPlayer({
        //     ...player,
        //     traits: chosenTraits,
        //     arts: chosenArts
        // });
    }, [player.traits]);

    return (
        <div className="">
            {/* <Popup
                displayedContentName="Unsaved character"
                isOpen={blocker.state === "blocked"}
                setIsOpen={() => blocker.reset?.()}
                isSmol={true}
                displayedContent={
                    <>
                        <p>Your character has not been saved yet and will be lost if you leave.</p>
                        <div className="mt-4 flex flex-row justify-end gap-2">
                            <Button
                                variant="dark"
                                onClick={() => blocker.reset?.()}
                            >
                                Stay
                            </Button>
                            <Button
                                variant="body"
                                onClick={() => blocker.proceed?.()}
                            >
                                Leave
                            </Button>
                        </div>
                    </>
                }
            /> */}

            <EditStats
                chosenStats={chosenStats}
                setChosenStats={setChosenStats}
                playerLevel={player.level}
                showEditStats={showEditStats}
                setShowEditStats={setShowEditStats}
            />

            <SwapPopupPart
                player={player}
                setPlayer={setPlayer}
                isOpen={showEditTraits}
                setIsOpen={setShowEditTraits}
                displayedList={pickingLook}
                chosenList={chosenTraits}
                setChosenList={setChosenTraits}
                type={"Trait"}
                location={picking}
            />

            <SwapPopupPart
                player={player}
                setPlayer={setPlayer}
                isOpen={showEditArts}
                setIsOpen={setShowEditArts}
                displayedList={[]}
                chosenList={chosenArts}
                setChosenList={setChosenArts}
                type={"Art"}
                location={picking}
            />

            {player.name != "all" && (
                <>
                    <div className="flex">
                        <Statblock
                            player={player}
                            setPlayer={setPlayer}
                        />
                    </div>

                    {/* Traits */}
                    <div className="center m-2 flex flex-col rounded-md bg-dark-300 p-2">
                        <h2 className="mt-0">Traits</h2>
                        {allTraits
                            .filter((t) => {
                                if (player.traits.includes(t.name)) console.log(t.name);
                                return player.traits.includes(t.name);
                            })
                            .map((trait: Trait, id: number) => {
                                return (
                                    <div key={id}>
                                        {
                                            trait.effect.toLowerCase().includes("refund") ? (
                                                <TraitCard
                                                    _trait={trait}
                                                    static={false}
                                                    action={{
                                                        label: "Activate",
                                                        variant: "arcana",
                                                        onClick: () => {
                                                            const lookingTraits = allTraits.filter((trait) => {
                                                                let hasPath = false;
                                                                const tier = Math.round(0.39 * id + 0.5).toString(); // (1,1,1,2,2,2,3,3,4,4,5)
                                                                player.paths.forEach((path) => {
                                                                    // Not already picked, and has the req path.
                                                                    hasPath =
                                                                        !player.traits.includes(
                                                                            trait.name.toLowerCase()
                                                                        ) &&
                                                                        (hasPath ||
                                                                            trait.req
                                                                                ?.toString()
                                                                                .includes(
                                                                                    path.toLowerCase() + " " + tier
                                                                                ));
                                                                });
                                                                return hasPath;
                                                            });
                                                            setPickingLook(lookingTraits);
                                                            setPicking(id);
                                                            setShowEditTraits(true);
                                                        },
                                                    }}
                                                />
                                            ) : (
                                                <TraitCard
                                                    _trait={trait}
                                                    _className="m-2"
                                                    static={false}
                                                />
                                            ) // no need to click if no refund
                                        }
                                    </div>
                                );
                            })}
                    </div>

                    {/* Arts */}
                    <div className="m-2 grid grid-cols-2 rounded-md bg-dark-300 p-2">
                        <h2 className="center mt-0 flex">Arts</h2>
                        <div className="m-2 rounded-md bg-soul p-2 text-lg font-bold md:text-xl">
                            Strain {player.calculatedStats.curStrain} / {player.calculatedStats.maxStrain}
                        </div>
                        <div className="col-span-2 flex flex-col gap-2">
                            {allSpells
                                .filter((a) => {
                                    return player.arts.includes(a.name);
                                })
                                .map((art: Spell, id: number) => {
                                    return (
                                        <ArtCard
                                            key={id}
                                            _spell={art}
                                            _className="m-0"
                                            action={{
                                                label: "Activate",
                                                variant: "soul",
                                                onClick: () => {
                                                    const strainChange = player.calculatedStats.curStrain - art.strain;
                                                    const hpChange =
                                                        strainChange < 0 && art.strain > 0
                                                            ? player.calculatedStats.curHp + strainChange // negative strain = dmg
                                                            : player.calculatedStats.curHp;
                                                    const hpLost = player.calculatedStats.curHp - hpChange;

                                                    toast(
                                                        <div className="text-center">
                                                            Activated <b>{titleCase(art.name)}</b>
                                                            {art.strain > 0 ? ` for ${art.strain} Strain!` : "!"}
                                                            {hpLost > 0 && (
                                                                <div className="italic">
                                                                    Overstrained: took {hpLost} damage
                                                                </div>
                                                            )}
                                                        </div>,
                                                        { className: "ring-2 ring-soul-500" }
                                                    );

                                                    setPlayer({
                                                        ...player,
                                                        calculatedStats: {
                                                            ...player.calculatedStats,
                                                            curStrain: strainChange,
                                                            curHp: hpChange,
                                                        },
                                                    });
                                                },
                                            }}
                                        />
                                    );
                                })}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
