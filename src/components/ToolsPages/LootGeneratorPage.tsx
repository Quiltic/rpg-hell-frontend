import { useEffect, useState } from "react";
import { Item } from "../../client";
import { useItems } from "../../hooks/useItems";
import { Button } from "../ui/Button/Button";
import ItemsTable from "../ItemPages/ItemsTable";
import ItemCardHolder from "../ItemPages/ItemCardStuff/itemCardHolder";
import { Switch } from "@headlessui/react";
import CleanCombobox from "../joshhellscapePages/CleanCombobox";
import { capitalize } from "../../util/textFormatting";


const rarityTiers = [
    "mundane",
    "common",
    "uncommon",
    "rare",
    "legendary"
]
const ItemTypes = [
    "weapon",
    "armor",
    "medicine",
    "alchemical",
    "consumable",
    "tool",
    "mysc",
    "magical",
];

const additionCost = {
    "weapon": 5,
    "armor": 10,
    "alchemical": 10,
    "consumable": 5
}
const mutlsCost = {
    "medicine":2,
    "tool":3,
    "magical":5
};

export default function LootGeneratorPage() {
    // const [curCreature, setCurCreature] = useState( exampleDisplayedCreature );
    const [curItems, setCurItems] = useState<Item[]>([]);
    const [card, setCard] = useState(false);
    
    const [totalValue, setTotalValue] = useState(30);
    const [rairity, setRairity] = useState(["mundane", "common", "uncommon", "rare"]);
    const [usableTypes, setUsableTypes] = useState(ItemTypes);


    // const [expectedValue, setExpectedValue] = useState<number>();
    const [partyLevel, setPartyLevel] = useState<number>(1);
    // const [maxRairity, setMaxRairity] = useState("any");


    const {
        displayedItems
    } = useItems();


    function modifyTypes(type:string) {
        if (usableTypes.includes(type))
            setUsableTypes(usableTypes.filter((t) => {return t != type}));
        else
            setUsableTypes(usableTypes.concat([type]));
    };

    function modifyRairity(rar:string) {
        if (rairity.includes(rar))
            setRairity(rairity.filter((t) => {return t != rar}));
        else
            setRairity(rairity.concat([rar]));

    };

    function getCost(item: Item): number {
        if (item.cost != 0 && item.cost != undefined)
            return item.cost;

        let cost = 1;

        switch(item.rarity) {
            case "common": { 
                cost += 4; 
                break; 
            } 
            case "uncommon": { 
                cost += 9;
                break; 
            } 
            case "rare": {
                cost += 24; 
                break; 
            } 
            case "legendary": { 
                cost += 299;
                break; 
            }
            default: { 
                break; 
            }
        }

        for (const tag in additionCost) {
            if (item.tags.includes(tag))
                cost += additionCost[tag]; // idk what it wants from me

        }
        for (const tag in mutlsCost) {
            if (item.tags.includes(tag))
                cost *= mutlsCost[tag]; // idk what it wants from me
        }

        return cost;

    }


    function getRandomItems(){
        let newlist = displayedItems.filter((item) => {return rairity.includes(item.rarity)});
        newlist = newlist.filter((item) => {return usableTypes.map((t) => {return item.tags.includes(t)}).includes(true)});


        // newlist = newlist.filter(() => {return (Math.floor(Math.random() * 4)+1) == 1});
        
        let finalLoot = [];
        let finalCost = 0;
        let randItemVal = Math.floor(Math.random() * newlist.length);

        while (finalCost < totalValue) {
            finalLoot.push(newlist[randItemVal]);
            finalCost += getCost(newlist[randItemVal]);

            randItemVal = Math.floor(Math.random() * newlist.length);
        }

        // Math.floor(Math.random() * mult)+1
        // console.log(newlist.map((i) => {return usableTypes.map((t) => {return i.tags.includes(t)}).includes(true)}));
        console.log(finalCost);

        setCurItems(finalLoot);
    };

    // // we do this as a failsafe in case something is given that doesent exist
    // let { example } = useParams();
    // useEffect(() => {
    //     // console.log(example);
    //     setCurCreature(exampleDisplayedCreature);
    //     exampleCharSheets.forEach( (char) => {
    //         if (char.name.toLowerCase() != example?.toLowerCase()) {
    //             return;
    //         }
    //         // console.log(char.name,example);
    //         setCurCreature(char);

    //     });
        
    // }, [example]);


    useEffect(() => {

        setTotalValue(totalValue * partyLevel);
        
    }, [partyLevel]);
    
    return (
        <div className="">

            <div className="grid grid-cols-[1fr_2fr]">
                <div className="bg-dark-400 rounded-md m-2 p-2">
                    <h3 className="m-2">Controls</h3>
                    <Button variant={"thieving"}
                        onClick={() => {getRandomItems()}}
                        className="print:hidden m-2 p-2"
                    >
                        Generate List
                    </Button>
                    <Button variant={"medicine"}
                        onClick={() => {setCurItems([])}}
                        className="print:hidden m-2 p-2"
                    >
                        Clear
                    </Button>
                    
                    <div className="bg-dark-300 rounded-md m-2 p-2 justify-center items-center">
                        <div className="mb-1">
                            Rarities to include:
                        </div>
                        <div className="grid grid-cols-2 ml-12">
                            {rarityTiers.map((rar,id) => {
                                return (
                                    <div key={id} className="flex flex-row justify-left items-center">
                                        <input id="gesture"
                                            type="checkbox" 
                                            className="w-4 h-4 accent-soul"
                                            checked={rairity.includes(rar)}
                                            onChange={() => {
                                                modifyRairity(rar);
                                            }}
                                            />
                                        <label htmlFor="gesture" 
                                            className="ms-2 text-sm font-medium capitalize">
                                            {rar}
                                        </label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="justify-center items-center bg-dark-300 rounded-md m-2 p-2 ">
                        <div className="flex flex-row justify-center items-center">
                            Parties Level
                            <input
                                type="number"
                                className="h-9 rounded-lg p-2 mt-1 shadow-md justify-end m-1"
                                value={partyLevel}
                                min="1"
                                max="10"
                                onChange={(e) => setPartyLevel(parseFloat(e.target.value))}
                            />
                        </div>
                        <div className="flex flex-row justify-center items-center">
                            Max Value
                            <input
                                type="number"
                                className="h-9 rounded-lg p-2 mt-1 shadow-md justify-end m-1"
                                value={totalValue}
                                // placeholder={totalValue.toString()}
                                onChange={(e) => setTotalValue(parseFloat(e.target.value))}
                            />
                        </div>
                    </div>
                    
                    <div className="bg-dark-300 rounded-md m-2 p-2 justify-center items-center">
                        <div className="mb-1">
                            Types to include:
                        </div>
                        <div className="grid grid-cols-2 ml-12">
                            {ItemTypes.map((type,id) => {
                                return (
                                    <div key={id} className="flex flex-row justify-left items-center">
                                        <input id="gesture"
                                            type="checkbox" 
                                            className="w-4 h-4 accent-mind"
                                            checked={usableTypes.includes(type)}
                                            onChange={() => {
                                                modifyTypes(type);
                                            }}
                                            />
                                        <label htmlFor="gesture" 
                                            className="ms-2 text-sm font-medium capitalize">
                                            {type}
                                        </label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>


                    {/* Block vs Table */}
                    <div className="flex flex-row justify-center items-center bg-dark-300 rounded-md p-2 m-2">
                        {card && <p className="flex flex-row justify-center items-center m-2">Switch to Table</p>}
                        {!card && <p className="flex flex-row justify-center items-center m-2">Switch to Block</p>}
                        
                        <Switch
                            checked={card}
                            onChange={setCard}
                            className={`${
                                card ? 'bg-body' : 'bg-dark-700'
                            } relative inline-flex h-6 w-11 items-center rounded-full`}
                            >
                            <span className="sr-only">Switch to Block Mode</span>
                            <span
                                className={`${
                                card ? 'translate-x-6' : 'translate-x-1'
                                } inline-block h-4 w-4 transform rounded-full bg-light transition`}
                            />
                        </Switch>
                    </div>
                </div>
                
                {curItems.length != 0 && <>
                
                    {card && <ItemCardHolder shownItems={curItems}/>}
                    {!card && <ItemsTable displayedItems={curItems}></ItemsTable>}
                
                </>}

            </div>

            {/* {curCreature.name == "all" &&
            <>
                <RulebookNavigation />
                <MarkdownRenderer markdown={characterExamples as string} have_header={false} />
                <div className="grid grid-cols-3 justify-between rounded-md bg-dark-400 m-2 p-2 print:hidden">
                    {curCreature.name == "all" && exampleCharSheets.map((char, id) => {
                        const absolutePath = `/rulebook/character-examples/${char.name.toLowerCase()}`;
                            return (

                            <Link
                                to={absolutePath}
                                key={id}
                                // className={""}
                                // aria-current={isActive ? "page" : undefined}
                            >
                                <div key={id} className={cn("clickable m-2 p-2 rounded-md",("bg-"+char.mainStat))}
                                    onClick={() => {setCurCreature(char)}}
                                    >
                                    <h3 className="font-bold mt-0">
                                        {char.name}
                                    </h3>
                                    <div className={cn("italic text-wrap rounded-md p-2 m-2",("bg-"+char.mainStat+"-400"))}>{char.quick_exp}</div>
                                </div>
                            </Link>
                        )})
                    }
                </div>
            </>
            }


            

            {curCreature.name != "all" &&
            
                <div className="flex flex-col">
                    <Link
                        to={"/rulebook/character-examples/all"}
                        className="print:hidden"
                    >
                        <Button variant={"thieving"}
                            onClick={() => {setCurCreature(exampleDisplayedCreature)}}
                            className="print:hidden w-full"
                        >
                            Back
                        </Button>
                    </Link>
                    
                    <ExampleCharSheet 
                        _displayedCreature={curCreature} 
                        traits={displayedTraits.filter((t) => {return curCreature.traits.join(". ").includes(t.name)})}
                        arts={displayedSpells.filter((a) => {return curCreature.arts.join(". ").includes(a.name)})}
                        items={displayedItems.filter((i) => {return curCreature.items.split(". ").includes(i.name)})}
                    />
                </div>
            
            } */}
        </div>
    );
}


