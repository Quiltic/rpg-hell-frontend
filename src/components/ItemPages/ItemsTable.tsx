import { GlossaryTooltipLayer, formatEffectString } from "../../glossary";
import { PinIcon, RemoveIcon } from "../../assets/IconSVGs/heroiconsSVG";
import { Item } from "../../client";
import { toPillElement } from "../../util/textFormatting";
import { Button } from "../ui/Button/Button";

type Props = {
    displayedItems: Item[];
    moveItem?: (spell: Item) => void;
    moveIsAdd?: boolean;
};

export default function ItemsTable({
    displayedItems,
    moveItem,
    moveIsAdd = true,
}: Props) {
    return (
        <GlossaryTooltipLayer>
            <table className="table-fixed border-collapse rounded-md text-light md:table-auto">
                <thead className="bg-dark-400font-bold">
                    <tr>
                        <th className="hidden md:table-cell">Name</th>
                        <th className="w-1/4be table-cell md:hidden">Item</th>
                        <th className="hidden md:table-cell">Req</th>
                        <th className="hidden md:table-cell">Rarity</th>
                        <th>Effect</th>
                        <th className="hidden md:table-cell">Tags</th>
                        <th className="hidden md:table-cell">Cost</th>
                        {/* <th className="hidden md:table-cell">Craft</th> */}
                        {moveItem != undefined && (
                            <th className="hidden md:table-cell">
                                {moveIsAdd ? "Save" : "Unsave"}
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {displayedItems.map((item, i) => {
                        const ee = formatEffectString(item.effect ?? "");

                        // to get stat req from the tags
                        let reqlist = "";
                        item.tags
                            ?.toLowerCase()
                            .split(", ")
                            .forEach((tag) => {
                                if (
                                    "body mind soul arcana charm crafting medicine nature thieving".includes(
                                        tag.substring(0, tag.length - 2)
                                    )
                                ) {
                                    reqlist = reqlist.concat(",", tag);
                                }
                            });
                        const req = toPillElement(
                            reqlist.substring(1).replace(" 0", "") ?? "",
                            ","
                        );

                        return (
                            <tr key={i}>
                                <td className="hidden font-bold capitalize md:table-cell">
                                    {item.name}
                                </td>
                                <td className="table-cell min-w-24 capitalize md:hidden">
                                    <span className="font-bold underline">
                                        {item.name}
                                    </span>
                                    <br />
                                    Cost: {item.cost} {item.rarity} Tags:{" "}
                                    {item.tags?.replace(/ 0/gi, "")}{" "}
                                    {moveItem != undefined && (
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
                                                moveItem(item);
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
                                <td
                                    className="hidden capitalize md:table-cell"
                                    align="center"
                                >
                                    {item.rarity}
                                </td>
                                <td
                                    dangerouslySetInnerHTML={{ __html: ee }}
                                    className="whitespace-pre-wrap"
                                ></td>
                                <td className="hidden capitalize md:table-cell">
                                    {item.tags?.replace(/ 0/gi, "")}
                                </td>
                                <td className="hidden md:table-cell">
                                    {" "}
                                    {item.cost}{" "}
                                </td>
                                {/* <td className="hidden md:table-cell">
                                    {" "}
                                    {item.craft}{" "}
                                </td> */}
                                {moveItem != undefined && (
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
                                                moveItem(item);
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
