import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { playerCharacterType } from "../../types/playerCharacterType";
import { capitalize, toPillElement } from "../../util/textFormatting";
import { Button } from "../ui/Button/Button";
import RefinedCharacterSheet from "./InteractiveCharSheets/RefinedCharacterSheet";
import Popup from "../ui/Popups/Popup";
import Pill from "../ui/Pill";
import { Switch } from "@headlessui/react";
import TextCharacterSheet from "./TextCharacterSheet";

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
};

export default function CharacterPage() {
    const [areYouSurePopup, setAreYouSurePopup] = useState(false);
    const [useTextVs, setUseTextVs] = useState(false);

    const [curCharacter, setCurCharacter] = useState<playerCharacterType>(blankPC);
    const allSavedCharacters = window.localStorage.getItem(`saved-characters`)?.split(";|;") || [];

    // we do this as a failsafe in case something is given that doesent exist
    let { character } = useParams();
    useEffect(() => {
        // console.log(example);
        // setCurCharacter();
        const pc = window.localStorage.getItem(`${character?.toLowerCase()}`);
        // console.log(JSON.parse(pc),`character-${character?.toLowerCase()}`);

        if (pc) {
            setCurCharacter(JSON.parse(pc));
        } else {
            setCurCharacter(blankPC);
        }
    }, [character]);

    return (
        <div className="flex flex-col">
            <Popup
                displayedContentName={"Are You Sure?"}
                displayedContent={
                    <div>
                        Do you really want to Delete {curCharacter.name}?
                        <div className="m-4 flex flex-row items-center justify-between">
                            <Link to={"/characters/all"}>
                                <Button
                                    className="border-2 border-solid border-medicine-400"
                                    variant={"link-medicine"}
                                    onClick={() => {
                                        const charSaveName = `character-${curCharacter.name?.toLowerCase().replace(" ", "~")}`;
                                        window.localStorage.removeItem(charSaveName);

                                        console.log(
                                            allSavedCharacters
                                                ?.filter((character: string) => {
                                                    return character != charSaveName;
                                                })
                                                .join(";|;")
                                        );
                                        window.localStorage.setItem(
                                            `saved-characters`,
                                            allSavedCharacters
                                                ?.filter((character: string) => {
                                                    return character != charSaveName;
                                                })
                                                .join(";|;")
                                        );
                                        setAreYouSurePopup(false);
                                    }}
                                >
                                    Yes
                                </Button>
                            </Link>
                            <Button
                                className=""
                                variant={"nature"}
                                onClick={() => setAreYouSurePopup(false)}
                            >
                                No
                            </Button>
                        </div>
                    </div>
                }
                isOpen={areYouSurePopup}
                setIsOpen={setAreYouSurePopup}
                isSmol={true}
            ></Popup>

            {curCharacter.name == "all" && (
                <div>
                    <h1 className="center m-2 flex rounded-md bg-dark-400 p-2">Characters</h1>
                    <div className="m-2 grid grid-cols-4 rounded-md bg-dark-400 p-2">
                        {/* New/Search/ */}
                        <div className="cols-span-1 m-2 grid rounded-md bg-dark-300 p-2">
                            <div>Search</div>
                            <Link to={"/characters/new"}>
                                <Button
                                    className="m-2 border-2 border-solid border-nature p-2 pl-4 pr-4"
                                    variant={"link-nature"}
                                >
                                    New
                                </Button>
                            </Link>
                        </div>

                        {/* List of People */}
                        <div className="cols-span-3 grid">
                            {allSavedCharacters?.map((character: string, id: number) => {
                                const absolutePath = `/characters/${character}`;
                                return (
                                    <Link
                                        to={absolutePath}
                                        key={id}
                                        // className={""}
                                        // aria-current={isActive ? "page" : undefined}
                                    >
                                        <div className="m-2 rounded-md bg-dark-300 p-2">
                                            <h3 className="mt-0">
                                                {capitalize(character.replace("character-", "").replace("~", " "))}
                                            </h3>
                                            <div className="m-1 flex flex-row p-1">
                                                {toPillElement("Path!", " ")}
                                                {toPillElement("Path!", " ")}
                                                {toPillElement("Path!", " ")}
                                            </div>
                                            Level: 1?
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
            {curCharacter.name != "all" && (
                <>
                    <div className="m-2 flex flex-row items-center justify-end rounded-md bg-dark-400 p-2">
                        <Link to={"/characters/all"}>
                            <Button
                                className="border-2 border-solid border-medicine-400"
                                variant={"link-medicine"}
                            >
                                Return
                            </Button>
                        </Link>

                        {/* switch */}
                        <div className="flex flex-row items-center justify-center rounded-md bg-dark-300 p-2">
                            {useTextVs && (
                                <p className="m-2 flex flex-row items-center justify-center">Disable Text Vs</p>
                            )}
                            {!useTextVs && (
                                <p className="m-2 flex flex-row items-center justify-center">Use Text Version</p>
                            )}

                            <Switch
                                checked={useTextVs}
                                onChange={setUseTextVs}
                                className={`${
                                    useTextVs ? "bg-mind" : "bg-dark-700"
                                } relative inline-flex h-6 w-11 items-center rounded-full`}
                            >
                                <span className="sr-only">Switch Text Vs</span>
                                <span
                                    className={`${
                                        useTextVs ? "translate-x-6" : "translate-x-1"
                                    } inline-block h-4 w-4 transform rounded-full bg-light transition`}
                                />
                            </Switch>
                        </div>

                        <Button
                            className=""
                            variant={"medicine"}
                            onClick={() => setAreYouSurePopup(true)}
                        >
                            Delete
                        </Button>
                    </div>
                    {!useTextVs && (
                        <RefinedCharacterSheet
                            player={curCharacter}
                            setPlayer={setCurCharacter}
                        />
                    )}
                    {useTextVs && (
                        <TextCharacterSheet
                            player={curCharacter}
                            setPlayer={setCurCharacter}
                        />
                    )}
                </>
            )}
        </div>
    );
}
