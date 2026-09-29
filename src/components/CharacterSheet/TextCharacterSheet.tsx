import { Trait, Spell, Item } from "../../client";
import { useItems } from "../../hooks/useItems";
import { useSpells } from "../../hooks/useSpells";
import { useTraits } from "../../hooks/useTraits";
import { playerCharacterType } from "../../types/playerCharacterType";
import { capitalize } from "../../util/textFormatting";

type Props = {
    player: playerCharacterType;
    setPlayer: (player: playerCharacterType) => void;
};

const activatorHash = ["G", "V", "GV", "L", "GL", "VL", "GVL"];

export default function TextCharacterSheet({ player: player, setPlayer: setPlayer }: Props) {
    // const [areYouSurePopup, setAreYouSurePopup] = useState(false);

    const { allTraits } = useTraits();
    const { allSpells } = useSpells();
    const { allItems } = useItems();

    const traits = allTraits.filter((trait) => {
        return player.traits.includes(trait.name);
    });
    let traitLines = "";
    traits.forEach((trait: Trait) => {
        traitLines += `${capitalize(trait.name)} - ${trait.effect}\n\n`;
    });

    const arts = allSpells.filter((art) => {
        return player.arts.includes(art.name);
    });
    let artLines = "";
    arts.forEach((art: Spell) => {
        artLines += `${capitalize(art.name)} (${activatorHash[art.activators - 1]}) - ${art.effect}\n\n`;
    });

    // const items = allItems.filter((item) => {return(player.items.includes(item.name))});

    let itemLines = "";
    // console.log(items);
    player.items.forEach((item: string) => {
        if (item != "") {
            const theItem = allItems.find(
                (searchingItem) => searchingItem.name == item.replace("(equ)", "").replace("\n", "").toLowerCase()
            );

            // console.log(theItem);
            if (theItem) {
                itemLines += capitalize(item) + " (found) -> ";
                if (theItem.tags.includes("weapon")) itemLines += theItem.tags.replace(/weapon../, "") + " - ";
                itemLines += theItem.effect + "\n\n";
            } else {
                itemLines = itemLines + item + "\n\n";
            }
        }
    });

    // items.forEach((item:Item)=> {
    //     itemLines += `${item.name} - ${item.effect}`;
    // });

    let characterString = `

Level: ${player.level} 
# Body: ${player.stats.body}    Mind: ${player.stats.mind}    Soul: ${player.stats.soul}
### Arcana: ${player.stats.arcana}    Charm: ${player.stats.charm}    Finesse: ${player.stats.finesse}    Nature: ${player.stats.nature}

HP: ${player.calculatedStats.curHp}/${player.calculatedStats.maxHp}    Shielding: ${player.calculatedStats.shielding}    Dodge: ${player.calculatedStats.dodge}    
Strain: ${player.calculatedStats.curStrain}/${player.calculatedStats.maxStrain}    Speed: ${player.calculatedStats.speed}

Locked: [0], Combat Dice ${4 + Math.floor(player.level / 2)}

# Paths
${player.paths
    .filter((p) => {
        return p != "" && p != "Locked until Lvl 3";
    })
    .join(" | ")}

## Traits
${traitLines}

## Arts
${artLines}

## Items
${itemLines}



# Stories
${player.stories}

# Notes
${player.notes}

`;

    return (
        <textarea
            rows={20}
            placeholder="Oh it broke."
            className="m-1 h-[60%] w-full rounded-lg bg-dark-300 p-1"
            value={characterString}
            // onChange={(text) => setItemString(text.target.value)}
            contentEditable={false}
        />
    );
}
