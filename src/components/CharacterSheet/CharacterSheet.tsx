import { useState, useEffect, useCallback } from "react";
import { Disclosure } from "@headlessui/react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button/Button";



import { ChevronIcon } from "../../assets/IconSVGs/heroiconsSVG";

import jsonTraits from "../../assets/OfflineJsons/Traits.json";
import jsonSpells from "../../assets/OfflineJsons/Spells.json";
import jsonItems from "../../assets/OfflineJsons/Items.json";


import useApi from "../../hooks/useApi";

import { Spell, Trait, Item } from "../../client";
import SpellsTable from "../SpellsPages/SpellsTable";
import TraitsTable from "../TraitsPages/TraitsTable";

import { getPersistentPinnedNames } from "../../util/tableTools";
import { filterBROKENandMONSTER, filterBROKENandMONSTERreq, sortArrayByLevel, sortArrayByReqs } from "../../util/sortingTools";
import ItemsTable from "../ItemPages/ItemsTable";


// import Markdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import rehypeRaw from "rehype-raw";
// import { formatEffectString } from "../../util/textFormatting";

// const formattedmd = formatEffectString(markdown);

export default function CharacterSheetPage() {


    const { SpellsService, TraitsService, ItemsService } = useApi();
    const [pinnedSpells, setPinnedSpells] = useState<Array<Spell>>([]);
    const [pinnedTraits, setPinnedTraits] = useState<Array<Trait>>([]);
    const [pinnedItems, setPinnedItems] = useState<Array<Item>>([]);


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

            spells = filterBROKENandMONSTER(spells);

            spells = sortArrayByLevel(spells);

            const persistentPinnedSpells = getPersistentPinnedNames("pinnedSpellNames",spells);
            if (persistentPinnedSpells) {
                setPinnedSpells(persistentPinnedSpells);
            }


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
            traits = filterBROKENandMONSTERreq(traits);

            traits = sortArrayByReqs(traits);

            const persistentPinnedTraits = getPersistentPinnedNames("pinnedTraitNames", traits);
            if (persistentPinnedTraits) {
                setPinnedTraits(persistentPinnedTraits);
            }
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

            items = filterBROKENandMONSTER(items);

            items = sortArrayByReqs(items ?? []);

            const persistentPinnedItems = getPersistentPinnedNames("pinnedItemNames",items);

            if (persistentPinnedItems) {
                setPinnedItems(persistentPinnedItems);
            }
            
        }

        getItems();
    }, [ItemsService]);


    return (
        <>
            
            {pinnedTraits.length > 0 && (
                <>
                    <div className="justify-start">
                        <Disclosure defaultOpen>
                            {({ open }) => (
                                <>
                                    <Disclosure.Button>
                                        <Button
                                            variant={"soul"}
                                            className="mb-2"
                                            open={open}
                                            rightIcon={ChevronIcon}
                                        >
                                            Pinned Traits
                                        </Button>
                                    </Disclosure.Button>
                                    <Disclosure.Panel>
                                        <TraitsTable 
                                            displayedTraits={pinnedTraits}
                                        />
                                        <hr className="h-px my-4 border-0 bg-dark-600" />
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    </div>
                </>
            )}
            {pinnedSpells.length > 0 && (
                <>
                    <div className="justify-start">
                        <Disclosure defaultOpen>
                            {({ open }) => (
                                <>
                                    <Disclosure.Button>
                                        <Button
                                            variant={"soul"}
                                            className="mb-2"
                                            open={open}
                                            rightIcon={ChevronIcon}
                                        >
                                            Pinned Spells
                                        </Button>
                                    </Disclosure.Button>
                                    <Disclosure.Panel>
                                        <SpellsTable
                                            displayedSpells={pinnedSpells}
                                        />
                                        <hr className="h-px my-4 border-0 bg-dark-600" />
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    </div>
                </>
            )}
            {pinnedItems.length > 0 && (
                <>
                    <div className="justify-start">
                        <Disclosure defaultOpen>
                            {({ open }) => (
                                <>
                                    <Disclosure.Button>
                                        <Button
                                            variant={"soul"}
                                            className="mb-2"
                                            open={open}
                                            rightIcon={ChevronIcon}
                                        >
                                            Pinned Items
                                        </Button>
                                    </Disclosure.Button>
                                    <Disclosure.Panel>
                                        <ItemsTable
                                            displayedItems={pinnedItems}
                                        />
                                        <hr className="h-px my-4 border-0 bg-dark-600" />
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    </div>
                </>
            )}
        </>
    );
}
