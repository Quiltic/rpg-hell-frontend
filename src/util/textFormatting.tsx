import Pill from "../components/ui/Pill";

// const requirements = toPillElement(trait.req?.toString(), ",", "");
export function toPillElement(_string: string, splitter: string) {
    const rarityTiers = {
        "mundane":"dark-300",
        "common":"thieving",
        "uncommon":"nature",
        "rare":"mind",
        "legendary":"arcana"
    }
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
        if (parts[0] in rarityTiers) {
            parts[0] = rarityTiers[parts[0]];
        }
        const isBroken: boolean = parts[0].toLowerCase() == "broken";
        return (
            <Pill
                colorClassName={
                    "bg-" +
                    parts[0].toLowerCase() +
                    (isBroken ? " ring-2 ring-medicine-500" : "")
                }
                key={i}
            >
                {word}
            </Pill>
        );
    });
    return pills;
}

export function formatEffectString(text: string): string {
    text.replace(/(?:\r\n|\r|\n)/g, "<br />");
    return highlightKeywords(text);
}

export function highlightKeywords(text: string): string {
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
        updatedText = highlightWord(updatedText, color);
    }
    return updatedText;
}

function highlightWord(text: string, word: string): string {
    const regex = new RegExp(`\\b(${word})\\b`, "gi");
    return text.replace(
        regex,
        `<span class="text-${word}-700">$1</span>` //text-${word} dark:
    );
}

export function sumNumbersAfterWord(
    itemList: string[],
    findWord: string
): number {
    /*
    This function takes in a processed itemlist (name-##-effects-tags) and returns a total sum of all "tags" (damage 6)
    */
    let sum = 0;

    for (const item of itemList) {
        const wordsAndNumbers = item
            .substring(item.indexOf("- ") + 2)
            .split(","); // remove everything before  '- ' (name) so that the split will get all info

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
