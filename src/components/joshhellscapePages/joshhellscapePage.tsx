import { useState, useEffect } from "react";
import { Spell, Trait, Item, Creature } from "../../client";

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";

import useApi from "../../hooks/useApi";

import { Tab, Disclosure } from "@headlessui/react";

import CreatureTable from "./CreaturesTable";

import jsonTraits from "../../assets/OfflineJsons/Traits.json";
import jsonSpells from "../../assets/OfflineJsons/Spells.json";
import jsonItems from "../../assets/OfflineJsons/Items.json";
import jsonCreatures from "../../assets/OfflineJsons/Creatures.json";
import uh from "./uh.json";



import { Button } from "../ui/Button/Button";
import { sortArrayByLevel, sortArrayByReqs } from "../../util/sortingTools";

import { ChevronIcon } from "../../assets/IconSVGs/heroiconsSVG";
import { toPillElement } from "../../util/textFormatting";
import { getNames } from "../../util/tableTools";
import CreaturePopup from "../CreaturesPages/characterSheetPopup";
import CreatureSheet from "../CreaturesPages/characterSheet";

function getTabWidth(lengthOfName: number) {
    return lengthOfName < 5 ? "w-12" : lengthOfName < 7 ? "w-16" : lengthOfName < 12 ? "w-24" : "w-32";
}


export default function JoshhellscapePage() {
    // const { TraitsService } = useApi();

    const [searchValue, setSearchValue] = useState("");
    const [allCreatures, setAllCreatures] = useState<Array<Creature>>([]);
    const [pinnedCreatures, setPinnedCreatures] = useState<Array<Creature>>([]);
    
    const [displayedCreatures, setDisplayedCreatures] = useState<Array<Creature>>([]);
    const [clearButtonVisibility, setClearButtonVisibility] =
        useState("hidden");

    const { SpellsService, TraitsService, ItemsService } = useApi();

    const [spells, setSpells] = useState<Array<Spell>>([]);
    const [traits, setTraits] = useState<Array<Trait>>([]);
    const [items, setItems] = useState<Array<Item>>([]);


    useEffect(() => {
        async function getCreatures() {
            let creatures: Creature[];
            // try {
            //     const spellsRaw = await SpellsService.getAllSpells();

            //     spells = Object.values(spellsRaw);
            // } catch (e) {
            //     if (e instanceof Error && e.message == "Network Error") {
            //         console.log(
            //             "WARNING YOU ARE OFFLINE! A backup is being used, however it is not up to date and may have incorect data."
            //         );
            creatures = Object.values(jsonCreatures);
            //     } else {
            //         return;
            //     }
            // }

            creatures = sortArrayByLevel(creatures);
            setAllCreatures(creatures);

        }

        getCreatures();
    }, []);

    useEffect(() => {
        async function getSpells() {
            let spells: Spell[];
            try {
                const spellsRaw = await SpellsService.getAllSpells();

                spells = Object.values(spellsRaw);
            } catch (e) {
                if (e instanceof Error && e.message == "Network Error") {
                    console.log(
                        "WARNING YOU ARE OFFLINE! A backup is being used, however it is not up to date and may have incorect data."
                    );
                    spells = Object.values(jsonSpells);
                } else {
                    return;
                }
            }

            spells = sortArrayByLevel(spells);
            setSpells(spells);

        }

        getSpells();
    }, [SpellsService]);

    useEffect(() => {
        async function getTraits() {
            let traits: Trait[];
            try {
                const traitsRaw = await TraitsService.getAllTraits();
                traits = Object.values(traitsRaw);
            } catch (e) {
                if (e instanceof Error && e.message == "Network Error") {
                    console.log(
                        "WARNING YOU ARE OFFLINE! A backup is being used, however it is not up to date and may have incorect data."
                    );
                    traits = Object.values(jsonTraits);
                } else {
                    return;
                }
            }
            traits = sortArrayByReqs(traits);
            setTraits(traits);
        }
        
        getTraits();
    }, [TraitsService]);

    useEffect(() => {
        async function getItems() {
            let items: Item[];
            try {
                const itemsRaw = await ItemsService.getAllItems();
                items = Object.values(itemsRaw);
            } catch (e) {
                if (e instanceof Error && e.message == "Network Error") {
                    console.log(
                        "WARNING YOU ARE OFFLINE! A backup is being used, however it is not up to date and may have incorect data."
                    );
                    items = Object.values(jsonItems);
                } else {
                    return;
                }
            }
            items = sortArrayByReqs(items ?? []);

            setItems(items);
            
        }

        getItems();
    }, [ItemsService]);

    useEffect(() => {
        if (searchValue == "") {
            setDisplayedCreatures(allCreatures);
            setClearButtonVisibility("hidden");
            return;
        }

        setClearButtonVisibility("visible");
        const filteredCreatures = allCreatures.filter((s) => {
            return (
                s.name.toLowerCase().includes(searchValue) //||
                // s.effect?.toLowerCase().includes(searchValue)
            );
        });

        setDisplayedCreatures(filteredCreatures);
    }, [allCreatures, searchValue]);

    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(" ");
    }

    function updatePersistantPinnedCreatures(n: Creature[]) {
        const pinnedTraitNames: string[] = n.map((s) => {
            return s.name;
        });
        window.localStorage.setItem(
            "pinnedCreatureNames",
            pinnedTraitNames.join(";|;")
        );
    }

    function addToPinnedCreatures(s: Creature) {
        const newPersist = [...pinnedCreatures, s];
        setPinnedCreatures(sortArrayByReqs(newPersist));
        updatePersistantPinnedCreatures(newPersist);
    }

    function removeFromPinnedCreatures(s: Creature) {
        const idx = pinnedCreatures.indexOf(s);
        const remainingTraits = pinnedCreatures.slice();
        remainingTraits.splice(idx, 1);
        setPinnedCreatures(remainingTraits);
        updatePersistantPinnedCreatures(remainingTraits);
    }

    let creature: Creature; 
    creature = Object.values(uh)[0];
    console.log(creature)

    function closeDetails() {
        const detailsElement = document.querySelector('details');
        if (detailsElement) {
            detailsElement.removeAttribute('open');
        }
    }


    // Styling:

    return (
        <>
            <CreaturePopup
                displayedCreature={creature}
                traitsList={traits}
                spellsList={spells}
                itemsList={items}
            />
        </>
    );
}



// import { Spell, Trait, Item, Creature } from "../../client";
// import { sortArrayByLevel, sortArrayByReqs } from "../../util/sortingTools";


// import {
//     ticketIcon,
// } from "../../assets/IconSVGs/heroiconsSVG";


// import jsonTraits from "../../assets/OfflineJsons/Traits.json";
// import jsonSpells from "../../assets/OfflineJsons/Spells.json";
// import jsonItems from "../../assets/OfflineJsons/Items.json";
// import jsonCreatures from "../../assets/OfflineJsons/Creatures.json";
// import uh from "./uh.json";


// import useApi from "../../hooks/useApi";


// import { Dialog, Transition } from '@headlessui/react'
// import { Fragment, useState, useEffect } from 'react'
// import { Button } from "../ui/Button/Button";
// import { XMarkIcon } from "@heroicons/react/20/solid";
// import CreatureSheet from "./characterSheet";

// export default function MyModal() {
//   let [isOpen, setIsOpen] = useState(true)

//   function closeModal() {
//     setIsOpen(false)
//   }

//   function openModal() {
//     setIsOpen(true)
//   }


//     const { SpellsService, TraitsService, ItemsService } = useApi();

//     const [spellsList, setSpells] = useState<Array<Spell>>([]);
//     const [traitsList, setTraits] = useState<Array<Trait>>([]);
//     const [itemsList, setItems] = useState<Array<Item>>([]);

//     useEffect(() => {
//         async function getSpells() {
//             let spells: Spell[];
//             try {
//                 const spellsRaw = await SpellsService.getAllSpells();

//                 spells = Object.values(spellsRaw);
//             } catch (e) {
//                 if (e instanceof Error && e.message == "Network Error") {
//                     console.log(
//                         "WARNING YOU ARE OFFLINE! A backup is being used, however it is not up to date and may have incorect data."
//                     );
//                     spells = Object.values(jsonSpells);
//                 } else {
//                     return;
//                 }
//             }

//             spells = sortArrayByLevel(spells);
//             setSpells(spells);

//         }

//         getSpells();
//     }, [SpellsService]);

//     useEffect(() => {
//         async function getTraits() {
//             let traits: Trait[];
//             try {
//                 const traitsRaw = await TraitsService.getAllTraits();
//                 traits = Object.values(traitsRaw);
//             } catch (e) {
//                 if (e instanceof Error && e.message == "Network Error") {
//                     console.log(
//                         "WARNING YOU ARE OFFLINE! A backup is being used, however it is not up to date and may have incorect data."
//                     );
//                     traits = Object.values(jsonTraits);
//                 } else {
//                     return;
//                 }
//             }
//             traits = sortArrayByReqs(traits);
//             setTraits(traits);
//         }
        
//         getTraits();
//     }, [TraitsService]);

//     useEffect(() => {
//         async function getItems() {
//             let items: Item[];
//             try {
//                 const itemsRaw = await ItemsService.getAllItems();
//                 items = Object.values(itemsRaw);
//             } catch (e) {
//                 if (e instanceof Error && e.message == "Network Error") {
//                     console.log(
//                         "WARNING YOU ARE OFFLINE! A backup is being used, however it is not up to date and may have incorect data."
//                     );
//                     items = Object.values(jsonItems);
//                 } else {
//                     return;
//                 }
//             }
//             items = sortArrayByReqs(items ?? []);

//             setItems(items);
            
//         }

//         getItems();
//     }, [ItemsService]);


//     function classNames(...classes: string[]) {
//         return classes.filter(Boolean).join(" ");
//     }

//     function updatePersistantPinnedCreatures(n: Creature[]) {
//         const pinnedTraitNames: string[] = n.map((s) => {
//             return s.name;
//         });
//         window.localStorage.setItem(
//             "pinnedCreatureNames",
//             pinnedTraitNames.join(";|;")
//         );
//     }


//     let displayedCreature: Creature; 
//     displayedCreature = Object.values(uh)[0];
//     // console.log(creature)


//   return (
//     <>
//       <div className="fixed inset-0 flex items-center justify-center">
//         <Button leftIcon={ticketIcon} onClick={openModal} variant={"link-soul"}>
//             Open {displayedCreature.name}
//         </Button>
//       </div>

//       <Transition appear show={isOpen} as={Fragment}>
//         <Dialog as="div" className="relative z-10" onClose={closeModal}>
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-black/25" />
//           </Transition.Child>

//           <div className="fixed inset-0 overflow-y-auto">
//             <div className="flex min-h-full items-center justify-center p-4 text-center">
//               <Transition.Child
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 scale-95"
//                 enterTo="opacity-100 scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 scale-100"
//                 leaveTo="opacity-0 scale-95"
//               >
//                 <Dialog.Panel className="w-[80%] h-[80%] transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all">
                  
//                   <Dialog.Title
//                     as="h3"
//                     className="text-lg font-medium leading-6 flex flex-row"
//                   >
//                     {displayedCreature.name}

//                     <div className="mt-4">
//                         <XMarkIcon
//                             className="h-6 w-6 opacity-50 cursor-pointer"
//                             // visibility={clearButtonVisibility}
//                             onClick={closeModal}
//                         />
//                     </div>
//                   </Dialog.Title>
                  
//                     <CreatureSheet
//                         displayedCreature={displayedCreature}
//                         traitsList={traitsList}
//                         spellsList={spellsList}
//                         itemsList={itemsList}
//                     />

                  
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </Dialog>
//       </Transition>
//     </>
//   )
// }



