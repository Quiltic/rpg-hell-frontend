import { Item } from "../../client";
import { toPill } from "../../util/markdownTools";
// import { highlightKeywords } from "../../util/markdownTools";

import { formatEffectString, toPillElement } from "../../util/textFormatting";

type Props = { displayedItems: Item[] };

export default function ItemsTable({ displayedItems: displayedItems }: Props) {
    return (
        <table className="border-collapse table-auto dark:text-light text-dark rounded-md">
            <thead className="dark:bg-dark-400 bg-light-300 font-bold">
                <tr>
                    <th>Name</th>
                    <th>Requirements</th>
                    <th>Effect</th>
                    <th>Tags</th>
                    <th>Cost</th>
                    <th>Craft</th>
                </tr>
            </thead>
            <tbody>
                {displayedItems.map((item) => {
                    const ee = formatEffectString(item.effect ?? "");
                    const req = toPillElement(item.req?.toString() ?? "", ",");
                    return (
                        <tr>
                            <td className="font-bold capitalize">
                                {item.name}
                            </td>
                            <td className="capitalize">{req}</td>
                            <td dangerouslySetInnerHTML={{ __html: ee }}></td>
                            <td className="capitalize">
                                {item.tags?.join(", ").replace(/ 0/gi, "")}
                            </td>
                            <td> {item.cost} </td>
                            <td> {item.craft} </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
