

import { Button } from "../Button/Button";
import { useState, useEffect } from "react";

import {
    diceRollingIcon
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
import Popup from "./Popup";



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
    isOpen: boolean;
    setIsOpen: (s: boolean) => void;
    setBonus: (s: number) => void;
};


export default function DicePopup2({
    startingDice: startingDice = [0,0],
    startingBonus: Bonus = 0,
    isOpen: isOpen,
    setIsOpen: setIsOpen,
    setBonus: SetBonus,
    }: Props) {

    const [Dice, SetDice] = useState<number[]>(startingDice);
    // const [Bonus, SetBonus] = useState(startingBonus);

    // const [isOpen, setIsOpen] = useState(startOpen);
    const [randColor, setRandColor] = useState("body");

    useEffect(() => {
        if (isOpen == true)
            setRandColor(colors[Math.floor(Math.random() * colors.length)]);
    }, [isOpen]);

    return (
        <>
            
            <Popup displayedContentName="Roll The Dice!" isOpen={isOpen} setIsOpen={setIsOpen} displayedContent={
                <div>
                    <div className="flex m-4 bg-dark-400 rounded-md justify-center">
                    <div className={cn("flex row items-center flex-wrap justify-center",Dice.length < 5 ? "w-[50%]":(Dice.length < 7 ? "w-[60%]":(Dice.length < 9 ? "w-[80%]":"w-[100%]")))}>
                        {Dice.map((n,i) => {
                            return (
                                <img
                                // cn("m-4 bg-dark-400 rounded-md grid-cols-6", Dice.length > 12 ? "grid-rows-3" : "grid-rows-2")
                                    className={cn("w-auto m-4",Dice.length < 3 ? "h-20":"h-16")}
                                    key={i}
                                    src={diceSVGs[n]}
                                    alt={(n+1).toString()}
                                    onClick={() => {

                                        if (Dice.length == 1) return

                                        SetDice(prevDice => 
                                            prevDice.filter((_, a) => a !== i)
                                        );
                                        
                                    }}
                                ></img>
                            );
                        })}

                    </div>
                    </div>

                    <h1>Total: {Dice.reduce((total, dice) => total + dice+1)+1 != Dice.length*7 ? Dice.reduce((total, dice) => total + dice+1)+1+Bonus : "?"}</h1> 

                    <div className="flex row items-center justify-around m-4 flex-wrap">

                        <Button leftIcon={diceRollingIcon} 
                        variant={randColor}
                        className="m-2"
                        onClick={() => {
                            SetDice(new Array(Dice.length).fill(6));

                            setTimeout(() => {
                                SetDice(rollDice(Dice.length))
                            }, 500);
                            }
                        }
                        >
                            Roll Dice
                        </Button>
                        <input
                            placeholder="Bonus"
                            name="Bonus"
                            className="rounded-lg bg-body-700/40 p-2 active:ring-2 active:ring-dark-700 dark:bg-soul-700/10 dark:active:ring-light-600"
                            value={Bonus}
                            onChange={(e) => SetBonus(Number(e.target.value))}
                        ></input>

                        <img
                            className="h-16 w-auto m-2 bg-dark rounded-full"
                            src={persDice}
                            alt="Add Dice"
                            onClick={() => {

                                SetDice(prevDice => [...prevDice,Math.floor(Math.random() * 6)].sort((a,b) => b-a));

                            }}
                        ></img>
                    </div>
                </div>
            }/>
        </>
    );
}
