

import { Button } from "../Button/Button";
import { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import { cn } from "../../../styling/utilites";
import Popup from "./Popup";

import d12 from "../../../assets/IconSVGs/dice/d12.png";
import d12_rolling from "../../../assets/IconSVGs/dice/d12-dice-roll.gif";

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



const diceSVGs = [
    dice1,
    dice2,
    dice3,
    dice4,
    dice5,
    dice6,
    rolling
]
const d12_diceSVGs = [
    d12_rolling,
    d12
]


const colors = ["body","mind","soul","nature"];


function rollDice(amount: number, mult: number = 6) {

    let dice = [];

    for (let a = 0; a < amount; a++) {
        const randomInRange = Math.floor(Math.random() * mult); // we dont +1 because then it goes 0-5 which matches up to the array
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
    setDice: (s: number[]) => void;
    setBonus: (s: number) => void;
};


export default function DicePopup({
    startingDice: startingDice = [0,0],
    startingBonus: Bonus = 0,
    isOpen: isOpen,
    setIsOpen: setIsOpen,
    // setDice: SetDice,
    setBonus: SetBonus,
    }: Props) {

    const [Dice, SetDice] = useState<number[]>(startingDice);
    // const [Bonus, SetBonus] = useState(startingBonus);
    
    // const [isOpen, setIsOpen] = useState(startOpen);
    const [randColor, setRandColor] = useState("body");
    const [dnum, setDnum] = useState(6);

    useEffect(() => {
        if (isOpen == true)
            setRandColor(colors[Math.floor(Math.random() * colors.length)]);
    }, [isOpen]);

    return (
        <>
            
            <Popup displayedContentName="Roll The Dice!" isOpen={isOpen} setIsOpen={setIsOpen} isSmol={true} displayedContent={
                <>
                <Tab.Group as="div" className="w-full "
                    onChange={(index) => {
                        setDnum(index*6+6)
                        SetDice(new Array(Dice.length).fill(0));
                        // console.log(index)
                    }}
                >
                    <div className="md:flex-column w-full align-middle md:flex md:justify-between mb-0 m-6">
                        <Tab.List className="flex flex-wrap gap-2">
                            <Tab className={({ selected }) =>
                                    cn("w-10 rounded-t-md px-2 py-1 ring-aabase hover:font-bold",
                                        selected ? "ring-2 bg-body-400 dark:bg-dark-400" : "bg-body-700/20 dark:bg-dark-600"
                                    )}>
                                <img className="w-full object-cover"
                                    src={persDice}
                                    alt={"d6"}
                                />
                            </Tab>
                            <Tab
                                className={({ selected }) =>
                                    cn("w-10 rounded-t-md bg-body-700/20 px-2 py-1 ring-aabase hover:font-bold dark:bg-dark-600",
                                        selected ? "ring-2 bg-body-400 dark:bg-dark-400" : "bg-body-700/20 dark:bg-dark-600")
                                }
                            >
                                <img className="w-full object-cover"
                                    src={d12}
                                    alt={"d12"}
                                />
                            </Tab>
                        </Tab.List>
                    </div>
                    <Tab.Panels>
                        <Tab.Panel>
                            <div className="flex mt-0 m-4 bg-dark-400 rounded-md justify-center">
                            <div className={cn("flex flex-row items-center flex-wrap justify-center w-[100%]",Dice.length < 5 ? "lg:w-[50%]":(Dice.length < 7 ? "lg:w-[70%]":(Dice.length < 9 ? "lg:w-[90%]":"lg:w-[100%]")))}>
                                {Dice.map((n,i) => {
                                    return (
                                        <img
                                        // cn("m-4 bg-dark-400 rounded-md grid-cols-6", Dice.length > 12 ? "grid-rows-3" : "grid-rows-2")
                                            className={cn("w-auto m-4",Dice.length < 3 ? "h-12 lg:h-20":"h-10 lg:h-16")}
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
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="flex mt-0 m-4 bg-dark-400 rounded-md justify-center">
                            <div className={cn("flex flex-row items-center flex-wrap justify-center w-[100%]",Dice.length < 5 ? "lg:w-[50%]":(Dice.length < 7 ? "lg:w-[70%]":(Dice.length < 9 ? "lg:w-[90%]":"lg:w-[100%]")))}>
                                {Dice.map((n,i) => {
                                    return (
                                        <div className={"group relative justify-center items-center w-auto m-4 h-16 lg:h-20"} 
                                            onClick={() => {

                                                    if (Dice.length == 1) return

                                                    SetDice(prevDice => 
                                                        prevDice.filter((_, a) => a !== i)
                                                    );
                                                    
                                                }}>

                                            <img className="w-full object-cover"
                                                src={d12_diceSVGs[Math.min(n+1,1)]}
                                                key={i}
                                                alt={(n+1).toString()}
                                            />
                                            <div className="absolute -top-2 lg:top-0 left-0 w-full flex flex-col h-full">
                                                <h1 className="text-xl lg:text-2xl text-dark" >{n+1 ? (n+1).toString(): ""}</h1>
                                            </div>
                                        </div>
                                    );
                                })}

                            </div>
                            </div>
                            
                        </Tab.Panel>
                        
                    </Tab.Panels>
                </Tab.Group>

                    

                    <h1>Total: {Dice.reduce((total, dice) => total + dice+1)+1 != Dice.length*7 ? Dice.reduce((total, dice) => total + dice+1)+1+Bonus : "?"}</h1> 

                    <div className="flex row items-center justify-around m-4 flex-wrap">

                        <Button leftIcon={diceRollingIcon} 
                        variant={randColor}
                        className="m-2"
                        onClick={() => {
                            if (dnum == 6){
                                SetDice(new Array(Dice.length).fill(6)); // 6
                            } else {
                                SetDice(new Array(Dice.length).fill(-1)); // 12
                            }

                            setTimeout(() => {
                                SetDice(rollDice(Dice.length,dnum))
                            }, 500);
                            }
                        }
                        >
                            Roll Dice
                        </Button>
                        <input
                            placeholder="Bonus"
                            name="Bonus"
                            className="w-[60%] lg:w-auto rounded-lg bg-body-700/40 p-2 active:ring-2 active:ring-dark-700 dark:bg-soul-700/10 dark:active:ring-light-600"
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
                </>
            }/>
        </>
    );
}
