import { Trait } from "../client";
import { TraitDictionary } from "../types/TraitDictionary";
import Pill from "../../components/ui/Pill";


function firstLeterUppercase(_string:string, splitter:string, ender:string) {
    // sometimes we might get a problem with an endspace existing, this culls it
    if (_string.endsWith(" ")) {
        _string = _string.slice(0, -1);
    }
    // Try to make the names, requirements, tags, ect. uppercase
    return _string.split(splitter).map((word) => { 
        return word[0].toUpperCase() + word.substring(1); 
    }).join(ender);
}

function toPill(_string:string, splitter:string, ender:string) {
    // sometimes we might get a problem with an endspace existing, this culls it
    if (_string.endsWith(" ")) {
        _string = _string.slice(0, -1);
    }
    // Try to make the names, requirements, tags, ect. uppercase
    return _string.split(splitter).map((word) => { 
        return `<div className="flex h-6 w-fit px-3 items-start justify-center rounded-full text-white bg-${word}">${word[0].toUpperCase() + word.substring(1)}</div>`;
    }).join(ender);
}


function makeTableLine_Trait(trait: Trait): string {
    const name = firstLeterUppercase(trait.name?.toString(), " ", " ");
    const requirements = toPill(trait.req?.toString(), ",", "");
    // requirements = highlightKeywords(requirements, true); // Add true param for Pill (though it doesent like md)

    let dice: string = "#".repeat(trait.dice);
    let effect: string = trait.effect.replace(/(?:\r\n|\r|\n)/g, '<br />');
    effect = highlightKeywords(effect);

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

function highlightKeywords(text: string, makePill: boolean = false): string {
    const colors: string[] = ["body", "mind", "soul","arcana","charm","crafting","nature","medicine","thieving"];
    let updatedText: string = text;

    for (const color of colors) {
        updatedText = highlightWord(updatedText, color, makePill);
    }
    return updatedText;
}

function highlightWord(text: string, word: string, makePill: boolean = false): string {
    const regex = new RegExp(`\\b(${word})\\b`, "gi");
    if (makePill) {
        return text.replace(regex, `<div className="flex h-6 w-fit px-3 items-start justify-center rounded-full text-white bg-${word}">$1</div>`);
    } 
    return text.replace(regex, `<span className="text-${word}-700">$1</span>`);
}


export {highlightKeywords, convertDictionaryToMD_Traits};