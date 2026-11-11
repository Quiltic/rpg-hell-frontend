import { PinIcon, RemoveIcon } from "../../assets/IconSVGs/heroiconsSVG";
import { Creature } from "../../client";
import CreaturePopup from "../ui/Popups/characterSheetPopup";
import { Button } from "../ui/Button/Button";

type Props = {
    displayedCreatures: Creature[];
    moveCreature?: (creature: Creature) => void;
    moveIsAdd?: boolean;
    showEmpty?: boolean;
};

export default function CreaturesTable({
    displayedCreatures: displayedCreatures,
    moveCreature,
    moveIsAdd = true,
    showEmpty,
}: Props) {
    // const

    return (
        <table className="table-auto border-collapse rounded-md text-light">
            <thead className="bg-dark-400 font-bold">
                <tr>
                    <th>Name</th>
                    <th>Level</th>
                    <th>Race</th>
                    <th>Open</th>
                    {moveCreature != undefined && <th>{moveIsAdd ? "Save" : "Unsave"}</th>}
                </tr>
            </thead>
            <tbody>
                {showEmpty && displayedCreatures.length == 0 && (
                    <tr>
                        <td
                            colSpan={99}
                            className="text-center text-light/50"
                        >
                            Senses check failed... No Creatures found
                        </td>
                    </tr>
                )}
                {displayedCreatures.map((creature, i) => {
                    const race = creature.types;
                    // creature.race?.toString().replaceAll(",", ", ") ?? "";

                    return (
                        <tr key={i}>
                            <td className="font-bold capitalize">{creature.name}</td>
                            <td className="font-bold capitalize">{creature.level}</td>
                            <td
                                className="capitalize"
                                align="center"
                            >
                                {race}
                            </td>
                            <td>
                                <CreaturePopup displayedCreature={creature} />
                            </td>

                            {moveCreature != undefined && (
                                <td>
                                    <Button
                                        variant={moveIsAdd ? "subtle-nature" : "subtle-medicine"}
                                        leftIcon={moveIsAdd ? PinIcon : RemoveIcon}
                                        className="h-8 w-6 rounded-md"
                                        onClick={() => {
                                            moveCreature(creature);
                                        }}
                                    ></Button>
                                </td>
                            )}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
