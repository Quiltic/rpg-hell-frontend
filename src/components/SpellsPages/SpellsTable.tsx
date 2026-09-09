import { GlossaryTooltipLayer, formatEffectString } from "../../glossary";
import { PinIcon, RemoveIcon } from "../../assets/IconSVGs/heroiconsSVG";
import { Spell } from "../../client";
// import { highlightKeywords } from "../../util/markdownTools";

import { toPillElement } from "../../util/textFormatting";
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
        <GlossaryTooltipLayer>
            <table className="table-fixed border-collapse rounded-md text-light md:table-auto">
                <thead className="bg-dark-700 font-bold">
                    <tr>
                        <th className="hidden md:table-cell">Name</th>
                        <th className="table-cell w-1/4 md:hidden">Spell</th>
                        <th className="hidden md:table-cell">Arch</th>
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
                                <td className="hidden font-bold capitalize md:table-cell">
                                    {spell.name}
                                </td>
                                <td className="table-cell capitalize md:hidden">
                                    <span className="font-bold underline">
                                        {spell.name}
                                    </span>
                                    <br />
                                    Stat: Tags: {spell.tags}{" "}
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
                                            className="h-8 w-6 rounded-md"
                                            onClick={() => {
                                                moveSpell(spell);
                                            }}
                                        ></Button>
                                    )}
                                </td>
                                <td className="hidden md:table-cell">
                                    {toPillElement(
                                        spell.stat +
                                            " " +
                                            spell.level.toString(),
                                        ","
                                    )}
                                </td>

                                <td
                                    dangerouslySetInnerHTML={{ __html: ee }}
                                    className="whitespace-pre-wrap text-left"
                                ></td>
                                <td
                                    className="hidden capitalize md:table-cell"
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
                                            className="h-8 w-6 rounded-md"
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
        </GlossaryTooltipLayer>
    );
}
