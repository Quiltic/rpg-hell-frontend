import React, { useState, useEffect } from "react";
import Search from "../search/Search";
import { FunnelIcon, XCircleIcon } from "@heroicons/react/20/solid";
import Popup from "../ui/Popups/Popup";
import { getAllCombinations } from "../../util/tableTools";
import CleanCombobox from "../joshhellscapePages/CleanCombobox";
import { ApiClassUnion, eApiClass } from "../../types/ApiClassUnions";



type Props = {
    filter: (fn: (t: ApiClassUnion) => boolean) => void;
    resetFilter: () => void;
    filterClass: eApiClass;
    tagList: string[];
};

export default function SearchGroup({
    filter: _filter,
    resetFilter: _resetFilter,
    filterClass: _filterClass,
    tagList: _tagList,
}: Props) {


    const [searchString, setSearchString] = useState("");
    const [name, setName] = useState("");
    const [effect, setEffect] = useState("");
    const [tags, setTags] = useState("");
    
    const [popupOpen, setPopupOpen] = useState(false);


    useEffect(() => {

        if (name == "" && effect == "" && tags == "") {
            setSearchString("")
            return;
        }

        let tempname, tempeffect, temptags  = ''; // here for cleanup and incase we need it for later

        if (tags[0] == ",")
            setTags(tags.slice(1))

        if (tags != ""){
            const strings = tags.replace(/, | ,/g, ',').split(',');
            temptags = getAllCombinations(strings);
        }
        
        setSearchString(`(^(.*${name}.*);\\|;(.*${effect}.*);\\|;(.*${temptags}.*))`)
        
    }, [
        name, effect, tags
    ]);

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
                <div className="p-1" hidden={(searchString != ""  && searchString != undefined) ? false : true}>
                    <XCircleIcon
                        className="h-6 w-6 cursor-pointer opacity-50"
                        onClick={() => {
                            setName("");
                            setEffect("");
                            setTags("");
                        }}
                    />
                </div>
                <div className="p-1" hidden={(searchString != ""  && searchString != undefined) ? true : false}>
                    <Search
                        filter={_filter}
                        resetFilter={_resetFilter}
                        filterClass={_filterClass}
                        initialSearch={searchString}
                        />
                </div>
            </div>


            <Popup displayedContentName="advanced filtering" isOpen={popupOpen} setIsOpen={setPopupOpen} displayedContent={
                <div>
                    <div className="md:col-span-2 md:row-span-2 justify-center">
                        <div className="flex flex-row capitalize">Name</div>
                        <input
                            type="text"
                            placeholder="Feather"
                            className="flex flex-row h-9 rounded-lg p-2 mt-1 w-[100%] shadow-md"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="md:col-span-2">
                        <div className="flex flex-row capitalize">
                            Effect
                        </div>
                        <input
                            type="text"
                            className="flex flex-row h-9 rounded-lg p-2 mt-1 w-[100%] shadow-md"
                            value={effect}
                            onChange={(e) => setEffect(e.target.value)}
                        />
                    </div>
                    <div className="md:col-span-2">
                        <div className="flex flex-row capitalize">tags</div>
                        <input
                            type="text"
                            className="flex flex-row h-9 rounded-lg p-2 mt-1 w-[100%] shadow-md"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                        />
                        <CleanCombobox
                            items={_tagList}
                            className="flex flex-row"
                            selected={""}
                            setSelected={(val) => {
                                setTags(tags.concat(",", val));
                            }}
                        />
                    </div>
                </div>

            }/>
        </div>
        

    );
}


