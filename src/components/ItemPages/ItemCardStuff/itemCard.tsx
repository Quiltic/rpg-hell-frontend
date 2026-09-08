import KeywordTooltipLayer from "../../ui/KeywordTooltipLayer";
import Markdown from "react-markdown";
import { Item } from "../../../client";
import MarkdownRenderer from "../../../util/MarkdownRenderer";
import {
    formatEffectString,
    toPillElement,
} from "../../../util/textFormatting";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { cn } from "../../../styling/utilites";

type Props = {
    _item: Item;
    moveItem?: (item: Item) => void;
    _className?: string;
};

export default function ItemCard({
    _item: _item = {
        name: "LOADING ITEM",
        description: "LOADING",
        upgrades: [],
        tags: "loading",
        rarity: "common",
        cost: 2,
        effect: "Loading.",
    },
    moveItem,
    _className,
}: Props) {
    const ee = formatEffectString(_item.effect).split("\n\n");
    // console.log(ee) ⚄.replace(/\#/gi, "⚀") ?? ""
    // .replace('###', "⚀⚁⚂").replace('##', "⚀⚁").replace('#', "⚀")

    let reqlist = "";
    _item.tags
        ?.toLowerCase()
        .split(", ")
        .forEach((tag) => {
            if (
                "body mind soul arcana charm crafting medicine nature thieving ".includes(
                    tag.substring(0, tag.length - 1)
                )
            ) {
                reqlist = reqlist.concat(",", tag);
            }
        });
    const req = toPillElement(
        reqlist.substring(1).replace(" 0", "") ?? "",
        ","
    );

    const level = toPillElement(_item.rarity.toString(), ",");

    return (
        <KeywordTooltipLayer>
            <div
                className={cn(
                    "m-4 flex max-h-96 break-inside-avoid flex-col overflow-auto rounded-md border-2 border-solid border-body-700/20 bg-dark-400 print:max-h-full",
                    moveItem != undefined ? "clickable" : "",
                    _className
                )}
                onClick={() => {
                    if (moveItem != undefined) moveItem(_item);
                }}
            >
                <div className="flex flex-row items-center justify-between rounded-md bg-dark">
                    <div
                        className={cn(
                            "flex items-center capitalize",
                            _item.tags.length > 20 ? "flex-col" : "flex-row"
                        )}
                    >
                        <div
                            className={cn(
                                "p-2 text-lg font-bold capitalize",
                                _item.name.length > 15 ? "text-sm" : ""
                            )}
                        >
                            {_item.name ?? ""}
                        </div>
                        <div
                            className={cn(
                                "items-left flex p-1 pl-2 capitalize italic text-light-300",
                                _item.tags.length > 20
                                    ? "-mt-2 text-xs"
                                    : "text-sm"
                            )}
                        >
                            {_item.tags}
                        </div>
                    </div>
                    <div className="m-2 flex flex-col items-center capitalize">
                        {req}
                        {level}
                    </div>
                </div>

                <div className="items-left -mb-3 flex p-1 pl-2 italic text-light-300">
                    {_item.description}
                </div>

                {ee.map((line, id) => {
                    return (
                        <Markdown
                            key={id}
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
                    );
                })}

                {_item.upgrades &&
                    _item.upgrades.map((upgrade, id) => {
                        const line = formatEffectString(upgrade);
                        return (
                            <div key={id}>
                                <hr className="-mb-4" />
                                <p className="font-semibold underline ">
                                    Upgrade
                                </p>
                                <Markdown
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[rehypeRaw]}
                                    components={{
                                        ul: ({ node, ...props }) => (
                                            <ul
                                                className="md_list"
                                                {...props}
                                            />
                                        ),
                                    }}
                                    className="-mt-4 text-left"
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
        </KeywordTooltipLayer>
    );
}
