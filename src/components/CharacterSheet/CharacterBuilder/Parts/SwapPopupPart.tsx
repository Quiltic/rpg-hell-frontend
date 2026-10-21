import Popup from "../../../ui/Popups/Popup";
import { Trait, Item, Spell } from "../../../../client";
import { changeItemInArray } from "../../../../util/creatureHelpers";
import TraitCard from "../../../TraitsPages/TraitCardStuff/traitCard";
import { playerCharacterType } from "../../../../types/playerCharacterType";
import ArtCard from "../../../SpellsPages/SpellCardStuff/artCard";
import ItemCard from "../../../ItemPages/ItemCardStuff/itemCard";

type Props = {
    player: playerCharacterType;
    setPlayer: (player: playerCharacterType) => void;
    isOpen: boolean;
    setIsOpen: (bla: boolean) => void;
    displayedList: Array<Trait | Spell | Item>;
    chosenList: Array<Trait | Spell | Item>;
    setChosenList: (thing: Array<any>) => void;
    type: "Trait" | "Art" | "Item";
    location: number;
};

export default function SwapPopupPart({
    player,
    setPlayer,
    isOpen,
    setIsOpen,
    displayedList,
    chosenList,
    setChosenList,
    type,
    location,
}: Props) {
    return (
        <>
            <Popup
                displayedContentName={`Pick a ${type}!`}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                isSmol={false}
                displayedContent={
                    <>
                        <div className="grid grid-cols-2">
                            {displayedList.map((thing, i) => {
                                if (thing.name != "Error") {
                                    return (
                                        <div
                                            className="clickable"
                                            onClick={() => {
                                                setChosenList(changeItemInArray(chosenList, location, thing));

                                                if (type == "Trait")
                                                    setPlayer({
                                                        ...player,
                                                        traits: changeItemInArray(player.traits, location, thing.name),
                                                    });
                                                if (type == "Art")
                                                    setPlayer({
                                                        ...player,
                                                        arts: changeItemInArray(player.arts, location, thing.name),
                                                    });

                                                // items arnt set on player here

                                                setIsOpen(false);
                                            }}
                                        >
                                            {type == "Trait" && (
                                                <TraitCard
                                                    _trait={thing as Trait}
                                                    key={i}
                                                    static={true}
                                                />
                                            )}
                                            {type == "Art" && (
                                                <ArtCard
                                                    _spell={thing as Spell}
                                                    key={i}
                                                    static={true}
                                                />
                                            )}
                                            {type == "Item" && (
                                                <ItemCard
                                                    _item={thing as Item}
                                                    showUpgrades={false}
                                                    key={i}
                                                />
                                            )}
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </>
                }
            />
        </>
    );
}
