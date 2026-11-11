import React, { useState, useEffect } from "react";
import Search from "../search/Search";
import { FunnelIcon, XCircleIcon } from "@heroicons/react/20/solid";
import Popup from "../ui/Popups/Popup";
import { getAllCombinations } from "../../util/tableTools";
import { ApiClassUnion, eApiClass } from "../../types/ApiClassUnions";
import { Button } from "../ui/Button/Button";
import { cn } from "../../styling/utilites";

type Props = {
    filter: (fn: (t: ApiClassUnion) => boolean) => void;
    resetFilter: () => void;
    filterClass: eApiClass;
    tagList?: string[];
    initialName?: string;
};

export default function SearchGroup({
    filter: _filter,
    resetFilter: _resetFilter,
    filterClass: _filterClass,
    tagList: _tagList = [],
    initialName,
}: Props) {
    const [searchString, setSearchString] = useState("");
    const [name, setName] = useState(initialName ?? "");
    const [effect, setEffect] = useState("");
    const [tags, setTags] = useState("");

    const [popupOpen, setPopupOpen] = useState(false);

    const tagOptions = _tagList.filter(Boolean);
    const selectedTags = tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

    function toggleTag(tag: string) {
        const next = selectedTags.includes(tag) ? selectedTags.filter((t) => t !== tag) : [...selectedTags, tag];
        setTags(next.join(", "));
    }

    useEffect(() => {
        if (name == "" && effect == "" && tags == "") {
            setSearchString("");
            return;
        }

        let tempname,
            tempeffect,
            temptags = ""; // here for cleanup and incase we need it for later

        if (tags[0] == ",") setTags(tags.slice(1));

        if (tags != "") {
            const strings = tags.replace(/, | ,/g, ", ").split(", ");
            temptags = getAllCombinations(strings);
        }

        setSearchString(`(^(.*${name}.*);\\|;(.*${effect}.*);\\|;(.*${temptags}.*))`);
    }, [name, effect, tags]);

    //(\bcommon\b).*(alchemical|grenade)|(alchemical|grenade).*common  <= gives common items that are alchemical or grenades
    //(?<=;\|;).*(?:\b{whatever effect string I want}\b).*(?=;\|;)     <= gives things that only exist within the effect
    //^(.*);\|;(.*);\|;(.*{thingy}.*)                                  <= gives only things in the tags
    //^(.*{thingy}[^;]*);\|;([^;]*);\|;([^;]*)                         <= gives only things in the name

    return (
        <div>
            <div className="flex flex-row items-center">
                <FunnelIcon
                    className="h-6 w-6 cursor-pointer opacity-50"
                    onClick={() => {
                        setPopupOpen(true);
                    }}
                />
                <div
                    className="p-1"
                    hidden={searchString != "" && searchString != undefined ? false : true}
                >
                    <XCircleIcon
                        className="h-6 w-6 cursor-pointer opacity-50"
                        onClick={() => {
                            setName("");
                            setEffect("");
                            setTags("");
                        }}
                    />
                </div>
                <div
                    className="p-1"
                    hidden={searchString != "" && searchString != undefined ? true : false}
                >
                    <Search
                        filter={_filter}
                        resetFilter={_resetFilter}
                        filterClass={_filterClass}
                        initialSearch={searchString}
                    />
                </div>
            </div>

            <Popup
                displayedContentName="advanced filtering"
                isOpen={popupOpen}
                setIsOpen={setPopupOpen}
                displayedContent={
                    <div className="mt-4 grid gap-4 rounded-lg bg-dark-400 p-4 md:grid-cols-2">
                        <label className="flex flex-col gap-1 font-bold">
                            Name
                            <input
                                type="text"
                                placeholder="Feather"
                                className="h-9 w-full rounded-lg p-2 font-normal shadow-md"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                        <label className="flex flex-col gap-1 font-bold">
                            Effect
                            <input
                                type="text"
                                placeholder="Spend 2 Strain..."
                                className="h-9 w-full rounded-lg p-2 font-normal shadow-md"
                                value={effect}
                                onChange={(e) => setEffect(e.target.value)}
                            />
                        </label>
                        {tagOptions.length > 0 && (
                            <div className="md:col-span-2">
                                <label className="flex flex-col gap-1 font-bold">
                                    Tags
                                    <input
                                        type="text"
                                        placeholder="elemental, aura"
                                        className="h-9 w-full rounded-lg p-2 font-normal shadow-md"
                                        value={tags}
                                        onChange={(e) => setTags(e.target.value)}
                                    />
                                </label>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {tagOptions.map((tag) => {
                                        const isSelected = selectedTags.includes(tag);
                                        return (
                                            <button
                                                key={tag}
                                                type="button"
                                                aria-pressed={isSelected}
                                                onClick={() => toggleTag(tag)}
                                                className={cn(
                                                    "rounded-full px-3 py-1 text-sm capitalize",
                                                    isSelected
                                                        ? "bg-light text-dark"
                                                        : "bg-dark-600 text-light hover:bg-dark-300"
                                                )}
                                            >
                                                {tag.toLowerCase()}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                        <div className="flex justify-end md:col-span-2">
                            <Button
                                variant="link-medicine"
                                size="sm"
                                onClick={() => {
                                    setName("");
                                    setEffect("");
                                    setTags("");
                                }}
                            >
                                Clear all
                            </Button>
                        </div>
                    </div>
                }
            />
        </div>
    );
}
