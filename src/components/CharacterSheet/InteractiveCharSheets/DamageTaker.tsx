import { useState } from "react";
import { playerCharacterType } from "../../../types/playerCharacterType";
import { Button } from "../../ui/Button/Button";

type Props = {
    player: playerCharacterType;
    setPlayer: (player: playerCharacterType) => void;
    // isOpen:boolean;
    // setIsOpen:() => void;
};

export default function DamageTaker({ player: player, setPlayer: setPlayer }: Props) {
    const [damage, setDamage] = useState(0);
    const [tempShield, setTempShield] = useState(0);

    // useEffect(() => {
    //     filterItems((item) => {
    //         return item.tier <= 1;
    //     });
    //     // console.log(displayedItems);
    // }, [allItems]);
    // console.log(player.stats.mind);

    return (
        <div className="m-2 rounded-md bg-dark-400 p-2">
            <div className="m-2 flex flex-row items-center justify-center rounded-md bg-dark-300 p-2">
                {(player.calculatedStats.shielding != 0 || tempShield != 0) && (
                    <div className="m-1 ml-2 flex rounded-lg bg-crafting p-1">{player.calculatedStats.shielding}</div>
                )}

                <div className="m-1 flex rounded-lg bg-medicine p-1">
                    HP: {player.calculatedStats.curHp} / {player.calculatedStats.maxHp}
                </div>
            </div>

            <div className="m-2 flex flex-row items-center justify-center rounded-md bg-dark-300 p-2">
                Amount
                <input
                    type="number"
                    className="ml-4 mt-1 h-9 w-16 justify-end rounded-lg border-2 border-solid border-dark-400 bg-dark-300 p-2"
                    value={damage}
                    min="0"
                    onChange={(e) => setDamage(parseFloat(e.target.value))}
                />
            </div>

            <div className="m-2 flex flex-row items-center justify-center rounded-md bg-dark-300 p-2">
                <Button
                    variant={"link-nature"}
                    className="m-2 border-2 border-solid border-nature"
                    disabled={damage == 0}
                    onClick={() => {
                        setPlayer({
                            ...player,
                            calculatedStats: {
                                ...player.calculatedStats,
                                curHp: Math.min(
                                    Math.max(
                                        player.calculatedStats.curHp,
                                        0 // heal from 0
                                    ) + damage,
                                    player.calculatedStats.maxHp // cant have more HP than max
                                ),
                            },
                        });
                    }}
                >
                    Heal
                </Button>
                <Button
                    variant={"link-medicine"}
                    className="m-2 border-2 border-solid border-medicine"
                    disabled={damage == 0}
                    onClick={() => {
                        setPlayer({
                            ...player,
                            calculatedStats: {
                                ...player.calculatedStats,
                                curHp:
                                    player.calculatedStats.curHp -
                                    Math.max(damage - player.calculatedStats.shielding - tempShield, 1), // min dmg of 1
                            },
                        });
                    }}
                >
                    Damage
                </Button>
            </div>
        </div>
    );
}
