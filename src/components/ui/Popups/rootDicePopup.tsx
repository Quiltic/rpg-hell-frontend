

import { Dialog, Transition } from "@headlessui/react";
import { Button } from "../Button/Button";
import { Fragment, useState, useEffect } from "react";

import { XMarkIcon } from "@heroicons/react/20/solid";
import {
    dice1Icon,
    dice2Icon,
    dice3Icon,
    dice4Icon,
    dice5Icon,
    dice6Icon,
    diceRollingIcon,
    perspectiveDiceIcon
} from "../../../assets/IconSVGs/dice/diceSVG";
import dice1 from "../../../assets/IconSVGs/dice/dice-f-1.svg";
import dice2 from "../../../assets/IconSVGs/dice/dice-f-2.svg";
import dice3 from "../../../assets/IconSVGs/dice/dice-f-3.svg";
import dice4 from "../../../assets/IconSVGs/dice/dice-f-4.svg";
import dice5 from "../../../assets/IconSVGs/dice/dice-f-5.svg";
import dice6 from "../../../assets/IconSVGs/dice/dice-f-6.svg";
import persDice from "../../../assets/IconSVGs/dice/perspective-dice.svg";
import rolling from "../../../assets/IconSVGs/dice/dice roll.gif";
import { cn } from "../../../styling/utilites";
import DicePopup2 from "./dicePopup";



const diceSVGs = [
    dice1,
    dice2,
    dice3,
    dice4,
    dice5,
    dice6,
    rolling,
]
const colors = ["body","mind","soul","nature"];


function rollDice(amount: number) {

    let dice = [];

    for (let a = 0; a < amount; a++) {
        const randomInRange = Math.floor(Math.random() * 6); // we dont +1 because then it goes 0-5 which matches up to the array
        dice.push(randomInRange);
    }

    dice.sort((a,b) => b-a); // high to low
    return dice;
}


type Props = {
    startingDice: number[];
    startingBonus: number;
    startOpen: boolean;
};


export default function DicePopup({
    startingDice: startingDice = [0,0],
    startingBonus: startingBonus = 0,
    startOpen: startOpen = false,
    }: Props) {

    const [Dice, SetDice] = useState<number[]>(startingDice);
    const [Bonus, SetBonus] = useState(startingBonus);

    const [isOpen, setIsOpen] = useState(startOpen);
    // const [randColor, setRandColor] = useState("body");

    // function closeModal() {
    //     setIsOpen(false);
    // }

    // function openModal() {
    //     setIsOpen(true);
    //     setRandColor(colors[Math.floor(Math.random() * colors.length)]);
    // }

    return (
        <>

            <Button
                variant={"gradient"}
                leftIcon={diceRollingIcon}
                className={
                    "m-2 bottom-10 left-14 rounded-full w-10 h-10 transform fixed"
                }
                onClick={() => setIsOpen(true)}
            />

            <DicePopup2 startingDice={Dice} startingBonus={Bonus} isOpen={isOpen} setIsOpen={setIsOpen} setBonus={SetBonus} setDice={SetDice}/>
        </>
    );
}
