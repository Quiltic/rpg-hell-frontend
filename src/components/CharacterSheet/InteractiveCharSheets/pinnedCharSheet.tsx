

import { useEffect, useState} from "react";
import { Trait, Item, Spell } from "../../../client";
import ItemCard from "../../ItemPages/ItemCardStuff/itemCard";
import Tooltip from "../../ui/Tooltip";
import TraitCard from "../../TraitsPages/TraitCardStuff/traitCard";
import ArtCard from "../../SpellsPages/SpellCardStuff/artCard";
import DicePopup from "../../ui/Popups/dicePopup";
import { useSpells } from "../../../hooks/useSpells";
import { useItems } from "../../../hooks/useItems";
import { useTraits } from "../../../hooks/useTraits";
import CleanCombobox from "../../joshhellscapePages/CleanCombobox";
import { Switch } from "@headlessui/react";
import { Button } from "../../ui/Button/Button";
import Popup from "../../ui/Popups/Popup";


const blank_displayedCreature = {
    "name":"",
    "level":1,
    "health":0,
    "shielding":0,
    "dodge":0,
    "ward":0,
    "strain":0,
    "speed":6,
    "stats": {
       "body":0,
        "mind":0,
        "soul":0,
        "arcana":0,
        "crafting":0,
        "charm":0,
        "nature":0,
        "medicine":0,
        "thieving":0 
    },
    "traits":"",
    "arts":"",
    "items":"",
    "items_unlisted":"",
    "stories":"",
    "description":"",
    "notes":""
}

type Props = {
    _displayedCreature?: any;
    // traits: Trait[];
    // arts: Spell[];
    // items: Item[];
};

export default function PinnedCharSheet(
    {
    _displayedCreature: _displayedCreature = blank_displayedCreature,
    // traits:traits,
    // arts:arts,
    // items:items,
}: Props) {  

    const {
        displayedSpells,
        pinnedSpells,
        removeFromPinnedSpells
    } = useSpells();
    
    const {
        displayedItems,
        pinnedItems,
        removeFromPinnedItems
    } = useItems();

    const {
        displayedTraits,
        pinnedTraits,
        removeFromPinnedTraits
    } = useTraits();




    const [edit, setEdit] = useState( true );
    const [load, setLoad] = useState( "" );
    const [openSave, setOpenSave] = useState( false );


    const [curCreature, setCurCreature] = useState( _displayedCreature );
    // window.localStorage.setItem("Temp Character Sheet", curCreature);



    const [maxMain, setMaxMain] = useState(2);
    const [maxSub, setMaxSub] = useState(2);
    
    
    const [statList, setStatList] = useState(["2","1","1","0","-1","-1"]);


    const [openDice, setOpenDice] = useState( false );
    const [dice, setDice] = useState( [1] );
    const [diceBonus, setDiceBonus] = useState( 0 );

    const [curMaxShield, setCurMaxShield] = useState( 0 );
    // const [curShielding, setCurShielding] = useState( 0 );



    const [curHP, setCurHP] = useState( 4*curCreature.stats.body+3*curCreature.stats.mind+2*curCreature.stats.soul+curCreature.level );
    const [curStrain, setCurStrain] = useState( 2*curCreature.stats.body+3*curCreature.stats.mind+4*curCreature.stats.soul+curCreature.level );

    const [curTraits, setCurTraits] = useState<Trait[]>(pinnedTraits);
    const [curArts, setCurArts] = useState<Spell[]>(pinnedSpells);
    const [curItems, setCurItems] = useState<Item[]>(pinnedItems);




    useEffect(() => {
        if (edit && (curCreature.traits != ""))
            setCurTraits(displayedTraits.filter((t) => {return curCreature.traits.includes(t.name)}));
        else if (edit) {
            setCurCreature({...curCreature, traits: pinnedTraits.map((t) => {return(t.name)}).join(";|;")});
            setCurTraits(pinnedTraits);
        }
    }, [pinnedTraits]);
    useEffect(() => {
        if (edit && (curCreature.arts != ""))
            setCurArts(displayedSpells.filter((a) => {return curCreature.arts.includes(a.name)}));
        else if (edit) {
            setCurCreature({...curCreature, arts: pinnedSpells.map((a) => {return(a.name)}).join(";|;")});
            setCurArts(pinnedSpells);
        }
    }, [pinnedSpells]);
    useEffect(() => {
        if (!edit && (curCreature.items != ""))
            setCurItems(displayedItems.filter((i) => {return curCreature.items.split(";|;").includes(i.name)}));
        else if (edit) {
            setCurCreature({...curCreature, items: pinnedItems.map((i) => {return(i.name)}).join(";|;")});
            setCurItems(pinnedItems);
        }
        // console.log(curCreature.items);
    }, [pinnedItems]);



    // function addStatlist(s:string) {
    //     setStatList(statList.concat(s));
    // }
    function removeStatlist(s:string) {
        const idx = statList.indexOf(s);
        const remaining = statList.slice();
        remaining.splice(idx, 1);
        setStatList(remaining);
    }


    // function addChosenArt(s:Spell) {
    //     if (!(curArts.includes(s)) && (curArts.length < curLvl+3)) {
    //         setCurArts(curArts.concat(s));
    //     }
    // }
    // function removeChosenArt(s:Spell) {
    //     const idx = curArts.indexOf(s);
    //     const remaining = curArts.slice();
    //     remaining.splice(idx, 1);
    //     setCurArts(remaining);
    // }


    // const [maxMain, setMaxMain] = useState(2);

    // useEffect(() => {
    //     setMaxMain(2+Math.floor((curCreature.level-1)/2));
    // }, [curCreature.level]);
    useEffect(() => {

        let items = curCreature.items != "" ? pinnedItems.map((i) => {return(i.name)}).join(";|;") : curCreature.items;
        // console.log(items)

        const maxShield = (items.includes("shield") ? curCreature.level : 0) + 
        (items.includes("light leather") ? curCreature.level : 
        items.includes("heavy plate") ? 4*curCreature.stats.body+3*curCreature.stats.mind+curCreature.level :
        items.includes("medium chainmail") ? 2*curCreature.stats.body+2*curCreature.stats.mind+curCreature.level : 0);
        // setCurShielding(maxShield);
        setCurMaxShield(maxShield);

        // window.localStorage.setItem("Temp Character Sheet", curCreature);
        if (curCreature != blank_displayedCreature) {
            window.localStorage.setItem("Temp Character Sheet", JSON.stringify(curCreature));
        } else {
            const persistentTempSheet =
                window.localStorage.getItem("Temp Character Sheet");
            if (persistentTempSheet) {
                setCurCreature(JSON.parse(persistentTempSheet));
            }
        }
        
    }, [curCreature]);

    
    
    
    
    useEffect(() => {
        setMaxMain(2+Math.floor((curCreature.level-1)/2));
        setMaxSub(2+2*(Math.floor((curCreature.level-1)/2)));
    }, [curCreature.level]);
    
    
    // console.log(new Array((4+Math.floor(curLvl/2))).fill(0));
    

    function LoadChar(name:string) {
        setCurCreature(JSON.parse(window.localStorage.getItem(name))); // as per always it will always be found due to the checks made outside of this
    }
    
    function SaveChar() {
        if (curCreature.name != "") {
            window.localStorage.setItem(curCreature.name, JSON.stringify(curCreature));
            let curSaved = (window.localStorage.getItem("Saved Chars"));
            window.localStorage.setItem("Saved Chars", curSaved+";|;"+curCreature.name);
        } else
            setOpenSave(true);
    };


    return (
        <div className="flex flex-col">
            <DicePopup 
                startingDice={dice} 
                startingBonus={diceBonus} 
                isOpen={openDice} 
                setIsOpen={setOpenDice} 
                setDice={setDice} 
                setBonus={setDiceBonus}
            />
            
            
            <Popup displayedContentName={""} 
                displayedContent={
                    <>
                    {curCreature.name == "" &&
                    <>
                    <div> No Name. </div>
                    <div> DID NOT SAVE! </div>
                    </>

                    }
                    </>
                } 
                isOpen={openSave} 
                setIsOpen={setOpenSave} 
                isSmol={true}
            />

            <div className="flex flex-row justify-center items-center bg-dark-400 rounded-md p-2 m-2">

                <Button
                    title="Clear"
                    className="w-[20%]"
                    variant={"nature"}
                    onClick={() => {SaveChar()}}
                >
                    Save Character
                </Button>
                <CleanCombobox
                    items={(window.localStorage.getItem("Saved Chars")) != null ? (window.localStorage.getItem("Saved Chars"))?.split(";|;") : [""]}
                    className="m-1 mb-2"
                    selected={load}
                    setSelected={(val) => {
                        setLoad(val);
                    }}
                />
                {/* <Button
                    title="Clear"
                    className="w-[20%]"
                    variant={"nature"}
                    onClick={() => {SaveChar()}}
                >
                    Save Character
                </Button> */}

                <div className="flex flex-row justify-center items-center bg-dark-300 rounded-md p-2 m-2">
                        {edit && <p className="flex flex-row justify-center items-center m-2">Disable Edit</p>}
                        {!edit && <p className="flex flex-row justify-center items-center m-2">Enable Edit</p>}
                        
                        <Switch
                            checked={edit}
                            onChange={setEdit}
                            className={`${
                                edit ? 'bg-body' : 'bg-dark-700'
                            } relative inline-flex h-6 w-11 items-center rounded-full`}
                            >
                            <span className="sr-only">Switch Edit</span>
                            <span
                                className={`${
                                edit ? 'translate-x-6' : 'translate-x-1'
                                } inline-block h-4 w-4 transform rounded-full bg-light transition`}
                            />
                        </Switch>
                    </div>
            </div>


            <div className="flex flex-col bg-dark-400 rounded-md border-solid border-2 border-body-700/20 m-4" >
                
                {/* Name/Level/Types */}
                <div className="flex lg:flex-row items-center bg-dark rounded-md">
                    
                    <div className="w-[50%] rounded-lg bg-dark-400 p-2 m-2 ">
                        <input
                            type="text"
                            placeholder={"Name"}
                            className="h-9 w-[100%] p-2 rounded-lg shadow-md"
                            value={curCreature.name}
                            onChange={(e) => setCurCreature({...curCreature, name: e.target.value})}
                        />
                    </div>
                    
                
                    <div className="lg:w-[17%] flex flex-row items-center rounded-md bg-dark-400 items-center capitalize p-2 m-2">
                        Level: 
                        <input
                            type="number"
                            className="h-9 w-[100%] rounded-lg p-2 mt-1 shadow-md justify-end m-1"
                            value={curCreature.level}
                            min="1"
                            max="10"
                            onChange={(e) => setCurCreature({...curCreature, level: parseFloat(e.target.value)})}
                        />
                    </div>
                    {/* <div className="w-[33%] flex flex-row items-center capitalize rounded-md bg-dark-400 p-2 m-2">
                        <input
                            type="text"
                            placeholder="Types"
                            className="h-9 rounded-lg p-2 m-1 shadow-md"
                            value={curCreature.types}
                            onChange={(e) => setCurCreature({...curCreature, types: e.target.value})}
                        />
                        <CleanCombobox
                            items={IterativeCreatureLevels}
                            className=""
                            selected={""}
                            setSelected={(val) => {
                                if (curCreature.types == "") {
                                    setCurCreature({...curCreature, types: val});
                                } else {
                                    setCurCreature({...curCreature, types: curCreature.types.concat(", ", val)});
                                }
                            }}
                        />
                    </div> */}
                </div>
                <div className="lg:grid lg:grid-cols-2 lg:gap-1 bg-dark">
                    {/* Stats */}
                    <div className="flex flex-col justify-between m-1 p-1">

                        {/* Scores */}

                        {/* Edit Version */}
                        {edit && 

                        <>
                        
                        {(maxMain - curCreature.stats.body - curCreature.stats.mind - curCreature.stats.soul) > 0 && 
                            <div className="rounded bg-dark-400 m-2 p-2 font-bold">Main Points Left: {
                               (maxMain - curCreature.stats.body - curCreature.stats.mind - curCreature.stats.soul)
                        }</div>}


                        {(maxSub - curCreature.stats.arcana - curCreature.stats.charm - curCreature.stats.crafting
                             - curCreature.stats.medicine - curCreature.stats.nature - curCreature.stats.thieving
                            ) > 0 &&
                            curCreature.level > 2 && 
                            <div className="rounded bg-dark-400 m-2 p-2 font-bold">Sub Points Left: {
                                (maxSub - curCreature.stats.arcana - curCreature.stats.charm - curCreature.stats.crafting
                             - curCreature.stats.medicine - curCreature.stats.nature - curCreature.stats.thieving
                        )}</div>}

                        <div className="grid grid-cols-3 gap-1 justify-left bg-dark-400 p-3 rounded-md flex-wrap w-full m-2 mt-0">    
                            <div className="bg-body font-bold rounded-xl p-1 m-1 pl-2 pr-2">
                                Body:
                                <input
                                    type="number"
                                    className="bg-body h-9 rounded-lg justify-end m-1 p-2 w-full"
                                    value={curCreature.stats.body}
                                    min="0"
                                    max={maxMain - (curCreature.stats.mind+curCreature.stats.soul)}
                                    onChange={(e) => setCurCreature({...curCreature, stats: {...curCreature.stats, body: parseFloat(e.target.value)}})}
                                />
                            </div>
                            <div className="bg-mind font-bold rounded-xl p-1 m-1 pl-2 pr-2">
                                Mind:
                                <input
                                    type="number"
                                    className="bg-mind h-9 rounded-lg justify-end m-1 p-2 w-full"
                                    value={curCreature.stats.mind}
                                    min="0"
                                    max={maxMain - (curCreature.stats.body+curCreature.stats.soul)}
                                    onChange={(e) => setCurCreature({...curCreature, stats: {...curCreature.stats, mind: parseFloat(e.target.value)}})}
                                />
                            </div>
                            <div className="bg-soul font-bold rounded-xl p-1 m-1 pl-2 pr-2">
                                Soul:
                                <input
                                    type="number"
                                    className="bg-soul h-9 rounded-lg justify-end m-1 p-2 w-full"
                                    value={curCreature.stats.soul}
                                    min="0"
                                    max={maxMain - (curCreature.stats.body+curCreature.stats.mind)}
                                    onChange={(e) => setCurCreature({...curCreature, stats: {...curCreature.stats, soul: parseFloat(e.target.value)}})}
                                />
                            </div>
                            <div className="bg-arcana font-bold rounded-xl p-1 m-1 pl-2 pr-2">
                                Arcana:
                                {curCreature.level == 1 && 
                                    <CleanCombobox
                                        items={statList}
                                        className="m-1 mb-2"
                                        selected={curCreature.stats.arcana}
                                        color={"arcana"}
                                        setSelected={(val) => {
                                            
                                            statList.push((curCreature.stats.arcana).toString());
                                            removeStatlist(val);
                                            setCurCreature({...curCreature, stats: {...curCreature.stats, arcana: parseFloat(val)}})
                                        }}
                                    />
                                }
                                {curCreature.level > 1 &&
                                <input
                                    type="number"
                                    className="bg-arcana h-9 rounded-lg justify-end m-1 p-2 w-full"
                                    value={curCreature.stats.arcana}
                                    min="-2"
                                    max={Math.min(maxMain, maxSub - (
                                                    curCreature.stats.charm +
                                                    curCreature.stats.crafting +
                                                    curCreature.stats.medicine +
                                                    curCreature.stats.nature +
                                                    curCreature.stats.thieving
                                                  ))}
                                    onChange={(e) => setCurCreature({...curCreature, stats: {...curCreature.stats, arcana: parseFloat(e.target.value)}})}
                                />
                                }
                            </div>
                            <div className="bg-charm font-bold rounded-xl p-1 m-1 pl-2 pr-2">
                                Charm:
                                {curCreature.level == 1 && 
                                    <CleanCombobox
                                        items={statList}
                                        className="m-1 mb-2"
                                        selected={curCreature.stats.charm}
                                        color={"charm"}
                                        setSelected={(val) => {
                                            
                                            statList.push((curCreature.stats.charm).toString());
                                            removeStatlist(val);
                                            setCurCreature({...curCreature, stats: {...curCreature.stats, charm: parseFloat(val)}})
                                        }}
                                    />
                                }
                                {curCreature.level > 1 &&
                                <input
                                    type="number"
                                    className="bg-charm h-9 rounded-lg justify-end m-1 p-2 w-full"
                                    value={curCreature.stats.charm}
                                    min="-2"
                                    max={Math.min(maxMain, maxSub - (curCreature.stats.arcana +
                                                    curCreature.stats.crafting +
                                                    curCreature.stats.medicine +
                                                    curCreature.stats.nature +
                                                    curCreature.stats.thieving
                                                  ))}
                                    onChange={(e) => setCurCreature({...curCreature, stats: {...curCreature.stats, charm: parseFloat(e.target.value)}})}
                                />
                                }
                            </div>
                            <div className="bg-crafting font-bold rounded-xl p-1 m-1 pl-2 pr-2">
                                Crafting:
                                {curCreature.level == 1 && 
                                    <CleanCombobox
                                        items={statList}
                                        className="m-1 mb-2"
                                        selected={curCreature.stats.crafting}
                                        color={"crafting"}
                                        setSelected={(val) => {
                                            
                                            statList.push((curCreature.stats.crafting).toString());
                                            removeStatlist(val);
                                            setCurCreature({...curCreature, stats: {...curCreature.stats, crafting: parseFloat(val)}})
                                        }}
                                    />
                                }
                                {curCreature.level > 1 &&
                                <input
                                    type="number"
                                    className="bg-crafting h-9 rounded-lg justify-end m-1 p-2 w-full"
                                    value={curCreature.stats.crafting}
                                    min="-2"
                                    max={Math.min(maxMain, maxSub - (curCreature.stats.arcana +
                                                    curCreature.stats.charm +
                                                    curCreature.stats.medicine +
                                                    curCreature.stats.nature +
                                                    curCreature.stats.thieving
                                                  ))}
                                    onChange={(e) => setCurCreature({...curCreature, stats: {...curCreature.stats, crafting: parseFloat(e.target.value)}})}
                                />
                                }
                            </div>
                            <div className="bg-medicine font-bold rounded-xl p-1 m-1 pl-2 pr-2">
                                Medicine:
                                {curCreature.level == 1 && 
                                    <CleanCombobox
                                        items={statList}
                                        className="m-1 mb-2"
                                        selected={curCreature.stats.medicine}
                                        color={"medicine"}
                                        setSelected={(val) => {
                                            
                                            statList.push((curCreature.stats.medicine).toString());
                                            removeStatlist(val);
                                            setCurCreature({...curCreature, stats: {...curCreature.stats, medicine: parseFloat(val)}})
                                        }}
                                    />
                                }
                                {curCreature.level > 1 &&
                                <input
                                    type="number"
                                    className="bg-medicine h-9 rounded-lg justify-end m-1 p-2 w-full"
                                    value={curCreature.stats.medicine}
                                    min="-2"
                                    max={Math.min(maxMain, maxSub - (curCreature.stats.arcana +
                                                    curCreature.stats.charm +
                                                    curCreature.stats.crafting +
                                                    curCreature.stats.nature +
                                                    curCreature.stats.thieving
                                                  ))}
                                    onChange={(e) => setCurCreature({...curCreature, stats: {...curCreature.stats, medicine: parseFloat(e.target.value)}})}
                                />
                                }
                            </div>
                            <div className="bg-nature font-bold rounded-xl p-1 m-1 pl-2 pr-2">
                                Nature: 
                                {curCreature.level == 1 && 
                                    <CleanCombobox
                                        items={statList}
                                        className="m-1 mb-2"
                                        selected={curCreature.stats.nature}
                                        color={"nature"}
                                        setSelected={(val) => {
                                            
                                            statList.push((curCreature.stats.nature).toString());
                                            removeStatlist(val);
                                            setCurCreature({...curCreature, stats: {...curCreature.stats, nature: parseFloat(val)}})
                                        }}
                                    />
                                }
                                {curCreature.level > 1 &&
                                <input
                                    type="number"
                                    className="bg-nature h-9 rounded-lg justify-end m-1 p-2 w-full"
                                    value={curCreature.stats.nature}
                                    min="-2"
                                    max={Math.min(maxMain, maxSub - (curCreature.stats.arcana +
                                                    curCreature.stats.charm +
                                                    curCreature.stats.crafting +
                                                    curCreature.stats.medicine +
                                                    curCreature.stats.thieving
                                                  ))}
                                    onChange={(e) => setCurCreature({...curCreature, stats: {...curCreature.stats, nature: parseFloat(e.target.value)}})}
                                />
                                }
                            </div>
                            <div className="items-center bg-thieving font-bold rounded-xl p-1 m-1 pl-2 pr-2">
                                Thieving:
                                {curCreature.level == 1 && 
                                    <CleanCombobox
                                        items={statList}
                                        className="m-1 mb-2"
                                        selected={curCreature.stats.thieving}
                                        color={"thieving"}
                                        setSelected={(val) => {
                                            
                                            statList.push((curCreature.stats.thieving).toString());
                                            removeStatlist(val);
                                            setCurCreature({...curCreature, stats: {...curCreature.stats, thieving: parseFloat(val)}})
                                        }}
                                    />
                                }
                                {curCreature.level > 1 &&
                                <input
                                    type="number"
                                    className="bg-thieving h-9 rounded-lg justify-end m-1 p-2 w-full"
                                    value={curCreature.stats.thieving}
                                    min="-2"
                                    max={Math.min(maxMain, maxSub - (curCreature.stats.arcana +
                                                    curCreature.stats.charm +
                                                    curCreature.stats.crafting +
                                                    curCreature.stats.medicine +
                                                    curCreature.stats.nature
                                                  ))}
                                    onChange={(e) => setCurCreature({...curCreature, stats: {...curCreature.stats, thieving: parseFloat(e.target.value)}})}
                                />
                                }
                            </div>
                        </div>
                        </>
                        }
                        
                        {/* Diceroller version */}
                        {!edit &&
                        <div className="grid grid-cols-3 gap-1 justify-left bg-dark-400 p-3 rounded-md flex-wrap w-full m-2 mt-0">    
                            <div className="bg-body text-sm lg:text-[1rem] lg:font-bold rounded-xl p-1 m-1 lg:pl-2 pr-2"
                                onClick={() => {setOpenDice(true); setDiceBonus(curCreature.stats.body); setDice([1]);}}>
                                Body {curCreature.stats.body > 0 ? "+":""}{curCreature.stats.body}
                            </div>
                            <div className="bg-mind text-sm lg:text-[1rem] lg:font-bold rounded-xl p-1 m-1 lg:pl-2 pr-2"
                                onClick={() => {setOpenDice(true); setDiceBonus(curCreature.stats.mind); setDice([1]);}}>
                                Mind {curCreature.stats.mind > 0 ? "+":""}{curCreature.stats.mind}
                            </div>
                            <div className="bg-soul text-sm lg:text-[1rem] lg:font-bold rounded-xl p-1 m-1 lg:pl-2 pr-2"
                                onClick={() => {setOpenDice(true); setDiceBonus(curCreature.stats.soul); setDice([1]);}}>
                                Soul {curCreature.stats.soul > 0 ? "+":""}{curCreature.stats.soul}
                            </div>
                            <div className="bg-arcana text-sm lg:text-[1rem] lg:font-bold rounded-xl p-1 m-1 lg:pl-2 pr-2"
                                onClick={() => {setOpenDice(true); setDiceBonus(curCreature.stats.arcana); setDice([1]);}}>
                                Arcana {curCreature.stats.arcana > 0 ? "+":""}{curCreature.stats.arcana}
                            </div>
                            <div className="bg-charm text-sm lg:text-[1rem] lg:font-bold rounded-xl p-1 m-1 lg:pl-2 pr-2"
                                onClick={() => {setOpenDice(true); setDiceBonus(curCreature.stats.charm); setDice([1]);}}>
                                Charm {curCreature.stats.charm > 0 ? "+":""}{curCreature.stats.charm}
                            </div>
                            <div className="bg-crafting text-sm lg:text-[1rem] lg:font-bold rounded-xl p-1 m-1 lg:pl-2 pr-2"
                                onClick={() => {setOpenDice(true); setDiceBonus(curCreature.stats.crafting); setDice([1]);}}>
                                Crafting {curCreature.stats.crafting > 0 ? "+":""}{curCreature.stats.crafting}
                            </div>
                            <div className="bg-medicine text-sm lg:text-[1rem] lg:font-bold rounded-xl p-1 m-1 lg:pl-2 pr-2"
                                onClick={() => {setOpenDice(true); setDiceBonus(curCreature.stats.medicine); setDice([1]);}}>
                                Medicine {curCreature.stats.medicine > 0 ? "+":""}{curCreature.stats.medicine}
                            </div>
                            <div className="bg-nature text-sm lg:text-[1rem] lg:font-bold rounded-xl p-1 m-1 lg:pl-2 pr-2"
                                onClick={() => {setOpenDice(true); setDiceBonus(curCreature.stats.nature); setDice([1]);}}>
                                Nature {curCreature.stats.nature > 0 ? "+":""}{curCreature.stats.nature}
                            </div>
                            <div className="bg-thieving text-sm lg:text-[1rem] lg:font-bold rounded-xl p-1 m-1 lg:pl-2 pr-2"
                                onClick={() => {setOpenDice(true); setDiceBonus(curCreature.stats.thieving); setDice([1]);}}>
                                Thieving {curCreature.stats.thieving > 0 ? "+":""}{curCreature.stats.thieving}
                            </div>
                        </div>
                        }

                        {/* HP/Shielding/Dodge/Ward/Strain/Speed/Combat Dice */}
                        <div className="flex flex-col justify-between bg-dark-400 m-2 p-2 w-full rounded-md text-sm lg:text-bas">
                            <div className="lg:flex lg:flex-row grid grid-cols-2 w-full justify-between">

                                <div className="flex flex-col bg-dark-300 p-2 rounded-md m-2">
                                    HEALTH:
                                    <div className="flex flex-row justify-center items-center">
                                        <input
                                            type="number"
                                            className="h-9 w-16 rounded-lg p-2 mt-1 mr-1 justify-end bg-dark-300 border-solid border-2 border-dark-400"
                                            value={curHP}
                                            min="0"
                                            onChange={(e) => setCurHP(parseFloat(e.target.value))}
                                        />
                                        / {4*curCreature.stats.body +
                                           3*curCreature.stats.mind +
                                           2*curCreature.stats.soul +
                                           Math.ceil(curCreature.level)}
                                    </div>
                                </div>

                                <div className="flex flex-col bg-dark-300 p-2 rounded-md m-2">
                                    SHIELDING:
                                    <div className="flex flex-row justify-center items-center">
                                        <input
                                            type="number"
                                            className="h-9 w-16 rounded-lg p-2 mt-1 mr-1 justify-end bg-dark-300 border-solid border-2 border-dark-400"
                                            min="0"
                                            value={curCreature.shielding}
                                            onChange={(e) => setCurCreature({...curCreature, shielding: parseFloat(e.target.value)})}
                                        />
                                        / {curMaxShield}
                                    </div>
                                </div>

                                <div className="flex flex-col bg-dark-300 p-2 rounded-md m-2 justify-center items-center">
                                    <div className="mb-2">
                                    DODGE: {curCreature.items.includes("light leather") || curCreature.items.includes("clothing") ? "+1": curCreature.items.includes("heavy plate") ? "-1" : "0"}
                                    </div>
                                    
                                    SPEED: {curCreature.items.includes("clothing") ? "7": curCreature.items.includes("heavy plate") || curCreature.items.includes("medium chainmail") ? "5" : "6"}
                                </div>
                                <div className="flex flex-col bg-dark-300 p-2 rounded-md m-2 justify-center items-center"
                                        onClick={() => {setOpenDice(true); setDiceBonus(0); setDice(new Array((4+Math.floor(curCreature.level/2))).fill(1));}}>
                                    CD:
                                    <div className="flex flex-row justify-center items-center font-bold">
                                        {4+Math.floor(curCreature.level/2)}
                                    </div>
                                </div>

                                <div className="flex flex-col bg-dark-300 p-2 rounded-md m-2">
                                    STRAIN:
                                    <div className="flex flex-row justify-center items-center">
                                        <input
                                            type="number"
                                            className="h-9 w-16 rounded-lg p-2 mt-1 mr-1 justify-end bg-dark-300 border-solid border-2 border-dark-400"
                                            value={curStrain}
                                            min="0"
                                            onChange={(e) => setCurStrain(parseFloat(e.target.value))}
                                        />
                                        / {2*curCreature.stats.body +
                                           3*curCreature.stats.mind + 
                                           4*curCreature.stats.soul + 
                                           Math.ceil(curCreature.level)}
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                    {/* Stories */}
                    <div className="flex flex-col bg-dark-400 rounded-md p-1 m-2 break-inside-avoid">
                        <h3 className="font-bold bg-dark-300 rounded-md p-1 m-1 underline">
                            <a href="https://quiltic.github.io/rpg-hell-frontend/rulebook/character-creation#stories">
                                Stories
                            </a>
                        </h3>
                        <textarea
                            placeholder="Here is a spot for your Stories!
There is a link above for what a Story is!"
                            className="bg-dark-300 h-full rounded-lg p-1 m-1"
                            value={curCreature.stories}
                            onChange={(e) => setCurCreature({...curCreature, stories: e.target.value})}
                        />
                    </div>

                    {/* Weps */}
                    <div className="flex flex-col bg-dark-400 rounded-md p-1 m-2">
                        <h3 className="font-bold bg-dark-300 rounded-md p-1 m-1">WEAPONS</h3>

                        <div className="lg:grid lg:grid-cols-2">
                            {curItems.map( (i,id) => {return (
                                <>
                                {(i.tags.includes("weapon") || i.tags.includes("side")) && 
                                    <ItemCard _item={{...i, upgrades:[]}} _className="m-1" key={id}
                                    moveItem={() => {edit ? removeFromPinnedItems(i) : {}}}
                                />}

                                </>
                            );})}
                        </div>
                    </div>

                    {/* Items */}
                    <div className="flex flex-col bg-dark-400 rounded-md p-1 m-2">
                        <h3 className="font-bold bg-dark-300 rounded-md p-1 m-1">ITEMS</h3>
                        <div className="grid grid-cols-2">
                            {curItems.map( (i,id) => {return (
                                <>
                                {
                                    (!i.tags.includes("weapon") && !i.tags.includes("side")) &&
                                    <Tooltip text={i.name} key={id}
                                            display={
                                                <ItemCard _item={{...i, upgrades:[]}} _className="m-1 w-96"
                                                moveItem={() => {edit ? removeFromPinnedItems(i) : {}}}
                                                />
                                            } 
                                            className="capitalize rounded-md bg-dark-300 p-1 m-1"
                                    />
                                }
                                
                                </>
                            );})}
                        </div>
                        <textarea
                            placeholder="For any new items you pick up along the way."
                            className="bg-dark-300 h-auto w-[100%] rounded-lg p-1 m-1 mt-3"
                            value={curCreature.items_unlisted}
                            onChange={(e) => setCurCreature({...curCreature, items_unlisted: e.target.value})}
                        />
                    </div>
                </div>
                

                {/* Descriptor/How Act */}
                {/* <div className="flex flex-row italic bg-dark-400 m-2 ptlr-2">
                    <textarea
                        placeholder="Description of the creature and hints for narration for the GM."
                        className="bg-dark-300 h-22 w-[100%] rounded-lg p-1 m-1"
                        value={curCreature.descriptor}
                        onChange={(e) => setCurCreature({...curCreature, descriptor: e.target.value})}
                    />
                </div>
                <div className="flex flex-row italic bg-dark-400 pl-12">
                    <textarea
                        placeholder="How the creature should act; Group, Dangerous, Fishlike, Hungry"
                        className="bg-dark-300 h-9 w-[50%] rounded-lg p-1 m-1"
                        value={curCreature.how_act}
                        onChange={(e) => setCurCreature({...curCreature, how_act: e.target.value})}
                    />
                </div> */}


                {/* Line */}
                <div className="flex flex-row items-center bg-dark-400 border-2 border-body-700/20 m-2"></div>

                

                <div className="lg:grid lg:grid-cols-2 items-center bg-dark rounded-md justify-between">
                    {/* Traits */}
                    <div className="flex flex-col bg-dark-400 rounded-md p-1 m-2">
                        <h3 className="font-bold bg-dark-300 rounded-md p-1 m-1">TRAITS</h3>

                        <div className="lg:grid lg:grid-cols-2">

                            {curTraits.map( (t:Trait, id:number) => { return (
                                <TraitCard _trait={t} _className="m-1" moveTrait={() => edit ? removeFromPinnedTraits(t) : {}} key={id}/>
                            )})}

                            
                        </div>
                    </div>
                        
                    {/* Arts */}
                    <div className="flex flex-col bg-dark-400 rounded-md p-1 m-2">
                        <h3 className="font-bold bg-dark-300 rounded-md p-1 m-1">ARTS</h3>

                        <div className="lg:grid lg:grid-cols-2">

                            {curArts.map( (s:Spell, id:number) => { return (
                                <ArtCard _spell={s} _className="m-1" moveSpell={() => edit ? removeFromPinnedSpells(s) : {}} key={id}/>
                            )})}

                            
                        </div>
                    </div>
                </div>

            </div>

            {/* <textarea name="json" id="json" className="bg-dark-600 rounded-md border-solid border-2 border-body-700/20 h-44 m-4 p-2" value={JSON.stringify(curCreature).concat(",")}/>

            <div className="flex justify-center">
                <Button
                    title="Clear"
                    className="w-[20%]"
                    variant={"medicine"}
                    onClick={() => {setCurCreature(_displayedCreature)}}
                >
                    Clear
                </Button>
            </div> */}
        </div>
    );
}


