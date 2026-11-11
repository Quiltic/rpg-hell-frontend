import { Button } from "../ui/Button/Button";
import { useSpells } from "../../hooks/useSpells";

import { useState } from "react";
// import { Spell} from "../../client";
import { download } from "../../util/tableTools";
import { eApiClass } from "../../types/ApiClassUnions";
import SearchGroup from "../search/SearchGroup";
import { useSearchParams } from "react-router-dom";
import { Disclosure, Switch } from "@headlessui/react";
import SpellsTable from "../SpellsPages/SpellsTable";
import SpellCardHolder from "../SpellsPages/SpellCardStuff/artCardHolder";
import { ChevronIcon } from "../../assets/IconSVGs/heroiconsSVG";
import MarkdownRenderer from "../../rulebook/render/MarkdownRenderer";
import { markdownFile } from "../../rulebook/pages";
import { useKeyAnchor } from "../../glossary";
import FilterToggles from "../ui/FilterToggles";

const tagList = [
    "elemental",
    "divine",
    "utility",
    "creation",
    "control",
    "divination",
    "protection",
    "power",
    "healing",
    "illusion",
    "ranged",
    "touch",
    "self",
    "focus",
    "reaction",
    "damage",
    "technique",
    "aura",
    "insight",
    "dice",
    "spell",
    "weapon",
    "movement",
    "buff",
    "debuff",
    "aoe",
    "MONSTER",
    "BROKEN",
];

const statList = [
    "Fighter",
    "Survivor",
    "Analyst",
    "Commander",
    "Pious",
    "Spirits",
    "Arcanist",
    "Craftsman",
    "Druidic",
    "Face",
    "Ranger",
    "Urchin",

    "Elementalist",
];

export default function SpellsTablePage() {
    // Opens the Key panel below when linked to /rulebook/spells#key-spell-<slug>.
    const keyAnchor = useKeyAnchor("key-spell-");

    const {
        allSpells,
        pinnedSpells,
        displayedSpells,
        addToPinnedSpells,
        removeFromPinnedSpells,
        filterSpells,
        resetFilterSpells,
    } = useSpells();
    const searchedName = useSearchParams()[0].get("q") ?? "";

    const [enabled, setEnabled] = useState(false);
    const [searchLvl, setSearchLvl] = useState(0);
    const [selected, setSelected] = useState<string[]>([]);

    const shownSpells = displayedSpells.filter((s) => {
        if (searchLvl && s.level != searchLvl) return false;
        if (selected.length == 0) return true;
        return selected.some((n) => s.stat == n.toLowerCase());
    });

    return (
        <>
            <h1 className="capitalize">Arts</h1>

            {/* Download/Switch */}
            <div className="flex flex-col items-center justify-center">
                <div className="m-2 rounded-md bg-dark-400 p-2 pl-4">
                    <div className="flex flex-row items-center justify-center">
                        <Button
                            onClick={() => download(JSON.stringify(allSpells, null, 2), "spells.json", "text/json")}
                            variant="thieving"
                        >
                            Download Arts Json
                        </Button>

                        <div className="m-2 flex flex-row items-center justify-center rounded-md bg-dark-300 p-2">
                            {enabled && (
                                <p className="m-2 flex flex-row items-center justify-center">Switch to Table</p>
                            )}
                            {!enabled && (
                                <p className="m-2 flex flex-row items-center justify-center">Switch to Block</p>
                            )}

                            <Switch
                                checked={enabled}
                                onChange={setEnabled}
                                className={`${
                                    enabled ? "bg-body" : "bg-dark-700"
                                } relative inline-flex h-6 w-11 items-center rounded-full`}
                            >
                                <span className="sr-only">Switch to Block Mode</span>
                                <span
                                    className={`${
                                        enabled ? "translate-x-6" : "translate-x-1"
                                    } inline-block h-4 w-4 transform rounded-full bg-light transition`}
                                />
                            </Switch>
                        </div>

                        {/* Line */}
                        {/* <div className="flex flex-row items-center bg-dark-600 border-2 border-body-700/20 mt-6 mb-6 w-full"></div> */}
                    </div>

                    <Disclosure
                        key={keyAnchor.remountKey}
                        defaultOpen={keyAnchor.defaultOpen}
                    >
                        {({ open }) => (
                            <>
                                <Disclosure.Button>
                                    <Button
                                        variant={"thieving"}
                                        size={"md"}
                                        className="mb-2"
                                        open={open}
                                        rightIcon={ChevronIcon}
                                    >
                                        Key
                                    </Button>
                                </Disclosure.Button>
                                <Disclosure.Panel>
                                    <MarkdownRenderer
                                        markdown={markdownFile("spell_key.md")}
                                        have_header={false}
                                    />
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                </div>
            </div>

            {/* Pinned */}
            {pinnedSpells.length > 0 && (
                <>
                    <div className="justify-start">
                        <Disclosure defaultOpen>
                            {({ open }) => (
                                <>
                                    <Disclosure.Button>
                                        <Button
                                            variant={"dark"}
                                            size={"xl"}
                                            className="mb-2"
                                            open={open}
                                            rightIcon={ChevronIcon}
                                        >
                                            Pinned Arts
                                        </Button>
                                    </Disclosure.Button>
                                    <Disclosure.Panel>
                                        {enabled && (
                                            <SpellCardHolder
                                                shownSpells={pinnedSpells}
                                                action={{
                                                    label: "Unpin",
                                                    onClick: (spell) => {
                                                        removeFromPinnedSpells(spell);
                                                    },
                                                }}
                                            />
                                        )}
                                        {!enabled && (
                                            <SpellsTable
                                                displayedSpells={pinnedSpells}
                                                moveSpell={(spell) => {
                                                    removeFromPinnedSpells(spell);
                                                }}
                                                moveIsAdd={false}
                                            />
                                        )}

                                        {/* <hr /> */}
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    </div>
                    {/* Line */}
                    <div className="mb-6 mt-6 flex w-full flex-row items-center border-2 border-body-700/20 bg-dark-600"></div>
                </>
            )}

            <div className="w-full ">
                <div className="md:flex-column w-full py-1 align-middle md:flex md:justify-between">
                    <FilterToggles
                        options={statList}
                        selected={selected}
                        onChange={setSelected}
                    />
                    {/* Level */}
                    <div className="m-1 flex flex-row items-center justify-center rounded-md bg-dark-600">
                        <div className="m-1 ml-2 capitalize">Level</div>
                        <input
                            type="number"
                            className="m-1 flex h-6 w-16 flex-row rounded-lg p-2 shadow-md"
                            value={searchLvl}
                            min="0"
                            onChange={(e) => setSearchLvl(parseInt(e.target.value))}
                        />
                    </div>
                    <SearchGroup
                        key={searchedName}
                        initialName={searchedName}
                        filter={filterSpells}
                        resetFilter={resetFilterSpells}
                        filterClass={eApiClass.Spell}
                        tagList={tagList}
                    />
                </div>
                {enabled && (
                    <SpellCardHolder
                        shownSpells={shownSpells}
                        action={{
                            label: "Pin",
                            onClick: (spell) => {
                                addToPinnedSpells(spell);
                            },
                        }}
                    />
                )}
                {!enabled && (
                    <SpellsTable
                        displayedSpells={shownSpells}
                        moveSpell={(spell) => {
                            addToPinnedSpells(spell);
                        }}
                    />
                )}
            </div>
        </>
    );
}
