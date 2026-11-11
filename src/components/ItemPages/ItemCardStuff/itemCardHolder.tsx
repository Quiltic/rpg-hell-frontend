import { Item } from "../../../client";
import ItemCard from "./itemCard";

type Props = {
    shownItems: Item[];
    moveItem?: (item: Item) => void;
    // header: string;
    // subNotes: string[];
};

export default function ItemCardHolder({ shownItems: _shownItems, moveItem }: Props) {
    if (_shownItems.length == 0)
        return <p className="text-center text-light/50">Theres nothing here... No Items found</p>;

    return (
        <div className="-m-4 grid grid-cols-1 print:grid-cols-2 md:grid-cols-3">
            {_shownItems.map((item, i) => {
                if (item.name != "Error") {
                    return (
                        <ItemCard
                            _item={item}
                            key={i}
                            moveItem={moveItem}
                        />
                    );
                }
            })}
        </div>
    );
}
