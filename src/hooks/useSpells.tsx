import { Spell, SpellsService } from "../client";
import { eApiClass } from "../types/ApiClassUnions";
import { useApiClass } from "./useApiClass";

export function useSpells(changeToRefresh:number = 0) {
    const {
        all: allSpells,
        pinned: pinnedSpells,
        displayed: displayedSpells,
        addToPinned: addToPinnedSpells,
        removeFromPinned: removeFromPinnedSpells,
        filter: filterSpells,
        resetFilter: resetFilterSpells,
    } = useApiClass<Spell>(
        eApiClass.Spell,
        "pinnedSpellNames",
        changeToRefresh
    );

    return {
        allSpells,
        pinnedSpells,
        displayedSpells,
        addToPinnedSpells,
        removeFromPinnedSpells,
        filterSpells,
        resetFilterSpells,
    };
}
