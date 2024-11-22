import { Item, ItemsService } from "../client";
import { eApiClass } from "../types/ApiClassUnions";
import { useApiClass } from "./useApiClass";

export function useItems(changeToRefresh:number = 0) {
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
        "pinnedItemNames",
        changeToRefresh
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
