import Markdown from "react-markdown";
import { Trait } from "../../../client";
import MarkdownRenderer from "../../../util/MarkdownRenderer";
import { formatEffectString, toPillElement } from "../../../util/textFormatting";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { cn } from "../../../styling/utilites";

type Props = {
    _trait: Trait;
    moveTrait?: (item: Trait) => void;
    _className?: string;
};


// i fucking hate typescript, without this worthless variable the colors will simply NOT WORK
const STUPID_COLOR_TYPESCRIPT_BS = [

    "bg-gradient-to-br from-body-400 to-body-400 p-2",
    "bg-gradient-to-br from-mind-400 to-mind-400 p-2",
    "bg-gradient-to-br from-soul-400 to-soul-400 p-2",
    
    "bg-gradient-to-br from-arcana-400 to-arcana-400 p-2",
    "bg-gradient-to-br from-charm-400 to-charm-400 p-2",
    "bg-gradient-to-br from-crafting-400 to-crafting-400 p-2",
    "bg-gradient-to-br from-nature-400 to-nature-400 p-2",
    "bg-gradient-to-br from-medicine-400 to-medicine-400 p-2",
    "bg-gradient-to-br from-thieving-400 to-thieving-400 p-2",
    
];

export default function TraitCard({
    _trait: _trait = {"name": "LOADING TRAIT", "tags": "loading", "effect": "Loading.", "req": "loading 1", "extra": ""},
    moveTrait,
    _className
}: Props) {    

    
    // console.log(_trait);
    const ee = formatEffectString(_trait.effect).split("\n\n");
    // console.log(ee) ⚄.replace(/\#/gi, "⚀") ?? ""
    // .replace('###', "⚀⚁⚂").replace('##', "⚀⚁").replace('#', "⚀")

    const req = toPillElement(
        _trait.req?.toString().replace(" 0", "") ?? "",
        ","
    );

    // gives automatic gradients for trait color bar
    let graid = `bg-gradient-to-br from-${_trait.req.replace(/[0-9\s]/g, '') ?? ""}-400 to-${_trait.req.replace(/[0-9\s]/g, '') ?? ""}-400 p-2`;
    if (_trait.req.split(", ").length > 1) {
        graid = `bg-gradient-to-br from-${_trait.req.split(", ")[0].replace(/[0-9\s]/g, '') ?? ""}-400 to-${_trait.req.split(", ")[1].toString().replace(/[0-9\s]/g, '') ?? ""}-400 p-2`;
    }

    return (
        <div className={cn("m-4 max-h-96 overflow-auto break-inside-avoid", (moveTrait!=undefined ? "clickable" : ""), _className)}
            onClick={() => {
                if (moveTrait != undefined)
                    moveTrait(_trait);
            }}
        >
            {/* <div className="grid grid-cols-[2fr_1fr] -mb-5"> */}
                <div className="lg:text-lg font-bold capitalize bg-dark-600 rounded-t-lg border-solid border-2 border-body-700/20 m-4 p-2 -mb-1">
                    {_trait.name ?? ""}
                {/* </div>
                <div className="flex flex-col capitalize bg-dark-600 rounded-t-lg border-solid border-2 border-body-700/20 m-4 p-2"> */}
                    {req}
                </div>
            {/* </div> */}
            <div className="bg-dark-400 rounded-md border-solid border-2 border-body-700/20" >
                <div className={graid}/>
                {/* <div
                    dangerouslySetInnerHTML={{ __html: ee }}
                    className="whitespace-pre-wrap text-left m-5 indent-5 text-sm"
                ></div> */}
                {/* <Markdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                        ul: ({ node, ...props }) => <ul className="md_list" {...props} />,
                    }}
                    className="text-left"
                >
                    {ee[0]}
                </Markdown> */}
    
                {ee.map((line, i) => {
                    return (
                    <>
                    <Markdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        components={{
                            ul: ({ node, ...props }) => <ul className="md_list" {...props} />,
                        }}
                        className="text-left mb-2.5 p-2"
                    >
                        {line}
                    </Markdown>
                    
                    { i < ee.length-1 && 
                        <div className="mt-2.5 text-center border-b-2 border-solid border-body-700/20">
                            {/* <div className="px-2.5 py-2 bg-dark-400 border-2 border-solid border-body-700/20">TEST</div> */}
                        </div>
                    }
                    </>
                );
                })}
        </div>
        </div>
    );
}


