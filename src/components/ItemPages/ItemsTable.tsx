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
        <table className="border-collapse table-auto dark:text-light text-dark rounded-md">
            <thead className="dark:bg-dark-400 bg-light-300 font-bold">
                <tr>
                    <th>Name</th>
                    <th>Requirements</th>
                    <th>Effect</th>
                    <th>Tags</th>
                    <th>Cost</th>
                    <th>Craft</th>
                    {moveItem != undefined && (
                        <th>{moveIsAdd ? "Save" : "Unsave"}</th>
                    )}
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
                            <td className="capitalize" align="center">
                                {req}
                            </td>
                            <td
                                dangerouslySetInnerHTML={{ __html: ee }}
                                className="whitespace-pre-wrap"
                            ></td>
                            <td className="capitalize">
                                {item.tags?.join(", ").replace(/ 0/gi, "")}
                            </td>
                            <td> {item.cost} </td>
                            <td> {item.craft} </td>
                            {moveItem != undefined && (
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
