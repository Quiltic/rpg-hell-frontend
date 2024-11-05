import { Trait, TraitsService } from "../client";
import { eApiClass } from "../types/ApiClassUnions";
import { useApiClass } from "./useApiClass";

export function useTraits(changeToRefresh:number = 0) {
    const {
        all: allTraits,
        pinned: pinnedTraits,
        displayed: displayedTraits,
        addToPinned: addToPinnedTraits,
        removeFromPinned: removeFromPinnedTraits,
        filter: filterTraits,
        resetFilter: resetFilterTraits,
    } = useApiClass<Trait>(
        eApiClass.Trait,
        TraitsService.getAllTraits,
        "pinnedTraitNames",
        changeToRefresh
    );

    return {
        allTraits,
        pinnedTraits,
        displayedTraits,
        addToPinnedTraits,
        removeFromPinnedTraits,
        filterTraits,
        resetFilterTraits,
    };
}

// export function useTraits() {
//     const { TraitsService } = useApi();

//     const [allTraits, setAllTraits] = useState<Array<Trait>>([]);
//     const [pinnedTraits, setPinnedTraits] = useState<Array<Trait>>([]);
//     const [displayedTraits, setDisplayedTraits] = useState<Array<Trait>>([]);

//     const [hasInitializedPersistedTraits, setHasInitializedPersistedTraits] =
//         useState(false);

//     const { auth } = useContext(AuthContext);

//     useEffect(() => {
//         async function getTraits() {
//             let traits: Trait[];
//             try {
//                 if (window.localStorage.getItem("useBackup") == "true") {
//                     throw new Error("Use Backup");
//                 }
//                 const traitsRaw = await TraitsService.getAllTraits();
//                 traits = Object.values(traitsRaw);
//             } catch (e) {
//                 if (e instanceof Error && e.message == "Network Error") {
//                     console.log(
//                         "WARNING YOU ARE OFFLINE! A backup is being used, however it is not up to date and may have incorrect data."
//                     );
//                     traits = Object.values(json);
//                 } else {
//                     if (e instanceof Error) {
//                         console.log(e.message);
//                     }
//                     return;
//                 }
//             }

//             if (!auth.isAuthenticated || !auth.admin) {
//                 traits = filterBROKENandMONSTERreq(traits);
//                 // IterativeTraitLevels.push('MONSTER');
//             }

//             traits = sortArrayByReqs(traits);

//             setAllTraits(traits);
//             setDisplayedTraits(traits);

//             const persistentPinnedTraits = getPersistentPinnedNames(
//                 "pinnedTraitNames",
//                 traits
//             ) as Trait[];
//             if (persistentPinnedTraits) {
//                 setPinnedTraits(persistentPinnedTraits);
//             }
//             setHasInitializedPersistedTraits(true);
//         }

//         getTraits();
//     }, [TraitsService, auth]);

//     useEffect(() => {
//         if (hasInitializedPersistedTraits == false) {
//             return;
//         }
//         const pinnedTraitNames: string[] = pinnedTraits.map((s) => {
//             return s.name;
//         });
//         window.localStorage.setItem(
//             "pinnedTraitNames",
//             pinnedTraitNames.join(";|;")
//         );
//     }, [hasInitializedPersistedTraits, pinnedTraits]);

//     function addToPinnedTraits(s: Trait) {
//         const newPersist = [...pinnedTraits, s];
//         setPinnedTraits(sortArrayByReqs(newPersist));
//         // updatePersistantPinnedTraits(newPersist);
//     }

//     function removeFromPinnedTraits(s: Trait) {
//         const idx = pinnedTraits.indexOf(s);
//         const remainingTraits = pinnedTraits.slice();
//         remainingTraits.splice(idx, 1);
//         setPinnedTraits(remainingTraits);
//         // updatePersistantPinnedTraits(remainingTraits);
//     }

//     function filterTraits(fn: (t: Trait) => boolean) {
//         setDisplayedTraits(allTraits.filter(fn));
//     }

//     function resetFilter() {
//         setDisplayedTraits(allTraits);
//     }

//     return {
//         pinnedTraits,
//         displayedTraits,
//         allTraits,
//         addToPinnedTraits,
//         removeFromPinnedTraits,
//         filterTraits,
//         resetFilter,
//     };
// }
