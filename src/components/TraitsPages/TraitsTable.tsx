import { Trait } from "../../client";
import { toPill } from "../../util/markdownTools";
// import { highlightKeywords } from "../../util/markdownTools";


import { formatEffectString } from "../../util/textFormatting";


type Props = { displayedTraits: Trait[] };

export default function TraitsTable({ displayedTraits: displayedTraits }: Props) {
    return (
        <table className="border-collapse table-auto dark:text-light text-dark rounded-md">
            <thead className="dark:bg-dark-700 bg-light-300 font-bold">
                <tr>
                    <th>Name</th>
                    <th>Requirements</th>
                    <th>Dice</th>
                    <th>Effect</th>
                </tr>
            </thead>
            <tbody>
                {displayedTraits.map((Trait) => {
                    const ee = formatEffectString(Trait.effect ?? "");
                    const req = toPill(Trait.req?.toString() ?? "", ",","");
                    return (
                        <tr>
                            <td className="font-bold capitalize">
                                {Trait.name}
                            </td>
                            <td className="capitalize" dangerouslySetInnerHTML={{ __html: req }}></td>
                            <td>{ Trait.dice ? "#".repeat(Trait.dice ?? 1) : "P"}</td>
                            <td dangerouslySetInnerHTML={{ __html: ee }}></td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
