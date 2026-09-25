import { changeItemInArray } from "../../../util/creatureHelpers";
import { playerCharacterType } from "../../../types/playerCharacterType";
import { PlusIcon } from "@heroicons/react/24/outline";
import Popup from "../../ui/Popups/Popup";
import { useState } from "react";
import { useTraits } from "../../../hooks/useTraits";
import { Trait } from "../../../client";
import TraitCard from "../../TraitsPages/TraitCardStuff/traitCard";

type Props = {
    player: playerCharacterType;
    setPlayer: (player: playerCharacterType) => void;
};

export default function BuilderComponentStep_Traits({ player: player, setPlayer: setPlayer }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [picking, setPicking] = useState(0);

    const [chosenTraits, setChosenTraits] = useState<Array<Trait>>([
        { name: "", tags: "", effect: "", req: "", extra: "" },
        { name: "", tags: "", effect: "", req: "", extra: "" },
    ]);

    const {
        allTraits,
        pinnedTraits,
        displayedTraits,
        addToPinnedTraits,
        removeFromPinnedTraits,
        filterTraits,
        resetFilterTraits,
    } = useTraits();

    console.log(
        displayedTraits.filter((s) => {
            var hasPath = false;
            player.paths.forEach((path) => {
                hasPath = hasPath || s.req?.toString().includes(path.toLowerCase());
            });
            return hasPath;
        })
    );

    return (
        <>
            <Popup
                displayedContentName="Pick a Trait"
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                isSmol={false}
                displayedContent={
                    <>
                        <div className="grid grid-cols-2">
                            {displayedTraits
                                .filter((trait) => {
                                    var hasPath = false;
                                    player.paths.forEach((path) => {
                                        // Not already picked, and has the req path.
                                        hasPath =
                                            !player.traits.includes(trait.name.toLowerCase()) &&
                                            (hasPath || trait.req?.toString().includes(path.toLowerCase() + " 1"));
                                    });
                                    return hasPath;
                                })
                                .map((trait, i) => {
                                    if (trait.name != "Error") {
                                        return (
                                            <div
                                                className="clickable"
                                                onClick={() => {
                                                    setChosenTraits(changeItemInArray(chosenTraits, picking, trait));
                                                    setPlayer({
                                                        ...player,
                                                        traits: changeItemInArray(player.traits, picking, trait.name),
                                                    });
                                                    setIsOpen(false);
                                                }}
                                            >
                                                <TraitCard
                                                    _trait={trait}
                                                    key={i}
                                                />
                                            </div>
                                        );
                                    }
                                })}
                        </div>
                    </>
                }
            />

            <div className="m-4 items-center justify-center rounded-md border-2 border-solid border-body-700/20 bg-dark-400">
                <h1 className="m-2 rounded-md bg-dark-300 p-2">Step 4: Traits</h1>

                <div className="grid grid-cols-2 items-center justify-items-center">
                    {player.traits[0] == "" && (
                        <div
                            className="clickable m-4 flex
                                    w-48 items-center justify-center rounded-md border-2 border-solid border-body-700/10 
                                    bg-dark-300 p-2"
                            onClick={() => {
                                setPicking(0);
                                setIsOpen(true);
                            }}
                        >
                            <PlusIcon className="h-12 w-12" />
                        </div>
                    )}

                    {player.traits[0] != "" && (
                        <div
                            className="clickable"
                            onClick={() => {
                                setPicking(0);
                                setIsOpen(true);
                            }}
                        >
                            <TraitCard _trait={chosenTraits[0]} />
                        </div>
                    )}

                    {player.traits[1] == "" && (
                        <div
                            className="clickable m-4 flex
                                    w-48 items-center justify-center rounded-md border-2 border-solid border-body-700/10 
                                    bg-dark-300 p-2"
                            onClick={() => {
                                setPicking(1);
                                setIsOpen(true);
                            }}
                        >
                            <PlusIcon className="h-12 w-12" />
                        </div>
                    )}

                    {player.traits[1] != "" && (
                        <div
                            className="clickable"
                            onClick={() => {
                                setPicking(1);
                                setIsOpen(true);
                            }}
                        >
                            <TraitCard _trait={chosenTraits[1]} />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
