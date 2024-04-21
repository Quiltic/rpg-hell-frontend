import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";

import { ApiClassUnion, eApiClass } from "../../types/ApiClassUnions";
import { Item, Spell, Trait } from "../../client";

type Props = {
    filter: (fn: (t: ApiClassUnion) => boolean) => void;
    resetFilter: () => void;
    filterClass: eApiClass;
    initialSearch?: string;
};

function Search({
    filter: filter,
    resetFilter: resetFilter,
    filterClass: filterClass,
    initialSearch: initialSearch,
}: Props) {
    const [clearButtonVisibility, setClearButtonVisibility] =
        useState("hidden");
    const [searchValue, setSearchValue] = useState(initialSearch ?? "");

    useEffect(() => {
        if (searchValue == "") {
            resetFilter();
            setClearButtonVisibility("hidden");
            return;
        }

        setClearButtonVisibility("visible");
        switch (filterClass) {
            case eApiClass.Trait: {
                filter(
                    (t) =>
                        t.name.toLowerCase().includes(searchValue) ||
                        (t as Trait).effect?.toLowerCase().includes(searchValue)
                );
                return;
            }
            case eApiClass.Item: {
                filter(
                    (i) =>
                        i.name.toLowerCase().includes(searchValue) ||
                        (i as Item).effect?.toLowerCase().includes(searchValue)
                );
                return;
            }
            case eApiClass.Spell: {
                filter(
                    (s) =>
                        s.name.toLowerCase().includes(searchValue) ||
                        (s as Spell).effect?.toLowerCase().includes(searchValue)
                );
                return;
            }
            case eApiClass.Creature: {
                return;
            }
        }
    }, [filter, filterClass, resetFilter, searchValue]);

    return (
        <div className="flex-column flex max-h-10 w-full items-center rounded-full bg-dark-700 px-2 py-1 md:w-56">
            <MagnifyingGlassIcon className="h-6 w-6 text-light" />

            <input
                value={searchValue}
                type="text"
                name="search"
                placeholder="Search"
                className="w-16 flex-grow bg-dark-700 pl-1"
                onChange={(e) => {
                    setSearchValue(e.target.value.toLowerCase());
                }}
            />
            <XMarkIcon
                className="h-6 w-6 cursor-pointer opacity-50"
                visibility={clearButtonVisibility}
                onClick={() => {
                    setSearchValue("");
                    setClearButtonVisibility("hidden");
                }}
            />
        </div>
    );
}

export default Search;
