import Pill from "../components/ui/Pill";

// const requirements = toPillElement(trait.req?.toString(), ",", "");
export function toPillElement(
    _string: string,
    splitter: string,
    ender: string
) {
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
            return (
                <Pill colorClassName={"bg-" + word.toLowerCase()}>
                    {word /* {word[0].toUpperCase() + word.substring(1)} */}
                </Pill>
            );
        })
        .join(ender);
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
    return text.replace(regex, `<span class="text-${word}-700">$1</span>`);
}
