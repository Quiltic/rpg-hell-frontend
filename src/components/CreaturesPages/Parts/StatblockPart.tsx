import { useState } from "react";
import { playerCharacterType } from "../../../types/playerCharacterType";
import { Button } from "../../ui/Button/Button";
import DicePopup from "../../ui/Popups/dicePopup";
import DamageTaker from "../../CharacterSheet/InteractiveCharSheets/DamageTaker";
import Popup from "../../ui/Popups/Popup";
import { cn } from "../../../styling/utilites";

type Props = {
    player: playerCharacterType;
    setPlayer: (player: playerCharacterType) => void;
    // isOpen:boolean;
    // setIsOpen:() => void;
};

type InterativeStatProps = {
    statValue: number;
    statName: string;
    statClassName: string;
    subStat?: boolean;
    absolute?: boolean;
    useDamage?: boolean;
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

    function InteractableStat({
        statValue,
        statName,
        statClassName,
        subStat = false,
        absolute = false,
        useDamage = false,
    }: InterativeStatProps) {
        return (
            <div
                className={cn(
                    "clickable rounded-xl ",
                    statClassName,
                    subStat ? " text-md px-4 py-2 font-semibold md:text-lg" : "px-5 py-3 text-lg font-bold md:text-xl"
                )}
                onClick={() => {
                    if (useDamage) {
                        setOpenDmg(true);
                    } else {
                        setDiceBonus(statValue);
                        setDice([1]);
                        setOpenDice(true);
                    }
                }}
            >
                {statName}{" "}
                <span>
                    {" "}
                    {/* className="rounded-lg bg-body-600/50 px-2 py-1" */}
                    {!absolute && statValue > 0 ? "+" : ""}
                    {statValue}
                </span>
            </div>
        );
    }

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
            <div className="flex items-center justify-center rounded-md md:m-4 md:bg-dark-400 md:p-4">
                <div className="-m-2 flex flex-col">
                    {/* Body Mind Soul */}
                    <div className=" midgroundBox grid grid-cols-3 gap-2 rounded-md bg-dark-300 p-2">
                        <InteractableStat
                            statValue={player.stats.body}
                            statName="Body"
                            statClassName="bg-body"
                        />
                        <InteractableStat
                            statValue={player.stats.mind}
                            statName="Mind"
                            statClassName="bg-mind"
                        />
                        <InteractableStat
                            statValue={player.stats.soul}
                            statName="Soul"
                            statClassName="bg-soul"
                        />
                    </div>

                    <div className="flex flex-row justify-between">
                        {/* Substats */}
                        <div className="midgroundBox flex grow flex-col gap-2 p-2">
                            <InteractableStat
                                statValue={player.stats.arcana}
                                statName="Arcana"
                                statClassName="bg-arcana"
                                subStat
                            />
                            <InteractableStat
                                statValue={player.stats.charm}
                                statName="Charm"
                                statClassName="bg-charm"
                                subStat
                            />
                            <InteractableStat
                                statValue={player.stats.finesse}
                                statName="Finesse"
                                statClassName="bg-thieving"
                                subStat
                            />
                            <InteractableStat
                                statValue={player.stats.nature}
                                statName="Nature"
                                statClassName="bg-nature"
                                subStat
                            />
                        </div>
                        {/* Calculated Stats */}
                        <div className="midgroundBox grid grow grid-rows-4 gap-2 p-2">
                            <InteractableStat
                                statValue={player.calculatedStats.maxHp}
                                statName={`HP ${player.calculatedStats.curHp} / `}
                                statClassName="bg-medicine"
                                subStat
                                absolute
                                useDamage
                            />
                            <InteractableStat
                                statValue={player.calculatedStats.shielding}
                                statName="Shielding"
                                statClassName="bg-crafting"
                                subStat
                                absolute
                                useDamage
                            />
                            <InteractableStat
                                statValue={player.calculatedStats.dodge}
                                statName="Dodge"
                                statClassName="bg-mind-400"
                                subStat
                            />
                            <InteractableStat
                                statValue={player.calculatedStats.speed}
                                statName="Speed"
                                statClassName="bg-arcana-400"
                                subStat
                                absolute
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
