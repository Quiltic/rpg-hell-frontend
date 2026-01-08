import Markdown from "react-markdown";
import { Trait } from "../../../client";
import MarkdownRenderer from "../../../util/MarkdownRenderer";
import { formatEffectString, toPillElement } from "../../../util/textFormatting";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

type Props = {
    _trait: Trait;
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

export default function TraitCard({
    _trait: _trait = {"name": "LOADING TRAIT", "tags": ["loading"], "effect": "Loading.", "req": ["loading 1"], "extra": ""},
}: Props) {    

    

    const ee = formatEffectString(_trait.effect).split("\n\n");
    // console.log(ee) ⚄.replace(/\#/gi, "⚀") ?? ""
    // .replace('###', "⚀⚁⚂").replace('##', "⚀⚁").replace('#', "⚀")

    const req = toPillElement(
        _trait.req?.toString().replace(" 0", "") ?? "",
        ","
    );

    // gives automatic gradients for trait color bar
    let graid = `bg-gradient-to-br from-${_trait.req[0].toString().replace(/[0-9\s]/g, '') ?? ""} to-${_trait.req[0]?.toString().replace(/[0-9\s]/g, '') ?? ""} p-2`;
    if (_trait.req.length > 1) {
        graid = `bg-gradient-to-br from-${_trait.req[0].toString().replace(/[0-9\s]/g, '') ?? ""} to-${_trait.req[1].toString().replace(/[0-9\s]/g, '') ?? ""} p-2`;
    }

    return (
        <div className="flex flex-col bg-dark-400 rounded-md border-solid border-2 border-body-700/20 m-4" >
            <div className="flex flex-row items-center bg-dark rounded-md justify-between">
                <div className="text-lg font-bold capitalize p-2">
                    {_trait.name ?? ""}
                </div>
                <div className="flex flex-row items-center capitalize">
                    {req}
                </div>
                
            </div>
            
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
                    className="text-left"
                >
                    {line}
                </Markdown>
                
                { i < ee.length-1 && 
                    <div className="mt-2.5 w-full text-center border-b-2 border-solid border-body-700/20">
                        {/* <div className="px-2.5 py-2 bg-dark-400 border-2 border-solid border-body-700/20">TEST</div> */}
                    </div>
                }
                </>
            );
            })}
        </div>
    );
}


