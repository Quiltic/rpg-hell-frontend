import { useState, useEffect, Fragment } from "react";
import { Spell, Trait, Item, Creature } from "../../client";

import { CheckIcon, ChevronUpDownIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";

import useApi from "../../hooks/useApi";

import { Tab, Disclosure, Combobox, Transition } from "@headlessui/react";

import CreatureTable from "./CreaturesTable";

import jsonTraits from "../../assets/OfflineJsons/Traits.json";
import jsonSpells from "../../assets/OfflineJsons/Spells.json";
import jsonItems from "../../assets/OfflineJsons/Items.json";
import jsonCreatures from "../../assets/OfflineJsons/Creatures.json";
import uh from "./uh.json";



import { Button } from "../ui/Button/Button";
import { sortArrayByLevel, sortArrayByReqs } from "../../util/sortingTools";

import { ChevronIcon } from "../../assets/IconSVGs/heroiconsSVG";
import { toPillElement } from "../../util/textFormatting";
import { getNames } from "../../util/tableTools";
import CreaturePopup from "../ui/Popups/characterSheetPopup";
import CreatureSheet from "../CreaturesPages/characterSheet";
import CleanCombobox from "./CleanCombobox";

function getTabWidth(lengthOfName: number) {
    return lengthOfName < 5 ? "w-12" : lengthOfName < 7 ? "w-16" : lengthOfName < 12 ? "w-24" : "w-32";
}


const statSkillList = [
    { id: 1, name: 'base 0' },
    { id: 2, name: 'body 1'},
    { id: 3, name: 'mind 1'},
    { id: 4, name: 'soul 1'},
    { id: 5, name: 'arcana 1'},
    { id: 6, name: 'charm 1'},
    { id: 7, name: 'crafting 1'},
    { id: 8, name: 'medicine 1'},
    { id: 9, name: 'nature 1'},
    { id: 10, name: 'thieving 1'},
    { id: 11, name: 'body 2'},
    { id: 12, name: 'mind 2'},
    { id: 13, name: 'soul 2'},
    { id: 14, name: 'arcana 2'},
    { id: 15, name: 'charm 2'},
    { id: 16, name: 'crafting 2'},
    { id: 17, name: 'medicine 2'},
    { id: 18, name: 'nature 2'},
    { id: 19, name: 'thieving 2'},
    { id: 20, name: 'body 3'},
    { id: 21, name: 'mind 3'},
    { id: 22, name: 'soul 3'},
    { id: 23, name: 'arcana 3'},
    { id: 24, name: 'charm 3'},
    { id: 25, name: 'crafting 3'},
    { id: 26, name: 'medicine 3'},
    { id: 27, name: 'nature 3'},
    { id: 28, name: 'thieving 3'},
    { id: 29, name: 'body 4'},
    { id: 30, name: 'mind 4'},
    { id: 31, name: 'soul 4'},
    { id: 32, name: 'arcana 4'},
    { id: 33, name: 'charm 4'},
    { id: 34, name: 'crafting 4'},
    { id: 35, name: 'medicine 4'},
    { id: 36, name: 'nature 4'},
    { id: 37, name: 'thieving 4'},
    { id: 38, name: 'body 5'},
    { id: 39, name: 'mind 5'},
    { id: 40, name: 'soul 5'},
    { id: 41, name: 'arcana 5'},
    { id: 42, name: 'charm 5'},
    { id: 43, name: 'crafting 5'},
    { id: 44, name: 'medicine 5'},
    { id: 45, name: 'nature 5'},
    { id: 46, name: 'thieving 5'},
    { id: 47, name: 'body 6'},
    { id: 48, name: 'mind 6'},
    { id: 49, name: 'soul 6'},
    { id: 50, name: 'arcana 6'},
    { id: 51, name: 'charm 6'},
    { id: 52, name: 'crafting 6'},
    { id: 53, name: 'medicine 6'},
    { id: 54, name: 'nature 6'},
    { id: 55, name: 'thieving 6'},
    { id: 56, name: 'MONSTER'}
];

const otherListCore = [
    { id: 1, name: 'BROKEN' },
    { id: 2, name: 'OOC'}
];

const diceCostListCore = [
    { id: 1, name: 'P' },
    { id: 2, name: '#'},
    { id: 3, name: '##'},
    { id: 4, name: '###'},
];

export default function JoshhellscapePage() {

    const [mainstatSkillList, setMainstatSkillList] = useState(statSkillList);
    const [secondstatSkillList, setSecondstatSkillList] = useState(statSkillList);
    const [otherList, setOtherList] = useState(otherListCore);
    const [diceCostList, setDiceCostList] = useState(diceCostListCore);
    


    const [nameText, setNameText] = useState("");
    const [mainStat, setMainStat] = useState("");
    const [secondStat, setSecondStat] = useState("");
    const [diceCost, setDiceCost] = useState("");
    const [otherDrop, setOtherDrop] = useState("");
    const [effectText, setEffectText] = useState("");
    const [curTrait, setCurTrait] = useState<Trait>();

    
    function handleCreateNew() {
        console.log(curTrait);

        // Set inputs to nothing
        setNameText('');
        setEffectText('');
        setMainstatSkillList(statSkillList);
        setSecondstatSkillList(statSkillList);
        setOtherList(otherListCore);
        setDiceCostList(diceCostListCore);
    };


    function handleUpdate() {
        // console.log(curTrait);
        
        // Set inputs to nothing
        setNameText('');
        setEffectText('');
        setMainstatSkillList([{"id":0,"name":"Blerble"},...statSkillList]);
        setSecondstatSkillList([{"id":0,"name":"omg"},...statSkillList]);
        setOtherList([{"id":0,"name":"weebe"},...otherListCore]);
        setDiceCostList([{"id":0,"name":"P"},...diceCostListCore]);
    };
    
    useEffect(() => {
        // console.log(mainStat,secondStat,otherDrop);
        let trait = {
            "name": nameText,
            "effect": effectText,
            "req": [mainStat,secondStat,otherDrop],
            "dice": 0,
            "is_passive": true
        };

        if (diceCost != "P") {
            trait.is_passive = false;
            trait.dice = diceCost.split("#").length - 1;
        }

        // remove the empty stuffs
        trait.req = trait.req.filter((str) => str !== '');

        setCurTrait(trait);

    }, [nameText,diceCost,mainStat,secondStat,otherDrop,effectText]);


    return (
        <div className="grid grid-rows-auto-auto-auto-1fr-auto gap-4 h-screen p-4 bg-dark-400 rounded-md">
            <div className="grid grid-cols-5 gap-4 bg-dark-300">
                <div className="col-span-1">
                    <div className="flex flex-row capitalize">Name</div>
                    <input type="text" placeholder="Yoyo" className="flex flex-row" value={nameText}  onChange={(e) => setNameText(e.target.value)}/>
                </div>
                <div className="col-span-1">
                    <div className="flex flex-row capitalize">Dice Cost</div>
                    <CleanCombobox items={diceCostList} className="flex flex-row" get_current={(val) => {setDiceCost(val);}}/>
                </div>
                <div className="col-span-1">
                    <div className="flex flex-row capitalize">Main Stat/Skill</div>
                    <CleanCombobox items={mainstatSkillList} className="flex flex-row" get_current={(val) => {setMainStat(val);}}/>
                </div>
                <div className="col-span-1">
                    <div className="flex flex-row capitalize">Secondary Stat/Skill</div>
                    <CleanCombobox items={secondstatSkillList} className="flex flex-row" get_current={(val) => {setSecondStat(val);}}/>
                </div>
                <div className="col-span-1">
                    <div className="flex flex-row capitalize">Other</div>
                    <CleanCombobox items={otherList} className="flex flex-row" get_current={(val) => {setOtherDrop(val);}}/>
                </div>
            </div>

            <div className="">Effect</div>
            <textarea rows={40} cols={50} placeholder="Whip around like a yoyo" className="bg-dark-300" value={effectText}  onChange={(e) => setEffectText(e.target.value)}/>

            <div className="grid grid-cols-3 gap-4">
                <Button title="Update" className="flex flex-row" variant={"soul"} onClick={handleUpdate}>Update</Button>
                <Button title="Delete" className="flex flex-row" variant={'body'}>Delete</Button>
                <Button title="Create New" className="flex flex-row" variant={'nature'} onClick={handleCreateNew}>Create New</Button>
            </div>
        </div>
    );
}

