import { Spell, SpellsService } from "../client";
import { eApiClass } from "../types/ApiClassUnions";
import { useApiClass } from "./useApiClass";

export function useSpells() {
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
        SpellsService.getAllSpells,
        "pinnedSpellNames"
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
