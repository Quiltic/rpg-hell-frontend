import { Trait } from "../../client";
import { toPill } from "../../util/markdownTools";
// import { highlightKeywords } from "../../util/markdownTools";

import { formatEffectString, toPillElement } from "../../util/textFormatting";

type Props = { displayedTraits: Trait[] };

export default function TraitsTable({
    displayedTraits: displayedTraits,
}: Props) {
    return (
        <table className="border-collapse table-auto dark:text-light text-dark rounded-md">
            <thead className="dark:bg-dark-400 bg-light-300 font-bold">
                <tr>
                    <th>Name</th>
                    <th>Requirements</th>
                    <th>Dice</th>
                    <th>Effect</th>
                </tr>
            </thead>
            <tbody>
                {displayedTraits.map((trait) => {
                    const ee = formatEffectString(trait.effect ?? "");
                    const req = toPill(trait.req?.toString() ?? "", ",", "");
                    console.log(req);
                    return (
                        <tr>
                            <td className="font-bold capitalize">
                                {trait.name}
                            </td>
                            <td
                                className="capitalize"
                                dangerouslySetInnerHTML={{ __html: req }}
                            ></td>
                            <td>
                                {trait.dice ? "#".repeat(trait.dice ?? 1) : "P"}
                            </td>
                            <td dangerouslySetInnerHTML={{ __html: ee }}></td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
