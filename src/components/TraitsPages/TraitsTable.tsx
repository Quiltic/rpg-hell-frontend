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
        <table className="border-collapse table-fixed md:table-auto dark:text-light text-dark rounded-md">
            <thead className="dark:bg-dark-400 bg-light-300 font-bold">
                <tr>
                    <th className="hidden md:table-cell">Name</th>
                    <th className="table-cell md:hidden w-[30%]">Trait</th>
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
                        ","
                    );
                    // console.log(req);
                    return (
                        <tr key={i}>
                            <td className="font-bold capitalize hidden md:table-cell">
                                {trait.name}
                            </td>
                            <td className="table-cell min-w-24 md:hidden capitalize">
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
                                        className="rounded-md w-6 h-8"
                                        onClick={() => {
                                            moveTrait(trait);
                                        }}
                                    ></Button>
                                )}
                            </td>
                            <td
                                className="capitalize hidden md:table-cell"
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
