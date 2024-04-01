// import { PinIcon, RemoveIcon } from "../../assets/IconSVGs/heroiconsSVG";
import { Spell, Trait, Item, Creature } from "../../client";
import { getNames } from "../../util/tableTools";

import { formatEffectString, sumNumbersAfterWord, toPillElement } from "../../util/textFormatting";
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
    itemsList: itemsList,
}: Props) {
    const stats = toPillElement(
        `Body ${displayedCreature.body},Mind ${displayedCreature.mind},Soul ${displayedCreature.soul},`,
        ","
    );
    const skills = toPillElement(
        `Arcana ${displayedCreature.arcana},Charm ${displayedCreature.charm},Crafting ${displayedCreature.crafting}`,
        ","
    );
    const skills2 = toPillElement(
        `Nature ${displayedCreature.nature},Medicine ${displayedCreature.medicine},Thieving ${displayedCreature.thieving}`,
        ","
    );
    const race = displayedCreature.race?.toString().split(";|;").join(", ");

    
    const traits = getNames(displayedCreature.traits, traitsList) as Trait[];
    const spells = getNames(displayedCreature.spells, spellsList) as Spell[];
    const items = getNames(displayedCreature.items, itemsList) as Item[];

    let traitLines = [
        "TRAITS",
        ...traits.map((t) => {
            return `${t.name} - ${"#".repeat(t.dice ?? 1) ?? "P"}\n${t.effect}\n`;
        }),
    ];
    let itemLines = [
        "ITEMS",
        ...items.map((i) => {
            return `${i.name} - ${i.tags}\n${i.effect}\n`;
        }),
    ];
    let spellLines = [
        "SPELLS",
        ...spells.map((s) => {
            return `${s.name} - ${"#".repeat(s.dice ?? 1) ?? "P"}, ST ${
                s.level
            }\n${s.effect}\n`;
        }),
    ];

    if (traitLines[1].includes('Object "" not found.')) {
        traitLines = [""];
    }
    if (itemLines[1].includes('Object "" not found.')) {
        itemLines = [""];
    }
    if (spellLines[1].includes('Object "" not found.')) {
        spellLines = [""];
    }

    // some magical fuckery
    // const bigList = [...traitLines, ...itemLines, ...spellLines].join("\n");
    let bonus = ((displayedCreature.traits.includes("hearty")) ? displayedCreature.body : 0);
    let healthNArmor =
        `Health ${Math.ceil(
            displayedCreature.level +
                displayedCreature.body * 4 +
                displayedCreature.mind * 3 +
                displayedCreature.soul * 2 +
                bonus
        )}\n`;

    let armor = sumNumbersAfterWord(itemLines, "armor");
    if (armor > 0) {
        healthNArmor = healthNArmor + `\nArmor ${armor*displayedCreature.level}/${armor*displayedCreature.level}`;
    }
    armor = sumNumbersAfterWord(itemLines, "ward");
    if (armor > 0) {
        healthNArmor = healthNArmor + `\nWard ${armor}/3`;
    }
    armor = sumNumbersAfterWord(itemLines, "dodge");
    console.log(displayedCreature.name,armor);
    if (armor > 0) {
        healthNArmor = healthNArmor + `\nDodge ${armor}/6`;
    }

    healthNArmor = healthNArmor + displayedCreature.stackEffects.join("\n"); //toPillElement(stacks, ",");

    
    bonus = sumNumbersAfterWord(itemLines, "speed");
    let speedNSoulStrain =
        //toPillElement(
        `Speed ${displayedCreature.speedBonus + 6 + bonus}`;

    if (displayedCreature.soul > 0) {
        speedNSoulStrain = speedNSoulStrain + `\nSoul Strain 0/${displayedCreature.soul * 3}`;
    }

    return (
        <>
            <div className="grid grid-rows-auto-auto-auto-1fr-auto gap-4 h-screen p-4 bg-body/10 dark:bg-dark-400 rounded-md">
                <div className="grid grid-cols-3 p-4">
                    <div className="bg-body/10 dark:bg-dark-300 capitalize whitespace-pre-wrap">
                        {"NAME\n"}
                        {displayedCreature.name}
                    </div>
                    <div className="bg-body/10 dark:bg-dark-300 whitespace-pre-wrap">
                        {"DR\n"}
                        {displayedCreature.level}
                    </div>
                    <div className="bg-body/10 dark:bg-dark-300 flex-row capitalize whitespace-pre-wrap">
                        {"RACE/TAGS\n"}
                        {race}
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-2 bg-body/10 dark:bg-dark-300">
                        <div className="flex flex-row flex-wrap capitalize gap-1">
                            {stats}
                        </div>
                        <div className="flex flex-row flex-wrap capitalize gap-1">
                            {skills}
                        </div>
                        <div className="flex flex-row flex-wrap capitalize gap-1">
                            {skills2}
                        </div>
                    </div>
                    <div className="bg-body/10 dark:bg-dark-300 flex-row capitalize">
                        {healthNArmor}
                    </div>
                    <div className="bg-body/10 dark:bg-dark-300 capitalize">
                        {speedNSoulStrain}
                    </div>
                </div>
                <div className="flex-grow p-4 bg-body/10 dark:bg-dark-300 whitespace-pre-wrap">
                    {traitLines.join("\n")}
                </div>
                {
                    (itemLines != [""]) && 
                    <div className="flex-grow p-4 bg-body/10 dark:bg-dark-300 whitespace-pre-wrap">
                        {itemLines.join("\n")}
                    </div>
                }
                {(spellLines != [""]) && 
                    <div className="flex-grow p-4 bg-body/10 dark:bg-dark-300 whitespace-pre-wrap">
                        {spellLines.join("\n")}
                    </div>
                }
                {(displayedCreature.notes != "") && 
                    <div className="p-4 bg-body/10 dark:bg-dark-300 whitespace-pre-wrap">
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
                }
            </div>
        </>
    );
}
