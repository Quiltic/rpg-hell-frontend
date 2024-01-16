import { PinIcon, RemoveIcon } from "../../assets/IconSVGs/heroiconsSVG";
import { Spell, Trait, Item, Creature } from "../../client";
import { getNames } from "../../util/tableTools";


import { formatEffectString, toPillElement } from "../../util/textFormatting";
import { Button } from "../ui/Button/Button";

type Props = {
    displayedCreatures: Creature[];
    moveCreature?: (creature: Creature) => void;
    moveIsAdd?: boolean;
    traitsList: Array<Trait>;
    spellsList: Array<Spell>;
    itemsList: Array<Item>;
};


export default function CreaturesTable({
    displayedCreatures: displayedCreatures,
    moveCreature,
    moveIsAdd = true,
    traitsList: traitsList,
    spellsList: spellsList,
    itemsList: itemsList
}: Props) {
    return (
        <table className="border-collapse table-auto dark:text-light text-dark rounded-md">
            <thead className="dark:bg-dark-400 bg-light-300 font-bold">
                <tr>
                    <th>Name</th>
                    <th>Level</th>
                    <th>Race</th>
                    <th>_Stats&Skills_</th>
                    <th>Health&Armor</th>
                    <th>Speed/Soul Strain</th>
                    <th>Traits/Spells/Items</th>
                    <th>Notes</th>
                    {moveCreature != undefined && (
                        <th>{moveIsAdd ? "Save" : "Unsave"}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {displayedCreatures.map((creature) => {
                    console.log(creature);
                    // const ee = formatEffectString(creature.effect ?? "");
                    const stats = `Body ${creature.body},Mind ${creature.mind},Soul ${creature.soul},`
                    const skills = `Arcana ${creature.arcana},Charm ${creature.charm},Crafting ${creature.crafting},Nature ${creature.nature},Medicine ${creature.medicine},Thieving ${creature.thieving}`
                    const race = toPillElement(creature.race?.toString() ?? "", ";|;");
                    const statsNSkillsPills = toPillElement(stats+skills, ",");
                    
                    let stacks = creature.stackEffects.join(",");
                    stacks = `Health ${Math.ceil(creature.level+creature.body*5+creature.mind*3+creature.soul)},` + stacks; 
                    const healthNArmor = toPillElement(stacks, ",");
                    
                    const speedNSoulStrain = toPillElement(`Speed ${creature.speedBonus+6},SoulStrain ${creature.soul*3}`, ",");
                        


                    const traits = getNames(creature.traits,traitsList);
                    const spells = getNames(creature.spells,spellsList);
                    const items = getNames(creature.items,itemsList);

                    let traitLines = ["TRAITS",...traits.map((t) => {
                        return `${t.name} - ${t.dice} - ${t.effect}`;
                    })];
                    let itemLines = ["ITEMS", ...items.map((i) => {
                        return `${i.name} - ${i.tags} - ${i.effect}`;
                    })];
                    let spellLines = ["SPELLS", ...spells.map((s) => {
                        return `${s.name} - ${"#".repeat(s.dice ?? 1)}, ST ${s.level} - ${s.effect}`;
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
                    const bigList = [...traitLines, ...itemLines, ...spellLines].join("\n");

                    return (
                        <tr>
                            <td className="font-bold capitalize">
                                {creature.name}
                            </td>
                            <td className="font-bold capitalize">
                                {creature.level}
                            </td>
                            <td className="capitalize" align="center">
                                {race}
                            </td>
                            <td className="capitalize" align="center">
                                {statsNSkillsPills}
                            </td>
                            <td className="capitalize" align="center">
                                {healthNArmor}
                            </td>
                            <td className="capitalize" align="center">
                                {speedNSoulStrain}
                            </td>
                            <td
                                dangerouslySetInnerHTML={{ __html: bigList }}
                                className="whitespace-pre-wrap"
                            ></td>
                            <td
                                dangerouslySetInnerHTML={{ __html: formatEffectString(creature.notes ?? "") }}
                                className="whitespace-pre-wrap"
                            ></td>
                            {moveCreature != undefined && (
                                <td>
                                    <Button
                                        variant={
                                            moveIsAdd
                                                ? "subtle-nature"
                                                : "subtle-medicine"
                                        }
                                        leftIcon={
                                            moveIsAdd ? PinIcon : RemoveIcon
                                        }
                                        className="rounded-md w-6 h-8"
                                        onClick={() => {
                                            moveCreature(creature);
                                        }}
                                    ></Button>
                                </td>
                            )}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
