import { PinIcon, RemoveIcon } from "../../assets/IconSVGs/heroiconsSVG";
import { Spell } from "../../client";
// import { highlightKeywords } from "../../util/markdownTools";

import { formatEffectString, toPillElement } from "../../util/textFormatting";
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
        <table className="border-collapse table-fixed md:table-auto text-light rounded-md">
            <thead className="bg-dark-700 font-bold">
                <tr>
                    <th className="hidden md:table-cell">Name</th>
                    <th className="table-cell md:hidden w-1/4">Spell</th>
                    <th className="hidden md:table-cell">Level</th>
                    <th className="hidden md:table-cell">Stat</th>
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
                                Level: {spell.level} Stat:{" "} Tags:{" "}
                                {spell.tags}{" "}
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
                                {toPillElement(spell.stat+" "+(1+Math.floor((spell.level-1)/2)).toString(), ",")}
                            </td>

                            <td
                                dangerouslySetInnerHTML={{ __html: ee }}
                                className="whitespace-pre-wrap text-left"
                            ></td>
                            <td
                                className="capitalize hidden md:table-cell"
                                align="center"
                            >
                                {spell.tags}
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
