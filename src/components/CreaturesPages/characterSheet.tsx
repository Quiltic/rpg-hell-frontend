// import { PinIcon, RemoveIcon } from "../../assets/IconSVGs/heroiconsSVG";
import { Spell, Trait, Item, Creature } from "../../client";
import { getNames } from "../../util/tableTools";


import { formatEffectString, toPillElement } from "../../util/textFormatting";
// import { Button } from "../ui/Button/Button";

type Props = {
    displayedCreature: Creature;
    traitsList: Array<Trait>;
    spellsList: Array<Spell>;
    itemsList: Array<Item>;
};


export default function CreatureSheet({
    displayedCreature: displayedCreature,
    traitsList: traitsList,
    spellsList: spellsList,
    itemsList: itemsList
}: Props) {
    const stats = toPillElement(`Body ${displayedCreature.body},Mind ${displayedCreature.mind},Soul ${displayedCreature.soul},`,',')
    const skills = toPillElement(`Arcana ${displayedCreature.arcana},Charm ${displayedCreature.charm},Crafting ${displayedCreature.crafting},Nature ${displayedCreature.nature},Medicine ${displayedCreature.medicine},Thieving ${displayedCreature.thieving}`,",")
    const race = toPillElement(displayedCreature.race?.toString() ?? "", ";|;");
    // const statsNSkillsPills = toPillElement(stats+skills, ",");
    
    let stacks = displayedCreature.stackEffects.join(",");
    stacks = `Health ${Math.ceil(displayedCreature.level+displayedCreature.body*5+displayedCreature.mind*3+displayedCreature.soul)},` + stacks; 
    const healthNArmor = toPillElement(stacks, ",");
    
    const speedNSoulStrain = toPillElement(`Speed ${displayedCreature.speedBonus+6},SoulStrain ${displayedCreature.soul*3}`, ",");
        


    const traits = getNames(displayedCreature.traits,traitsList);
    const spells = getNames(displayedCreature.spells,spellsList);
    const items = getNames(displayedCreature.items,itemsList);

    let traitLines = ["TRAITS",...traits.map((t) => {
        return `${t.name} - ${t.dice} - ${t.effect}`;
    })];
    let itemLines = ["ITEMS", ...items.map((i) => {
        return `${i.name} - ${i.tags} - ${i.effect}`;
    })];
    let spellLines = ["SPELLS", ...spells.map((s) => {
        return `${s.name} - ${"#".repeat(s.dice ?? 1) ?? "P"}, ST ${s.level} - ${s.effect}`;
    })];

    if (traitLines[1].includes('Object "" not found.')){
        traitLines = [""];
    }
    if (itemLines[1].includes('Object "" not found.')){
        itemLines = [""];
    }
    if (spellLines[1].includes('Object "" not found.')){
        spellLines = [""];
    }
    
    // some magical fuckery
    const bigList = ([...traitLines, ...itemLines, ...spellLines].join("\n"));


    return (
        <>
            <div className="grid grid-rows-auto-auto-auto-1fr-auto gap-4 h-screen p-4 bg-dark-400 rounded-md">
                <div className="grid grid-cols-3 p-4">
                    <div className="bg-dark-300 capitalize whitespace-pre-wrap">{"NAME\n"}{displayedCreature.name}</div>
                    <div className="bg-dark-300 whitespace-pre-wrap">{"DR\n"}{displayedCreature.level}</div>
                    <div className="bg-dark-300 flex-row capitalize whitespace-pre-wrap">{"RACE/TAGS\n"}{race}</div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-2 bg-dark-300">
                        <div className="flex flex-row capitalize">{stats}</div>
                        <div className="flex flex-row capitalize">{skills}</div>
                    </div>
                    <div className="bg-dark-300 flex-row capitalize">{healthNArmor}</div>
                    <div className="bg-dark-300 capitalize">{speedNSoulStrain}</div>
                </div>
                <div className="flex-grow p-4 bg-dark-300 whitespace-pre-wrap">
                    {bigList}
                </div>
                <div className="p-4 bg-dark-300 whitespace-pre-wrap">
                    {"NOTES\n"}
                    {/* <input
                        value={displayedCreature.notes}
                        type="text"
                        name="notes"
                        placeholder="Creatures Notes"
                        className="bg-dark-700 pl-1 whitespace-pre-wrap"
                        // onChange={(e) => {
                        //     setSearchValue(e.target.value.toLowerCase());
                        // }}
                    /> */}
                    {displayedCreature.notes}
                </div>
            </div>
        </>
    );
}