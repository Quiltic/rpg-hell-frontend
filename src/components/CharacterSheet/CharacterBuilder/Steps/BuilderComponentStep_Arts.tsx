import { changeItemInArray } from "../../../../util/creatureHelpers";
import { playerCharacterType } from "../../../../types/playerCharacterType";
import { PlusIcon } from "@heroicons/react/24/outline";
import Popup from "../../../ui/Popups/Popup";
import { useState } from "react";
import { useSpells } from "../../../../hooks/useSpells";
import { Spell } from "../../../../client";
import SpellCard from "../../../SpellsPages/SpellCardStuff/artCard";
import SwapPopupPart from "../Parts/SwapPopupPart";

type Props = {
    player: playerCharacterType;
    setPlayer: (player: playerCharacterType) => void;
};

export default function BuilderComponentStep_Arts({ player: player, setPlayer: setPlayer }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [picking, setPicking] = useState(0);

    const [chosenSpells, setChosenSpells] = useState<Array<Spell>>([
        {
            name: "",
            level: 0,
            stat: "",
            tags: "",
            strain: 0,
            dice: 0,
            effect: "",
            activators: 0,
        },
        {
            name: "",
            level: 0,
            stat: "",
            tags: "",
            strain: 0,
            dice: 0,
            effect: "",
            activators: 0,
        },
        {
            name: "",
            level: 0,
            stat: "",
            tags: "",
            strain: 0,
            dice: 0,
            effect: "",
            activators: 0,
        },
        {
            name: "",
            level: 0,
            stat: "",
            tags: "",
            strain: 0,
            dice: 0,
            effect: "",
            activators: 0,
        },
        {
            name: "",
            level: 0,
            stat: "",
            tags: "",
            strain: 0,
            dice: 0,
            effect: "",
            activators: 0,
        },
        {
            name: "",
            level: 0,
            stat: "",
            tags: "",
            strain: 0,
            dice: 0,
            effect: "",
            activators: 0,
        },
    ]);

    const { allSpells, displayedSpells } = useSpells();

    return (
        <>
            <SwapPopupPart
                player={player}
                setPlayer={setPlayer}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                displayedList={displayedSpells.filter((spell) => {
                    let hasPath = false;
                    player.paths.forEach((path) => {
                        // Not already picked, and has the req path.
                        hasPath =
                            !player.arts.includes(spell.name.toLowerCase()) &&
                            (hasPath || (spell.stat?.toString().includes(path.toLowerCase()) && spell.level == 1));
                    });
                    return hasPath;
                })}
                chosenList={chosenSpells}
                setChosenList={setChosenSpells}
                type={"Art"}
                location={picking}
            />

            <div className="m-4 items-center justify-center rounded-md border-2 border-solid border-body-700/20 bg-dark-400">
                <h1 className="m-2 rounded-md bg-dark-300 p-2">Pick your Arts</h1>

                <div className="grid grid-cols-2 items-center justify-items-center">
                    {player.arts.map((_, id) => {
                        return (
                            <>
                                {player.arts[id] == "" && (
                                    <div
                                        className="clickable m-4 flex
                                        w-48 items-center justify-center rounded-md border-2 border-solid border-body-700/10 
                                        bg-dark-300 p-2"
                                        key={id}
                                        onClick={() => {
                                            setPicking(id);
                                            setIsOpen(true);
                                        }}
                                    >
                                        <PlusIcon className="h-12 w-12" />
                                    </div>
                                )}

                                {player.arts[id] != "" && (
                                    <div
                                        className="clickable"
                                        onClick={() => {
                                            setPicking(id);
                                            setIsOpen(true);
                                        }}
                                    >
                                        {chosenSpells[id].name != "" && (
                                            <SpellCard
                                                _spell={chosenSpells[id]}
                                                static
                                            />
                                        )}
                                        {chosenSpells[id].name == "" && (
                                            <SpellCard
                                                _spell={allSpells.find((art) => {
                                                    return player.arts[id] == art.name;
                                                })}
                                                static
                                            />
                                        )}
                                    </div>
                                )}
                            </>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
