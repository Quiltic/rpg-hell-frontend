import { useState } from "react";
import { playerCharacterType } from "../../../types/playerCharacterType";
import { Button } from "../../ui/Button/Button";
import DicePopup from "../../ui/Popups/dicePopup";
import DamageTaker from "../../CharacterSheet/InteractiveCharSheets/DamageTaker";
import Popup from "../../ui/Popups/Popup";

type Props = {
    player: playerCharacterType;
    setPlayer: (player: playerCharacterType) => void;
    // isOpen:boolean;
    // setIsOpen:() => void;
};

export default function Statblock({ player: player, setPlayer: setPlayer }: Props) {
    const [openDice, setOpenDice] = useState(false);
    const [dice, setDice] = useState([1]);
    const [diceBonus, setDiceBonus] = useState(0);

    const [openDmg, setOpenDmg] = useState(false);
    // const [yep, setYep] = useState(0);

    // useEffect(() => {
    //     filterItems((item) => {
    //         return item.tier <= 1;
    //     });
    //     // console.log(displayedItems);
    // }, [allItems]);
    // console.log(player.stats.mind);

    return (
        <>
            <DicePopup
                startingDice={dice}
                startingBonus={diceBonus}
                isOpen={openDice}
                setIsOpen={setOpenDice}
                setDice={setDice}
                setBonus={setDiceBonus}
            />

            <Popup
                displayedContentName={"Healing & Damage"}
                isOpen={openDmg}
                setIsOpen={setOpenDmg}
                isSmol={true}
                displayedContent={
                    <DamageTaker
                        player={player}
                        setPlayer={setPlayer}
                    />
                }
            />

            {/* Main Thing */}
            <div className="backgroundBox flex-col justify-between">
                {/* Body Mind Soul */}
                <div className="midgroundBox grid-cols-3 gap-1">
                    <div
                        className="clickable m-1 rounded-xl bg-body p-1 pr-2 text-sm lg:pl-2 lg:text-[1rem] lg:font-bold"
                        onClick={() => {
                            setDiceBonus(player.stats.body);
                            setDice([1]);
                            setOpenDice(true);
                        }}
                    >
                        Body {player.stats.body > 0 ? "+" : ""}
                        {player.stats.body}
                    </div>
                    <div
                        className="clickable m-1 rounded-xl bg-mind p-1 pr-2 text-sm lg:pl-2 lg:text-[1rem] lg:font-bold"
                        onClick={() => {
                            setDiceBonus(player.stats.mind);
                            setDice([1]);
                            setOpenDice(true);
                        }}
                    >
                        Mind {player.stats.mind > 0 ? "+" : ""}
                        {player.stats.mind}
                    </div>
                    <div
                        className="clickable m-1 rounded-xl bg-soul p-1 pr-2 text-sm lg:pl-2 lg:text-[1rem] lg:font-bold"
                        onClick={() => {
                            setDiceBonus(player.stats.soul);
                            setDice([1]);
                            setOpenDice(true);
                        }}
                    >
                        Soul {player.stats.soul > 0 ? "+" : ""}
                        {player.stats.soul}
                    </div>
                </div>

                <div className="flex flex-row">
                    {/* Substats */}
                    <div className="midgroundBox flex-col">
                        <div
                            className="clickable m-1 rounded-xl bg-arcana p-1 pr-2 text-sm lg:pl-2 lg:text-[1rem] lg:font-bold"
                            onClick={() => {
                                setDiceBonus(player.stats.arcana);
                                setDice([1]);
                                setOpenDice(true);
                            }}
                        >
                            Arcana {player.stats.arcana > 0 ? "+" : ""}
                            {player.stats.arcana}
                        </div>
                        <div
                            className="clickable m-1 rounded-xl bg-charm p-1 pr-2 text-sm lg:pl-2 lg:text-[1rem] lg:font-bold"
                            onClick={() => {
                                setDiceBonus(player.stats.charm);
                                setDice([1]);
                                setOpenDice(true);
                            }}
                        >
                            Charm {player.stats.charm > 0 ? "+" : ""}
                            {player.stats.charm}
                        </div>
                        <div
                            className="clickable m-1 rounded-xl bg-thieving p-1 pr-2 text-sm lg:pl-2 lg:text-[1rem] lg:font-bold"
                            onClick={() => {
                                setDiceBonus(player.stats.finesse);
                                setDice([1]);
                                setOpenDice(true);
                            }}
                        >
                            Finesse {player.stats.finesse > 0 ? "+" : ""}
                            {player.stats.finesse}
                        </div>
                        <div
                            className="clickable m-1 rounded-xl bg-nature p-1 pr-2 text-sm lg:pl-2 lg:text-[1rem] lg:font-bold"
                            onClick={() => {
                                setDiceBonus(player.stats.nature);
                                setDice([1]);
                                setOpenDice(true);
                            }}
                        >
                            Nature {player.stats.nature > 0 ? "+" : ""}
                            {player.stats.nature}
                        </div>
                    </div>

                    {/* Calculated Stats */}
                    <div className="midgroundBox flex-col">
                        <div
                            className="center flex-row rounded-md bg-medicine"
                            onClick={() => setOpenDmg(true)}
                        >
                            HP: {player.calculatedStats.curHp}/ {player.calculatedStats.maxHp}
                        </div>
                        <div
                            className="center flex-row rounded-md bg-crafting"
                            onClick={() => setOpenDmg(true)}
                        >
                            Shielding: {player.calculatedStats.shielding}
                        </div>

                        <div
                            className="clickable m-1 rounded-xl bg-body-300 p-1 pr-2 text-sm lg:pl-2 lg:text-[1rem] lg:font-bold"
                            onClick={() => {
                                setDiceBonus(player.calculatedStats.dodge);
                                setDice([1]);
                                setOpenDice(true);
                            }}
                        >
                            Dodge: {player.calculatedStats.speed > 0 ? "+" : ""}
                            {player.calculatedStats.dodge}
                        </div>

                        <div
                            className="clickable m-1 rounded-xl bg-body-300 p-1 pr-2 text-sm lg:pl-2 lg:text-[1rem] lg:font-bold"
                            onClick={() => {
                                setDiceBonus(player.calculatedStats.speed);
                                setDice([1]);
                                setOpenDice(true);
                            }}
                        >
                            Speed: {player.calculatedStats.speed}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
