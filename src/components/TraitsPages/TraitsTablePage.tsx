import { useState } from "react";
import { Disclosure } from "@headlessui/react";
import TraitsTable from "./TraitsTable";
import { Button } from "../ui/Button/Button";
import { download } from "../../util/tableTools";
import { ChevronIcon } from "../../assets/IconSVGs/heroiconsSVG";
import { eApiClass } from "../../types/ApiClassUnions";
import { useTraits } from "../../hooks/useTraits";
import SearchGroup from "../search/SearchGroup";
import { useSearchParams } from "react-router-dom";
import FilterToggles from "../ui/FilterToggles";

const IterativeTraitLevels = [
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

export default function TraitsTablePage() {
    const {
        allTraits,
        pinnedTraits,
        displayedTraits,
        addToPinnedTraits,
        removeFromPinnedTraits,
        filterTraits,
        resetFilterTraits,
    } = useTraits();
    const searchedName = useSearchParams()[0].get("q") ?? "";
    const [selected, setSelected] = useState<string[]>([]);

    return (
        <>
            <h1 className="capitalize">Traits</h1>

            {/* (auth.isAuthenticated || (window.localStorage.getItem("db_access") == "IWANTMYCOOKIE")) &&  */}
            {
                <Button
                    onClick={() => download(JSON.stringify(allTraits, null, 2), "traits.json", "text/json")}
                    variant="link-body"
                >
                    Download Traits Json
                </Button>
            }
            {pinnedTraits.length > 0 && (
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
                                            Pinned Traits
                                        </Button>
                                    </Disclosure.Button>
                                    <Disclosure.Panel>
                                        <TraitsTable
                                            displayedTraits={pinnedTraits}
                                            moveTrait={(trait) => {
                                                removeFromPinnedTraits(trait);
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
                <div className="md:flex-column w-full py-1 align-middle md:flex md:justify-between">
                    <FilterToggles
                        options={IterativeTraitLevels}
                        selected={selected}
                        onChange={setSelected}
                    />
                    <SearchGroup
                        key={searchedName}
                        initialName={searchedName}
                        filter={filterTraits}
                        resetFilter={resetFilterTraits}
                        filterClass={eApiClass.Trait}
                    />
                </div>
                <TraitsTable
                    displayedTraits={displayedTraits.filter((s) => {
                        if (selected.length == 0) return true;
                        return selected.some((n) => s.req?.toString().includes(n.toLowerCase()));
                    })}
                    moveTrait={(trait) => {
                        addToPinnedTraits(trait);
                    }}
                />
            </div>
        </>
    );
}
