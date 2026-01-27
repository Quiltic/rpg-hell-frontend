

import { useEffect, useState} from "react";
import { Trait, Item, Spell } from "../../../client";
import ItemCard from "../../ItemPages/ItemCardStuff/itemCard";
import Tooltip from "../../ui/Tooltip";
import TraitCard from "../../TraitsPages/TraitCardStuff/traitCard";
import ArtCard from "../../SpellsPages/SpellCardStuff/artCard";
import DicePopup from "../../ui/Popups/dicePopup";


const example_displayedCreature = {
        "name": "",
        "stats": {
            "body": 0,
            "mind": 0,
            "soul": 0,
            "arcana": 0,
            "crafting": 0,
            "charm": 0,
            "nature": 0,
            "medicine": 0,
            "thieving": 0
        },
        "items": "",
        "quick_exp": "",
        "level_explanation": ["","",""],
        "traits": [["",""],[""],[""]],
        "arts": [["","","",""],[""],[""]]
    }

type Props = {
    _displayedCreature: any;
    traits: Trait[];
    arts: Spell[];
    items: Item[];
};

export default function ExampleCharSheet({
    _displayedCreature: _displayedCreature = example_displayedCreature,
    traits:traits,
    arts:arts,
    items:items,
}: Props) {  


    const [openDice, setOpenDice] = useState( false );
    const [dice, setDice] = useState( [1] );
    const [diceBonus, setDiceBonus] = useState( 0 );

    // const [curCreature, setCurCreature] = useState( _displayedCreature );
    const [curLvl, setCurLvl] = useState( 1 );
    const [curMaxShield, setCurMaxShield] = useState( 0 );
    const [curShielding, setCurShielding] = useState( 0 );



    const [curHP, setCurHP] = useState( 4*_displayedCreature.stats.body+3*_displayedCreature.stats.mind+2*_displayedCreature.stats.soul+curLvl );
    const [curStrain, setCurStrain] = useState( 2*_displayedCreature.stats.body+3*_displayedCreature.stats.mind+4*_displayedCreature.stats.soul+curLvl );

    const [curStories, setCurStories] = useState( "" );
    const [curTraits, setCurTraits] = useState<Trait[]>([]);
    const [curArts, setCurArts] = useState<Spell[]>([]);

    function addChosenTrait(t:Trait) {
        if (!(curTraits.includes(t)) && (curTraits.length < curLvl+1)) {
            setCurTraits(curTraits.concat(t));
        }
    }
    function removeChosenTrait(t:Trait) {
        const idx = curTraits.indexOf(t);
        const remaining = curTraits.slice();
        remaining.splice(idx, 1);
        setCurTraits(remaining);
    }


    function addChosenArt(s:Spell) {
        if (!(curArts.includes(s)) && (curArts.length < curLvl+3)) {
            setCurArts(curArts.concat(s));
        }
    }
    function removeChosenArt(s:Spell) {
        const idx = curArts.indexOf(s);
        const remaining = curArts.slice();
        remaining.splice(idx, 1);
        setCurArts(remaining);
    }


    // const [maxMain, setMaxMain] = useState(2);

    // useEffect(() => {
    //     setMaxMain(2+Math.floor((curCreature.level-1)/2));
    // }, [curCreature.level]);
    useEffect(() => {
        const maxShield = (_displayedCreature.items.includes("shield") ? curLvl : 0) + 
        (_displayedCreature.items.includes("light leather") ? curLvl : 
        _displayedCreature.items.includes("heavy plate") ? 4*_displayedCreature.stats.body+3*_displayedCreature.stats.mind+curLvl :
        _displayedCreature.items.includes("medium chainmail") ? 2*_displayedCreature.stats.body+2*_displayedCreature.stats.mind+curLvl : 0);
        setCurShielding(maxShield);
        setCurMaxShield(maxShield);
    }, [curLvl, _displayedCreature]);


    console.log(new Array((4+Math.floor(curLvl/2))).fill(0));


    return (
        <div className="flex flex-col">
            <DicePopup 
                startingDice={dice} 
                startingBonus={diceBonus} 
                isOpen={openDice} 
                setIsOpen={setOpenDice} 
                setDice={setDice} 
                setBonus={setDiceBonus}/>


            <div className="flex flex-col bg-dark-400 rounded-md border-solid border-2 border-body-700/20 m-4" >
                
                {/* Name/Level/Types */}
                <div className="flex flex-row items-center bg-dark rounded-md">
                    
                    <div className="w-[50%] rounded-lg bg-dark-400 p-2 m-2 ">
                        <input
                            type="text"
                            placeholder={_displayedCreature.name}
                            className="h-9 w-[100%] p-2 rounded-lg shadow-md"
                            // value={curCreature.name}
                            // onChange={(e) => setCurCreature({...curCreature, name: e.target.value})}
                        />
                    </div>
                    
                
                    <div className="w-[17%] flex flex-row items-center rounded-md bg-dark-400 items-center capitalize p-2 m-2">
                        Level: 
                        <input
                            type="number"
                            className="h-9 w-[100%] rounded-lg p-2 mt-1 shadow-md justify-end m-1"
                            value={curLvl}
                            min="1"
                            max="3"
                            onChange={(e) => setCurLvl(parseFloat(e.target.value))}
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
                <div className="grid grid-cols-2 gap-1  bg-dark">
                    {/* Stats */}
                    <div className="flex flex-col justify-between m-1 p-1">

                        {/* Scores */}
                        <div className="grid grid-cols-3 gap-1 justify-left bg-dark-400 p-3 rounded-md flex-wrap w-full m-2 mt-0">    
                            <div className="bg-body font-bold rounded-xl p-1 m-1 pl-2 pr-2"
                                onClick={() => {setOpenDice(true); setDiceBonus(_displayedCreature.stats.body); setDice([0]);}}>
                                Body {_displayedCreature.stats.body > 0 ? "+":""}{_displayedCreature.stats.body}
                            </div>
                            <div className="bg-mind font-bold rounded-xl p-1 m-1 pl-2 pr-2"
                                onClick={() => {setOpenDice(true); setDiceBonus(_displayedCreature.stats.mind); setDice([0]);}}>
                                Mind {_displayedCreature.stats.mind > 0 ? "+":""}{_displayedCreature.stats.mind}
                            </div>
                            <div className="bg-soul font-bold rounded-xl p-1 m-1 pl-2 pr-2"
                                onClick={() => {setOpenDice(true); setDiceBonus(_displayedCreature.stats.soul); setDice([0]);}}>
                                Soul {_displayedCreature.stats.soul > 0 ? "+":""}{_displayedCreature.stats.soul}
                            </div>
                            <div className="bg-arcana font-bold rounded-xl p-1 m-1 pl-2 pr-2"
                                onClick={() => {setOpenDice(true); setDiceBonus(_displayedCreature.stats.arcana); setDice([0]);}}>
                                Arcana {_displayedCreature.stats.arcana > 0 ? "+":""}{_displayedCreature.stats.arcana}
                            </div>
                            <div className="bg-charm font-bold rounded-xl p-1 m-1 pl-2 pr-2"
                                onClick={() => {setOpenDice(true); setDiceBonus(_displayedCreature.stats.charm); setDice([0]);}}>
                                Charm {_displayedCreature.stats.charm > 0 ? "+":""}{_displayedCreature.stats.charm}
                            </div>
                            <div className="bg-crafting font-bold rounded-xl p-1 m-1 pl-2 pr-2"
                                onClick={() => {setOpenDice(true); setDiceBonus(_displayedCreature.stats.crafting); setDice([0]);}}>
                                Crafting {_displayedCreature.stats.crafting > 0 ? "+":""}{_displayedCreature.stats.crafting}
                            </div>
                            <div className="bg-medicine font-bold rounded-xl p-1 m-1 pl-2 pr-2"
                                onClick={() => {setOpenDice(true); setDiceBonus(_displayedCreature.stats.medicine); setDice([0]);}}>
                                Medicine {_displayedCreature.stats.medicine > 0 ? "+":""}{_displayedCreature.stats.medicine}
                            </div>
                            <div className="bg-nature font-bold rounded-xl p-1 m-1 pl-2 pr-2"
                                onClick={() => {setOpenDice(true); setDiceBonus(_displayedCreature.stats.nature); setDice([0]);}}>
                                Nature {_displayedCreature.stats.nature > 0 ? "+":""}{_displayedCreature.stats.nature}
                            </div>
                            <div className="bg-thieving font-bold rounded-xl p-1 m-1 pl-2 pr-2"
                                onClick={() => {setOpenDice(true); setDiceBonus(_displayedCreature.stats.thieving); setDice([0]);}}>
                                Thieving {_displayedCreature.stats.thieving > 0 ? "+":""}{_displayedCreature.stats.thieving}
                            </div>
                        </div>

                        <div className="flex flex-col justify-between bg-dark-400 m-2 p-2 w-full rounded-md">
                            
                            {/* HP/Shielding/Dodge/Ward/Strain/Speed/Combat Dice */}
                            <div className="flex flex-row w-full justify-between">

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
                                        / {4*_displayedCreature.stats.body+3*_displayedCreature.stats.mind+2*_displayedCreature.stats.soul+Math.ceil(curLvl)}
                                    </div>
                                </div>

                                <div className="flex flex-col bg-dark-300 p-2 rounded-md m-2">
                                    SHIELDING:
                                    <div className="flex flex-row justify-center items-center">
                                        <input
                                            type="number"
                                            className="h-9 w-16 rounded-lg p-2 mt-1 mr-1 justify-end bg-dark-300 border-solid border-2 border-dark-400"
                                            value={curShielding}
                                            min="0"
                                            onChange={(e) => setCurShielding(parseFloat(e.target.value))}
                                        />
                                        / {curMaxShield}
                                    </div>
                                </div>

                                <div className="flex flex-col bg-dark-300 p-2 rounded-md m-2 justify-center items-center">
                                    <div className="mb-2">
                                    DODGE: {_displayedCreature.items.includes("light leather") || _displayedCreature.items.includes("clothing") ? "+1": _displayedCreature.items.includes("heavy plate") ? "-1" : "0"}
                                    </div>
                                    
                                    SPEED: {_displayedCreature.items.includes("clothing") ? "7": _displayedCreature.items.includes("heavy plate") || _displayedCreature.items.includes("medium chainmail") ? "5" : "6"}
                                </div>
                                <div className="flex flex-col bg-dark-300 p-2 rounded-md m-2 justify-center items-center">
                                    CD:
                                    <div className="flex flex-row justify-center items-center font-bold"
                                        onClick={() => {setOpenDice(true); setDiceBonus(0); setDice(new Array((4+Math.floor(curLvl/2))).fill(0));}}>
                                        {4+Math.floor(curLvl/2)}
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
                                        / {2*_displayedCreature.stats.body+3*_displayedCreature.stats.mind+4*_displayedCreature.stats.soul+Math.ceil(curLvl)}
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                    {/* Stories */}
                    <div className="flex flex-col bg-dark-400 rounded-md p-1 m-2">
                        <h3 className="font-bold bg-dark-300 rounded-md p-1 m-1 underline">
                            <a href="https://quiltic.github.io/rpg-hell-frontend/rulebook/character-creation#stories">
                                Stories
                            </a>
                        </h3>
                        <textarea
                            placeholder="Here is a spot for your Stories!
There is a link above for what a Story is!"
                            className="bg-dark-300 h-full rounded-lg p-1 m-1"
                            value={curStories}
                            onChange={(e) => setCurStories(e.target.value)}
                        />
                    </div>

                    {/* Weps */}
                    <div className="flex flex-col bg-dark-400 rounded-md p-1 m-2">
                        <h3 className="font-bold bg-dark-300 rounded-md p-1 m-1">WEAPONS</h3>

                        <div className="grid grid-cols-2">
                            {items.map( (i,id) => {return (
                                <>
                                {(i.tags.includes("weapon") || i.tags.includes("side")) && <ItemCard _item={{...i, upgrades:[]}} _className="m-1"/>}

                                </>
                            );})}
                        </div>
                    </div>

                    {/* Items */}
                    <div className="flex flex-col bg-dark-400 rounded-md p-1 m-2">
                        <h3 className="font-bold bg-dark-300 rounded-md p-1 m-1">ITEMS</h3>
                        <div className="grid grid-cols-2">
                            {items.map( (i,id) => {return (
                                <>
                                {
                                    (!i.tags.includes("weapon") && !i.tags.includes("side")) &&
                                    <Tooltip text={i.name} key={id}
                                            display={<ItemCard _item={{...i, upgrades:[]}} _className="m-1 w-96"/>} 
                                            className="capitalize rounded-md bg-dark-300 p-1 m-1"
                                    />
                                }
                                
                                </>
                            );})}
                        </div>
                        <textarea
                            placeholder="For any new items you pick up along the way."
                            className="bg-dark-300 h-auto w-[100%] rounded-lg p-1 m-1 mt-3"
                            // value={curCreature.descriptor}
                            // onChange={(e) => setCurCreature({...curCreature, descriptor: e.target.value})}
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

                

                <div className="grid grid-cols-2 items-center bg-dark rounded-md justify-between">
                    {/* Traits */}
                    <div className="flex flex-col bg-dark-400 rounded-md p-1 m-2">
                        <h3 className="font-bold bg-dark-300 rounded-md p-1 m-1">TRAITS</h3>
                        {/* <textarea
                            placeholder="**Reminder** - Spend ## and 3 Strain; You this is how actives should look."
                            className="bg-dark-300 h-44 rounded-lg p-1 m-1"
                            value={curCreature.arts}
                            onChange={(e) => setCurCreature({...curCreature, arts: e.target.value})}
                        /> */}

                        {["At level 1 ", "At level 2 ", "At level 3 "].map( (front:string,val:number) => { return (
                            <>

                            {curLvl >= val+1 && curTraits.length < curLvl+1 && _displayedCreature.traits[val].map((list:string, id:number) => { 
                            
                            if (list.split(". ").length == 1) {
                                const foundTrait = traits.find((trait) => {return (trait.name == list)});
                                return ( 
                                <>
                                 {!(curTraits.includes(foundTrait)) && // foundTrait will always be found as it is found when giving all traits
                                 
                                    <div className="flex flex-row justify-center items-center"
                                    onClick={() => {addChosenTrait(foundTrait)}}
                                    >
                                        {front} we recommend taking <Tooltip text={list} key={id}
                                                display={<>
                                                <h3 className="rounded-md bg-dark-300 p-2 -mb-2 mt-1">CLICK TO PICK ME</h3>
                                                <TraitCard _trait={foundTrait} _className="m-1 w-96" moveTrait={() => addChosenTrait(foundTrait)}/>
                                                </>} 
                                                className="capitalize rounded-md bg-dark-300 p-1 m-1"
                                                
                                        />
                                    </div>
                                 
                                 }
                                </>
                                )
                            }
                        
                        
                            return (
                                <>
                                { curTraits.length < curLvl+1 &&
                                    <div className="flex flex-row justify-center items-center">
                                        {front} pick one of the following: 
                                        {list.split(". ").map( (t:string,id:number) => {
                                            const foundTrait = traits.find((trait) => {return (trait.name == t)});
                                            // console.log(traits)
                                            return (
                                                <>
                                                {!(curTraits.includes(foundTrait)) &&  // foundTrait will always be found as it is found when giving all traits
                                                
                                                <div key={id} className="flex flex-row justify-center items-center"
                                                onClick={() => {addChosenTrait(foundTrait)}}
                                                >
                                                    <Tooltip text={t} key={id}
                                                            display={<>
                                                            <h3 className="rounded-md bg-dark-300 p-2 -mb-2 mt-1">CLICK TO PICK ME</h3>
                                                            <TraitCard _trait={foundTrait} _className="m-1 w-96" moveTrait={() => addChosenTrait(foundTrait)}/>
                                                            </>} 
                                                            className="capitalize rounded-md bg-dark-300 p-1 m-1"
                                                    />
                                                </div>
                                                }
                                                </>
                                        );})}
                                    </div>
                                }
                                </>
                            )})}</>)}
                        )}



                        <div className="grid grid-cols-2">

                            {curTraits.map( (t:Trait, id:number) => { return (
                                <TraitCard _trait={t} _className="m-1" moveTrait={() => removeChosenTrait(t)} key={id}/>
                            )})}

                            
                        </div>
                    </div>
                        
                    {/* Arts */}
                    <div className="flex flex-col bg-dark-400 rounded-md p-1 m-2">
                        <h3 className="font-bold bg-dark-300 rounded-md p-1 m-1">ARTS</h3>
                        {/* <textarea
                            placeholder="**Reminder** - Spend ## and 3 Strain; You this is how actives should look."
                            className="bg-dark-300 h-44 rounded-lg p-1 m-1"
                            value={curCreature.arts}
                            onChange={(e) => setCurCreature({...curCreature, arts: e.target.value})}
                        /> */}

                        {["At level 1 ", "At level 2 ", "At level 3 "].map( (front:string,val:number) => { return (
                            <>

                            {curLvl >= val+1 && curArts.length < curLvl+3 && _displayedCreature.arts[val].map((list:string, id:number) => { 
                            
                            if (list.split(". ").length == 1) {
                                const foundArt = arts.find((art) => {return (art.name == list)});
                                return ( 
                                <>
                                 {!(curArts.includes(foundArt)) &&  // foundArt will always be found as it is found when giving all arts
                                 
                                    <div className="flex flex-row justify-center items-center"
                                    onClick={() => {addChosenArt(foundArt)}}
                                    >
                                        {front} we recommend taking <Tooltip text={list} key={id}
                                                display={<>
                                                <h3 className="rounded-md bg-dark-300 p-2 -mb-2 mt-1">CLICK TO PICK ME</h3>
                                                <ArtCard _spell={foundArt} _className="m-1 w-96" moveSpell={() => addChosenArt(foundArt)}/>
                                                </>} 
                                                className="capitalize rounded-md bg-dark-300 p-1 m-1"
                                        />
                                    </div>
                                 
                                 }
                                </>
                                )
                            }
                        
                        
                            return (
                                <>
                                { curArts.length < curLvl+3 &&
                                    <div className="flex flex-row justify-center items-center">
                                        {front} pick one of the following: 
                                        {list.split(". ").map( (t:string,id:number) => {
                                            const foundArt = arts.find((art) => {return (art.name == t)});
                                            // console.log(arts)
                                            return (
                                                <>
                                                {!(curArts.includes(foundArt)) &&   // foundArt will always be found as it is found when giving all arts
                                                
                                                <div key={id} className="flex flex-row justify-center items-center"
                                                onClick={() => {addChosenArt(foundArt)}}
                                                >
                                                    <Tooltip text={t} key={id}
                                                            display={<>
                                                            <h3 className="rounded-md bg-dark-300 p-2 -mb-2 mt-1">CLICK TO PICK ME</h3>
                                                            <ArtCard _spell={foundArt} _className="m-1 w-96" moveSpell={() => addChosenArt(foundArt)}/>
                                                            </>} 
                                                            className="capitalize rounded-md bg-dark-300 p-1 m-1"
                                                    />
                                                </div>
                                                }
                                                </>
                                        );})}
                                    </div>
                                }
                                </>
                            )})}</>)}
                        )}



                        <div className="grid grid-cols-2">

                            {curArts.map( (t:Spell, id:number) => { return (
                                <ArtCard _spell={t} _className="m-1" moveSpell={() => removeChosenArt(t)} key={id}/>
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


