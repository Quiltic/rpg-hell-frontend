import { Item, ItemsService } from "../client";
import { eApiClass } from "../types/ApiClassUnions";
import { useApiClass } from "./useApiClass";

export function useItems() {
    const {
        all: allItems,
        pinned: pinnedItems,
        displayed: displayedItems,
        addToPinned: addToPinnedItems,
        removeFromPinned: removeFromPinnedItems,
        filter: filterItems,
        resetFilter: resetFilterItems,
    } = useApiClass<Item>(
        eApiClass.Item,
        ItemsService.getAllItems,
        "pinnedItemNames"
    );

    return {
        allItems,
        pinnedItems,
        displayedItems,
        addToPinnedItems,
        removeFromPinnedItems,
        filterItems,
        resetFilterItems,
    };
}
