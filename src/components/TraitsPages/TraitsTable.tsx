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
        <table className="border-collapse table-auto dark:text-light text-dark rounded-md">
            <thead className="dark:bg-dark-400 bg-light-300 font-bold">
                <tr>
                    <th>Name</th>
                    <th>Requirements</th>
                    <th>Dice</th>
                    <th>Effect</th>
                    {moveTrait != undefined && (
                        <th>{moveIsAdd ? "Save" : "Unsave"}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {displayedTraits.map((trait) => {
                    const ee = formatEffectString(trait.effect ?? "");
                    const req = toPillElement(trait.req?.toString() ?? "", ",");
                    // console.log(req);
                    return (
                        <tr>
                            <td className="font-bold capitalize">
                                {trait.name}
                            </td>
                            <td className="capitalize" align="center">
                                {req}
                            </td>
                            <td>
                                {trait.dice ? "#".repeat(trait.dice ?? 1) : "P"}
                            </td>
                            <td
                                dangerouslySetInnerHTML={{ __html: ee }}
                                className="whitespace-pre-wrap"
                            ></td>
                            {moveTrait != undefined && (
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
    );
}
