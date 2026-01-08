import { useCallback, useContext, useEffect, useState } from "react";
// import { CancelablePromise, Item, Spell, Trait } from "../client";

import traitJson from "../assets/OfflineJsons/traits.json";
import itemJson from "../assets/OfflineJsons/items.json";
import spellJson from "../assets/OfflineJsons/spells.json";
import creatureJson from "../assets/OfflineJsons/creatures.json";
import { sortArrayByLevel, sortArrayByReqs, sortArrayByTags, sortItems } from "../util/sortingTools";
import { getPersistentPinnedNames } from "../util/tableTools";

import { ApiClassUnion, eApiClass } from "../types/ApiClassUnions";

// function filterBrokenSpells(_list: Spell[]) {
//     return (_list as Spell[])?.filter((l) => {
//         if (l.tags) {
//             return l.tags.includes("BROKEN") || l.tags.includes("broken")
//                 ? ""
//                 : l.tags;
//         }
//     });
// }

// function filterBroken(_list: Trait[] | Item[] | { req: string[] | string }[]) {
//     return _list?.filter((l) => {
//         if (l.req) {
//             return l.req.includes("BROKEN 0") || l.req.includes("broken 0")
//                 ? ""
//                 : l.req;
//         }
//     });
// }

export function useApiClass<T extends ApiClassUnion>(
    c: eApiClass,
    // classServiceGetAllFn: () => CancelablePromise<Record<string, T>>,
    pinnedKey: string,
    changeToRefresh: number = 0
) {
    const [all, setAll] = useState<Array<T>>([]);
    const [pinned, setPinned] = useState<Array<T>>([]);
    const [displayed, setDisplayed] = useState<Array<T>>([]);

    const [hasInitializedPersistedTraits, setHasInitializedPersistedTraits] =
        useState(false);

    // const { auth } = useContext(AuthContext);

    useEffect(() => {
        
        async function getList() {
            let t: T[];

            switch (c) {
                case eApiClass.Trait:
                    // console.log(Object.values(traitJson));
                    t = Object.values(traitJson) as T[];
                    break;

                case eApiClass.Item:
                    t = Object.values(itemJson) as T[];
                    break;

                case eApiClass.Spell:
                    t = Object.values(spellJson) as T[];
                    break;

                default:
                    t = Object.values(creatureJson) as T[];
                    break;
            }
            
           

            // only auth people should be able to see broken stuff
            // if (!auth.isAuthenticated || !auth.admin) {
            //     switch (c) {
            //         case eApiClass.Trait:
            //             t = filterBroken(t as Trait[]) as T[];
            //             break;

            //         case eApiClass.Item:
            //             t = filterBroken(t as Item[]) as T[];
            //             break;

            //         case eApiClass.Spell:
            //             t = filterBrokenSpells(t as Spell[]) as T[];
            //             break;

            //         default:
            //             console.log("CREATURE! WHY? HOW? THIS ISENT REAL YET!");
            //             break;
            //     }
            // }

            // sorting time
            switch (c) {
                case eApiClass.Trait:
                    t = sortArrayByReqs(t);
                    break;

                case eApiClass.Item:
                    t = sortItems(t);
                    break;

                case eApiClass.Spell:
                    t = sortArrayByLevel(t);
                    break;

                default:
                    t = sortArrayByLevel(t);
                    break;
            }


            setAll(t);
            setDisplayed(t);

            const persistentPinned = getPersistentPinnedNames(
                pinnedKey,
                t
            ) as T[];
            if (persistentPinned) {
                setPinned(persistentPinned);
            }
            setHasInitializedPersistedTraits(true);
        }

        getList();
    }, [c, pinnedKey, changeToRefresh]);

    useEffect(() => {
        if (hasInitializedPersistedTraits == false) {
            return;
        }
        const pinnedTraitNames: string[] = pinned.map((s) => {
            return s.name;
        });
        window.localStorage.setItem(pinnedKey, pinnedTraitNames.join(";|;"));
    }, [hasInitializedPersistedTraits, pinnedKey, pinned]);

    const addToPinned = useCallback(
        (s: T) => {
            const newPersist = [...pinned, s];
            if (c == eApiClass.Spell) {
                setPinned(sortArrayByLevel(newPersist));
                return;
            } else if (c == eApiClass.Trait || c == eApiClass.Item) {
                setPinned(sortArrayByReqs(newPersist));
                return;
            }
            setPinned(newPersist);
        },
        [c, pinned]
    );

    const removeFromPinned = useCallback(
        (s: T) => {
            const idx = pinned.indexOf(s);
            const remainingTraits = pinned.slice();
            remainingTraits.splice(idx, 1);
            setPinned(remainingTraits);
        },
        [pinned]
    );

    const filter = useCallback(
        (fn: (t: T) => boolean) => {
            setDisplayed(all.filter(fn));
        },
        [all]
    );

    const resetFilter = useCallback(() => {
        setDisplayed(all);
    }, [all]);

    return {
        all,
        pinned,
        displayed,
        addToPinned,
        removeFromPinned,
        filter,
        resetFilter,
    };
}
