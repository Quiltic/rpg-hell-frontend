import { PinIcon, RemoveIcon } from "../../assets/IconSVGs/heroiconsSVG";
import { Item } from "../../client";
import { formatEffectString, toPillElement } from "../../util/textFormatting";
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
        <table className="border-collapse table-fixed md:table-auto dark:text-light text-dark rounded-md">
            <thead className="dark:bg-dark-400 bg-light-300 font-bold">
                <tr>
                    <th className="hidden md:table-cell">Name</th>
                    <th className="table-cell md:hidden w-1/4be">Item</th>
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
                    
                    let req = null;
                    ["body","mind","soul","arcana","charm","crafting","medicine","nature","thieving"].forEach(stat => {
                        if (item.tags?.toLowerCase().includes(stat)) {
                            req = toPillElement(
                                item.tags?.split(", ")[item.tags?.split(", ").length - 1].replace(" 0", "") ?? "",
                                ","
                            );
                        }
                    });

                    return (
                        <tr key={i}>
                            <td className="font-bold capitalize hidden md:table-cell">
                                {item.name}
                            </td>
                            <td className="table-cell min-w-24 md:hidden capitalize">
                                <span className="font-bold underline">
                                    {item.name}
                                </span>
                                <br />
                                Cost: {item.cost} {item.rarity} {" "}
                                Tags:{" "}
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
                                        className="rounded-md w-6 h-8"
                                        onClick={() => {
                                            moveItem(item);
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
                            <td
                                className="capitalize hidden md:table-cell"
                                align="center"
                            >
                                {item.rarity}
                            </td>
                            <td
                                dangerouslySetInnerHTML={{ __html: ee }}
                                className="whitespace-pre-wrap"
                            ></td>
                            <td className="capitalize hidden md:table-cell">
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
                                        className="rounded-md w-6 h-8"
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
    );
}
