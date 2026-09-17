import { Button } from "./Button/Button";
import { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import { cn } from "../../styling/utilites";

import d12_img from "../../../assets/IconSVGs/dice/d12.png";
import d12_rolling from "../../../assets/IconSVGs/dice/d12-dice-roll.gif";

import { diceRollingIcon } from "../../assets/IconSVGs/dice/diceSVG";
import dice1 from "../../../assets/IconSVGs/dice/dice-f-1.svg";
import dice2 from "../../../assets/IconSVGs/dice/dice-f-2.svg";
import dice3 from "../../../assets/IconSVGs/dice/dice-f-3.svg";
import dice4 from "../../../assets/IconSVGs/dice/dice-f-4.svg";
import dice5 from "../../../assets/IconSVGs/dice/dice-f-5.svg";
import dice6 from "../../../assets/IconSVGs/dice/dice-f-6.svg";
import persDice from "../../../assets/IconSVGs/dice/perspective-dice.svg";
import rolling from "../../../assets/IconSVGs/dice/dice roll.gif";

const diceSVGs = [rolling, dice1, dice2, dice3, dice4, dice5, dice6];
const d12_diceSVGs = [d12_rolling, d12_img];

const colors = ["body", "mind", "soul", "nature"];

function rollDice(amount: number, mult: number = 6) {
    let dice = [];

    for (let a = 0; a < amount; a++) {
        const randomInRange = Math.floor(Math.random() * mult) + 1;
        dice.push(randomInRange);
    }

    dice.sort((a, b) => b - a); // high to low
    return dice;
}

type Props = {
    startingDice: number[];
    startingBonus: number;
    isOpen: boolean;
    // setIsOpen: (s: boolean) => void;
    setDice: (s: number[]) => void;
    setBonus: (s: number) => void;
};

export default function DiceRoller({
    startingDice: Dice = [1, 1],
    startingBonus: Bonus = 0,
    isOpen: isOpen,
    // setIsOpen: setIsOpen,
    setDice: SetDice,
    setBonus: SetBonus,
}: Props) {
    const [d6, Setd6] = useState<number[]>(Dice);
    const [d12, Setd12] = useState<number[]>([1]);
    // const [Bonus, SetBonus] = useState(startingBonus);

    // const [isOpen, setIsOpen] = useState(startOpen);
    const [randColor, setRandColor] = useState("body");
    const [dnum, setDnum] = useState(6);

    useEffect(() => {
        setDnum(Dice.length == 1 ? 12 : 6);

        if (isOpen == true) setRandColor(colors[Math.floor(Math.random() * colors.length)]);

        // Dice.fill(1);
    }, [isOpen]);

    useEffect(() => {
        // we check the dice length = 1 due to the d12 roller
        if (Dice.length != d6.length && Dice.length != 1) {
            Setd6(Dice);
            d6.fill(1);
        }
    }, [Dice]);

    // unsure how to make it only reset the d12 if the bonus is changed from on open
    // useEffect(() => {
    //     if (isOpen == false)
    //         Setd12([1]);
    // }, [Bonus]);

    // console.log(dnum);

    return (
        <>
            <Tab.Group
                as="div"
                className="w-full "
                defaultIndex={Dice.length == 1 ? 1 : 0}
                onChange={(index) => {
                    setDnum(index * 6 + 6);
                    // SetDice(new Array(Dice.length).fill(1));
                    // console.log(index)
                }}
            >
                <div className="md:flex-column m-6 mb-0 w-full align-middle md:flex md:justify-between">
                    <Tab.List className="flex flex-wrap gap-2">
                        <Tab
                            className={({ selected }) =>
                                cn(
                                    "w-10 rounded-t-md px-2 py-1 ring-aabase hover:font-bold",
                                    selected ? "bg-dark-400 ring-2" : "bg-dark-600"
                                )
                            }
                        >
                            <img
                                className="w-full object-cover"
                                src={persDice}
                                alt={"d6"}
                            />
                        </Tab>
                        <Tab
                            className={({ selected }) =>
                                cn(
                                    "w-10 rounded-t-md bg-dark-600 px-2 py-1 ring-aabase hover:font-bold",
                                    selected ? "bg-dark-400 ring-2" : "bg-dark-600"
                                )
                            }
                        >
                            <img
                                className="w-full object-cover"
                                src={d12_img}
                                alt={"d12"}
                            />
                        </Tab>
                    </Tab.List>
                </div>
                <Tab.Panels>
                    <Tab.Panel>
                        {/* d6 */}
                        <div className="m-4 mt-0 flex justify-center rounded-md bg-dark-400">
                            <div
                                className={cn(
                                    "flex w-[100%] flex-row flex-wrap items-center justify-center",
                                    d6.length < 5
                                        ? "lg:w-[50%]"
                                        : d6.length < 7
                                          ? "lg:w-[70%]"
                                          : d6.length < 9
                                            ? "lg:w-[90%]"
                                            : "lg:w-[100%]"
                                )}
                            >
                                {/* make a visual for every dice in the d6 pool */}
                                {d6.map((n, i) => {
                                    return (
                                        <img
                                            // cn("m-4 bg-dark-400 rounded-md grid-cols-6", Dice.length > 12 ? "grid-rows-3" : "grid-rows-2")
                                            className={cn(
                                                "clickable m-4 w-auto",
                                                d6.length < 3 ? "h-12 lg:h-20" : "h-10 lg:h-16"
                                            )}
                                            key={i}
                                            src={diceSVGs[n]}
                                            alt={n.toString()}
                                            onClick={() => {
                                                if (d6.length == 1) return; // can never have less than 1 dice

                                                Setd6(
                                                    (prevDice) => prevDice.filter((_, a) => a !== i) // find and remove the clicked dice
                                                );
                                            }}
                                        ></img>
                                    );
                                })}
                            </div>
                        </div>
                    </Tab.Panel>
                    <Tab.Panel>
                        {/* d12 */}
                        <div className="m-4 mt-0 flex justify-center rounded-md bg-dark-400">
                            <div
                                className={cn(
                                    "flex w-[100%] flex-row flex-wrap items-center justify-center",
                                    d12.length < 5
                                        ? "lg:w-[50%]"
                                        : d12.length < 7
                                          ? "lg:w-[70%]"
                                          : d12.length < 9
                                            ? "lg:w-[90%]"
                                            : "lg:w-[100%]"
                                )}
                            >
                                {/* make a visual for every dice in the d12 pool */}
                                {d12.map((n, i) => {
                                    return (
                                        <div
                                            className={
                                                "clickable group relative m-4 h-16 w-auto items-center justify-center  lg:h-20"
                                            }
                                            key={i}
                                            onClick={() => {
                                                if (d12.length == 1) return;

                                                Setd12((prevDice) => prevDice.filter((_, a) => a !== i));
                                            }}
                                        >
                                            <img
                                                className="w-full object-cover"
                                                src={d12_diceSVGs[Math.min(n, 1)]}
                                                key={i}
                                                alt={(n + 1).toString()}
                                            />
                                            <div className="absolute -top-2 left-0 flex h-full w-full flex-col lg:top-0">
                                                <h1 className="text-xl text-dark lg:text-2xl">
                                                    {n != 0 ? n.toString() : ""}
                                                </h1>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>

            {/* headers are hidden if they arnt the one being looked at */}
            <h1 className={cn("", dnum == 6 ? "" : "hidden")}>
                Total:{" "}
                {d6.reduce((total, dice) => total + dice) != 0 ? d6.reduce((total, dice) => total + dice) + Bonus : "?"}
            </h1>
            <h1 className={cn("", dnum == 12 ? "" : "hidden")}>
                Total:{" "}
                {d12.reduce((total, dice) => total + dice) != 0
                    ? d12.reduce((total, dice) => total + dice) + Bonus
                    : "?"}
            </h1>

            <div className="row m-4 flex flex-wrap items-center justify-around">
                <Button
                    leftIcon={diceRollingIcon}
                    variant={randColor}
                    className="m-2"
                    onClick={() => {
                        if (dnum == 6) {
                            Setd6(new Array(d6.length).fill(0));
                            setTimeout(() => {
                                Setd6(rollDice(d6.length, dnum));
                            }, 500);
                        } else {
                            Setd12(new Array(d12.length).fill(0)); // 12
                            setTimeout(() => {
                                Setd12(rollDice(d12.length, dnum));
                            }, 500);
                        }
                    }}
                >
                    Roll Dice
                </Button>
                <input
                    type="number"
                    placeholder="Bonus"
                    name="Bonus"
                    className="w-[60%] rounded-lg bg-soul-700/10 p-2 active:ring-2 active:ring-light-600 lg:w-auto"
                    value={Bonus}
                    onChange={(e) => SetBonus(Number(e.target.value))}
                ></input>

                <img
                    className="clickable m-2 h-16 w-auto rounded-full bg-dark"
                    src={persDice}
                    alt="Add Dice"
                    onClick={() => {
                        if (dnum == 6)
                            Setd6((prevDice) => [...prevDice, Math.floor(Math.random() * 6)].sort((a, b) => b - a));
                        else Setd12((prevDice) => [...prevDice, Math.floor(Math.random() * 12)].sort((a, b) => b - a));
                    }}
                ></img>
            </div>
        </>
    );
}
