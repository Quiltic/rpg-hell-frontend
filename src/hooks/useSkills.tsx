import { useMemo, useState } from "react";

type eSkill =
    | "body"
    | "mind"
    | "soul"
    | "arcana"
    | "charm"
    | "crafting"
    | "nature"
    | "medicine"
    | "thievery";

export default function useSkills(
    initialLevel: number = 1,
    initialBody: number = 0,
    initialMind: number = 0,
    initialSoul: number = 0,
    initialArcana: number = 0,
    initialCharm: number = 0,
    initialCrafting: number = 0,
    initialNature: number = 0,
    initialMedicine: number = 0,
    initialThievery: number = 0
) {
    // Skills
    const [body, setBody] = useState(initialBody);
    const [mind, setMind] = useState(initialMind);
    const [soul, setSoul] = useState(initialSoul);

    // Sub-skills
    const [arcana, setArcana] = useState(initialArcana);
    const [charm, setCharm] = useState(initialCharm);
    const [crafting, setCrafting] = useState(initialCrafting);
    const [nature, setNature] = useState(initialNature);
    const [medicine, setMedicine] = useState(initialMedicine);
    const [thievery, setThievery] = useState(initialThievery);

    // creature level
    const [level, setLevel] = useState(initialLevel);

    // allocatable skill points and sub-skill points, effects to make sure their values are always correct.
    const skillPointsAvailible = useMemo(() => {
        return level + 1 - body - mind - soul;
    }, [body, level, mind, soul]);

    const subSkillPointsAvailible = useMemo(() => {
        return (
            level * 2 +
            2 -
            arcana -
            charm -
            crafting -
            nature -
            medicine -
            thievery
        );
    }, [arcana, charm, crafting, level, medicine, nature, thievery]);

    // skill maximum
    const skillMaxAtCurrentLevel = useMemo(() => {
        return level + 1 > 6 ? 6 : level + 1;
    }, [level]);

    // functions to increment or decrement all skills
    function tryIncrementSkill(
        skillValue: number,
        skillValueSetter: (newValue: number) => void,
        subskill: boolean = false
    ) {
        if (skillValue >= skillMaxAtCurrentLevel) {
            skillValueSetter(skillMaxAtCurrentLevel);
        } else {
            if (subskill) {
                if (subSkillPointsAvailible == 0) {
                    skillValueSetter(skillValue + 1);
                }
            } else {
                if (skillPointsAvailible == 0) {
                    skillValueSetter(skillValue + 1);
                }
            }
        }
    }

    function tryDecrementSkill(
        skillValue: number,
        skillValueSetter: (newValue: number) => void
    ) {
        if (skillValue <= 0) {
            skillValueSetter(0);
        } else {
            skillValueSetter(skillValue - 1);
        }
    }

    function increment(skill: eSkill) {
        switch (skill) {
            case "body":
                tryIncrementSkill(body, setBody);
                break;
            case "mind":
                tryIncrementSkill(mind, setMind);
                break;
            case "soul":
                tryIncrementSkill(soul, setSoul);
                break;
            case "arcana":
                tryIncrementSkill(arcana, setArcana, true);
                break;
            case "charm":
                tryIncrementSkill(charm, setCharm, true);
                break;
            case "crafting":
                tryIncrementSkill(crafting, setCrafting, true);
                break;
            case "nature":
                tryIncrementSkill(nature, setNature, true);
                break;
            case "medicine":
                tryIncrementSkill(medicine, setMedicine, true);
                break;
            case "thievery":
                tryIncrementSkill(thievery, setThievery, true);
                break;
        }
    }

    function decrement(skill: eSkill) {
        switch (skill) {
            case "body":
                tryDecrementSkill(body, setBody);
                break;
            case "mind":
                tryDecrementSkill(mind, setMind);
                break;
            case "soul":
                tryDecrementSkill(soul, setSoul);
                break;
            case "arcana":
                tryDecrementSkill(arcana, setArcana);
                break;
            case "charm":
                tryDecrementSkill(charm, setCharm);
                break;
            case "crafting":
                tryDecrementSkill(crafting, setCrafting);
                break;
            case "nature":
                tryDecrementSkill(nature, setNature);
                break;
            case "medicine":
                tryDecrementSkill(medicine, setMedicine);
                break;
            case "thievery":
                tryDecrementSkill(thievery, setThievery);
                break;
        }
    }

    function resetToInitial() {
        setBody(initialBody);
        setMind(initialBody);
        setSoul(initialSoul);
        setArcana(initialArcana);
        setCharm(initialCharm);
        setCrafting(initialCrafting);
        setMedicine(initialMedicine);
        setNature(initialNature);
        setThievery(initialThievery);
        setLevel(initialLevel);
    }

    function levelUp() {
        if (level >= 9) {
            setLevel(9);
        } else {
            setLevel(level + 1);
        }
    }

    return {
        body,
        mind,
        soul,
        arcana,
        charm,
        crafting,
        medicine,
        nature,
        thievery,
        level,
        skillPointsAvailible,
        subSkillPointsAvailible,
        skillMaxAtCurrentLevel,
        increment,
        decrement,
        resetToInitial,
        levelUp,
    };
}
