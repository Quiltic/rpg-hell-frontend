import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";

import { ApiClassUnion, eApiClass } from "../../types/ApiClassUnions";
import { Creature, Item, Spell, Trait } from "../../client";

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
    const [realSearchValue, setRealSearchValue] = useState('');

    useEffect(() => {
        
        if (initialSearch != ""  && initialSearch != undefined){ // advanced filtering should overide normal filtering
            setSearchValue("");
            // resetFilter();
            setClearButtonVisibility("hidden");
            setRealSearchValue(initialSearch)
            return;
        }
        
        if (searchValue == "") {
            resetFilter();
            setClearButtonVisibility("hidden");
            return;
        }

        setRealSearchValue(searchValue)
        setClearButtonVisibility("visible");
    }), [filter, filterClass, resetFilter, searchValue, initialSearch]

    

    useEffect(() => {
        console.log("init",realSearchValue)
        // if (searchValue == ""  && initialSearch != undefined)
        //     setRealSearchValue(initialSearch)
        // else
        //     setRealSearchValue(searchValue)

        // if (searchValue == "") {
        //     resetFilter();
        //     setClearButtonVisibility("hidden");
        //     return;
        // }

        

        // setClearButtonVisibility("visible");
        switch (filterClass) {
            case eApiClass.Trait: {
                filter(
                    (t) => {
                        try {
                            const temp = [t.name.toLowerCase(),(t as Trait).effect?.toLowerCase().replace("\n","")," "].join(";|;");
                            return (temp.match(new RegExp(realSearchValue, "g"))?.length != undefined ? true : false)
                        } catch (error) {
                            console.error('Bad regex:', error);
                        }
                        return (false)
                    }
                        // t.name.toLowerCase().includes(searchValue) ||
                        // (t as Trait).effect?.toLowerCase().includes(searchValue)
                );
                return;
            }
            case eApiClass.Item: {
                filter(
                    (i) =>
                        {
                            try {
                                const temp = [i.name.toLowerCase(),(i as Item).effect?.toLowerCase().replace(/(\r\n|\n|\r)/gm, ""),(i as Item).tags?.toLowerCase()].join(";|;");
                                // if (i.name.includes("silver"))
                                //     console.log(temp,(temp.match(new RegExp(searchValue, "g"))?.length != undefined ? true : false))
                                return (temp.match(new RegExp(realSearchValue, "g"))?.length != undefined ? true : false)
                            } catch (error) {
                                console.error('Bad regex:', error);
                            }
                            return (false)
                        }
                        // i.name.toLowerCase().includes(searchValue) ||
                        // (i as Item).effect?.toLowerCase().includes(searchValue)
                );
                return;
            }
            case eApiClass.Spell: {
                filter(
                    (s) =>
                        {
                            try {
                                const temp = [s.name.toLowerCase(),(s as Spell).effect?.toLowerCase().replace("\n",""),(s as Spell).tags?.toLowerCase()].join(";|;");
                                return (temp.match(new RegExp(realSearchValue, "g"))?.length != undefined ? true : false)
                            } catch (error) {
                                console.error('Bad regex:', error);
                            }
                            return (false)
                        }
                        // s.name.toLowerCase().includes(searchValue) ||
                        // (s as Spell).effect?.toLowerCase().includes(searchValue)
                );
                return;
            }
            case eApiClass.Creature: {
                filter(
                    (c) => {
                        try {
                            const temp = [c.name.toLowerCase(),(c as Creature).how_act?.toLowerCase().replace("\n","")," "].join(";|;");
                            return (temp.match(new RegExp(realSearchValue, "g"))?.length != undefined ? true : false)
                        } catch (error) {
                            console.error('Bad regex:', error);
                        }
                        return (false)
                    }
                        // t.name.toLowerCase().includes(searchValue) ||
                        // (t as Trait).effect?.toLowerCase().includes(searchValue)
                );
                return;
            }
        }
    }, [realSearchValue]);

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
