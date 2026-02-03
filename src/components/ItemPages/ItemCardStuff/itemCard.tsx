import Markdown from "react-markdown";
import { Item } from "../../../client";
import MarkdownRenderer from "../../../util/MarkdownRenderer";
import { formatEffectString, toPillElement } from "../../../util/textFormatting";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { cn } from "../../../styling/utilites";

type Props = {
    _item: Item;
    moveItem?: (item: Item) => void;
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

export default function ItemCard({
    _item: _item = {"name":"LOADING ITEM","description":"LOADING","upgrades":[],"tags":"loading","rarity":"common","cost":2,"effect":"Loading."},
    moveItem,
    _className
}: Props) {    

    

    const ee = formatEffectString(_item.effect).split("\n\n");
    // console.log(ee) ⚄.replace(/\#/gi, "⚀") ?? ""
    // .replace('###', "⚀⚁⚂").replace('##', "⚀⚁").replace('#', "⚀")

    let reqlist = "";
    _item.tags?.toLowerCase().split(", ").forEach(tag => {
        if ("body mind soul arcana charm crafting medicine nature thieving ".includes(tag.substring(0,tag.length-1))) {
            reqlist = reqlist.concat(",",tag);
        }
    });
    const req = toPillElement( reqlist.substring(1).replace(" 0", "") ?? "", "," );

    const level = toPillElement(
        _item.rarity.toString(),
        ","
    );

    // gives automatic gradients for item color bar
    // const graid = `bg-gradient-to-br from-${_item.stat.toLowerCase()} to-${_item.stat.toLowerCase()} p-2`;
    

    return (
        <div className={cn("flex flex-col bg-dark-400 rounded-md border-solid border-2 border-body-700/20 m-4 max-h-96 print:max-h-full overflow-auto break-inside-avoid", 
             (moveItem!=undefined ? "clickable" : ""), _className)}
            onClick={() => {
                if (moveItem != undefined)
                    moveItem(_item);
            }}
        >
            <div className="flex flex-row items-center bg-dark rounded-md justify-between">
                <div className={cn("flex items-center capitalize", _item.tags.length > 20 ? "flex-col" : "flex-row")}>
                    <div className={cn("text-lg font-bold capitalize p-2",_item.name.length > 15 ? "text-sm" : "")}>
                        {_item.name ?? ""}
                    </div>
                    <div className={cn("flex italic items-left p-1 pl-2 capitalize text-light-300", _item.tags.length > 20 ? "text-xs -mt-2" : "text-sm")}>
                        {_item.tags}
                    </div>
                </div>
                <div className="flex flex-col items-center capitalize m-2">
                    {req}{level}
                </div>
                
            </div>
            
            {/* <div className={graid}/> */}
            <div className="flex italic items-left p-1 pl-2 text-light-300 -mb-3">
                {_item.description}
            </div>

            {ee.map((line, id) => {
                return (
                <Markdown key={id}
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                        ul: ({ node, ...props }) => <ul className="md_list" {...props} />,
                    }}
                    className="text-left"
                >
                    {line}
                </Markdown>
            );
            })}


            {_item.upgrades && _item.upgrades.map((upgrade, id) => {
                const line = formatEffectString(upgrade);
                return (
                <div key={id}>
                <hr className="-mb-4"/>
                <p className="font-semibold underline ">
                    Upgrade
                </p>
                <Markdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                        ul: ({ node, ...props }) => <ul className="md_list" {...props} />,
                    }}
                    className="text-left -mt-4"
                >
                    {line}
                </Markdown>
                
                {/* { i < ee.length-1 && 
                    <div className="mt-2.5 w-full text-center border-b-2 border-solid border-body-700/20"/>
                } */}
                </div>
            );
            })}
        </div>
    );
}


