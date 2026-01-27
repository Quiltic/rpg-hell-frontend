import Markdown from "react-markdown";
import { Spell } from "../../../client";
import MarkdownRenderer from "../../../util/MarkdownRenderer";
import { formatEffectString, toPillElement } from "../../../util/textFormatting";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { cn } from "../../../styling/utilites";

type Props = {
    _spell: Spell;
    moveSpell?: (spell: Spell) => void;
    _className?: string;
};


// i fucking hate typescript, without this worthless variable the colors will simply NOT WORK
const STUPID_COLOR_TYPESCRIPT_BS = [

    "bg-gradient-to-br from-body to-body p-2",
    "bg-gradient-to-br from-mind to-mind p-2",
    "bg-gradient-to-br from-soul to-soul p-2",
    
    "bg-gradient-to-br from-arcana to-arcana p-2",
    "bg-gradient-to-br from-charm to-charm p-2",
    "bg-gradient-to-br from-crafting to-crafting p-2",
    "bg-gradient-to-br from-nature to-nature p-2",
    "bg-gradient-to-br from-medicine to-medicine p-2",
    "bg-gradient-to-br from-thieving to-thieving p-2",
    
];

const activatorHash = [
    "G",
    "V",
    "GV",
    "L",
    "GL",
    "VL",
    "GVL"
];

export default function SpellCard({
    _spell: _spell = {"name":"LOADING TRAIT","level":1,"stat":"body","tags":"loading","strain":1,"dice":2,"effect":"Loading.","activators":7},
    moveSpell,
    _className
}: Props) {    

    

    const ee = formatEffectString(_spell.effect).split("\n\n");
    // console.log(ee) ⚄.replace(/\#/gi, "⚀") ?? ""
    // .replace('###', "⚀⚁⚂").replace('##', "⚀⚁").replace('#', "⚀")

    const req = toPillElement(
        _spell.stat+" "+(1+Math.floor((_spell.level-1)/2)).toString(),
        ","
    );
    const level = toPillElement(
        "Level: "+_spell.level.toString(),
        ","
    );

    // gives automatic gradients for spell color bar
    const graid = `bg-gradient-to-br from-${_spell.stat.toLowerCase()} to-${_spell.stat.toLowerCase()} p-2`;
    

    return (
        <div className={cn("flex flex-col bg-dark-400 rounded-md border-solid border-2 border-body-700/20 m-4 max-h-96 overflow-auto", _className)}
            onClick={() => {
                if (moveSpell != undefined)
                    moveSpell(_spell);
            }}
        >
            <div className="flex flex-row items-center bg-dark rounded-md justify-between">
                <div className="flex flex-row items-center capitalize">
                    <div className={cn("text-lg font-bold capitalize p-2",_spell.name.length > 15 ? "text-sm" : "")}>
                        {_spell.name ?? ""}
                    </div>
                    - ({activatorHash[_spell.activators-1]})
                </div>
                <div className="flex flex-col lg:flex-row items-center capitalize m-2">
                    {req}{level}
                </div>
                
            </div>
            
            <div className={graid}/>
            <div className="flex italic items-left p-1 pl-2 text-sm capitalize text-light-300 -mb-3">
                {_spell.tags}
            </div>

            {ee.map((line, i) => {
                return (
                <>
                <Markdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                        ul: ({ node, ...props }) => <ul className="md_list" {...props} />,
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
    );
}


