import { useState, useEffect, useCallback } from "react";
import { Disclosure } from "@headlessui/react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button/Button";

import { ChevronIcon } from "../../assets/IconSVGs/heroiconsSVG";

import SpellsTable from "../SpellsPages/SpellsTable";
import TraitsTable from "../TraitsPages/TraitsTable";
import ItemsTable from "../ItemPages/ItemsTable";
import CreatureTable from "../CreaturesPages/CreaturesTable";

import { download, getPersistentPinnedNames } from "../../util/tableTools";

import markdown from "./tempsheet";
import { useTraits } from "../../hooks/useTraits";
import { useSpells } from "../../hooks/useSpells";
import { useItems } from "../../hooks/useItems";
import { useCreatures } from "../../hooks/useCreatures";

export default function CharacterSheetPage() {

    const {
        pinnedTraits
    } = useTraits();
    const {
        pinnedSpells
    } = useSpells();
    const {
        pinnedItems
    } = useItems();
    const {
        pinnedCreatures
    } = useCreatures();

    const [tempSheet, setTempSheet] = useState(markdown);

    function clearCharacterSheet() {
        setTempSheet(markdown);
        window.localStorage.setItem("tempSheet", "");
    }

    useEffect(() => {
        if (tempSheet != markdown) {
            window.localStorage.setItem("tempSheet", tempSheet);
        } else {
            const persistentTempSheet =
                window.localStorage.getItem("tempSheet");
            if (persistentTempSheet) {
                setTempSheet(persistentTempSheet);
            }
        }
    }, [tempSheet]);

    return (
        <>
            <div className="flex flex-row gap-2 justify-evenly md:justify-start">
                <Button
                    onClick={() => clearCharacterSheet()}
                    variant="subtle-medicine"
                >
                    Clear Character Sheet
                </Button>
                <Button
                    onClick={() =>
                        download(
                            tempSheet,
                            "Character-Sheet.txt",
                            "data:text/plain;charset=utf-8,"
                        )
                    }
                    variant="subtle-body"
                >
                    Download Character Sheet
                </Button>
            </div>

            <textarea
                rows={40}
                placeholder="Whip around like a yoyo"
                className="bg-dark-300 h-[60%] w-[100%] rounded-lg p-2 my-2"
                value={tempSheet}
                onChange={(e) => setTempSheet(e.target.value)}
            />

            {pinnedTraits.length > 0 && (
                <>
                    <div className="justify-start mb-2">
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
                    <div className="justify-start  mb-2">
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
                    <div className="justify-start  mb-2">
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
                    <div className="justify-start mb-2">
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
