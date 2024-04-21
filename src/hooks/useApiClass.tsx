import { useCallback, useContext, useEffect, useState } from "react";
import { CancelablePromise, Item, Spell, Trait } from "../client";

import json from "../assets/OfflineJsons/traits.json";
import { sortArrayByLevel, sortArrayByReqs } from "../util/sortingTools";
import { getPersistentPinnedNames } from "../util/tableTools";
import { AuthContext } from "../context/AuthProvider";

import { ApiClassUnion, eApiClass } from "../types/ApiClassUnions";

function filterBrokenSpells(_list: Spell[]) {
    return (_list as Spell[])?.filter((l) => {
        if (l.tags) {
            return l.tags.includes("BROKEN") || l.tags.includes("broken")
                ? ""
                : l.tags;
        }
    });
}

function filterBroken(_list: Trait[] | Item[] | { req: string[] | string }[]) {
    return _list?.filter((l) => {
        if (l.req) {
            return l.req.includes("BROKEN 0") || l.req.includes("broken 0")
                ? ""
                : l.req;
        }
    });
}

export function useApiClass<T extends ApiClassUnion>(
    c: eApiClass,
    classServiceGetAllFn: () => CancelablePromise<Record<string, T>>,
    pinnedKey: string
) {
    const [all, setAll] = useState<Array<T>>([]);
    const [pinned, setPinned] = useState<Array<T>>([]);
    const [displayed, setDisplayed] = useState<Array<T>>([]);

    const [hasInitializedPersistedTraits, setHasInitializedPersistedTraits] =
        useState(false);

    const { auth } = useContext(AuthContext);

    useEffect(() => {
        async function getTraits() {
            let t: T[];
            try {
                if (window.localStorage.getItem("useBackup") == "true") {
                    throw new Error("Use Backup");
                }
                const results = await classServiceGetAllFn();
                t = Object.values(results);
            } catch (e) {
                if (e instanceof Error && e.message == "Network Error") {
                    console.log(
                        "WARNING YOU ARE OFFLINE! A backup is being used, however it is not up to date and may have incorrect data."
                    );
                    t = Object.values(json) as T[];
                } else {
                    if (e instanceof Error) {
                        console.log(e.message);
                    }
                    return;
                }
            }

            if (c == eApiClass.Trait) {
                if (!auth.isAuthenticated || !auth.admin) {
                    t = filterBroken(t as Trait[]) as T[]; // 😢
                }
            } else if (c == eApiClass.Item) {
                if (!auth.isAuthenticated || !auth.admin) {
                    t = filterBroken(t as Item[]) as T[]; // 😢
                }
            }

            if (c == eApiClass.Spell) {
                t = filterBrokenSpells(t as Spell[]) as T[]; // 😢
                t = sortArrayByLevel(t);
            } else {
                t = sortArrayByReqs(t);
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

        getTraits();
    }, [auth, c, classServiceGetAllFn, pinnedKey]);

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
            setPinned(sortArrayByReqs(newPersist));
        },
        [pinned]
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

// export function useApiClass2(
//     c: eApiClass,
//     classServiceGetAllFn: () => unknown,
//     pinnedKey: string
// ) {
//     const [all, setAll] = useState<Array<ApiClassUnion>>([]);
//     const [pinned, setPinned] = useState<Array<ApiClassUnion>>([]);
//     const [displayed, setDisplayed] = useState<Array<ApiClassUnion>>([]);

//     const [hasInitializedPersistedTraits, setHasInitializedPersistedTraits] =
//         useState(false);

//     const { auth } = useContext(AuthContext);

//     useEffect(() => {
//         async function getTraits() {
//             let t: ApiClassUnion[];
//             try {
//                 if (window.localStorage.getItem("useBackup") == "true") {
//                     throw new Error("Use Backup");
//                 }
//                 const results = await classServiceGetAllFn();
//                 // SWITCH HERE
//                 t = Object.values(results as ApiClassUnion[]);
//             } catch (e) {
//                 if (e instanceof Error && e.message == "Network Error") {
//                     console.log(
//                         "WARNING YOU ARE OFFLINE! A backup is being used, however it is not up to date and may have incorrect data."
//                     );
//                     t = Object.values(json);
//                 } else {
//                     if (e instanceof Error) {
//                         console.log(e.message);
//                     }
//                     return;
//                 }
//             }

//             if (c == eApiClass.Trait) {
//                 if (!auth.isAuthenticated || !auth.admin) {
//                     t = filterBroken(t as Record<string, Trait>);
//                 }
//             } else if (c == eApiClass.Item) {
//                 if (!auth.isAuthenticated || !auth.admin) {
//                     t = filterBroken(t as Item[]);
//                 }
//             }

//             if (c == eApiClass.Spell) {
//                 t = sortArrayByLevel(t);
//             } else {
//                 t = sortArrayByReqs(t);
//             }

//             setAll(t);
//             setDisplayed(t);

//             const persistentPinned = getPersistentPinnedNames(pinnedKey, t);
//             if (persistentPinned) {
//                 setPinned(persistentPinned);
//             }
//             setHasInitializedPersistedTraits(true);
//         }

//         getTraits();
//     }, [auth, c, classServiceGetAllFn, pinnedKey]);

//     useEffect(() => {
//         if (hasInitializedPersistedTraits == false) {
//             return;
//         }
//         const pinnedTraitNames: string[] = pinned.map((s) => {
//             return s.name;
//         });
//         window.localStorage.setItem(pinnedKey, pinnedTraitNames.join(";|;"));
//     }, [hasInitializedPersistedTraits, pinnedKey, pinned]);

//     function addToPinned(s: ApiClassUnion) {
//         const newPersist = [...pinned, s];
//         setPinned(sortArrayByReqs(newPersist));
//     }

//     function removeFromPinned(s: ApiClassUnion) {
//         const idx = pinned.indexOf(s);
//         const remainingTraits = pinned.slice();
//         remainingTraits.splice(idx, 1);
//         setPinned(remainingTraits);
//     }

//     function filter(fn: (t: ApiClassUnion) => boolean) {
//         setDisplayed(all.filter(fn));
//     }

//     function resetFilter() {
//         setDisplayed(all);
//     }

//     return {
//         pinned,
//         displayed,
//         all,
//         addToPinned,
//         removeFromPinned,
//         filter,
//         resetFilter,
//     };
// }
