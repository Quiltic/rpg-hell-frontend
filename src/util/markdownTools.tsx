import { Trait } from "../client";
import { TraitDictionary } from "../types/TraitDictionary";


function makeTableLine_Trait(trait: Trait): string {

    // Try to make the requirements uppercase but doesent work for some reason
    const requirements = trait.req?.toString().split(",");
    requirements.map((word) => { 
        return word[0].toUpperCase() + word.substring(1); 
    }).join(", ");

    let passiveNote: string = trait.dice.toString();
    const effect: string = trait.effect.replace(/(?:\r\n|\r|\n)/g, '<br />');

    if (trait.is_passive) {
        passiveNote = `P,${trait.dice}`;
    }

    return `| ${trait.name} | ${requirements} | ${passiveNote} | ${effect} |`;
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