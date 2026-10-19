// import { GlossaryTooltipLayer, formatEffectString } from "../../../glossary";
// import Markdown from "react-markdown";
// import { Trait, TraitsService } from "../../../client";
// import MarkdownRenderer from "../../../rulebook/render/MarkdownRenderer";
// import { toPillElement } from "../../../util/textFormatting";
// import remarkGfm from "remark-gfm";
// import rehypeRaw from "rehype-raw";
// import { cn } from "../../../styling/utilites";
// import pathJson from "../../../assets/OfflineJsons/paths.json";
// import { traitResult } from "../../search/testResults";
// import TraitSimpleListing from "./traitSimpleListing";

// type Props = {
//     _trait: Trait;
//     moveTrait?: (item: Trait) => void;
//     _className?: string;
// };

// export default function TraitCard({
//     _trait: _trait = {
//         name: "LOADING TRAIT",
//         tags: "loading",
//         effect: "Loading.",
//         req: "loading 1",
//         extra: "",
//     },
//     moveTrait,
//     _className,
// }: Props) {

//     const effectLines = formatEffectString(_trait.effect).replace('#', "⚂");
//     const req = toPillElement(_trait.req?.toString().replace(" 0", "") ?? "", ",");

//     const path = pathJson.find((p) => {
//         return p.name == _trait.req;
//     });

//     return (
//         <GlossaryTooltipLayer>
//             <div
//                 className={cn(
//                     "m-4 max-h-96 break-inside-avoid overflow-auto print:max-h-full",
//                     moveTrait != undefined ? "clickable" : "",
//                     _className
//                 )}
//                 onClick={() => {
//                     if (moveTrait != undefined) moveTrait(_trait);
//                 }}
//             >
//                 {/* <div className="grid grid-cols-[2fr_1fr] -mb-5"> */}
//                 <div className="m-4 -mb-1 rounded-t-lg border-2 border-solid border-body-700/20 bg-dark-600 p-2 font-bold capitalize lg:text-lg">
//                     {_trait.name ?? ""}
//                     {/* </div>
//                     <div className="flex flex-col capitalize bg-dark-600 rounded-t-lg border-solid border-2 border-body-700/20 m-4 p-2"> */}
//                     {req}
//                 </div>
//                 {/* </div> */}
//                 <div className="rounded-md border-2 border-solid border-body-700/20 bg-dark-400">
//                     {/* <div className={graid} /> */}
//                     {path &&
//                         <div className={`p-2 bg-${ path.color}`}/>
//                     }

//                     <Markdown
//                         remarkPlugins={[remarkGfm]}
//                         rehypePlugins={[rehypeRaw]}
//                         components={{
//                             ul: ({ node, ...props }) => (
//                                 <ul
//                                     className="md_list"
//                                     {...props}
//                                 />
//                             ),
//                         }}
//                         className={cn("mb-2.5 p-2 text-left", effectLines.length > 300 ? "text-sm" : "")}
//                     >
//                         {effectLines}
//                     </Markdown>
//                 </div>
//             </div>
//         </GlossaryTooltipLayer>
//     );
// }

import { Disclosure } from "@headlessui/react";
import { GlossaryTooltipLayer, formatEffectString } from "../../../glossary";
import Markdown from "react-markdown";
import { Trait } from "../../../client";
import { toPillElement } from "../../../util/textFormatting";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { cn } from "../../../styling/utilites";
import { Button } from "../../ui/Button/Button";
import { DiceOutlineIcon } from "../../../assets/IconSVGs/dice/diceSVG";

import pathJson from "../../../assets/OfflineJsons/paths.json";

export type TraitAction = {
    label: string;
    onClick: () => void;
    variant?: "soul" | "dark";
};

type Props = {
    _trait: Trait;
    action?: TraitAction;
    static?: boolean;
    _className?: string;
};

/**
 * A collapsible art row showing name, strain and dice costs; opens to the full description.
 * @param _trait - What we want to display
 * @param action - optional button shown at the right end of the top row
 * @param static - keeps the card open with no toggle
 * @example
 * ```tsx
 * <TraitCard _trait={trait} action={{ label: "Activate", variant: "soul", onClick: activate }} />
 * ```
 */
export default function TraitCard({ _trait, action, static: isStatic = true, _className }: Props) {
    const effect = formatEffectString(_trait.effect).split("\n\n");
    const req = toPillElement(_trait.req?.toString().replace(" 0", "") ?? "", ",");

    const path = pathJson.find((p) => {
        return _trait.req.includes(p.name);
    });

    let accent = "";
    if (path) {
        accent = `bg-${path.color}`;
    }

    const rowClass = "flex min-w-0 flex-1 items-center gap-3 px-3 py-2 text-left";

    const row = (
        <>
            <span className={"min-w-0 flex-1 truncate text-lg font-bold capitalize"}>{_trait.name ?? ""}</span>
            {req}
        </>
    );

    const panel = (
        <div className="flex flex-1 flex-col px-3 pb-3 text-left">
            {effect.map((line, i) => {
                return (
                    <Markdown
                        key={i}
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        components={{
                            ul: ({ ...props }) => (
                                <ul
                                    className="md_list"
                                    {...props}
                                />
                            ),
                        }}
                        className="text-left"
                    >
                        {line}
                    </Markdown>
                );
            })}
        </div>
    );

    const actionButton = action && (
        <Button
            variant={action.variant ?? "dark"}
            size="sm"
            className="my-2 mr-3 shrink-0"
            onClick={action.onClick}
        >
            {action.label}
        </Button>
    );

    const topRowClass = cn("flex items-center bg-dark", !isStatic && "hover:bg-dark-300");

    return (
        <GlossaryTooltipLayer>
            <div
                className={cn(
                    "m-4 flex break-inside-avoid overflow-hidden rounded-md border-2 border-solid border-body-700/20 bg-dark-400",
                    isStatic && "max-h-96 print:max-h-full",
                    _className
                )}
            >
                <div className="flex min-w-0 flex-1 flex-col overflow-auto">
                    {isStatic ? (
                        <>
                            <div className={topRowClass}>
                                <div className={rowClass}>{row}</div>
                                {actionButton}
                            </div>
                            <div className={`p-1 ${accent}`}></div>
                            {panel}
                        </>
                    ) : (
                        <Disclosure>
                            {({ open }) => (
                                <>
                                    <div className={topRowClass}>
                                        <Disclosure.Button className={rowClass}>{row}</Disclosure.Button>
                                        {actionButton}
                                    </div>
                                    <div className={`p-1 ${accent}`}></div>
                                    <Disclosure.Panel
                                        static
                                        className={cn("flex flex-1 flex-col", !open && "hidden print:flex")}
                                    >
                                        {panel}
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    )}
                </div>
            </div>
        </GlossaryTooltipLayer>
    );
}
