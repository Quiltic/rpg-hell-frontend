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
        <table className="border-collapse table-fixed md:table-auto dark:text-light text-dark rounded-md">
            <thead className="dark:bg-dark-700 bg-light-300 font-bold">
                <tr>
                    <th className="hidden md:table-cell">Name</th>
                    <th className="table-cell md:hidden w-1/4">Spell</th>
                    <th className="hidden md:table-cell">Strain</th>
                    <th className="hidden md:table-cell">Dice</th>
                    <th>Effect</th>
                    <th className="hidden md:table-cell">Tags</th>
                    {moveSpell != undefined && (
                        <th className="hidden md:table-cell">
                            {moveIsAdd ? "Save" : "Unsave"}
                        </th>
                    )}
                </tr>
            </thead>
            <tbody>
                {displayedSpells.map((spell, i) => {
                    const ee = formatEffectString(spell.effect ?? "");
                    return (
                        <tr key={i}>
                            <td className="font-bold capitalize hidden md:table-cell">
                                {spell.name}
                            </td>
                            <td className="table-cell md:hidden capitalize">
                                <span className="font-bold underline">
                                    {spell.name}
                                </span>
                                <br />
                                Strain: {spell.level} Dice:{" "}
                                {"#".repeat(spell.dice ?? 1)} Tags:{" "}
                                {spell.tags?.join(", ")}{" "}
                                {moveSpell != undefined && (
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
                                )}
                            </td>
                            <td className="hidden md:table-cell">
                                {spell.level}
                            </td>
                            <td className="hidden md:table-cell">
                                {"#".repeat(spell.dice ?? 1)}
                            </td>

                            <td
                                dangerouslySetInnerHTML={{ __html: ee }}
                                className="whitespace-pre-wrap text-left"
                            ></td>
                            <td
                                className="capitalize hidden md:table-cell"
                                align="center"
                            >
                                {spell.tags?.join(", ")}
                            </td>
                            {moveSpell != undefined && (
                                <td className="hidden md:table-cell">
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
