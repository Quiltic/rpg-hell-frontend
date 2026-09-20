import { useEffect, useState } from "react";
import { Trait, Item, Spell } from "../../../client";
import ItemCard from "../../ItemPages/ItemCardStuff/itemCard";
import TraitCard from "../../TraitsPages/TraitCardStuff/traitCard";
import ArtCard from "../../SpellsPages/SpellCardStuff/artCard";
import DicePopup from "../../ui/Popups/dicePopup";
import { capitalize } from "../../../util/textFormatting";
import Tooltip from "../../ui/Tooltip";
import { playerCharacterType } from "../../../types/playerCharacterType";
import { useItems } from "../../../hooks/useItems";
import { useSpells } from "../../../hooks/useSpells";
import { useTraits } from "../../../hooks/useTraits";
import DamageTaker from "./DamageTaker";
import Statblock from "../../CreaturesPages/Parts/StatblockPart";
import { Tab } from "@headlessui/react";
import { cn } from "../../../styling/utilites";
import DiceRoller from "../../ui/DiceRoller";

type Props = {
    player: playerCharacterType;
    setPlayer: (player: playerCharacterType) => void;
};

export default function RefinedCharacterSheet({ player: player, setPlayer: setPlayer }: Props) {
    //  const {
    //     allTraits,
    //     pinnedTraits,
    //     displayedTraits,
    //     addToPinnedTraits,
    //     removeFromPinnedTraits,
    //     filterTraits,
    //     resetFilterTraits,
    // } = useTraits();
    //  const {
    //     allSpells,
    //     pinnedSpells,
    //     displayedSpells,
    //     addToPinnedSpells,
    //     removeFromPinnedSpells,
    //     filterSpells,
    //     resetFilterSpells,
    // } = useSpells();
    const {
        allItems,
        pinnedItems,
        displayedItems,
        addToPinnedItems,
        removeFromPinnedItems,
        filterItems,
        resetFilterItems,
    } = useItems();

    const [openDice, setOpenDice] = useState(false);
    const [dice, setDice] = useState([1]);
    const [diceBonus, setDiceBonus] = useState(0);

    // const [curCreature, setCurCreature] = useState( player );
    const [curLvl, setCurLvl] = useState(1);
    const [curMaxShield, setCurMaxShield] = useState(0);
    const [curShielding, setCurShielding] = useState(0);

    const [curHP, setCurHP] = useState(4 * player.stats.body + 3 * player.stats.mind + 2 * player.stats.soul + curLvl);
    const [curStrain, setCurStrain] = useState(
        2 * player.stats.body + 3 * player.stats.mind + 4 * player.stats.soul + curLvl
    );

    const [curStories, setCurStories] = useState("");
    const [curTraits, setCurTraits] = useState<Trait[]>([]);
    const [curArts, setCurArts] = useState<Spell[]>([]);

    function addChosenTrait(t: Trait) {
        if (!curTraits.includes(t) && curTraits.length < curLvl + 1) {
            setCurTraits(curTraits.concat(t));
        }
    }
    function removeChosenTrait(t: Trait) {
        const idx = curTraits.indexOf(t);
        const remaining = curTraits.slice();
        remaining.splice(idx, 1);
        setCurTraits(remaining);
    }

    function addChosenArt(s: Spell) {
        if (!curArts.includes(s) && curArts.length < curLvl + 3) {
            setCurArts(curArts.concat(s));
        }
    }
    function removeChosenArt(s: Spell) {
        const idx = curArts.indexOf(s);
        const remaining = curArts.slice();
        remaining.splice(idx, 1);
        setCurArts(remaining);
    }

    // OK SO HERE IS THE PROBLEM
    // For some reason these functions run twice
    // if they run twice everything blanks
    // but for some reason every blank cant be removed

    const [itemString, setItemString] = useState("");
    function getItemString(items: Array<string>) {
        let theBigstring = "";
        console.log(items);
        items.forEach((item: string) => {
            if (item != "") {
                const theItem = allItems.find(
                    (searchingItem) => searchingItem.name == item.replace("(equ)", "").replace("\n", "")
                );
                console.log(theItem);
                if (theItem) {
                    theBigstring += capitalize(theItem.name) + " (found) -> " + theItem.effect + "\n\n";
                } else {
                    theBigstring = theBigstring + item + "\n\n";
                }
            }
        });
        console.log(theBigstring);
        setItemString(theBigstring);
    }

    // idk how to load this without a useEffect :)
    useEffect(() => {
        getItemString(player.items);
        console.log(player.items);
    }, [allItems]);

    function cleanupItems() {
        console.log(itemString);
        const itemArray: Array<string> = [];
        itemString.split("\n\n").forEach((line) => {
            // if it fails to split then it is a custom item, otherwise its a found item
            itemArray.push(line.split(" (found) -> ")[0].toLowerCase());
        });
        console.log(itemArray);
        setPlayer({ ...player, items: itemArray.filter((item) => item != "" && item != "\n") });
    }

    // const [maxMain, setMaxMain] = useState(2);

    // useEffect(() => {
    //     setMaxMain(2+Math.floor((curCreature.level-1)/2));
    // }, [curCreature.level]);
    // useEffect(() => {
    //     // player.stats.body = player.stats.body + (curLvl == 3 && player.level_explanation[2].includes("Body") ? 1 : 0)
    //     // player.stats.mind = player.stats.mind + (curLvl == 3 && player.level_explanation[2].includes("Mind") ? 1 : 0)
    //     // player.stats.soul = player.stats.soul + (curLvl == 3 && player.level_explanation[2].includes("Soul") ? 1 : 0)
    //     // player.stats.arcana = player.stats.arcana + (curLvl == 3 && player.level_explanation[2].includes("Arcana") ? 1 : 0)

    //     const bod = (player.stats.body + (curLvl == 3 && player.level_explanation[2].includes("Body") ? 1 : 0));
    //     const min = (player.stats.mind + (curLvl == 3 && player.level_explanation[2].includes("Mind") ? 1 : 0));
    //     // const sou = (player.stats.soul + (curLvl == 3 && player.level_explanation[2].includes("Soul") ? 1 : 0));

    //     const maxShield = (player.items.includes("shield") ? curLvl : 0) +
    //     (player.items.includes("light leather") ? curLvl :
    //     player.items.includes("heavy plate") ? 4*bod+3*min+curLvl :
    //     player.items.includes("medium chainmail") ? 2*bod+2*min+curLvl : 0);
    //     setCurShielding(maxShield);
    //     setCurMaxShield(maxShield);
    // }, [curLvl]);

    // console.log(new Array((4+Math.floor(curLvl/2))).fill(0));

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

            <div className="m-4 flex flex-col rounded-md border-2 border-solid border-body-700/20 bg-dark-400">
                {/* Name/Level/Types */}
                <div className="flex items-center rounded-md bg-dark lg:flex-row">
                    <div className="m-2 w-[50%] rounded-lg bg-dark-400 p-2 ">
                        <input
                            type="text"
                            placeholder={player.name}
                            className="h-9 w-[100%] rounded-lg p-2 shadow-md"
                            // value={curCreature.name}
                            // onChange={(e) => setCurCreature({...curCreature, name: e.target.value})}
                        />
                    </div>

                    <div className="m-2 flex flex-row items-center items-center rounded-md bg-dark-400 p-2 capitalize lg:w-[17%]">
                        Level:
                        <input
                            type="number"
                            className="m-1 mt-1 h-9 w-[100%] justify-end rounded-lg p-2 shadow-md"
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
                {/* Top Section -> Stats and Tabs */}
                <div className="bg-dark lg:grid lg:grid-cols-2 lg:gap-1">
                    {/* Stats */}
                    <Statblock
                        player={player}
                        setPlayer={setPlayer}
                    />
                    {/* Tabs -> Dice/Dmg */}
                    <Tab.Group
                        as="div"
                        className="m-4 hidden md:block"
                        defaultIndex={0}
                    >
                        <div className="md:flex-column m-6 mb-0 w-full align-middle md:flex md:justify-between">
                            <Tab.List className="flex flex-wrap gap-2">
                                <Tab
                                    className={({ selected }) =>
                                        cn(
                                            "rounded-t-md px-2 py-1 ring-aabase hover:font-bold",
                                            selected ? "bg-dark-400 ring-2" : "bg-dark-600"
                                        )
                                    }
                                >
                                    Dice
                                </Tab>
                                <Tab
                                    className={({ selected }) =>
                                        cn(
                                            "rounded-t-md bg-dark-600 px-2 py-1 ring-aabase hover:font-bold",
                                            selected ? "bg-dark-400 ring-2" : "bg-dark-600"
                                        )
                                    }
                                >
                                    Healing & Damage
                                </Tab>
                            </Tab.List>
                        </div>
                        <Tab.Panels>
                            <Tab.Panel className={"m-1 rounded-md p-2 ring-2 ring-aabase"}>
                                <DiceRoller
                                    startingDice={dice}
                                    startingBonus={diceBonus}
                                    isOpen={true}
                                    setDice={setDice}
                                    setBonus={setDiceBonus}
                                />
                            </Tab.Panel>
                            <Tab.Panel className={"m-1 rounded-md p-2 ring-2 ring-aabase"}>
                                <DamageTaker
                                    player={player}
                                    setPlayer={setPlayer}
                                />
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>
                {/* Stories/Items(string)/Notes */}
                <Tab.Group
                    as="div"
                    className="m-4"
                    defaultIndex={0}
                >
                    <div className="md:flex-column m-6 mb-0 w-full align-middle md:flex md:justify-between">
                        <Tab.List className="flex flex-wrap gap-2">
                            <Tab
                                className={({ selected }) =>
                                    cn(
                                        "rounded-t-md px-2 py-1 ring-aabase hover:font-bold",
                                        selected ? "bg-dark-400 ring-2" : "bg-dark-600"
                                    )
                                }
                            >
                                {/* The aim was to have it be a link if you already have it selected (one that opens a new tab) */}
                                {/* <a href="https://quiltic.github.io/rpg-hell-frontend/rulebook/character-creation#stories"> */}
                                Stories
                                {/* </a> */}
                            </Tab>
                            <Tab
                                className={({ selected }) =>
                                    cn(
                                        "rounded-t-md bg-dark-600 px-2 py-1 ring-aabase hover:font-bold",
                                        selected ? "bg-dark-400 ring-2" : "bg-dark-600"
                                    )
                                }
                            >
                                Items
                            </Tab>
                            <Tab
                                className={({ selected }) =>
                                    cn(
                                        "rounded-t-md bg-dark-600 px-2 py-1 ring-aabase hover:font-bold",
                                        selected ? "bg-dark-400 ring-2" : "bg-dark-600"
                                    )
                                }
                            >
                                Notes
                            </Tab>
                        </Tab.List>
                    </div>
                    <Tab.Panels>
                        <Tab.Panel className={"m-1 h-32 rounded-md p-2 ring-2 ring-aabase"}>
                            <textarea
                                placeholder="Here is a spot for your Stories!
There is a link above for what a Story is!"
                                className="m-1 h-full w-full rounded-lg bg-dark-300 p-1"
                                value={player.stories}
                                onChange={(text) => setPlayer({ ...player, stories: text.target.value })}
                            />
                        </Tab.Panel>
                        <Tab.Panel className={"m-1 h-32 rounded-md p-2 ring-2 ring-aabase"}>
                            <textarea
                                placeholder="You gots no Items!"
                                className="m-1 h-full w-full rounded-lg bg-dark-300 p-1"
                                value={itemString}
                                onChange={(text) => setItemString(text.target.value)}
                                onBlur={() => cleanupItems()}
                                // onFocus={() => getItemString(player.items)}
                            />
                        </Tab.Panel>
                        <Tab.Panel className={"m-1 h-32 rounded-md p-2 ring-2 ring-aabase"}>
                            <textarea
                                placeholder="Here lies Notes... May they rest in piece."
                                className="m-1 h-full w-full rounded-lg bg-dark-300 p-1"
                                value={player.notes}
                                onChange={(text) => setPlayer({ ...player, notes: text.target.value })}
                            />
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>

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
                <div className="m-2 flex flex-row items-center border-2 border-body-700/20 bg-dark-400"></div>

                {/* Traits/Arts */}
                {/* <div className="lg:grid lg:grid-cols-2 items-center bg-dark rounded-md justify-between"> */}
                {/* Traits */}
                {/* <div className="flex flex-col bg-dark-400 rounded-md p-1 m-2">
                        <h3 className="font-bold bg-dark-300 rounded-md p-1 m-1">TRAITS</h3> */}
                {/* <textarea
                            placeholder="**Reminder** - Spend ## and 3 Strain; You this is how actives should look."
                            className="bg-dark-300 h-44 rounded-lg p-1 m-1"
                            value={curCreature.arts}
                            onChange={(e) => setCurCreature({...curCreature, arts: e.target.value})}
                        /> */}

                {/* {["At level 1 ", "At level 2 ", "At level 3 "].map( (front:string,val:number) => { return (
                            <>

                            {curLvl >= val+1 && curTraits.length < curLvl+1 && player.traits[val].map((list:string, id:number) => { 
                            
                            if (list.split(". ").length == 1) {
                                const foundTrait = traits.find((trait) => {return (trait.name == list)});
                                return ( 
                                <>
                                 {!(curTraits.includes(foundTrait)) && // foundTrait will always be found as it is found when giving all traits
                                 
                                    <div className="flex flex-row justify-center items-center"
                                    onClick={() => {addChosenTrait(foundTrait)}}
                                    key={id}
                                    >
                                        {front} we recommend taking <Tooltip text={capitalize(list)} key={id}
                                                display={<>
                                                <h3 className="rounded-md bg-dark-300 p-2 -mb-2 mt-1">CLICK TO PICK ME</h3>
                                                <TraitCard _trait={foundTrait} _className="m-1 w-96" moveTrait={() => addChosenTrait(foundTrait)}/>
                                                </>} 
                                                className="rounded-md bg-dark-300 p-1 m-1"
                                                
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
                                                    <Tooltip text={capitalize(t)} key={id}
                                                            display={<>
                                                            <h3 className="rounded-md bg-dark-300 p-2 -mb-2 mt-1">CLICK TO PICK ME</h3>
                                                            <TraitCard _trait={foundTrait} _className="m-1 w-96" moveTrait={() => addChosenTrait(foundTrait)}/>
                                                            </>} 
                                                            className="rounded-md bg-dark-300 p-1 m-1"
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



                        <div className="lg:grid lg:grid-cols-2">

                            {curTraits.map( (t:Trait, id:number) => { return (
                                <TraitCard _trait={t} _className="m-1" moveTrait={() => removeChosenTrait(t)} key={id}/>
                            )})}

                            
                        </div>
                    </div> */}

                {/* Arts */}
                {/* <div className="flex flex-col bg-dark-400 rounded-md p-1 m-2">
                        <h3 className="font-bold bg-dark-300 rounded-md p-1 m-1">ARTS</h3> */}
                {/* <textarea
                            placeholder="**Reminder** - Spend ## and 3 Strain; You this is how actives should look."
                            className="bg-dark-300 h-44 rounded-lg p-1 m-1"
                            value={curCreature.arts}
                            onChange={(e) => setCurCreature({...curCreature, arts: e.target.value})}
                        /> */}
                {/* 
                        {["At level 1 ", "At level 2 ", "At level 3 "].map( (front:string,val:number) => { return (
                            <>

                            {curLvl >= val+1 && curArts.length < curLvl+3 && player.arts[val].map((list:string, id:number) => { 
                            
                            if (list.split(". ").length == 1) {
                                const foundArt = arts.find((art) => {return (art.name == list)});
                                return ( 
                                <>
                                 {!(curArts.includes(foundArt)) &&  // foundArt will always be found as it is found when giving all arts
                                 
                                    <div key={id} className="flex flex-row justify-center items-center"
                                    onClick={() => {addChosenArt(foundArt)}}
                                    >
                                        {front} {artPickOptions[id][0]} <Tooltip text={capitalize(list)} key={id}
                                                display={<>
                                                <h3 className="rounded-md bg-dark-300 p-2 -mb-2 mt-1">CLICK TO PICK ME</h3>
                                                <ArtCard _spell={foundArt} _className="m-1 w-96" moveSpell={() => addChosenArt(foundArt)}/>
                                                </>} 
                                                className="rounded-md bg-dark-300 p-1 m-1"
                                        />
                                    </div>
                                 
                                 }
                                </>
                                )
                            }
                        
                        
                            return (
                                <>
                                { curArts.length < curLvl+3 &&
                                    <div key={id} className="flex flex-row justify-center items-center">
                                        {front} {artPickOptions[id][1]} 
                                        {list.split(". ").map( (s:string,id:number) => {
                                            const foundArt = arts.find((art) => {return (art.name == s)});
                                            // console.log(arts)
                                            return (
                                                <>
                                                {!(curArts.includes(foundArt)) &&   // foundArt will always be found as it is found when giving all arts
                                                
                                                <div key={id} className="flex flex-row justify-center items-center"
                                                onClick={() => {addChosenArt(foundArt)}}
                                                >
                                                    <Tooltip text={capitalize(s)} key={id}
                                                            display={<>
                                                            <h3 className="rounded-md bg-dark-300 p-2 -mb-2 mt-1">CLICK TO PICK ME</h3>
                                                            <ArtCard _spell={foundArt} _className="m-1 w-96" moveSpell={() => addChosenArt(foundArt)}/>
                                                            </>} 
                                                            className="rounded-md bg-dark-300 p-1 m-1"
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



                        <div className="lg:grid lg:grid-cols-2">

                            {curArts.map( (t:Spell, id:number) => { return (
                                <ArtCard _spell={t} _className="m-1" moveSpell={() => removeChosenArt(t)} key={id}/>
                            )})}

                            
                        </div>
                    </div>
                </div> */}
            </div>

            {/* <textarea name="json" id="json" className="bg-dark-600 rounded-md border-solid border-2 border-body-700/20 h-44 m-4 p-2" value={JSON.stringify(curCreature).concat(",")}/>

            <div className="flex justify-center">
                <Button
                    title="Clear"
                    className="w-[20%]"
                    variant={"medicine"}
                    onClick={() => {setCurCreature(player)}}
                >
                    Clear
                </Button>
            </div> */}
        </div>
    );
}
