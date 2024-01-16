import { PinIcon, RemoveIcon } from "../../assets/IconSVGs/heroiconsSVG";
import { Spell } from "../../client";
// import { highlightKeywords } from "../../util/markdownTools";

import { formatEffectString } from "../../util/textFormatting";
import { Button } from "../ui/Button/Button";

type Props = {
    displayedSpells: Spell[];
    moveSpell?: (spell: Spell) => void;
    moveIsAdd?: boolean;
};

export default function SpellsTable({
    displayedSpells,
    moveSpell,
    moveIsAdd = true,
}: Props) {
    return (
        <table className="border-collapse table-auto dark:text-light text-dark rounded-md">
            <thead className="dark:bg-dark-700 bg-light-300 font-bold">
                <tr>
                    <th>Name</th>
                    <th>Strain</th>
                    <th>Dice</th>
                    <th>Effect</th>
                    <th>Tags</th>
                    {moveSpell != undefined && (
                        <th>{moveIsAdd ? "Save" : "Unsave"}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {displayedSpells.map((spell) => {
                    const ee = formatEffectString(spell.effect ?? "");
                    return (
                        <tr>
                            <td className="font-bold capitalize">
                                {spell.name}
                            </td>
                            <td>{spell.level}</td>
                            <td>{"#".repeat(spell.dice ?? 1)}</td>

                            <td
                                dangerouslySetInnerHTML={{ __html: ee }}
                                className="whitespace-pre-wrap"
                            ></td>
                            <td className="capitalize" align="center">
                                {spell.tags?.join(", ")}
                            </td>
                            {moveSpell != undefined && (
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
                                            moveSpell(spell);
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
