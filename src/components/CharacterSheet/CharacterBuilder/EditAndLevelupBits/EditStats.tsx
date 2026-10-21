import { PlusIcon } from "@heroicons/react/24/outline";
import StatChoicePart from "../Parts/StatChoicePart";
import { changeItemInArray } from "../../../../util/creatureHelpers";
import { useState, useEffect } from "react";
import Popup from "../../../ui/Popups/Popup";

type statline = "" | "body" | "mind" | "soul" | "arcana" | "charm" | "finesse" | "nature";

type Props = {
    // player: playerCharacterType;
    // setPlayer: (player: playerCharacterType) => void;
    chosenStats: Array<string>;
    setChosenStats: (list: Array<statline>) => void;
    playerLevel: number;
    showEditStats: boolean;
    setShowEditStats: (eah: boolean) => void;
};

export default function EditStats({
    chosenStats,
    setChosenStats,
    playerLevel,
    showEditStats,
    setShowEditStats,
}: Props) {
    const [useDeeperLearning, setUseDeeperLearning] = useState(chosenStats[5] != "");

    useEffect(() => {
        const tempArray: Array<statline> = changeItemInArray(chosenStats, 5, "");
        setChosenStats(changeItemInArray(tempArray, 4, ""));
    }, [useDeeperLearning]);

    return (
        <Popup
            displayedContentName="Stat Changes"
            isOpen={showEditStats}
            setIsOpen={setShowEditStats}
            isSmol={false}
            displayedContent={
                <>
                    <div className="m-4 items-center justify-center rounded-md border-2 border-solid border-body-700/20 bg-dark-400">
                        <h1 className="m-2 rounded-md bg-dark-300 p-2">Main-stats</h1>
                        <StatChoicePart
                            chosenStats={chosenStats}
                            setChosenStats={setChosenStats}
                            mainOrSub={"main"}
                            headerLine={<>Pick a Main-stat to increase by 1.</>}
                            startIndex={0}
                        />
                        <StatChoicePart
                            chosenStats={chosenStats}
                            setChosenStats={setChosenStats}
                            mainOrSub={"main"}
                            headerLine={<>Again pick a Main-stat to increase by 1.</>}
                            startIndex={1}
                        />

                        {/* 01,,,,6,8,10,12 */}

                        <>
                            {[...Array(Math.floor((playerLevel - 1) / 2))].map((lvl) => {
                                <StatChoicePart
                                    key={lvl}
                                    chosenStats={chosenStats}
                                    setChosenStats={setChosenStats}
                                    mainOrSub={"main"}
                                    headerLine={<>Again pick a Main-stat to increase by 1.</>}
                                    startIndex={2 * lvl + 4}
                                />;
                            })}
                        </>
                    </div>

                    <div className="m-4 items-center justify-center rounded-md border-2 border-solid border-body-700/20 bg-dark-400">
                        <h1 className="m-2 rounded-md bg-dark-300 p-2">Sub-stats</h1>
                        {/* Strength */}
                        <StatChoicePart
                            chosenStats={chosenStats}
                            setChosenStats={setChosenStats}
                            mainOrSub={"sub"}
                            headerLine={
                                <>
                                    Pick your character's <strong>Strength</strong>. They will have +1 in this stat.
                                </>
                            }
                            startIndex={2}
                        />

                        {/* Flaw */}
                        <StatChoicePart
                            chosenStats={chosenStats}
                            setChosenStats={setChosenStats}
                            mainOrSub={"sub"}
                            headerLine={
                                <>
                                    Pick your character's <strong>Flaw</strong>. They will have -1 in this stat.
                                </>
                            }
                            startIndex={3}
                            doMinus={true}
                        />

                        {/* Deeper Learning */}
                        {chosenStats[4] != "" ||
                            (useDeeperLearning && (
                                <div className="m-4 items-center justify-center rounded-md border-2 border-solid border-body-700/20 bg-dark-400">
                                    <h1 className="m-2 rounded-md bg-dark-300 p-2">Optional: Deeper Learning</h1>
                                    {/* Deep Knowledge */}
                                    <StatChoicePart
                                        chosenStats={chosenStats}
                                        setChosenStats={setChosenStats}
                                        mainOrSub={"sub"}
                                        headerLine={
                                            <>
                                                Pick your character's <strong>Deep Knowledge</strong>. It will be
                                                increased by 1.
                                            </>
                                        }
                                        startIndex={4}
                                        ignorePast={true}
                                    />

                                    {chosenStats[4] != "" && (
                                        // Critical Flaw
                                        <StatChoicePart
                                            chosenStats={chosenStats}
                                            setChosenStats={setChosenStats}
                                            mainOrSub={"sub"}
                                            headerLine={
                                                <>
                                                    Pick your character's <strong>Critical Flaw</strong>. It will be
                                                    reduced by 1.
                                                </>
                                            }
                                            startIndex={5}
                                            doMinus={true}
                                            ignoreNext={true}
                                        />
                                    )}
                                </div>
                            ))}

                        {/* ,,23,,,7,9,11,13 */}

                        <>
                            {[...Array(Math.floor((playerLevel - 1) / 2))].map((lvl) => {
                                <StatChoicePart
                                    key={lvl}
                                    chosenStats={chosenStats}
                                    setChosenStats={setChosenStats}
                                    mainOrSub={"sub"}
                                    headerLine={
                                        <>
                                            Pick another <strong>Strength</strong>. Gain +1 in this stat.
                                        </>
                                    }
                                    startIndex={2 * lvl + 5}
                                    ignoreNext={true}
                                    ignorePast={true}
                                />;
                            })}
                        </>
                    </div>
                </>
            }
        />
    );
}
