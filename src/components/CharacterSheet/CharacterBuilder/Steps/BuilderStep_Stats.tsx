import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import { cn } from "../../../../styling/utilites";
import { Button } from "../../../ui/Button/Button";
import { changeItemInArray } from "../../../../util/creatureHelpers";
import { playerCharacterType } from "../../../../types/playerCharacterType";
import StatChoicePart from "../Parts/StatChoicePart";

type statline = "" | "body" | "mind" | "soul" | "arcana" | "charm" | "finesse" | "nature";

type Props = {
    chosenStats: Array<string>;
    setChosenStats: (list: Array<statline>) => void;
    continueButton: () => void;
    backButton: () => void;
    player: playerCharacterType;
};

export default function BuilderStep_Stats({
    chosenStats: chosenStats,
    setChosenStats: setChosenStats,
    continueButton: continueButton,
    backButton: backButton,
    player: player,
}: Props) {
    const [useDeeperLearning, setUseDeeperLearning] = useState(chosenStats[5] != "");

    useEffect(() => {
        const tempArray = changeItemInArray(chosenStats, 5, "");
        setChosenStats(changeItemInArray(tempArray, 4, ""));
    }, [useDeeperLearning]);

    return (
        <div className="grid grid-cols-2 justify-center">
            {/* Main Stats */}
            <div className="m-4 items-center justify-center rounded-md border-2 border-solid border-body-700/20 bg-dark-400">
                <h1 className="m-2 rounded-md bg-dark-300 p-2">Main-stats</h1>
                <StatChoicePart
                    chosenStats={chosenStats}
                    setChosenStats={setChosenStats}
                    mainOrSub={"main"}
                    headerLine={<>Pick a Main-stat to increase by 1.</>}
                    startIndex={0}
                />

                {chosenStats[0] != "" && (
                    <StatChoicePart
                        chosenStats={chosenStats}
                        setChosenStats={setChosenStats}
                        mainOrSub={"main"}
                        headerLine={<>Again pick a Main-stat to increase by 1.</>}
                        startIndex={1}
                    />
                )}
            </div>

            {/* Sub Stats */}
            {chosenStats[1] != "" && (
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

                    {chosenStats[2] != "" && (
                        // Flaw
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
                    )}
                </div>
            )}

            {/* Deeper Learning */}
            {chosenStats[3] != "" && useDeeperLearning && (
                <div className="m-4 items-center justify-center rounded-md border-2 border-solid border-body-700/20 bg-dark-400">
                    <h1 className="m-2 rounded-md bg-dark-300 p-2">Optional: Deeper Learning</h1>
                    {/* Deep Knowledge */}
                    <StatChoicePart
                        chosenStats={chosenStats}
                        setChosenStats={setChosenStats}
                        mainOrSub={"sub"}
                        headerLine={
                            <>
                                Pick your character's <strong>Deep Knowledge</strong>. It will be increased by 1.
                            </>
                        }
                        startIndex={4}
                    />

                    {chosenStats[4] != "" && (
                        // Critical Flaw
                        <StatChoicePart
                            chosenStats={chosenStats}
                            setChosenStats={setChosenStats}
                            mainOrSub={"sub"}
                            headerLine={
                                <>
                                    Pick your character's <strong>Critical Flaw</strong>. It will be reduced by 1.
                                </>
                            }
                            startIndex={5}
                            doMinus={true}
                        />
                    )}
                </div>
            )}

            {/* stats & continue & deep learning */}
            {chosenStats[3] != "" && (
                <div
                    className={cn(
                        "m-4 flex items-center justify-center rounded-md border-2 border-solid border-body-700/20 bg-dark-400",
                        useDeeperLearning ? " flex-col" : " col-span-2 flex-row"
                    )}
                >
                    {/* Stat Block */}
                    <div className="m-2 flex flex-col items-center justify-center rounded-md border-2 border-solid border-body-700/20 bg-dark-300">
                        {/* Mainstats */}
                        <div className="m-2 flex flex-row rounded-md bg-dark-300 p-2">
                            <div className="m-1 rounded-xl bg-body p-1 pr-2 text-sm lg:pl-2 lg:text-[1rem] lg:font-bold">
                                Body: {player["stats"]["body"] > 0 ? "+" : ""}
                                {player["stats"]["body"]}
                            </div>
                            <div className="m-1 rounded-xl bg-mind p-1 pr-2 text-sm lg:pl-2 lg:text-[1rem] lg:font-bold">
                                Mind: {player["stats"]["mind"] > 0 ? "+" : ""}
                                {player["stats"]["mind"]}
                            </div>
                            <div className="m-1 rounded-xl bg-soul p-1 pr-2 text-sm lg:pl-2 lg:text-[1rem] lg:font-bold">
                                Soul: {player["stats"]["soul"] > 0 ? "+" : ""}
                                {player["stats"]["soul"]}
                            </div>
                        </div>

                        {/* Sub & hp & strain */}
                        <div className="m-2 -mt-2 flex flex-row rounded-md bg-dark-300 p-2">
                            {/* Substats */}
                            <div className="flex flex-col">
                                <div className="m-1 rounded-xl bg-arcana p-1 pr-2 text-sm lg:pl-2 lg:text-[1rem] lg:font-bold">
                                    Arcana: {player["stats"]["arcana"] > 0 ? "+" : ""}
                                    {player["stats"]["arcana"]}
                                </div>
                                <div className="m-1 rounded-xl bg-charm p-1 pr-2 text-sm lg:pl-2 lg:text-[1rem] lg:font-bold">
                                    Charm: {player["stats"]["charm"] > 0 ? "+" : ""}
                                    {player["stats"]["charm"]}
                                </div>
                                <div className="m-1 rounded-xl bg-thieving p-1 pr-2 text-sm lg:pl-2 lg:text-[1rem] lg:font-bold">
                                    Finesse: {player["stats"]["finesse"] > 0 ? "+" : ""}
                                    {player["stats"]["finesse"]}
                                </div>
                                <div className="m-1 rounded-xl bg-nature p-1 pr-2 text-sm lg:pl-2 lg:text-[1rem] lg:font-bold">
                                    Nature: {player["stats"]["nature"] > 0 ? "+" : ""}
                                    {player["stats"]["nature"]}
                                </div>
                            </div>

                            {/* Max Hp/Strain */}
                            <div className="flex flex-col items-center justify-center">
                                <div className="m-2 rounded-md bg-medicine p-2">
                                    Max Health :{" "}
                                    {4 * player["stats"]["body"] +
                                        3 * player["stats"]["mind"] +
                                        2 * player["stats"]["soul"] +
                                        1}
                                </div>

                                <div className="m-2 rounded-md bg-soul-400 p-2">
                                    Max Strain :{" "}
                                    {2 * player["stats"]["body"] +
                                        3 * player["stats"]["mind"] +
                                        4 * player["stats"]["soul"] +
                                        1}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="m-2 mt-0 flex flex-row rounded-md bg-dark-300 p-2">
                        {/* switch */}
                        <div className="flex flex-row items-center justify-center rounded-md bg-dark-300 p-2">
                            {useDeeperLearning && (
                                <p className="m-2 flex flex-row items-center justify-center">Disable Deeper Learning</p>
                            )}
                            {!useDeeperLearning && (
                                <p className="m-2 flex flex-row items-center justify-center">Use Deeper Learning</p>
                            )}

                            <Switch
                                checked={useDeeperLearning}
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

                        <Button
                            variant="link-medicine"
                            className="m-2 flex items-center justify-center border-2 border-solid border-medicine-400"
                            onClick={backButton}
                        >
                            Back
                        </Button>
                        <Button
                            disabled={(chosenStats[5] == "" && useDeeperLearning) || chosenStats[3] == ""}
                            variant="nature"
                            className="m-2 ml-4 flex items-center justify-center"
                            onClick={continueButton}
                        >
                            Continue
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
