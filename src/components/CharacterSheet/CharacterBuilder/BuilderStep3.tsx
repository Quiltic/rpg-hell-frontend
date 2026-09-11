import pathJson from "../../../assets/OfflineJsons/paths.json";

import CleanCombobox from "../../joshhellscapePages/CleanCombobox";
import { cn } from "../../../styling/utilites";
import { changeItemInArray } from "../../../util/creatureHelpers";
import { capitalize } from "../../../util/textFormatting";
import { Button } from "../../ui/Button/Button";
import { playerCharacterType } from "../../../types/playerCharacterType";

type Props = {
    player: playerCharacterType;
    setPlayer: (player: playerCharacterType) => void;
    setStepnum: () => void;
};

export default function BuilderStep3({
    player: player,
    setPlayer: setPlayer,
    setStepnum: setStepnum,
}: Props) {
    const pathList = pathJson.map((path) => path.name);

    return (
        <div className="">
            {/* Top Bar */}
            <div className="m-2 flex flex-row items-center justify-center rounded-md bg-dark-400">
                <h1 className="m-4 rounded-md bg-dark-300 p-4">
                    Step 3: Pick 2 Paths
                </h1>

                {/* Buttons */}
                <div className="m-2 flex flex-row items-center justify-center rounded-md bg-dark-300 p-2">
                    <CleanCombobox
                        items={pathList.filter((path: string) => {
                            return player.paths.indexOf(path) === -1;
                        })} // filter out the chosen things
                        className="flex flex-row p-2"
                        selected={capitalize(player.paths[0])}
                        setSelected={(val) => {
                            setPlayer({
                                ...player,
                                paths: changeItemInArray(player.paths, 0, val),
                            });
                        }}
                    />
                    <CleanCombobox
                        items={pathList.filter((path: string) => {
                            return player.paths.indexOf(path) === -1;
                        })}
                        className="flex flex-row p-2"
                        selected={capitalize(player.paths[1])}
                        setSelected={(val) => {
                            setPlayer({
                                ...player,
                                paths: changeItemInArray(player.paths, 1, val),
                            });
                        }}
                    />

                    <Button
                        disabled={
                            player.paths[0] == "" || player.paths[1] == ""
                        }
                        variant="nature"
                        className="m-2 flex items-center justify-center"
                        onClick={setStepnum}
                    >
                        Continue
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-3">
                {pathJson.map((path, id: number) => {
                    return (
                        <>
                            <div
                                key={id}
                                className={cn(
                                    "clickable m-2 rounded-md p-2",
                                    `${
                                        player.paths.includes(path.name)
                                            ? `ring-2 ring-light/75 bg-${path.color}`
                                            : player.paths[0] != "" &&
                                                player.paths[1] != ""
                                              ? `bg-${path.color}-300`
                                              : `bg-${path.color}`
                                    }`
                                )}
                                onClick={() => {
                                    // console.log(path.name in player.paths);
                                    const filledPaths =
                                        player.paths[0] == "" ? 0 : 1;
                                    setPlayer({
                                        ...player,
                                        paths: changeItemInArray(
                                            player.paths,
                                            filledPaths,
                                            path.name
                                        ),
                                    });
                                }}
                            >
                                <h3 className="mt-0 font-bold">
                                    {path.icon} {capitalize(path.name)}{" "}
                                    {path.icon}
                                </h3>
                                <div
                                    className={`text-wrap m-2 flex items-center justify-center rounded-md p-2 italic bg-${path.color}-400 h-16`}
                                >
                                    {path.short}
                                </div>
                            </div>
                        </>
                    );
                })}
            </div>
        </div>
    );
}
