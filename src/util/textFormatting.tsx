import Pill from "../components/ui/Pill";
import pathJson from "../assets/OfflineJsons/paths.json";

// const requirements = toPillElement(trait.req?.toString(), ",", "");
// Class, rarity and path words mapped onto the palette; shared by the pills and the search index.
export const PILL_COLOR_WORDS: Record<string, string> = {
    mundane: "dark-300",
    common: "thieving",
    uncommon: "nature",
    rare: "mind",
    legendary: "arcana",
};

// const requirements = toPillElement(trait.req?.toString(), ",", "");
export function toPillElement(_string: string, splitter: string) {
    if (!_string) {
        return "";
    }

    // sometimes we might get a problem with an endspace existing, this culls it
    if (_string.endsWith(" ")) {
        _string = _string.slice(0, -1);
    }

    // Try to make the names, requirements, tags, ect. uppercase
    const pills = _string.split(splitter).map((word, i) => {
        const parts = word.split(" ");
        if (parts[0] in PILL_COLOR_WORDS) {
            parts[0] = PILL_COLOR_WORDS[parts[0]];
        }

        const path = pathJson.find((p) => {
            return p.name == parts[0];
        });
        if (path) {
            parts[0] = path.color;
        }

        const isBroken: boolean = parts[0].toLowerCase() == "broken";
        return (
            <Pill
                colorClassName={"bg-" + parts[0].toLowerCase() + (isBroken ? " ring-2 ring-medicine-500" : "")}
                key={i}
            >
                {word}
            </Pill>
        );
    });
    return pills;
}

export function sumNumbersAfterWord(itemList: string[], findWord: string): number {
    /*
    This function takes in a processed itemlist (name-##-effects-tags) and returns a total sum of all "tags" (damage 6)
    */
    let sum = 0;

    for (const item of itemList) {
        const wordsAndNumbers = item.substring(item.indexOf("- ") + 2).split(","); // remove everything before  '- ' (name) so that the split will get all info

        for (const wordAndNumber of wordsAndNumbers) {
            const [word, valueStr] = wordAndNumber.split(" "); // change THING # into [THING,#]

            if (word.trim() == findWord) {
                // we still have some spaces
                const value = parseInt(valueStr, 10);
                if (!isNaN(value)) {
                    // sometimes outdated items will appear and we need to make sure they get ignored
                    sum += value;
                }
            }
        }
    }

    return sum;
}

export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
// "death's door" -> "Death's Door". Only the first letter of each word changes.
export function titleCase(str: string): string {
    return str.split(" ").map(capitalize).join(" ");
}
