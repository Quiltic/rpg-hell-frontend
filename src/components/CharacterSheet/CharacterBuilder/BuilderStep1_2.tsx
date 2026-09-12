import { useState } from "react";
import { Switch } from "@headlessui/react";
import { cn } from "../../../styling/utilites";
import { Button } from "../../ui/Button/Button";
import { changeItemInArray } from "../../../util/creatureHelpers";
import { playerCharacterType } from "../../../types/playerCharacterType";

type statline =
    | ""
    | "body"
    | "mind"
    | "soul"
    | "arcana"
    | "charm"
    | "finesse"
    | "nature";

type Props = {
    chosenStats: Array<string>;
    setChosenStats: (list: Array<statline>) => void;
    setStepnum: () => void;
    player: playerCharacterType;
};

export default function BuilderStep1_2({
    chosenStats: chosenStats,
    setChosenStats: setChosenStats,
    setStepnum: setStepnum,
    player: player,
}: Props) {
    const [useDeeperLearning, setUseDeeperLearning] = useState(false);

    return (
        <div className="grid grid-cols-2 justify-center">
            {/* Main Stats */}
            <div className="m-4 items-center justify-center rounded-md border-2 border-solid border-body-700/20 bg-dark-400">
                <h1 className="m-2 rounded-md bg-dark-300 p-2">
                    Step 1: Main-stats
                </h1>

                <div className="m-2 flex-col rounded-md bg-dark-300 p-4 pt-1">
                    <div className="mb-2 p-2">
                        Pick a Main-stat to increase by 1.
                    </div>
                    <div className="flex-row">
                        <Button
                            variant={
                                chosenStats[0] == ""
                                    ? "body"
                                    : chosenStats[0] == "body"
                                      ? "body"
                                      : "link-body"
                            }
                            className={cn(
                                "m-1",
                                chosenStats[0] == "body"
                                    ? "ring-2 ring-light/75"
                                    : ""
                            )}
                            onClick={() => {
                                setChosenStats(
                                    changeItemInArray(chosenStats, 0, "body")
                                );
                            }}
                        >
                            Body
                        </Button>
                        <Button
                            variant={
                                chosenStats[0] == ""
                                    ? "mind"
                                    : chosenStats[0] == "mind"
                                      ? "mind"
                                      : "link-mind"
                            }
                            className={cn(
                                "m-1",
                                chosenStats[0] == "mind"
                                    ? "ring-2 ring-light/75"
                                    : ""
                            )}
                            onClick={() => {
                                setChosenStats(
                                    changeItemInArray(chosenStats, 0, "mind")
                                );
                            }}
                        >
                            Mind
                        </Button>
                        <Button
                            variant={
                                chosenStats[0] == ""
                                    ? "soul"
                                    : chosenStats[0] == "soul"
                                      ? "soul"
                                      : "link-soul"
                            }
                            className={cn(
                                "m-1",
                                chosenStats[0] == "soul"
                                    ? "ring-2 ring-light/75"
                                    : ""
                            )}
                            onClick={() => {
                                setChosenStats(
                                    changeItemInArray(chosenStats, 0, "soul")
                                );
                            }}
                        >
                            Soul
                        </Button>
                    </div>
                </div>

                {chosenStats[0] != "" && (
                    <div className="m-2 flex-col rounded-md bg-dark-300 p-4 pt-1">
                        <div className="mb-2 p-2">
                            Again pick a Main-stat to increase by 1.
                        </div>
                        <div className="flex-row">
                            <Button
                                variant={
                                    chosenStats[1] == ""
                                        ? "body"
                                        : chosenStats[1] == "body"
                                          ? "body"
                                          : "link-body"
                                }
                                className={cn(
                                    "m-1",
                                    chosenStats[1] == "body"
                                        ? "ring-2 ring-light/75"
                                        : ""
                                )}
                                onClick={() => {
                                    setChosenStats(
                                        changeItemInArray(
                                            chosenStats,
                                            1,
                                            "body"
                                        )
                                    );
                                }}
                            >
                                Body
                            </Button>
                            <Button
                                variant={
                                    chosenStats[1] == ""
                                        ? "mind"
                                        : chosenStats[1] == "mind"
                                          ? "mind"
                                          : "link-mind"
                                }
                                className={cn(
                                    "m-1",
                                    chosenStats[1] == "mind"
                                        ? "ring-2 ring-light/75"
                                        : ""
                                )}
                                onClick={() => {
                                    setChosenStats(
                                        changeItemInArray(
                                            chosenStats,
                                            1,
                                            "mind"
                                        )
                                    );
                                }}
                            >
                                Mind
                            </Button>
                            <Button
                                variant={
                                    chosenStats[1] == ""
                                        ? "soul"
                                        : chosenStats[1] == "soul"
                                          ? "soul"
                                          : "link-soul"
                                }
                                className={cn(
                                    "m-1",
                                    chosenStats[1] == "soul"
                                        ? "ring-2 ring-light/75"
                                        : ""
                                )}
                                onClick={() => {
                                    setChosenStats(
                                        changeItemInArray(
                                            chosenStats,
                                            1,
                                            "soul"
                                        )
                                    );
                                }}
                            >
                                Soul
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Sub Stats */}
            {chosenStats[1] != "" && (
                <div className="m-4 items-center justify-center rounded-md border-2 border-solid border-body-700/20 bg-dark-400">
                    <h1 className="m-2 rounded-md bg-dark-300 p-2">
                        Step 2: Sub-stats
                    </h1>
                    {/* Strength */}
                    <div className="m-2 flex-col rounded-md bg-dark-300 p-4 pt-1">
                        <div className="mb-2 p-2">
                            Pick your character's <strong>Strength</strong>.
                            They will have +1 in this stat.
                        </div>
                        <div className="flex-row">
                            <Button
                                variant={
                                    chosenStats[2] == ""
                                        ? "arcana"
                                        : chosenStats[2] == "arcana"
                                          ? "arcana"
                                          : "link-arcana"
                                }
                                className={cn(
                                    "m-1",
                                    chosenStats[2] == "arcana"
                                        ? "ring-2 ring-light/75"
                                        : ""
                                )}
                                onClick={() => {
                                    setChosenStats(
                                        changeItemInArray(
                                            chosenStats,
                                            2,
                                            "arcana"
                                        )
                                    );
                                    setChosenStats(
                                        changeItemInArray(
                                            chosenStats,
                                            3,
                                            chosenStats[3] != "arcana"
                                                ? chosenStats[3]
                                                : ""
                                        )
                                    );
                                }}
                            >
                                Arcana
                            </Button>
                            <Button
                                variant={
                                    chosenStats[2] == ""
                                        ? "charm"
                                        : chosenStats[2] == "charm"
                                          ? "charm"
                                          : "link-charm"
                                }
                                className={cn(
                                    "m-1",
                                    chosenStats[2] == "charm"
                                        ? "ring-2 ring-light/75"
                                        : ""
                                )}
                                onClick={() => {
                                    setChosenStats(
                                        changeItemInArray(
                                            chosenStats,
                                            2,
                                            "charm"
                                        )
                                    );
                                    setChosenStats(
                                        changeItemInArray(
                                            chosenStats,
                                            3,
                                            chosenStats[3] != "charm"
                                                ? chosenStats[3]
                                                : ""
                                        )
                                    );
                                }}
                            >
                                Charm
                            </Button>
                            <Button
                                variant={
                                    chosenStats[2] == ""
                                        ? "thieving"
                                        : chosenStats[2] == "finesse"
                                          ? "thieving"
                                          : "link-thieving"
                                }
                                className={cn(
                                    "m-1",
                                    chosenStats[2] == "finesse"
                                        ? "ring-2 ring-light/75"
                                        : ""
                                )}
                                onClick={() => {
                                    setChosenStats(
                                        changeItemInArray(
                                            chosenStats,
                                            2,
                                            "finesse"
                                        )
                                    );
                                    setChosenStats(
                                        changeItemInArray(
                                            chosenStats,
                                            3,
                                            chosenStats[3] != "finesse"
                                                ? chosenStats[3]
                                                : ""
                                        )
                                    );
                                }}
                            >
                                Finesse
                            </Button>
                            <Button
                                variant={
                                    chosenStats[2] == ""
                                        ? "nature"
                                        : chosenStats[2] == "nature"
                                          ? "nature"
                                          : "link-nature"
                                }
                                className={cn(
                                    "m-1",
                                    chosenStats[2] == "nature"
                                        ? "ring-2 ring-light/75"
                                        : ""
                                )}
                                onClick={() => {
                                    setChosenStats(
                                        changeItemInArray(
                                            chosenStats,
                                            2,
                                            "nature"
                                        )
                                    );
                                    setChosenStats(
                                        changeItemInArray(
                                            chosenStats,
                                            3,
                                            chosenStats[3] != "nature"
                                                ? chosenStats[3]
                                                : ""
                                        )
                                    );
                                }}
                            >
                                Nature
                            </Button>
                        </div>
                    </div>

                    {chosenStats[2] != "" && (
                        // Flaw
                        <div className="m-2 flex-col rounded-md bg-dark-300 p-4 pt-1">
                            <div className="mb-2 p-2">
                                Pick your character's <strong>Flaw</strong>.
                                They will have -1 in this stat.
                            </div>
                            <div className="flex-row">
                                <Button
                                    disabled={chosenStats[2] == "arcana"}
                                    variant={
                                        chosenStats[3] == ""
                                            ? "arcana"
                                            : chosenStats[3] == "arcana"
                                              ? "arcana"
                                              : "link-arcana"
                                    }
                                    className={cn(
                                        "m-1",
                                        chosenStats[3] == "arcana"
                                            ? "ring-2 ring-light/75"
                                            : ""
                                    )}
                                    onClick={() => {
                                        setChosenStats(
                                            changeItemInArray(
                                                chosenStats,
                                                3,
                                                "arcana"
                                            )
                                        );
                                    }}
                                >
                                    Arcana
                                </Button>
                                <Button
                                    disabled={chosenStats[2] == "charm"}
                                    variant={
                                        chosenStats[3] == ""
                                            ? "charm"
                                            : chosenStats[3] == "charm"
                                              ? "charm"
                                              : "link-charm"
                                    }
                                    className={cn(
                                        "m-1",
                                        chosenStats[3] == "charm"
                                            ? "ring-2 ring-light/75"
                                            : ""
                                    )}
                                    onClick={() => {
                                        setChosenStats(
                                            changeItemInArray(
                                                chosenStats,
                                                3,
                                                "charm"
                                            )
                                        );
                                    }}
                                >
                                    Charm
                                </Button>
                                <Button
                                    disabled={chosenStats[2] == "finesse"}
                                    variant={
                                        chosenStats[3] == ""
                                            ? "thieving"
                                            : chosenStats[3] == "finesse"
                                              ? "thieving"
                                              : "link-thieving"
                                    }
                                    className={cn(
                                        "m-1",
                                        chosenStats[3] == "finesse"
                                            ? "ring-2 ring-light/75"
                                            : ""
                                    )}
                                    onClick={() => {
                                        setChosenStats(
                                            changeItemInArray(
                                                chosenStats,
                                                3,
                                                "finesse"
                                            )
                                        );
                                    }}
                                >
                                    Finesse
                                </Button>
                                <Button
                                    disabled={chosenStats[2] == "nature"}
                                    variant={
                                        chosenStats[3] == ""
                                            ? "nature"
                                            : chosenStats[3] == "nature"
                                              ? "nature"
                                              : "link-nature"
                                    }
                                    className={cn(
                                        "m-1",
                                        chosenStats[3] == "nature"
                                            ? "ring-2 ring-light/75"
                                            : ""
                                    )}
                                    onClick={() => {
                                        setChosenStats(
                                            changeItemInArray(
                                                chosenStats,
                                                3,
                                                "nature"
                                            )
                                        );
                                    }}
                                >
                                    Nature
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Deeper Learning */}
            {chosenStats[3] != "" && useDeeperLearning && (
                <div className="m-4 items-center justify-center rounded-md border-2 border-solid border-body-700/20 bg-dark-400">
                    <h1 className="m-2 rounded-md bg-dark-300 p-2">
                        Optional Step: Deeper Learning
                    </h1>
                    {/* Deep Knowledge */}
                    <div className="m-2 flex-col rounded-md bg-dark-300 p-4 pt-1">
                        <div className="mb-2 p-2">
                            Pick your character's{" "}
                            <strong>Deep Knowledge</strong>. It will be
                            increased by 1.
                        </div>
                        <div className="flex-row">
                            <Button
                                variant={
                                    chosenStats[4] == ""
                                        ? "arcana"
                                        : chosenStats[4] == "arcana"
                                          ? "arcana"
                                          : "link-arcana"
                                }
                                className={cn(
                                    "m-1",
                                    chosenStats[4] == "arcana"
                                        ? "ring-2 ring-light/75"
                                        : ""
                                )}
                                onClick={() => {
                                    setChosenStats(
                                        changeItemInArray(
                                            chosenStats,
                                            4,
                                            "arcana"
                                        )
                                    );
                                    setChosenStats(
                                        changeItemInArray(
                                            chosenStats,
                                            5,
                                            chosenStats[5] != "arcana"
                                                ? chosenStats[5]
                                                : ""
                                        )
                                    );
                                }}
                            >
                                Arcana
                            </Button>
                            <Button
                                variant={
                                    chosenStats[4] == ""
                                        ? "charm"
                                        : chosenStats[4] == "charm"
                                          ? "charm"
                                          : "link-charm"
                                }
                                className={cn(
                                    "m-1",
                                    chosenStats[4] == "charm"
                                        ? "ring-2 ring-light/75"
                                        : ""
                                )}
                                onClick={() => {
                                    setChosenStats(
                                        changeItemInArray(
                                            chosenStats,
                                            4,
                                            "charm"
                                        )
                                    );
                                    setChosenStats(
                                        changeItemInArray(
                                            chosenStats,
                                            5,
                                            chosenStats[5] != "charm"
                                                ? chosenStats[5]
                                                : ""
                                        )
                                    );
                                }}
                            >
                                Charm
                            </Button>
                            <Button
                                variant={
                                    chosenStats[4] == ""
                                        ? "thieving"
                                        : chosenStats[4] == "finesse"
                                          ? "thieving"
                                          : "link-thieving"
                                }
                                className={cn(
                                    "m-1",
                                    chosenStats[4] == "finesse"
                                        ? "ring-2 ring-light/75"
                                        : ""
                                )}
                                onClick={() => {
                                    setChosenStats(
                                        changeItemInArray(
                                            chosenStats,
                                            4,
                                            "finesse"
                                        )
                                    );
                                    setChosenStats(
                                        changeItemInArray(
                                            chosenStats,
                                            5,
                                            chosenStats[5] != "finesse"
                                                ? chosenStats[5]
                                                : ""
                                        )
                                    );
                                }}
                            >
                                Finesse
                            </Button>
                            <Button
                                variant={
                                    chosenStats[4] == ""
                                        ? "nature"
                                        : chosenStats[4] == "nature"
                                          ? "nature"
                                          : "link-nature"
                                }
                                className={cn(
                                    "m-1",
                                    chosenStats[4] == "nature"
                                        ? "ring-2 ring-light/75"
                                        : ""
                                )}
                                onClick={() => {
                                    setChosenStats(
                                        changeItemInArray(
                                            chosenStats,
                                            4,
                                            "nature"
                                        )
                                    );
                                    setChosenStats(
                                        changeItemInArray(
                                            chosenStats,
                                            5,
                                            chosenStats[5] != "nature"
                                                ? chosenStats[5]
                                                : ""
                                        )
                                    );
                                }}
                            >
                                Nature
                            </Button>
                        </div>
                    </div>

                    {chosenStats[2] != "" && (
                        // Critical Flaw
                        <div className="m-2 flex-col rounded-md bg-dark-300 p-4 pt-1">
                            <div className="mb-2 p-2">
                                Pick your character's{" "}
                                <strong>Critical Flaw</strong>. It will be
                                reduced by 1.
                            </div>
                            <div className="flex-row">
                                <Button
                                    disabled={chosenStats[4] == "arcana"}
                                    variant={
                                        chosenStats[5] == ""
                                            ? "arcana"
                                            : chosenStats[5] == "arcana"
                                              ? "arcana"
                                              : "link-arcana"
                                    }
                                    className={cn(
                                        "m-1",
                                        chosenStats[5] == "arcana"
                                            ? "ring-2 ring-light/75"
                                            : ""
                                    )}
                                    onClick={() => {
                                        setChosenStats(
                                            changeItemInArray(
                                                chosenStats,
                                                5,
                                                "arcana"
                                            )
                                        );
                                    }}
                                >
                                    Arcana
                                </Button>
                                <Button
                                    disabled={chosenStats[4] == "charm"}
                                    variant={
                                        chosenStats[5] == ""
                                            ? "charm"
                                            : chosenStats[5] == "charm"
                                              ? "charm"
                                              : "link-charm"
                                    }
                                    className={cn(
                                        "m-1",
                                        chosenStats[5] == "charm"
                                            ? "ring-2 ring-light/75"
                                            : ""
                                    )}
                                    onClick={() => {
                                        setChosenStats(
                                            changeItemInArray(
                                                chosenStats,
                                                5,
                                                "charm"
                                            )
                                        );
                                    }}
                                >
                                    Charm
                                </Button>
                                <Button
                                    disabled={chosenStats[4] == "finesse"}
                                    variant={
                                        chosenStats[5] == ""
                                            ? "thieving"
                                            : chosenStats[5] == "finesse"
                                              ? "thieving"
                                              : "link-thieving"
                                    }
                                    className={cn(
                                        "m-1",
                                        chosenStats[5] == "finesse"
                                            ? "ring-2 ring-light/75"
                                            : ""
                                    )}
                                    onClick={() => {
                                        setChosenStats(
                                            changeItemInArray(
                                                chosenStats,
                                                5,
                                                "finesse"
                                            )
                                        );
                                    }}
                                >
                                    Finesse
                                </Button>
                                <Button
                                    disabled={chosenStats[4] == "nature"}
                                    variant={
                                        chosenStats[5] == ""
                                            ? "nature"
                                            : chosenStats[5] == "nature"
                                              ? "nature"
                                              : "link-nature"
                                    }
                                    className={cn(
                                        "m-1",
                                        chosenStats[5] == "nature"
                                            ? "ring-2 ring-light/75"
                                            : ""
                                    )}
                                    onClick={() => {
                                        setChosenStats(
                                            changeItemInArray(
                                                chosenStats,
                                                5,
                                                "nature"
                                            )
                                        );
                                    }}
                                >
                                    Nature
                                </Button>
                            </div>
                        </div>
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
                                    Arcana:{" "}
                                    {player["stats"]["arcana"] > 0 ? "+" : ""}
                                    {player["stats"]["arcana"]}
                                </div>
                                <div className="m-1 rounded-xl bg-charm p-1 pr-2 text-sm lg:pl-2 lg:text-[1rem] lg:font-bold">
                                    Charm:{" "}
                                    {player["stats"]["charm"] > 0 ? "+" : ""}
                                    {player["stats"]["charm"]}
                                </div>
                                <div className="m-1 rounded-xl bg-thieving p-1 pr-2 text-sm lg:pl-2 lg:text-[1rem] lg:font-bold">
                                    Finesse:{" "}
                                    {player["stats"]["finesse"] > 0 ? "+" : ""}
                                    {player["stats"]["finesse"]}
                                </div>
                                <div className="m-1 rounded-xl bg-nature p-1 pr-2 text-sm lg:pl-2 lg:text-[1rem] lg:font-bold">
                                    Nature:{" "}
                                    {player["stats"]["nature"] > 0 ? "+" : ""}
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
                                <p className="m-2 flex flex-row items-center justify-center">
                                    Use Deeper Learning
                                </p>
                            )}
                            {!useDeeperLearning && (
                                <p className="m-2 flex flex-row items-center justify-center">
                                    Disable Deeper Learning
                                </p>
                            )}

                            <Switch
                                checked={useDeeperLearning}
                                onChange={setUseDeeperLearning}
                                className={`${
                                    useDeeperLearning
                                        ? "bg-body"
                                        : "bg-dark-700"
                                } relative inline-flex h-6 w-11 items-center rounded-full`}
                            >
                                <span className="sr-only">
                                    Switch Deeper Learning
                                </span>
                                <span
                                    className={`${
                                        useDeeperLearning
                                            ? "translate-x-6"
                                            : "translate-x-1"
                                    } inline-block h-4 w-4 transform rounded-full bg-light transition`}
                                />
                            </Switch>
                        </div>

                        <Button
                            disabled={chosenStats[3] == ""}
                            variant="nature"
                            className="m-2 flex items-center justify-center"
                            onClick={setStepnum}
                        >
                            Continue
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
