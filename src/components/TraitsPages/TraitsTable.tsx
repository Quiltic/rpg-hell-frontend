import { Trait } from "../../client";
import { toPill } from "../../util/markdownTools";
// import { highlightKeywords } from "../../util/markdownTools";


import { formatEffectString } from "../../util/textFormatting";


type Props = { displayedTraits: Trait[] };

export default function TraitsTable({ displayedTraits: displayedTraits }: Props) {
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
                    const req = toPill(trait.req?.toString() ?? "", ",","");
                    return (
                        <tr>
                            <td className="font-bold capitalize">
                                {trait.name}
                            </td>
                            <td className="capitalize" dangerouslySetInnerHTML={{ __html: req }}></td>
                            <td>{ trait.dice ? "#".repeat(trait.dice ?? 1) : "P"}</td>
                            <td dangerouslySetInnerHTML={{ __html: ee }}></td>
                        </tr>
                    );
                })}
            </tbody>
            {/* <span className="bg-body-400">asssss</span> */}
            {/* <span className="bg-mind-400">asssss</span> */}
            {/* <span className="bg-soul-400">asssss</span> */}
            {/* <span className="bg-arcana-400">asssss</span> */}
            {/* <span className="bg-charm-400">asssss</span> */}
            {/* <span className="bg-crafting-400">asssss</span> */}
            {/* <span className="bg-nature-400">asssss</span> */}
            {/* <span className="bg-medicine-400">asssss</span> */}
            {/* <span className="bg-thieving-400">asssss</span> */}
        </table>
    );
}
