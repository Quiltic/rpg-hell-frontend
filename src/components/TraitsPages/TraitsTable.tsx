import KeywordTooltipLayer from "../ui/KeywordTooltipLayer";
import { PinIcon, RemoveIcon } from "../../assets/IconSVGs/heroiconsSVG";
import { Trait } from "../../client";

import { formatEffectString, toPillElement } from "../../util/textFormatting";
import { Button } from "../ui/Button/Button";

type Props = {
    displayedTraits: Trait[];
    moveTrait?: (trait: Trait) => void;
    moveIsAdd?: boolean;
};

export default function TraitsTable({
    displayedTraits: displayedTraits,
    moveTrait,
    moveIsAdd = true,
}: Props) {
    return (
        // className="hidden md:table-cell"
        <KeywordTooltipLayer>
            <table className="table-fixed border-collapse rounded-md text-light md:table-auto">
                <thead className="bg-dark-400 font-bold">
                    <tr>
                        <th className="hidden md:table-cell">Name</th>
                        <th className="table-cell w-[30%] md:hidden">Trait</th>
                        <th className="hidden md:table-cell">Requirements</th>
                        {/* <th className="hidden md:table-cell">Dice</th> */}
                        <th>Effect</th>
                        {moveTrait != undefined && (
                            <th className="hidden md:table-cell">
                                {moveIsAdd ? "Save" : "Unsave"}
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {displayedTraits.map((trait, i) => {
                        const ee = formatEffectString(trait.effect ?? "");
                        const req = toPillElement(
                            trait.req?.toString().replace(" 0", "") ?? "",
                            ", "
                        );
                        // console.log(req);
                        return (
                            <tr key={i}>
                                <td className="hidden font-bold capitalize md:table-cell">
                                    {trait.name}
                                </td>
                                <td className="min-w-24 table-cell capitalize md:hidden">
                                    {" "}
                                    <span className="font-bold underline">
                                        {trait.name}
                                    </span>{" "}
                                    <br />
                                    {/* Dice:{" "} */}
                                    {/* {trait.dice ? "#".repeat(trait.dice ?? 1) : "P"} */}
                                    <div className="flex flex-col items-center">
                                        {req}
                                    </div>{" "}
                                    {moveTrait != undefined && (
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
                                                moveTrait(trait);
                                            }}
                                        ></Button>
                                    )}
                                </td>
                                <td
                                    className="hidden capitalize md:table-cell"
                                    align="center"
                                >
                                    {req}
                                </td>
                                {/* <td className="hidden md:table-cell">
                                    {trait.dice ? "#".repeat(trait.dice ?? 1) : "P"}
                                </td> */}
                                <td
                                    dangerouslySetInnerHTML={{ __html: ee }}
                                    className="whitespace-pre-wrap text-left"
                                ></td>
                                {moveTrait != undefined && (
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
                                                moveTrait(trait);
                                            }}
                                        ></Button>
                                    </td>
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </KeywordTooltipLayer>
    );
}
