import { Button } from "../../../ui/Button/Button";
import { changeItemInArray } from "../../../../util/creatureHelpers";
import { cn } from "../../../../styling/utilites";

type Props = {
    // player: playerCharacterType;
    // setPlayer: (player: playerCharacterType) => void;
    chosenStats: Array<string>;
    setChosenStats: (changer: any) => void;
    mainOrSub: "main" | "sub";
    headerLine: any;
    startIndex: number;
    doMinus?: boolean;
    ignorePast?: boolean;
    ignoreNext?: boolean;
};

function changeThenEmpty(
    setChosenStats: (changer: any) => void,
    chosenStats: Array<string>,
    startIndex: number,
    word: string,
    doMinus: boolean,
    ignoreNext: boolean
) {
    const modWord = doMinus ? "-" + word : word;
    setChosenStats(changeItemInArray(chosenStats, startIndex, modWord));
    if (!ignoreNext)
        setChosenStats(
            changeItemInArray(
                chosenStats,
                startIndex + 1,
                chosenStats[startIndex + 1] != word ? chosenStats[startIndex + 1] : ""
            )
        );
}

export default function StatChoicePart({
    chosenStats,
    setChosenStats,
    mainOrSub,
    headerLine,
    startIndex,
    doMinus = false,
    ignorePast = false,
    ignoreNext = false,
}: Props) {
    return (
        <>
            {mainOrSub == "main" && (
                <div className="m-2 flex-col rounded-md bg-dark-300 p-4 pt-1">
                    <div className="mb-2 p-2">{headerLine}</div>
                    <div className="flex-row">
                        <Button
                            variant={
                                chosenStats[startIndex] == ""
                                    ? "body"
                                    : chosenStats[startIndex].includes("body")
                                      ? "body"
                                      : "link-body"
                            }
                            className={cn(
                                "m-1",
                                chosenStats[startIndex].includes("body") ? "ring-2 ring-light/75" : ""
                            )}
                            onClick={() => {
                                if (doMinus) setChosenStats(changeItemInArray(chosenStats, startIndex, "-body"));
                                else setChosenStats(changeItemInArray(chosenStats, startIndex, "body"));
                            }}
                        >
                            Body
                        </Button>
                        <Button
                            variant={
                                chosenStats[startIndex] == ""
                                    ? "mind"
                                    : chosenStats[startIndex].includes("mind")
                                      ? "mind"
                                      : "link-mind"
                            }
                            className={cn(
                                "m-1",
                                chosenStats[startIndex].includes("mind") ? "ring-2 ring-light/75" : ""
                            )}
                            onClick={() => {
                                if (doMinus) setChosenStats(changeItemInArray(chosenStats, startIndex, "-mind"));
                                else setChosenStats(changeItemInArray(chosenStats, startIndex, "mind"));
                            }}
                        >
                            Mind
                        </Button>
                        <Button
                            variant={
                                chosenStats[startIndex] == ""
                                    ? "soul"
                                    : chosenStats[startIndex].includes("soul")
                                      ? "soul"
                                      : "link-soul"
                            }
                            className={cn(
                                "m-1",
                                chosenStats[startIndex].includes("soul") ? "ring-2 ring-light/75" : ""
                            )}
                            onClick={() => {
                                if (doMinus) setChosenStats(changeItemInArray(chosenStats, startIndex, "soul"));
                                else setChosenStats(changeItemInArray(chosenStats, startIndex, "soul"));
                            }}
                        >
                            Soul
                        </Button>
                    </div>
                </div>
            )}

            {mainOrSub == "sub" && (
                <div className="m-2 flex-col rounded-md bg-dark-300 p-4 pt-1">
                    <div className="mb-2 p-2">{headerLine}</div>
                    <div className="flex-row">
                        <Button
                            variant={
                                chosenStats[startIndex] == ""
                                    ? "arcana"
                                    : chosenStats[startIndex].includes("arcana")
                                      ? "arcana"
                                      : "link-arcana"
                            }
                            disabled={!ignorePast && chosenStats[startIndex - 1].includes("arcana")}
                            className={cn(
                                "m-1",
                                chosenStats[startIndex].includes("arcana") ? "ring-2 ring-light/75" : ""
                            )}
                            onClick={() => {
                                changeThenEmpty(setChosenStats, chosenStats, startIndex, "arcana", doMinus, ignoreNext);
                            }}
                        >
                            Arcana
                        </Button>
                        <Button
                            variant={
                                chosenStats[startIndex] == ""
                                    ? "charm"
                                    : chosenStats[startIndex].includes("charm")
                                      ? "charm"
                                      : "link-charm"
                            }
                            disabled={!ignorePast && chosenStats[startIndex - 1].includes("charm")}
                            className={cn(
                                "m-1",
                                chosenStats[startIndex].includes("charm") ? "ring-2 ring-light/75" : ""
                            )}
                            onClick={() => {
                                changeThenEmpty(setChosenStats, chosenStats, startIndex, "charm", doMinus, ignoreNext);
                            }}
                        >
                            Charm
                        </Button>
                        <Button
                            variant={
                                chosenStats[startIndex] == ""
                                    ? "thieving"
                                    : chosenStats[startIndex].includes("finesse")
                                      ? "thieving"
                                      : "link-thieving"
                            }
                            disabled={!ignorePast && chosenStats[startIndex - 1].includes("finesse")}
                            className={cn(
                                "m-1",
                                chosenStats[startIndex].includes("finesse") ? "ring-2 ring-light/75" : ""
                            )}
                            onClick={() => {
                                changeThenEmpty(
                                    setChosenStats,
                                    chosenStats,
                                    startIndex,
                                    "finesse",
                                    doMinus,
                                    ignoreNext
                                );
                            }}
                        >
                            Finesse
                        </Button>
                        <Button
                            variant={
                                chosenStats[startIndex] == ""
                                    ? "nature"
                                    : chosenStats[startIndex].includes("nature")
                                      ? "nature"
                                      : "link-nature"
                            }
                            disabled={!ignorePast && chosenStats[startIndex - 1].includes("nature")}
                            className={cn(
                                "m-1",
                                chosenStats[startIndex].includes("nature") ? "ring-2 ring-light/75" : ""
                            )}
                            onClick={() => {
                                changeThenEmpty(setChosenStats, chosenStats, startIndex, "nature", doMinus, ignoreNext);
                            }}
                        >
                            Nature
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}
