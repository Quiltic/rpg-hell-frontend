import { useEffect, useState } from "react";
import MarkdownRenderer from "../../../rulebook/MarkdownRenderer";
import { markdownFile } from "../../../rulebook/pages";
// import RulebookNavigation from "../RulebookNav";
import { useSpells } from "../../../hooks/useSpells";
import { useItems } from "../../../hooks/useItems";
import { useTraits } from "../../../hooks/useTraits";
import ExampleCharSheet from "../../CharacterSheet/InteractiveCharSheets/ExampleCharSheet";
import { Button } from "../../ui/Button/Button";
import exampleCharSheets from "../../../assets/OfflineJsons/example_char_sheets.json";
import Tooltip from "../../ui/Tooltip";
import { cn } from "../../../styling/utilites";
import { Link, useParams } from "react-router-dom";
import RulebookNavigation from "../RulebookNav";

const exampleDisplayedCreature = {
    name: "all",
    stats: {
        body: 0,
        mind: 0,
        soul: 0,
        arcana: 0,
        crafting: 0,
        charm: 0,
        nature: 0,
        medicine: 0,
        thieving: 0,
    },
    items: "",
    quick_exp: "",
    level_explanation: ["", "", ""],
    traits: [["", ""], [""], [""]],
    arts: [["", "", "", ""], [""], [""]],
};

export default function CharacterExamplesPage() {
    const [curCreature, setCurCreature] = useState(exampleDisplayedCreature);

    const { displayedSpells } = useSpells();

    const { displayedItems } = useItems();

    const { displayedTraits } = useTraits();

    // we do this as a failsafe in case something is given that doesent exist
    let { example } = useParams();
    useEffect(() => {
        // console.log(example);
        setCurCreature(exampleDisplayedCreature);
        exampleCharSheets.forEach((char) => {
            if (char.name.toLowerCase() != example?.toLowerCase()) {
                return;
            }
            // console.log(char.name,example);
            setCurCreature(char);
        });
    }, [example]);

    return (
        <div className="flex flex-col">
            {curCreature.name == "all" && (
                <>
                    <RulebookNavigation />
                    <MarkdownRenderer
                        markdown={markdownFile("character_examples.md")}
                        have_header={false}
                    />
                    <div className="m-2 grid grid-cols-3 justify-between rounded-md bg-dark-400 p-2 print:hidden">
                        {curCreature.name == "all" &&
                            exampleCharSheets.map((char, id) => {
                                const absolutePath = `/rulebook/character-examples/${char.name.toLowerCase()}`;
                                return (
                                    <Link
                                        to={absolutePath}
                                        key={id}
                                        // className={""}
                                        // aria-current={isActive ? "page" : undefined}
                                    >
                                        <div
                                            key={id}
                                            className={cn(
                                                "clickable m-2 rounded-md p-2",
                                                "bg-" + char.mainStat
                                            )}
                                            onClick={() => {
                                                setCurCreature(char);
                                            }}
                                        >
                                            <h3 className="mt-0 font-bold">
                                                {char.name}
                                            </h3>
                                            <div
                                                className={cn(
                                                    "text-wrap m-2 rounded-md p-2 italic",
                                                    "bg-" +
                                                        char.mainStat +
                                                        "-400"
                                                )}
                                            >
                                                {char.quick_exp}
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                    </div>
                </>
            )}

            {curCreature.name != "all" && (
                <div className="flex flex-col">
                    <Link
                        to={"/rulebook/character-examples/all"}
                        className="print:hidden"
                    >
                        <Button
                            variant={"thieving"}
                            onClick={() => {
                                setCurCreature(exampleDisplayedCreature);
                            }}
                            className="w-full print:hidden"
                        >
                            Back
                        </Button>
                    </Link>

                    <ExampleCharSheet
                        _displayedCreature={curCreature}
                        traits={displayedTraits.filter((t) => {
                            return curCreature.traits
                                .join(". ")
                                .includes(t.name);
                        })}
                        arts={displayedSpells.filter((a) => {
                            return curCreature.arts.join(". ").includes(a.name);
                        })}
                        items={displayedItems.filter((i) => {
                            return curCreature.items
                                .split(". ")
                                .includes(i.name);
                        })}
                    />
                </div>
            )}
        </div>
    );
}
