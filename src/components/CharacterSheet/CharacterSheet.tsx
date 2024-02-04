import { useState, useEffect, useCallback } from "react";
import { Disclosure } from "@headlessui/react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button/Button";

import { ChevronIcon } from "../../assets/IconSVGs/heroiconsSVG";

import jsonTraits from "../../assets/OfflineJsons/Traits.json";
import jsonSpells from "../../assets/OfflineJsons/Spells.json";
import jsonItems from "../../assets/OfflineJsons/Items.json";
import jsonCreatures from "../../assets/OfflineJsons/Creatures.json";

import useApi from "../../hooks/useApi";

import { Spell, Trait, Item, Creature } from "../../client";
import SpellsTable from "../SpellsPages/SpellsTable";
import TraitsTable from "../TraitsPages/TraitsTable";
import ItemsTable from "../ItemPages/ItemsTable";
import CreatureTable from "../CreaturesPages/CreaturesTable";

import { getPersistentPinnedNames } from "../../util/tableTools";
import {
    filterBROKENandMONSTER,
    filterBROKENandMONSTERreq,
    sortArrayByLevel,
    sortArrayByReqs,
} from "../../util/sortingTools";

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
    const [pinnedCreatures, setPinnedCreatures] = useState<Array<Creature>>([]);

    const [spells, setSpells] = useState<Array<Spell>>([]);
    const [traits, setTraits] = useState<Array<Trait>>([]);
    const [items, setItems] = useState<Array<Item>>([]);

    useEffect(() => {
        async function getSpells() {
            let spells: Spell[];
            // try {
            //     const spellsRaw = await SpellsService.getAllSpells();

            //     spells = Object.values(spellsRaw);
            // } catch (e) {
            //     if (e instanceof Error && e.message == "Network Error") {
            console.log(
                "WARNING YOU ARE OFFLINE! A backup is being used, however it is not up to date and may have incorect data."
            );
            spells = Object.values(jsonSpells);
            //     } else {
            //         return;
            //     }
            // }
            spells = sortArrayByLevel(spells);
            setSpells(spells);

            spells = filterBROKENandMONSTER(spells);

            const persistentPinnedSpells = getPersistentPinnedNames(
                "pinnedSpellNames",
                spells
            );
            if (persistentPinnedSpells) {
                setPinnedSpells(persistentPinnedSpells);
            }
        }

        getSpells();
    }, [SpellsService]);

    useEffect(() => {
        async function getTraits() {
            let traits: Trait[];
            // try {
            //     const traitsRaw = await TraitsService.getAllTraits();
            //     traits = Object.values(traitsRaw);
            // } catch (e) {
            //     if (e instanceof Error && e.message == "Network Error") {
            console.log(
                "WARNING YOU ARE OFFLINE! A backup is being used, however it is not up to date and may have incorect data."
            );
            traits = Object.values(jsonTraits);
            //     } else {
            //         return;
            //     }
            // }
            traits = sortArrayByReqs(traits);
            setTraits(traits);

            traits = filterBROKENandMONSTERreq(traits);

            const persistentPinnedTraits = getPersistentPinnedNames(
                "pinnedTraitNames",
                traits
            );
            if (persistentPinnedTraits) {
                setPinnedTraits(persistentPinnedTraits);
            }
        }

        getTraits();
    }, [TraitsService]);

    useEffect(() => {
        async function getItems() {
            let items: Item[];
            // try {
            //     const itemsRaw = await ItemsService.getAllItems();
            //     items = Object.values(itemsRaw);
            // } catch (e) {
            //     if (e instanceof Error && e.message == "Network Error") {
            console.log(
                "WARNING YOU ARE OFFLINE! A backup is being used, however it is not up to date and may have incorect data."
            );
            items = Object.values(jsonItems);
            //     } else {
            //         return;
            //     }
            // }

            items = sortArrayByReqs(items ?? []);
            setItems(items);

            items = filterBROKENandMONSTER(items);

            const persistentPinnedItems = getPersistentPinnedNames(
                "pinnedItemNames",
                items
            );

            if (persistentPinnedItems) {
                setPinnedItems(persistentPinnedItems);
            }
        }

        getItems();
    }, [ItemsService]);

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
            const persistentPinnedCreatures = getPersistentPinnedNames(
                "pinnedCreatureNames",
                creatures
            );

            if (persistentPinnedCreatures) {
                setPinnedCreatures(persistentPinnedCreatures);
            }
        }

        getCreatures();
    }, []);

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
                                        <hr />
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
                                        <hr />
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
                                        <hr />
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    </div>
                </>
            )}
            {pinnedCreatures.length > 0 && (
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
                                            Pinned Creatures
                                        </Button>
                                    </Disclosure.Button>
                                    <Disclosure.Panel>
                                        <CreatureTable
                                            displayedCreatures={pinnedCreatures}
                                            traitsList={traits}
                                            spellsList={spells}
                                            itemsList={items}
                                        />
                                        <hr />
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
