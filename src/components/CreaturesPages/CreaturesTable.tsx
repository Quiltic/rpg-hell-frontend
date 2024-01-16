import { PinIcon, RemoveIcon } from "../../assets/IconSVGs/heroiconsSVG";
import { Spell, Trait, Item, Creature } from "../../client";


import { formatEffectString, toPillElement } from "../../util/textFormatting";
import { Button } from "../ui/Button/Button";

type Props = {
    displayedCreatures: Creature[];
    moveCreature?: (creature: Creature) => void;
    moveIsAdd?: boolean;
    traitsList: Array<Trait>;
};


export default function CreaturesTable({
    displayedCreatures: displayedCreatures,
    moveCreature,
    moveIsAdd = true,
    traitsList: traitsList
}: Props) {
    return (
        <table className="border-collapse table-auto dark:text-light text-dark rounded-md">
            <thead className="dark:bg-dark-400 bg-light-300 font-bold">
                <tr>
                    <th>Name</th>
                    <th>Level</th>
                    <th>Race</th>
                    <th>Stats</th>
                    <th>Skills</th>
                    <th>Health/Armor</th>
                    <th>Speed/Soul Strain</th>
                    <th>Traits/Spells/Items</th>
                    {moveCreature != undefined && (
                        <th>{moveIsAdd ? "Save" : "Unsave"}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {displayedCreatures.map((creature) => {
                    // const ee = formatEffectString(creature.effect ?? "");
                    const stats = `Body ${creature.body},Mind ${creature.mind},Soul ${creature.soul}`
                    const skills = `Arcana ${creature.arcana},Charm ${creature.charm},Crafting ${creature.crafting},Nature ${creature.nature},Medicine ${creature.medicine},Thieving ${creature.thieving}`
                    const race = toPillElement(creature.race?.toString() ?? "", ";|;");
                    const statsPills = toPillElement(stats, ",");
                    const skillsPills = toPillElement(skills, ",");

                    let stacks = creature.stackEffects.join(",");
                    stacks = `Health ${creature.level+creature.body*5+creature.mind*3+creature.arcana},` + stats; 
                    const healthNArmor = toPillElement(stacks, ",");
                

                    const speedNSoulStrain = toPillElement(`Speed ${creature.speedBonus+6},Soul Strain ${creature.soul*3}`, ",");
                    
                    
                    const bigList = "";

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
                                {statsPills}
                            </td>
                            <td className="capitalize" align="center">
                                {skillsPills}
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
