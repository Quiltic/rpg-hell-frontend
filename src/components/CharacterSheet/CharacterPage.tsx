import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { playerCharacterType } from "../../types/playerCharacterType";
import { capitalize } from "../../util/textFormatting";
import { Button } from "../ui/Button/Button";
import RefinedCharacterSheet from "./InteractiveCharSheets/RefinedCharacterSheet";

const blankPC: playerCharacterType = {
    name: "YOUSHOULDENTSEEMEE!",
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

export default function CharacterPage() {
    const [curCharacter, setCurCharacter] = useState<playerCharacterType>(blankPC);
    const allSavedCharacters = window.localStorage.getItem(`saved-characters`)?.split(";|;");

    // we do this as a failsafe in case something is given that doesent exist
    let { character } = useParams();
    useEffect(() => {
        // console.log(example);
        // setCurCharacter();
        const pc = window.localStorage.getItem(`character-${character?.toLowerCase()}`);

        if (pc) setCurCharacter(JSON.parse(pc));
    }, [character]);

    return (
        <div className="flex flex-col">
            {curCharacter.name == "YOUSHOULDENTSEEMEE!" && (
                <div>
                    <div className="grid grid-cols-4">
                        {/* New/Search/ */}
                        <div className="cols-span-1 grid">
                            <div>Search</div>
                            <Button>New</Button>
                        </div>

                        {/* List of People */}
                        <div className="cols-span-3 grid">
                            {allSavedCharacters?.map((character: string, id: number) => {
                                const absolutePath = `/rulebook/characters/${character}`;
                                return (
                                    <Link
                                        to={absolutePath}
                                        key={id}
                                        // className={""}
                                        // aria-current={isActive ? "page" : undefined}
                                    >
                                        {capitalize(character)}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
            {curCharacter.name != "YOUSHOULDENTSEEMEE!" && (
                <div>
                    <div>Return, Print, Text Vs, and Del</div>
                    <RefinedCharacterSheet
                        player={curCharacter}
                        setPlayer={setCurCharacter}
                    />
                </div>
            )}

            {/*{curCharacter.name == "YOUSHOULDENTSEEMEE!" && (
                <>
                     <div className="m-2 grid grid-cols-3 justify-between rounded-md bg-dark-400 p-2 print:hidden">
                        {curCharacter.name == "all" &&
                            exampleCharSheets.map((char, id) => {
                                const absolutePath = `/rulebook/character-examples/${char.name.toLowerCase()}`;
                                return (
                                    <Link
                                        to={absolutePath}
                                        key={id}
                                        // className={""}
                                        // aria-current={isActive ? "page" : undefined}
                                    >
                                        <div
                                            key={id}
                                            className={cn("clickable m-2 rounded-md p-2", "bg-" + char.mainStat)}
                                            onClick={() => {
                                                setCurCharacter(char);
                                            }}
                                        >
                                            <h3 className="mt-0 font-bold">{char.name}</h3>
                                            <div
                                                className={cn(
                                                    "text-wrap m-2 rounded-md p-2 italic",
                                                    "bg-" + char.mainStat + "-400"
                                                )}
                                            >
                                                {char.quick_exp}
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                    </div> */}
            {/* </> */}
            {/* )} */}

            {/* {curCharacter.name != "all" && (
                <div className="flex flex-col">
                    <Link
                        to={"/rulebook/character-examples/all"}
                        className="print:hidden"
                    >
                        <Button
                            variant={"thieving"}
                            onClick={() => {
                                setCurCharacter(exampleDisplayedCreature);
                            }}
                            className="w-full print:hidden"
                        >
                            Back
                        </Button>
                    </Link>

                    <ExampleCharSheet
                        _displayedCreature={curCharacter}
                        traits={displayedTraits.filter((t) => {
                            return curCharacter.traits.join(". ").includes(t.name);
                        })}
                        arts={displayedSpells.filter((a) => {
                            return curCharacter.arts.join(". ").includes(a.name);
                        })}
                        items={displayedItems.filter((i) => {
                            return curCharacter.items.split(". ").includes(i.name);
                        })}
                    />
                </div>
            )} */}
        </div>
    );
}
