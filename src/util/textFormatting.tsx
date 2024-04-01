import Pill from "../components/ui/Pill";

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
        return (
            <Pill colorClassName={"bg-" + parts[0].toLowerCase()} key={i}>
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
        `<span class="text-${word} dark:text-${word}-700">$1</span>`
    );
}


export function sumNumbersAfterWord(itemList: string[], findWord: string): number {
    let sum = 0;

    for (const item of itemList) {
        const wordsAndNumbers = item.split(',');
        for (const wordAndNumber of wordsAndNumbers) {
            const [word, valueStr] = wordAndNumber.split(' ');
            if (word.trim() === findWord) {
                const value = parseInt(valueStr, 10);
                if (!isNaN(value)) {
                    sum += value;
                }
            }
        }
    }

    return sum;
}