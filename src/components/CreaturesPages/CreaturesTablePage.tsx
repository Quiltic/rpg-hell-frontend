import { useState } from "react";

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";

import { Disclosure } from "@headlessui/react";

import CreatureTable from "./CreaturesTable";

import { Button } from "../ui/Button/Button";

import { ChevronIcon } from "../../assets/IconSVGs/heroiconsSVG";
import { useCreatures } from "../../hooks/useCreatures";
import { eApiClass } from "../../types/ApiClassUnions";
import Search from "../search/Search";
import FilterToggles from "../ui/FilterToggles";
import { useSearchParams } from "react-router-dom";

const IterativeTraitLevels = ["Humanoid", "Animal", "Construct", "Monstrosity", "Planar", "Undead", "Mythic"];

export default function CreatureTablePage() {
    const {
        allCreatures,
        pinnedCreatures,
        displayedCreatures,
        addToPinnedCreatures,
        removeFromPinnedCreatures,
        filterCreatures,
        resetFilterCreatures,
    } = useCreatures();
    const searchedName = useSearchParams()[0].get("q") ?? "";
    const [selected, setSelected] = useState<string[]>([]);

    // const { TraitsService } = useApi();

    const [searchValue, setSearchValue] = useState("");
    const [clearButtonVisibility, setClearButtonVisibility] = useState("hidden");

    // Styling:

    return (
        <>
            <h1>Creatures</h1>

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
                                            moveCreature={(creature) => {
                                                removeFromPinnedCreatures(creature);
                                            }}
                                            moveIsAdd={false}
                                        />
                                        <hr />
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    </div>
                </>
            )}

            <div className="w-full ">
                <div className="flex-column flex w-full justify-between py-1 align-middle">
                    <FilterToggles
                        options={IterativeTraitLevels}
                        selected={selected}
                        onChange={setSelected}
                    />
                    <div className="flex-column flex items-center rounded-full bg-dark-700 px-2 py-1">
                        <Search
                            key={searchedName}
                            initialValue={searchedName}
                            filter={filterCreatures}
                            resetFilter={resetFilterCreatures}
                            filterClass={eApiClass.Creature}
                            initialSearch={searchValue}
                        />
                        {/* <MagnifyingGlassIcon className="h-6 w-6 text-light" />

                        <input
                            value={searchValue}
                            type="text"
                            name="search"
                            placeholder="Search"
                            className="bg-dark-700 pl-1"
                            onChange={(e) => {
                                setSearchValue(e.target.value.toLowerCase());
                            }}
                        />
                        <XMarkIcon
                            className="h-6 w-6 opacity-50 cursor-pointer"
                            visibility={clearButtonVisibility}
                            onClick={() => {
                                setSearchValue("");
                                setClearButtonVisibility("hidden");
                            }}
                        /> */}
                    </div>
                </div>
                <CreatureTable
                    displayedCreatures={displayedCreatures.filter((s) => {
                        if (selected.length == 0) return true;
                        return selected.some((n) => s.types.toLowerCase().includes(n.toLowerCase()));
                    })}
                    moveCreature={(creature) => {
                        addToPinnedCreatures(creature);
                    }}
                />
            </div>
        </>
    );
}
