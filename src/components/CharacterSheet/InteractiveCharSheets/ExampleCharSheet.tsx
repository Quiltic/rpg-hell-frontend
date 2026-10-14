import { useEffect, useState } from "react";
import { Trait, Item, Spell } from "../../../client";
import ItemCard from "../../ItemPages/ItemCardStuff/itemCard";
import Tooltip from "../../ui/Tooltip";
import TraitCard from "../../TraitsPages/TraitCardStuff/traitCard";
import ArtCard from "../../SpellsPages/SpellCardStuff/artCard";
import DicePopup from "../../ui/Popups/dicePopup";
import { capitalize } from "../../../util/textFormatting";

const exampleDisplayedCreature = {
    name: "",
    stats: {
        body: 0,
        mind: 0,
        soul: 0,
        arcana: 0,
        crafting: 0,
        charm: 0,
        nature: 0,
        medicine: 0,
        thieving: 0,
    },
    items: "",
    quick_exp: "",
    level_explanation: ["", "", ""],
    traits: [["", ""], [""], [""]],
    arts: [["", "", "", ""], [""], [""]],
};

const artPickOptions = [
    [" we recommend taking:", " pick one of the following:"],
    [" we recommend taking:", " pick one of the following:"],
    [" for combat:", " for combat take one:"],
    [" for utility:", " for utility take one:"],
];

type Props = {
    _displayedCreature: any;
    traits: Trait[];
    arts: Spell[];
    items: Item[];
};

export default function ExampleCharSheet({
    _displayedCreature: _displayedCreature = exampleDisplayedCreature,
    traits: traits,
    arts: arts,
    items: items,
}: Props) {
    const [openDice, setOpenDice] = useState(false);
    const [dice, setDice] = useState([1]);
    const [diceBonus, setDiceBonus] = useState(0);

    // const [curCreature, setCurCreature] = useState( _displayedCreature );
    const [curLvl, setCurLvl] = useState(1);
    const [curMaxShield, setCurMaxShield] = useState(0);
    const [curShielding, setCurShielding] = useState(0);

    const [curHP, setCurHP] = useState(
        4 * _displayedCreature.stats.body +
            3 * _displayedCreature.stats.mind +
            2 * _displayedCreature.stats.soul +
            curLvl
    );
    const [curStrain, setCurStrain] = useState(
        2 * _displayedCreature.stats.body +
            3 * _displayedCreature.stats.mind +
            4 * _displayedCreature.stats.soul +
            curLvl
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

    // const [maxMain, setMaxMain] = useState(2);

    // useEffect(() => {
    //     setMaxMain(2+Math.floor((curCreature.level-1)/2));
    // }, [curCreature.level]);
    useEffect(() => {
        // _displayedCreature.stats.body = _displayedCreature.stats.body + (curLvl == 3 && _displayedCreature.level_explanation[2].includes("Body") ? 1 : 0)
        // _displayedCreature.stats.mind = _displayedCreature.stats.mind + (curLvl == 3 && _displayedCreature.level_explanation[2].includes("Mind") ? 1 : 0)
        // _displayedCreature.stats.soul = _displayedCreature.stats.soul + (curLvl == 3 && _displayedCreature.level_explanation[2].includes("Soul") ? 1 : 0)
        // _displayedCreature.stats.arcana = _displayedCreature.stats.arcana + (curLvl == 3 && _displayedCreature.level_explanation[2].includes("Arcana") ? 1 : 0)

        const bod =
            _displayedCreature.stats.body +
            (curLvl == 3 && _displayedCreature.level_explanation[2].includes("Body") ? 1 : 0);
        const min =
            _displayedCreature.stats.mind +
            (curLvl == 3 && _displayedCreature.level_explanation[2].includes("Mind") ? 1 : 0);
        // const sou = (_displayedCreature.stats.soul + (curLvl == 3 && _displayedCreature.level_explanation[2].includes("Soul") ? 1 : 0));

        const maxShield =
            (_displayedCreature.items.includes("shield") ? curLvl : 0) +
            (_displayedCreature.items.includes("light leather")
                ? curLvl
                : _displayedCreature.items.includes("heavy plate")
                  ? 4 * bod + 3 * min + curLvl
                  : _displayedCreature.items.includes("medium chainmail")
                    ? 2 * bod + 2 * min + curLvl
                    : 0);
        setCurShielding(maxShield);
        setCurMaxShield(maxShield);
    }, [curLvl]);

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
                            placeholder={_displayedCreature.name}
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
                {/* Stats/Stories/Weps/Items */}
                <div className="bg-dark lg:grid lg:grid-cols-2 lg:gap-1">
                    {/* Stats */}
                    <div className="m-1 flex flex-col justify-between p-1">
                        {/* Scores */}
                        <div className="justify-left m-2 mt-0 grid w-full grid-cols-3 flex-wrap gap-1 rounded-md bg-dark-400 p-3">
                            <div
                                className="clickable m-1 rounded-xl bg-body p-1 pr-2 text-sm lg:pl-2 lg:text-[1rem] lg:font-bold"
                                onClick={() => {
                                    setDiceBonus(
                                        _displayedCreature.stats.body +
                                            (curLvl == 3 && _displayedCreature.level_explanation[2].includes("Body")
                                                ? 1
                                                : 0)
                                    );
                                    setDice([1]);
                                    setOpenDice(true);
                                }}
                            >
                                Body {_displayedCreature.stats.body > 0 ? "+" : ""}
                                {_displayedCreature.stats.body +
                                    (curLvl == 3 && _displayedCreature.level_explanation[2].includes("Body") ? 1 : 0)}
                            </div>
                            <div
                                className="clickable m-1 rounded-xl bg-mind p-1 pr-2 text-sm lg:pl-2 lg:text-[1rem] lg:font-bold"
                                onClick={() => {
                                    setDiceBonus(
                                        _displayedCreature.stats.mind +
                                            (curLvl == 3 && _displayedCreature.level_explanation[2].includes("Mind")
                                                ? 1
                                                : 0)
                                    );
                                    setDice([1]);
                                    setOpenDice(true);
                                }}
                            >
                                Mind {_displayedCreature.stats.mind > 0 ? "+" : ""}
                                {_displayedCreature.stats.mind +
                                    (curLvl == 3 && _displayedCreature.level_explanation[2].includes("Mind") ? 1 : 0)}
                            </div>
                            <div
                                className="clickable m-1 rounded-xl bg-soul p-1 pr-2 text-sm lg:pl-2 lg:text-[1rem] lg:font-bold"
                                onClick={() => {
                                    setDiceBonus(
                                        _displayedCreature.stats.soul +
                                            (curLvl == 3 && _displayedCreature.level_explanation[2].includes("Soul")
                                                ? 1
                                                : 0)
                                    );
                                    setDice([1]);
                                    setOpenDice(true);
                                }}
                            >
                                Soul {_displayedCreature.stats.soul > 0 ? "+" : ""}
                                {_displayedCreature.stats.soul +
                                    (curLvl == 3 && _displayedCreature.level_explanation[2].includes("Soul") ? 1 : 0)}
                            </div>
                            <div
                                className="clickable m-1 rounded-xl bg-arcana p-1 pr-2 text-sm lg:pl-2 lg:text-[1rem] lg:font-bold"
                                onClick={() => {
                                    setDiceBonus(
                                        _displayedCreature.stats.arcana +
                                            (curLvl == 3 && _displayedCreature.level_explanation[2].includes("Arcana")
                                                ? 1
                                                : 0)
                                    );
                                    setDice([1]);
                                    setOpenDice(true);
                                }}
                            >
                                Arcana {_displayedCreature.stats.arcana > 0 ? "+" : ""}
                                {_displayedCreature.stats.arcana +
                                    (curLvl == 3 && _displayedCreature.level_explanation[2].includes("Arcana") ? 1 : 0)}
                            </div>
                            <div
                                className="clickable m-1 rounded-xl bg-charm p-1 pr-2 text-sm lg:pl-2 lg:text-[1rem] lg:font-bold"
                                onClick={() => {
                                    setDiceBonus(
                                        _displayedCreature.stats.charm +
                                            (curLvl == 3 && _displayedCreature.level_explanation[2].includes("Charm")
                                                ? 1
                                                : 0)
                                    );
                                    setDice([1]);
                                    setOpenDice(true);
                                }}
                            >
                                Charm {_displayedCreature.stats.charm > 0 ? "+" : ""}
                                {_displayedCreature.stats.charm +
                                    (curLvl == 3 && _displayedCreature.level_explanation[2].includes("Charm") ? 1 : 0)}
                            </div>
                            <div
                                className="clickable m-1 rounded-xl bg-crafting p-1 pr-2 text-sm lg:pl-2 lg:text-[1rem] lg:font-bold"
                                onClick={() => {
                                    setDiceBonus(
                                        _displayedCreature.stats.crafting +
                                            (curLvl == 3 && _displayedCreature.level_explanation[2].includes("Crafting")
                                                ? 1
                                                : 0)
                                    );
                                    setDice([1]);
                                    setOpenDice(true);
                                }}
                            >
                                Crafting {_displayedCreature.stats.crafting > 0 ? "+" : ""}
                                {_displayedCreature.stats.crafting +
                                    (curLvl == 3 && _displayedCreature.level_explanation[2].includes("Crafting")
                                        ? 1
                                        : 0)}
                            </div>
                            <div
                                className="clickable m-1 rounded-xl bg-medicine p-1 pr-2 text-sm lg:pl-2 lg:text-[1rem] lg:font-bold"
                                onClick={() => {
                                    setDiceBonus(
                                        _displayedCreature.stats.medicine +
                                            (curLvl == 3 && _displayedCreature.level_explanation[2].includes("Medicine")
                                                ? 1
                                                : 0)
                                    );
                                    setDice([1]);
                                    setOpenDice(true);
                                }}
                            >
                                Medicine {_displayedCreature.stats.medicine > 0 ? "+" : ""}
                                {_displayedCreature.stats.medicine +
                                    (curLvl == 3 && _displayedCreature.level_explanation[2].includes("Medicine")
                                        ? 1
                                        : 0)}
                            </div>
                            <div
                                className="clickable m-1 rounded-xl bg-nature p-1 pr-2 text-sm lg:pl-2 lg:text-[1rem] lg:font-bold"
                                onClick={() => {
                                    setDiceBonus(
                                        _displayedCreature.stats.nature +
                                            (curLvl == 3 && _displayedCreature.level_explanation[2].includes("Nature")
                                                ? 1
                                                : 0)
                                    );
                                    setDice([1]);
                                    setOpenDice(true);
                                }}
                            >
                                Nature {_displayedCreature.stats.nature > 0 ? "+" : ""}
                                {_displayedCreature.stats.nature +
                                    (curLvl == 3 && _displayedCreature.level_explanation[2].includes("Nature") ? 1 : 0)}
                            </div>
                            <div
                                className="clickable m-1 rounded-xl bg-thieving p-1 pr-2 text-sm lg:pl-2 lg:text-[1rem] lg:font-bold"
                                onClick={() => {
                                    setDiceBonus(
                                        _displayedCreature.stats.thieving +
                                            (curLvl == 3 && _displayedCreature.level_explanation[2].includes("Thieving")
                                                ? 1
                                                : 0)
                                    );
                                    setDice([1]);
                                    setOpenDice(true);
                                }}
                            >
                                Thieving {_displayedCreature.stats.thieving > 0 ? "+" : ""}
                                {_displayedCreature.stats.thieving +
                                    (curLvl == 3 && _displayedCreature.level_explanation[2].includes("Thieving")
                                        ? 1
                                        : 0)}
                            </div>
                        </div>

                        {/* HP/Shielding/Dodge/Ward/Strain/Speed/Combat Dice */}
                        <div className="lg:text-bas m-2 flex w-full flex-col justify-between rounded-md bg-dark-400 p-2 text-sm">
                            <div className="grid w-full grid-cols-2 justify-between lg:flex lg:flex-row">
                                <div className="m-2 flex flex-col rounded-md bg-dark-300 p-2">
                                    HEALTH:
                                    <div className="flex flex-row items-center justify-center">
                                        <input
                                            type="number"
                                            className="mr-1 mt-1 h-9 w-16 justify-end rounded-lg border-2 border-solid border-dark-400 bg-dark-300 p-2"
                                            value={curHP}
                                            min="0"
                                            onChange={(e) => setCurHP(parseFloat(e.target.value))}
                                        />
                                        /{" "}
                                        {4 *
                                            (_displayedCreature.stats.body +
                                                (curLvl == 3 && _displayedCreature.level_explanation[2].includes("Body")
                                                    ? 1
                                                    : 0)) +
                                            3 *
                                                (_displayedCreature.stats.mind +
                                                    (curLvl == 3 &&
                                                    _displayedCreature.level_explanation[2].includes("Mind")
                                                        ? 1
                                                        : 0)) +
                                            2 *
                                                (_displayedCreature.stats.soul +
                                                    (curLvl == 3 &&
                                                    _displayedCreature.level_explanation[2].includes("Soul")
                                                        ? 1
                                                        : 0)) +
                                            Math.ceil(curLvl)}
                                    </div>
                                </div>

                                <div className="m-2 flex flex-col rounded-md bg-dark-300 p-2">
                                    SHIELDING:
                                    <div className="flex flex-row items-center justify-center">
                                        <input
                                            type="number"
                                            className="mr-1 mt-1 h-9 w-16 justify-end rounded-lg border-2 border-solid border-dark-400 bg-dark-300 p-2"
                                            value={curShielding}
                                            min="0"
                                            onChange={(e) => setCurShielding(parseFloat(e.target.value))}
                                        />
                                        / {curMaxShield}
                                    </div>
                                </div>

                                <div className="m-2 flex flex-col items-center justify-center rounded-md bg-dark-300 p-2">
                                    <div className="mb-2">
                                        DODGE:{" "}
                                        {_displayedCreature.items.includes("light leather") ||
                                        _displayedCreature.items.includes("clothing")
                                            ? "+1"
                                            : _displayedCreature.items.includes("heavy plate")
                                              ? "-1"
                                              : "0"}
                                    </div>
                                    SPEED:{" "}
                                    {_displayedCreature.items.includes("clothing")
                                        ? "7"
                                        : _displayedCreature.items.includes("heavy plate") ||
                                            _displayedCreature.items.includes("medium chainmail")
                                          ? "5"
                                          : "6"}
                                </div>
                                <div
                                    className="clickable m-2 flex flex-col items-center justify-center rounded-md bg-dark-300 p-2"
                                    onClick={() => {
                                        setOpenDice(true);
                                        setDiceBonus(0);
                                        setDice(new Array(4 + Math.floor(curLvl / 2)).fill(1));
                                    }}
                                >
                                    CD:
                                    <div className="flex flex-row items-center justify-center font-bold">
                                        {4 + Math.floor(curLvl / 2)}
                                    </div>
                                </div>

                                <div className="m-2 flex flex-col rounded-md bg-dark-300 p-2">
                                    STRAIN:
                                    <div className="flex flex-row items-center justify-center">
                                        <input
                                            type="number"
                                            className="mr-1 mt-1 h-9 w-16 justify-end rounded-lg border-2 border-solid border-dark-400 bg-dark-300 p-2"
                                            value={curStrain}
                                            min="0"
                                            onChange={(e) => setCurStrain(parseFloat(e.target.value))}
                                        />
                                        /{" "}
                                        {2 *
                                            (_displayedCreature.stats.body +
                                                (curLvl == 3 && _displayedCreature.level_explanation[2].includes("Body")
                                                    ? 1
                                                    : 0)) +
                                            3 *
                                                (_displayedCreature.stats.mind +
                                                    (curLvl == 3 &&
                                                    _displayedCreature.level_explanation[2].includes("Mind")
                                                        ? 1
                                                        : 0)) +
                                            4 *
                                                (_displayedCreature.stats.soul +
                                                    (curLvl == 3 &&
                                                    _displayedCreature.level_explanation[2].includes("Soul")
                                                        ? 1
                                                        : 0)) +
                                            Math.ceil(curLvl)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Stories */}
                    <div className="m-2 flex break-inside-avoid flex-col rounded-md bg-dark-400 p-1">
                        <h3 className="m-1 rounded-md bg-dark-300 p-1 font-bold underline">
                            <a href="https://quiltic.github.io/rpg-hell-frontend/rulebook/character-creation#stories">
                                Stories
                            </a>
                        </h3>
                        <textarea
                            placeholder="Here is a spot for your Stories!
There is a link above for what a Story is!"
                            className="m-1 h-full rounded-lg bg-dark-300 p-1"
                            value={curStories}
                            onChange={(e) => setCurStories(e.target.value)}
                        />
                    </div>

                    {/* Weps */}
                    <div className="m-2 flex flex-col rounded-md bg-dark-400 p-1">
                        <h3 className="m-1 rounded-md bg-dark-300 p-1 font-bold">WEAPONS</h3>

                        <div className="lg:grid lg:grid-cols-2">
                            {items.map((i, id) => {
                                return (
                                    <>
                                        {(i.tags.includes("weapon") || i.tags.includes("side")) && (
                                            <ItemCard
                                                _item={{ ...i, upgrades: [] }}
                                                _className="m-1"
                                                key={id}
                                            />
                                        )}
                                    </>
                                );
                            })}
                        </div>
                    </div>

                    {/* Items */}
                    <div className="m-2 flex flex-col rounded-md bg-dark-400 p-1">
                        <h3 className="m-1 rounded-md bg-dark-300 p-1 font-bold">ITEMS</h3>
                        <div className="grid grid-cols-2">
                            {items.map((i, id) => {
                                return (
                                    <>
                                        {!i.tags.includes("weapon") && !i.tags.includes("side") && (
                                            <Tooltip
                                                text={capitalize(i.name)}
                                                key={id}
                                                display={
                                                    <ItemCard
                                                        _item={{ ...i, upgrades: [] }}
                                                        _className="m-1 w-96"
                                                    />
                                                }
                                                className="m-1 rounded-md bg-dark-300 p-1"
                                            />
                                        )}
                                    </>
                                );
                            })}
                        </div>
                        <textarea
                            placeholder="For any new items you pick up along the way."
                            className="m-1 mt-3 h-auto w-[100%] rounded-lg bg-dark-300 p-1"
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
                <div className="m-2 flex flex-row items-center border-2 border-body-700/20 bg-dark-400"></div>

                {/* Traits/Arts */}
                <div className="items-center justify-between rounded-md bg-dark lg:grid lg:grid-cols-2">
                    {/* Traits */}
                    <div className="m-2 flex flex-col rounded-md bg-dark-400 p-1">
                        <h3 className="m-1 rounded-md bg-dark-300 p-1 font-bold">TRAITS</h3>
                        {/* <textarea
                            placeholder="**Reminder** - Spend ## and 3 Strain; You this is how actives should look."
                            className="bg-dark-300 h-44 rounded-lg p-1 m-1"
                            value={curCreature.arts}
                            onChange={(e) => setCurCreature({...curCreature, arts: e.target.value})}
                        /> */}

                        {["At level 1 ", "At level 2 ", "At level 3 "].map((front: string, val: number) => {
                            return (
                                <>
                                    {curLvl >= val + 1 &&
                                        curTraits.length < curLvl + 1 &&
                                        _displayedCreature.traits[val].map((list: string, id: number) => {
                                            if (list.split(". ").length == 1) {
                                                const foundTrait = traits.find((trait) => {
                                                    return trait.name == list;
                                                });
                                                return (
                                                    <>
                                                        {!curTraits.includes(foundTrait) && ( // foundTrait will always be found as it is found when giving all traits
                                                            <div
                                                                className="flex flex-row items-center justify-center"
                                                                onClick={() => {
                                                                    addChosenTrait(foundTrait);
                                                                }}
                                                                key={id}
                                                            >
                                                                {front} we recommend taking{" "}
                                                                <Tooltip
                                                                    text={capitalize(list)}
                                                                    key={id}
                                                                    display={
                                                                        <>
                                                                            <h3 className="-mb-2 mt-1 rounded-md bg-dark-300 p-2">
                                                                                CLICK TO PICK ME
                                                                            </h3>
                                                                            <TraitCard
                                                                                _trait={foundTrait}
                                                                                _className="m-1 w-96"
                                                                                moveTrait={() =>
                                                                                    addChosenTrait(foundTrait)
                                                                                }
                                                                            />
                                                                        </>
                                                                    }
                                                                    className="m-1 rounded-md bg-dark-300 p-1"
                                                                />
                                                            </div>
                                                        )}
                                                    </>
                                                );
                                            }

                                            return (
                                                <>
                                                    {curTraits.length < curLvl + 1 && (
                                                        <div className="flex flex-row items-center justify-center">
                                                            {front} pick one of the following:
                                                            {list.split(". ").map((t: string, id: number) => {
                                                                const foundTrait = traits.find((trait) => {
                                                                    return trait.name == t;
                                                                });
                                                                // console.log(traits)
                                                                return (
                                                                    <>
                                                                        {!curTraits.includes(foundTrait) && ( // foundTrait will always be found as it is found when giving all traits
                                                                            <div
                                                                                key={id}
                                                                                className="flex flex-row items-center justify-center"
                                                                                onClick={() => {
                                                                                    addChosenTrait(foundTrait);
                                                                                }}
                                                                            >
                                                                                <Tooltip
                                                                                    text={capitalize(t)}
                                                                                    key={id}
                                                                                    display={
                                                                                        <>
                                                                                            <h3 className="-mb-2 mt-1 rounded-md bg-dark-300 p-2">
                                                                                                CLICK TO PICK ME
                                                                                            </h3>
                                                                                            <TraitCard
                                                                                                _trait={foundTrait}
                                                                                                _className="m-1 w-96"
                                                                                                moveTrait={() =>
                                                                                                    addChosenTrait(
                                                                                                        foundTrait
                                                                                                    )
                                                                                                }
                                                                                            />
                                                                                        </>
                                                                                    }
                                                                                    className="m-1 rounded-md bg-dark-300 p-1"
                                                                                />
                                                                            </div>
                                                                        )}
                                                                    </>
                                                                );
                                                            })}
                                                        </div>
                                                    )}
                                                </>
                                            );
                                        })}
                                </>
                            );
                        })}

                        <div className="lg:grid lg:grid-cols-2">
                            {curTraits.map((t: Trait, id: number) => {
                                return (
                                    <TraitCard
                                        _trait={t}
                                        _className="m-1"
                                        moveTrait={() => removeChosenTrait(t)}
                                        key={id}
                                    />
                                );
                            })}
                        </div>
                    </div>

                    {/* Arts */}
                    <div className="m-2 flex flex-col rounded-md bg-dark-400 p-1">
                        <h3 className="m-1 rounded-md bg-dark-300 p-1 font-bold">ARTS</h3>
                        {/* <textarea
                            placeholder="**Reminder** - Spend ## and 3 Strain; You this is how actives should look."
                            className="bg-dark-300 h-44 rounded-lg p-1 m-1"
                            value={curCreature.arts}
                            onChange={(e) => setCurCreature({...curCreature, arts: e.target.value})}
                        /> */}

                        {["At level 1 ", "At level 2 ", "At level 3 "].map((front: string, val: number) => {
                            return (
                                <>
                                    {curLvl >= val + 1 &&
                                        curArts.length < curLvl + 3 &&
                                        _displayedCreature.arts[val].map((list: string, id: number) => {
                                            if (list.split(". ").length == 1) {
                                                const foundArt = arts.find((art) => {
                                                    return art.name == list;
                                                });
                                                return (
                                                    <>
                                                        {!curArts.includes(foundArt) && ( // foundArt will always be found as it is found when giving all arts
                                                            <div
                                                                key={id}
                                                                className="flex flex-row items-center justify-center"
                                                                onClick={() => {
                                                                    addChosenArt(foundArt);
                                                                }}
                                                            >
                                                                {front} {artPickOptions[id][0]}{" "}
                                                                <Tooltip
                                                                    text={capitalize(list)}
                                                                    key={id}
                                                                    display={
                                                                        <>
                                                                            <h3 className="-mb-2 mt-1 rounded-md bg-dark-300 p-2">
                                                                                CLICK TO PICK ME
                                                                            </h3>
                                                                            <ArtCard
                                                                                _spell={foundArt}
                                                                                _className="m-1 w-96"
                                                                                static
                                                                            />
                                                                        </>
                                                                    }
                                                                    className="m-1 rounded-md bg-dark-300 p-1"
                                                                />
                                                            </div>
                                                        )}
                                                    </>
                                                );
                                            }

                                            return (
                                                <>
                                                    {curArts.length < curLvl + 3 && (
                                                        <div
                                                            key={id}
                                                            className="flex flex-row items-center justify-center"
                                                        >
                                                            {front} {artPickOptions[id][1]}
                                                            {list.split(". ").map((s: string, id: number) => {
                                                                const foundArt = arts.find((art) => {
                                                                    return art.name == s;
                                                                });
                                                                // console.log(arts)
                                                                return (
                                                                    <>
                                                                        {!curArts.includes(foundArt) && ( // foundArt will always be found as it is found when giving all arts
                                                                            <div
                                                                                key={id}
                                                                                className="flex flex-row items-center justify-center"
                                                                                onClick={() => {
                                                                                    addChosenArt(foundArt);
                                                                                }}
                                                                            >
                                                                                <Tooltip
                                                                                    text={capitalize(s)}
                                                                                    key={id}
                                                                                    display={
                                                                                        <>
                                                                                            <h3 className="-mb-2 mt-1 rounded-md bg-dark-300 p-2">
                                                                                                CLICK TO PICK ME
                                                                                            </h3>
                                                                                            <ArtCard
                                                                                                _spell={foundArt}
                                                                                                _className="m-1 w-96"
                                                                                                static
                                                                                            />
                                                                                        </>
                                                                                    }
                                                                                    className="m-1 rounded-md bg-dark-300 p-1"
                                                                                />
                                                                            </div>
                                                                        )}
                                                                    </>
                                                                );
                                                            })}
                                                        </div>
                                                    )}
                                                </>
                                            );
                                        })}
                                </>
                            );
                        })}

                        <div className="lg:grid lg:grid-cols-2">
                            {curArts.map((t: Spell, id: number) => {
                                return (
                                    <ArtCard
                                        _spell={t}
                                        _className="m-1"
                                        action={{ label: "Remove", onClick: () => removeChosenArt(t) }}
                                        key={id}
                                    />
                                );
                            })}
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
