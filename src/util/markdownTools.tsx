// import { List } from "postcss/lib/list";
import { Item, Spell, Trait } from "../client";

// type Dictionary<T> = {
//     [key: string]: T;
// }

function firstLeterUppercase(_string: string, splitter: string, ender: string) {
    // css class on table cell: first-letter:capitalize
    // console.log(_string);
    if (!_string) {
        return "";
    }
    // sometimes we might get a problem with an endspace existing, this culls it
    if (_string.endsWith(" ")) {
        _string = _string.slice(0, -1);
    }
    // Try to make the names, requirements, tags, ect. uppercase
    return _string
        .split(splitter)
        .map((word) => {
            return word[0].toUpperCase() + word.substring(1);
        })
        .join(ender);
}

function toPill(_string: string, splitter: string, ender: string) {
    if (!_string) {
        return "";
    }

    // sometimes we might get a problem with an endspace existing, this culls it
    if (_string.endsWith(" ")) {
        _string = _string.slice(0, -1);
    }
    // Try to make the names, requirements, tags, ect. uppercase
    return _string
        .split(splitter)
        .map((word) => {
            return `<div class="flex h-6 w-fit px-2 mb-1 items-start justify-center rounded text-white bg-${word.slice(
                0,
                -2
            )}-400">${word[0].toUpperCase() + word.substring(1)}</div>`;
        })
        .join(ender);
}

function highlightKeywords(text: string, makePill: boolean = false): string {
    const colors: string[] = [
        "body",
        "mind",
        "soul",
        "arcana",
        "charm",
        "crafting",
        "nature",
        "medicine",
        "thieving",
    ];
    let updatedText: string = text;

    for (const color of colors) {
        updatedText = highlightWord(updatedText, color, makePill);
    }
    return updatedText;
}

function highlightWord(
    text: string,
    word: string,
    makePill: boolean = false
): string {
    const regex = new RegExp(`\\b(${word})\\b`, "gi");
    if (makePill) {
        return text.replace(
            regex,
            `<div className="flex h-6 w-fit px-3 items-start justify-center rounded-full text-white bg-${word}">$1</div>`
        );
    }
    return text.replace(regex, `<span className="text-${word}-700">$1</span>`);
}

function makeTableLine_Trait(trait: Trait): string {
    const name = firstLeterUppercase(trait.name?.toString(), " ", " ");
    const requirements = toPill(trait.req?.toString(), ",", "");
    // requirements = highlightKeywords(requirements, true); // Add true param for Pill (though it doesent like md)

    let dice: string = "#".repeat(trait.dice);
    let effect: string = trait.effect.replace(/(?:\r\n|\r|\n)/g, "<br />");
    effect = highlightKeywords(effect);

    // Passives
    if (trait.is_passive) {
        if (dice == "") {
            dice = "P";
        } else {
            dice = `P, ${dice}`;
        }
    }

    return `| **${name}** | ${requirements} | ${dice} | ${effect} |`;
}

function makeTableLine_Spells(spell: Spell): string {
    const name = firstLeterUppercase(spell.name?.toString(), " ", " ");
    const strain = `St ${spell.level}`;
    // requirements = highlightKeywords(requirements, true); // Add true param for Pill (though it doesent like md)

    const dice: string = "#".repeat(spell.dice);
    let effect: string = spell.effect.replace(/(?:\r\n|\r|\n)/g, "<br />");
    effect = highlightKeywords(effect);

    const tags = firstLeterUppercase(spell.tags?.toString(), ",", ", ");

    return `| **${name}** | ${strain} | ${dice} | ${effect} |  ${tags} |`;
}

function makeTableLine_Items(item: Item): string {
    const name = firstLeterUppercase(item.name?.toString(), " ", " ");
    // console.log(item.req);

    const requirements = toPill(item.req?.toString(), ",", "");

    let effect: string = item.effect.replace(/(?:\r\n|\r|\n)/g, "<br />");
    effect = highlightKeywords(effect);

    const tags = firstLeterUppercase(item.tags?.toString(), ",", ", ");

    const cost = item.cost?.toString();
    const craft = item.craft?.toString();

    return `| **${name}** | ${requirements} | ${effect} | ${tags} |  ${cost} |  ${craft} |`;
}

function convertDictionaryToMD<T>(
    vals: Array<T>,
    makeFunc: (x: T) => string,
    header: string
): string {
    const rows: string[] = vals.map(makeFunc);

    // Push header row
    const txt = header.concat(rows.join("\n"));

    // Join rows with newline character
    return txt;
}

export {
    convertDictionaryToMD,
    makeTableLine_Trait,
    makeTableLine_Spells,
    makeTableLine_Items,
    toPill,
};
