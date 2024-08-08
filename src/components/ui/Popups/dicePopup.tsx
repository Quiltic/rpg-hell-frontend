

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
    diceRollingIcon
} from "../../../assets/IconSVGs/dice/diceSVG";
import dice1 from "../../../assets/IconSVGs/dice/dice-f-1.svg";
import dice2 from "../../../assets/IconSVGs/dice/dice-f-2.svg";
import dice3 from "../../../assets/IconSVGs/dice/dice-f-3.svg";
import dice4 from "../../../assets/IconSVGs/dice/dice-f-4.svg";
import dice5 from "../../../assets/IconSVGs/dice/dice-f-5.svg";
import dice6 from "../../../assets/IconSVGs/dice/dice-f-6.svg";
import persDice from "../../../assets/IconSVGs/dice/perspective-dice.svg";
import rolllingDice from "../../../assets/IconSVGs/dice/rolling-dices.svg";



const initialFormData = {
    bonus: 0,
    dice: [0,0],
    diceIcons: [<img/>],
    diceToRoll: 2,
};

const diceSVGs = [
    dice1,
    dice2,
    dice3,
    dice4,
    dice5,
    dice6,
]


function rollDice(amount: number) {

    let dice = [];

    for (let a = 0; a < amount; a++) {
        const randomInRange = Math.floor(Math.random() * 6); // we dont +1 because then it goes 0-5 which matches up to the array
        dice.push(randomInRange);
    }

    dice.sort((a,b) => b-a); // high to low
    return dice;
}


export default function DicePopup() {

    const [diceFormData, SetDiceFormData] =
        useState(initialFormData);
    // const [bonus, setBonus] = useState(0);


    // useEffect(() => {

    //     diceFormData.diceIcons = [];

    //     diceFormData.diceIcons = diceFormData.dice.map((n) => {
    //         return (
    //             <img
    //                 className="h-16 w-auto m-2"
    //                 src={diceSVGs[n]}
    //                 alt={(n+1).toString()}
    //                 onClick={() => {
    //                     const tmplst = diceFormData.dice; // idk how to do this in 1 line
    //                     delete tmplst[n];

    //                     SetDiceFormData((prevDice) => ({
    //                         ...prevDice,
    //                         diceToRoll: Math.min(Math.max(diceFormData.diceToRoll-1, 0), 100000000), // apparently math.clamp isent real
    //                         dice: tmplst,
    //                     }))}   
    //                 }
    //             ></img>
    //         );
    //     })

    // }, [diceFormData.dice]);


    const [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    return (
        <>
            {/* <Button
                leftIcon={diceRollingIcon}
                onClick={openModal}
                variant={"link-soul"}
            >
            </Button> */}
            <img
                className="h-8 w-auto m-2"
                src={rolllingDice}
                alt="Open dice roller"
                onClick={() => {
                    openModal()
                }}
            ></img>

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

                                    <div className="flex row items-center flex-wrap justify-around m-4 bg-dark-400 rounded-md">

                                        {diceFormData.dice.map((n) => {
                                            return (
                                                <img
                                                    className="h-16 w-auto m-2"
                                                    src={diceSVGs[n]}
                                                    alt={(n+1).toString()}
                                                    onClick={() => {
                                                        const tmplst = diceFormData.dice; // idk how to do this in 1 line
                                                        if (tmplst.length > 1){
                                                            // delete tmplst[n];
                                                            tmplst.pop();
                                                        }
                                                        

                                                        SetDiceFormData((prevDice) => ({
                                                            ...prevDice,
                                                            diceToRoll: Math.min(Math.max(diceFormData.diceToRoll-1, 1), 100000000), // apparently math.clamp isent real
                                                            dice: tmplst,
                                                        }))}   
                                                    }
                                                ></img>
                                            );
                                        })}

                                        {/* {diceFormData.diceIcons} */}
                                    </div>

                                    <h1>Total: {diceFormData.dice.reduce((total, dice) => total + dice+1)+1+diceFormData.bonus}</h1> {// i have no idea why this works
                                    }

                                    <div className="flex row items-center justify-around m-4">

                                        <Button leftIcon={diceRollingIcon} 
                                        variant="body"
                                        className="m-2"
                                        onClick={() => {
                                            SetDiceFormData((prevDice) => ({
                                                ...prevDice,
                                                dice: rollDice(diceFormData.diceToRoll),
                                            }))}   
                                        }
                                        >
                                            Roll Dice
                                        </Button>
                                        <input
                                            placeholder="Bonus"
                                            name="Bonus"
                                            className="rounded-lg bg-body-700/40 p-2 active:ring-2 active:ring-dark-700 dark:bg-soul-700/10 dark:active:ring-light-600"
                                            onChange={(e) => SetDiceFormData((prevDice) => ({
                                                ...prevDice,
                                                bonus: Number(e.target.value),
                                            }))}
                                        ></input>

                                        <img
                                            className="h-16 w-auto m-2"
                                            src={persDice}
                                            alt="Add Dice"
                                            onClick={() => {
                                                const tmplst = diceFormData.dice; // idk how to do this in 1 line
                                                tmplst.push(Math.floor(Math.random() * 6));

                                                SetDiceFormData((prevDice) => ({
                                                    ...prevDice,
                                                    diceToRoll: diceFormData.diceToRoll+1,
                                                    dice: tmplst.sort((a,b) => b-a), // sort high to low
                                                }))}   
                                            }
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
