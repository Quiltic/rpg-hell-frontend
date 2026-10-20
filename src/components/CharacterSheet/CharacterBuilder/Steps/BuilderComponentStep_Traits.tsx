import { playerCharacterType } from "../../../../types/playerCharacterType";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useTraits } from "../../../../hooks/useTraits";
import { Trait } from "../../../../client";
import TraitCard from "../../../TraitsPages/TraitCardStuff/traitCard";
import SwapPopupPart from "../Parts/SwapPopupPart";

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
        allTraits,
        allTraits.filter((s) => {
            var hasPath = false;
            player.paths.forEach((path) => {
                hasPath = hasPath || s.req?.toString().includes(path.toLowerCase());
            });
            return hasPath;
        })
    );

    return (
        <>
            <SwapPopupPart
                player={player}
                setPlayer={setPlayer}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                displayedList={allTraits.filter((trait) => {
                    var hasPath = false;
                    player.paths.forEach((path) => {
                        // Not already picked, and has the req path.
                        hasPath =
                            !player.traits.includes(trait.name.toLowerCase()) &&
                            (hasPath || trait.req?.toString().includes(path.toLowerCase() + " 1"));
                    });
                    return hasPath;
                })}
                chosenList={chosenTraits}
                setChosenList={setChosenTraits}
                type={"Trait"}
                location={picking}
            />

            <div className="m-4 items-center justify-center rounded-md border-2 border-solid border-body-700/20 bg-dark-400">
                <h1 className="m-2 rounded-md bg-dark-300 p-2">Pick your Traits</h1>

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
                            {chosenTraits[0].name != "" && <TraitCard _trait={chosenTraits[0]} />}
                            {chosenTraits[0].name == "" && (
                                <TraitCard
                                    _trait={
                                        allTraits.find((trait) => {
                                            return trait.name == player.traits[0];
                                        }) as Trait
                                    }
                                />
                            )}
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
                            {chosenTraits[1].name != "" && <TraitCard _trait={chosenTraits[1]} />}
                            {chosenTraits[1].name == "" && (
                                <TraitCard
                                    _trait={
                                        allTraits.find((trait) => {
                                            return trait.name == player.traits[1];
                                        }) as Trait
                                    }
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
