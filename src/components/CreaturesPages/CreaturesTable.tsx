import { PinIcon, RemoveIcon } from "../../assets/IconSVGs/heroiconsSVG";
import { Spell, Trait, Item, Creature } from "../../client";
import { getNames } from "../../util/tableTools";


import { formatEffectString, toPillElement } from "../../util/textFormatting";
import CreaturePopup from "./characterSheetPopup";
import { Button } from "../ui/Button/Button";

type Props = {
    displayedCreatures: Creature[];
    moveCreature?: (creature: Creature) => void;
    moveIsAdd?: boolean;
    traitsList: Array<Trait>;
    spellsList: Array<Spell>;
    itemsList: Array<Item>;
};


export default function CreaturesTable({
    displayedCreatures: displayedCreatures,
    moveCreature,
    moveIsAdd = true,
    traitsList: traitsList,
    spellsList: spellsList,
    itemsList: itemsList
}: Props) {
    // const 

    return (
        <table className="border-collapse table-auto dark:text-light text-dark rounded-md">
            <thead className="dark:bg-dark-400 bg-light-300 font-bold">
                <tr>
                    <th>Name</th>
                    <th>Level</th>
                    <th>Race</th>
                    <th>Open</th>
                    {moveCreature != undefined && (
                        <th>{moveIsAdd ? "Save" : "Unsave"}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {displayedCreatures.map((creature) => {
                    const race = toPillElement(creature.race?.toString() ?? "", ";|;");
                    
                    return (
                        <tr>
                            <td className="font-bold capitalize">
                                {creature.name}
                            </td>
                            <td className="font-bold capitalize">
                                {creature.level}
                            </td>
                            <td className="capitalize" align="center">
                                {race}
                            </td>
                            <td>
                                <CreaturePopup
                                    displayedCreature={creature}
                                    traitsList={traitsList}
                                    spellsList={spellsList}
                                    itemsList={itemsList}
                                />
                            </td>
                            
                            {moveCreature != undefined && (
                                <td>
                                    <Button
                                        variant={
                                            moveIsAdd
                                                ? "subtle-nature"
                                                : "subtle-medicine"
                                        }
                                        leftIcon={
                                            moveIsAdd ? PinIcon : RemoveIcon
                                        }
                                        className="rounded-md w-6 h-8"
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
