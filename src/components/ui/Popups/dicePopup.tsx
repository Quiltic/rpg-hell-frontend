import Popup from "./Popup";
import DiceRoller from "../DiceRoller";

type Props = {
    startingDice: number[];
    startingBonus: number;
    isOpen: boolean;
    setIsOpen: (s: boolean) => void;
    setDice: (s: number[]) => void;
    setBonus: (s: number) => void;
};

export default function DicePopup({
    startingDice: Dice = [1, 1],
    startingBonus: Bonus = 0,
    isOpen: isOpen,
    setIsOpen: setIsOpen,
    setDice: SetDice,
    setBonus: SetBonus,
}: Props) {
    return (
        <>
            <Popup
                displayedContentName="Roll The Dice!"
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                isSmol={true}
                displayedContent={
                    <>
                        <DiceRoller
                            startingDice={Dice}
                            startingBonus={Bonus}
                            isOpen={isOpen}
                            setDice={SetDice}
                            setBonus={SetBonus}
                        />
                    </>
                }
            />
        </>
    );
}
