import { Trait } from "../client";
import { TraitDictionary } from "../types/TraitDictionary";

function firstLeterUppercase(_string:string, splitter: string, ender:string) {
    // sometimes we might get a problem with an endspace existing, this culls it
    if (_string.endsWith(" ")) {
        _string = _string.slice(0, -1);
    }
    // Try to make the names, requirements, tags, ect. uppercase
    return _string.split(splitter).map((word) => { 
        return word[0].toUpperCase() + word.substring(1); 
    }).join(ender);
}

function makeTableLine_Trait(trait: Trait): string {
    const name = firstLeterUppercase(trait.name?.toString(), " ", " ");
    const requirements = firstLeterUppercase(trait.req?.toString(), ",", ", ");

    let dice: string = "#".repeat(trait.dice);
    const effect: string = trait.effect.replace(/(?:\r\n|\r|\n)/g, '<br />');

    // Passives
    if (trait.is_passive) {
        if (dice == ""){
            dice = "P"
        } else {
            dice = `P, ${dice}`;
        }
    }   

    return `| ${name} | ${requirements} | ${dice} | ${effect} |`;
}

function convertDictionaryToMD_Traits(traits: TraitDictionary): string {
    const rows: string[] = Object.values(traits).map(makeTableLine_Trait);

    // Push header row
    const txt =
        `| Name | Requirements | Dice | Effect |\n| --- | --- | --- | --- |\n`.concat(
            rows.join("\n")
        );

    // Join rows with newline character
    return txt;
}

function highlightKeywords(text: string): string {
    const colors: string[] = ["body", "mind", "soul"];
    let updatedText: string = text;

    for (const color of colors) {
        updatedText = highlightWord(updatedText, color);
    }
    return updatedText;
}

function highlightWord(text: string, word: string): string {
    const regex = new RegExp(`\\b(${word})\\b`, "gi");
    return text.replace(regex, `<span className="text-${word}-700">$1</span>`);
}


export {highlightKeywords, convertDictionaryToMD_Traits};