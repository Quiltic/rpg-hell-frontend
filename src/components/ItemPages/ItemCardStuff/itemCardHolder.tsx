import { Item } from "../../../client";
import ItemCard from "./itemCard";

type Props = {
    shownItems: Item[];
    moveItem?: (item: Item) => void;
    // header: string;
    // subNotes: string[];
};

export default function ItemCardHolder({
    shownItems: _shownItems,
    moveItem,
}: Props)  {


    return (
        
        <div className="grid grid-cols-1 md:grid-cols-3 -m-4">
            {_shownItems.map((item, i) => {
                if (item.name != 'Error') {
                    return (
                        <ItemCard _item={item} key={i}
                        moveItem={moveItem}
                        />
                    );
                }
            })}
        </div>
                                
    );
}


