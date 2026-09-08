import KeywordTooltipLayer from "../../ui/KeywordTooltipLayer";
import Markdown from "react-markdown";
import { Spell } from "../../../client";
import {
    formatEffectString,
    toPillElement,
} from "../../../util/textFormatting";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { cn } from "../../../styling/utilites";

type Props = {
    _spell: Spell;
    moveSpell?: (spell: Spell) => void;
    _className?: string;
};

const activatorHash = ["G", "V", "GV", "L", "GL", "VL", "GVL"];

export default function SpellCard({
    _spell: _spell = {
        name: "LOADING TRAIT",
        level: 1,
        stat: "body",
        tags: "loading",
        strain: 1,
        dice: 2,
        effect: "Loading.",
        activators: 7,
    },
    moveSpell,
    _className,
}: Props) {
    const ee = formatEffectString(_spell.effect).split("\n\n");
    // console.log(ee) ⚄.replace(/\#/gi, "⚀") ?? ""
    // .replace('###', "⚀⚁⚂").replace('##', "⚀⚁").replace('#', "⚀")

    const req = toPillElement(_spell.stat + " " + _spell.level.toString(), ",");

    const bar = `bg-${_spell.stat.toLowerCase()} p-2`;

    return (
        <KeywordTooltipLayer>
            <div
                className={cn(
                    "m-4 flex max-h-96 break-inside-avoid flex-col overflow-auto rounded-md border-2 border-solid border-body-700/20 bg-dark-400 print:max-h-full",
                    moveSpell != undefined ? "clickable" : "",
                    _className
                )}
                onClick={() => {
                    if (moveSpell != undefined) moveSpell(_spell);
                }}
            >
                <div className="flex flex-row items-center justify-between rounded-md bg-dark">
                    <div className="flex flex-row items-center capitalize">
                        <div
                            className={cn(
                                "p-2 text-lg font-bold capitalize",
                                _spell.name.length > 15 ? "text-sm" : ""
                            )}
                        >
                            {_spell.name ?? ""}
                        </div>
                        - ({activatorHash[_spell.activators - 1]})
                    </div>
                    <div className="m-2 flex flex-col items-center capitalize lg:flex-row">
                        {req}
                    </div>
                </div>

                <div className={bar} />
                <div className="items-left -mb-3 flex p-1 pl-2 text-sm capitalize italic text-light-300">
                    {_spell.tags}
                </div>

                {ee.map((line, i) => {
                    return (
                        <>
                            <Markdown
                                key={i}
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}
                                components={{
                                    ul: ({ node, ...props }) => (
                                        <ul className="md_list" {...props} />
                                    ),
                                }}
                                className="text-left"
                            >
                                {line}
                            </Markdown>

                            {/* { i < ee.length-1 && 
                        <div className="mt-2.5 w-full text-center border-b-2 border-solid border-body-700/20"/>
                    } */}
                        </>
                    );
                })}
            </div>
        </KeywordTooltipLayer>
    );
}
