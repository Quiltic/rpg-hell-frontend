import { Creature, CreaturesService } from "../client";
import { eApiClass } from "../types/ApiClassUnions";
import { useApiClass } from "./useApiClass";

export function useCreatures() {
    const {
        all: allCreatures,
        pinned: pinnedCreatures,
        displayed: displayedCreatures,
        addToPinned: addToPinnedCreatures,
        removeFromPinned: removeFromPinnedCreatures,
        filter: filterCreatures,
        resetFilter: resetFilterCreatures,
    } = useApiClass<Creature>(
        eApiClass.Creature,
        // CreaturesService.getAllCreatures,
        "pinnedCreatureNames"
    );

    return {
        pinnedCreatures,
        displayedCreatures,
        allCreatures,
        addToPinnedCreatures,
        removeFromPinnedCreatures,
        filterCreatures,
        resetFilterCreatures,
    };
}
