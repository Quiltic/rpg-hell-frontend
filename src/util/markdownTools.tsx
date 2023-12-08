import { Trait } from "../client";
import { TraitDictionary } from "../types/TraitDictionary";

function makeTableLine_Trait(trait: Trait): string {
    if (trait.is_passive) {
        const passiveNote: string = `P,${trait.req}`;
        return `| ${trait.name} | ${passiveNote} | ${trait.dice} | ${trait.effect} |`;
    }
    return `| ${trait.name} | ${trait.req} | ${trait.dice} | ${trait.effect} |`;
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