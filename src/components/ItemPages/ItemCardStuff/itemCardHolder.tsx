import { Item } from "../../../client";
import ItemCard from "./itemCard";

type Props = {
    shownItems: Item[];
    moveItem?: (item: Item) => void;
    showEmpty?: boolean;
    // header: string;
    // subNotes: string[];
};

export default function ItemCardHolder({ shownItems, moveItem, showEmpty }: Props) {
    const _shownItems = shownItems.filter((item) => item.name != "Error");
    if (showEmpty && _shownItems.length == 0)
        return <p className="text-center text-light/50">Theres nothing here... No Items found</p>;

    return (
        <div className="-m-4 grid grid-cols-1 print:grid-cols-2 md:grid-cols-3">
            {_shownItems.map((item, i) => (
                <ItemCard
                    _item={item}
                    key={i}
                    moveItem={moveItem}
                />
            ))}
        </div>
    );
}
