

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
    const [randColor, setRandColor] = useState("body");

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
        setRandColor(colors[Math.floor(Math.random() * colors.length)]);
    }

    return (
        <>

            <Button
                variant={"gradient"}
                leftIcon={diceRollingIcon}
                className={
                    "m-2 bottom-10 left-14 rounded-full w-10 h-10 transform fixed"
                }
                onClick={openModal}
            />

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center p-4 pt-6 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-[60%] lg:w-[30%] h-[50%] transform overflow-hidden rounded-2xl p-6 pt-0 text-left align-middle shadow-xl transition-all bg-light dark:bg-dark">
                                    <Dialog.Title
                                        as="div"
                                        className="text-lg font-medium leading-6 flex flex-row justify-between"
                                    >
                                        <h3 className="capitalize">
                                            Roll The Dice!
                                        </h3>

                                        <div className="mt-4">
                                            <XMarkIcon
                                                className="h-6 w-6 opacity-50 cursor-pointer"
                                                // visibility={clearButtonVisibility}
                                                onClick={closeModal}
                                            />
                                        </div>
                                    </Dialog.Title>

                                    {/* <div className="flex row items-center flex-wrap justify-center m-4 bg-dark-400 rounded-md"> */}
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

                                    <h1>Total: {Dice.reduce((total, dice) => total + dice+1)+1 != Dice.length*7 ? Dice.reduce((total, dice) => total + dice+1)+1+Bonus : "?"}</h1> {// i have no idea why this works
                                    }

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
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
