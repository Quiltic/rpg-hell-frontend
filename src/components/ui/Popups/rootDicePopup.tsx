

import { Button } from "../Button/Button";
import { useState } from "react";
import {
    diceRollingIcon
} from "../../../assets/IconSVGs/dice/diceSVG";
import DicePopup from "./dicePopup";



type Props = {
    startingDice: number[];
    startingBonus: number;
    startOpen: boolean;
};


export default function RootDicePopup({
    startingDice: startingDice = [0,0],
    startingBonus: startingBonus = 0,
    startOpen: startOpen = false,
    }: Props) {

    const [Dice, SetDice] = useState<number[]>(startingDice);
    const [Bonus, SetBonus] = useState(startingBonus);

    const [isOpen, setIsOpen] = useState(startOpen);

    return (
        <>

            <Button
                variant={"gradient"}
                leftIcon={diceRollingIcon}
                className={
                    "m-2 bottom-10 left-14 rounded-full w-10 h-10 transform fixed print:hidden"
                }
                onClick={() => setIsOpen(true)}
            />

            <DicePopup startingDice={Dice} startingBonus={Bonus} isOpen={isOpen} setIsOpen={setIsOpen} setBonus={SetBonus} setDice={SetDice}/>
        </>
    );
}
