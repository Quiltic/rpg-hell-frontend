import { PlusIcon } from "@heroicons/react/24/outline";
import StatChoicePart from "../Parts/StatChoicePart";
import { changeItemInArray } from "../../../../util/creatureHelpers";
import { useState, useEffect } from "react";
import Popup from "../../../ui/Popups/Popup";
import { Switch } from "@headlessui/react";

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
        if (!useDeeperLearning) {
            const tempArray: Array<statline> = changeItemInArray(chosenStats, 5, "");
            setChosenStats(changeItemInArray(tempArray, 4, ""));
        }
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
                        <div className="rounded-md bg-dark-400">
                            {/* switch */}
                            <div className="flex flex-row items-center justify-center rounded-md bg-dark-300 p-2">
                                {useDeeperLearning && (
                                    <p className="m-2 flex flex-row items-center justify-center">
                                        Disable Deeper Learning
                                    </p>
                                )}
                                {!useDeeperLearning && (
                                    <p className="m-2 flex flex-row items-center justify-center">Use Deeper Learning</p>
                                )}

                                <Switch
                                    checked={useDeeperLearning || chosenStats[5] != ""}
                                    onChange={setUseDeeperLearning}
                                    className={`${
                                        useDeeperLearning ? "bg-body" : "bg-dark-700"
                                    } relative inline-flex h-6 w-11 items-center rounded-full`}
                                >
                                    <span className="sr-only">Switch Deeper Learning</span>
                                    <span
                                        className={`${
                                            useDeeperLearning ? "translate-x-6" : "translate-x-1"
                                        } inline-block h-4 w-4 transform rounded-full bg-light transition`}
                                    />
                                </Switch>
                            </div>
                        </div>

                        {/* Deeper Learning */}
                        {(chosenStats[4] != "" || useDeeperLearning) && (
                            <div className="m-4 items-center justify-center rounded-md border-2 border-solid border-body-700/20 bg-dark-400">
                                <h1 className="m-2 rounded-md bg-dark-300 p-2">Optional: Deeper Learning</h1>
                                {/* Deep Knowledge */}
                                <StatChoicePart
                                    chosenStats={chosenStats}
                                    setChosenStats={setChosenStats}
                                    mainOrSub={"sub"}
                                    headerLine={
                                        <>
                                            Pick your character's <strong>Deep Knowledge</strong>. It will be increased
                                            by 1.
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
                                                Pick your character's <strong>Critical Flaw</strong>. It will be reduced
                                                by 1.
                                            </>
                                        }
                                        startIndex={5}
                                        doMinus={true}
                                        ignoreNext={true}
                                    />
                                )}
                            </div>
                        )}

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
