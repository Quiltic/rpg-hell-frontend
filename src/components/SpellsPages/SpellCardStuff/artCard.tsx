import { Disclosure } from "@headlessui/react";
import { GlossaryTooltipLayer, formatEffectString } from "../../../glossary";
import Markdown from "react-markdown";
import { Spell } from "../../../client";
import { toPillElement } from "../../../util/textFormatting";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { cn } from "../../../styling/utilites";
import { Button } from "../../ui/Button/Button";
import { DiceOutlineIcon } from "../../../assets/IconSVGs/dice/diceSVG";

import pathJson from "../../../assets/OfflineJsons/paths.json";

export type ArtAction = {
    label: string;
    onClick: () => void;
    variant?: "soul" | "dark";
};

type Props = {
    _spell?: Spell;
    action?: ArtAction;
    static?: boolean;
    _className?: string;
};

const activatorHash = ["G", "V", "GV", "L", "GL", "VL", "GVL"];

/**
 * A collapsible art row showing name, strain and dice costs; opens to the full description.
 * @param _spell - the art to show
 * @param action - optional button shown under the description
 * @param static - keeps the card open with no toggle
 * @example
 * ```tsx
 * <ArtCard _spell={art} action={{ label: "Activate", variant: "soul", onClick: activate }} />
 * ```
 */
export default function ArtCard({
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
    action,
    static: isStatic = false,
    _className,
}: Props) {
    const ee = formatEffectString(_spell.effect).split("\n\n");

    const req = toPillElement((_spell.stat ?? "") + " " + (_spell.level ?? ""), ",");

    let accent = `bg-${_spell.stat?.toLowerCase()}`;
    const path = pathJson.find((p) => {
        return p.name == _spell.stat?.toLowerCase();
    });
    if (path) {
        accent = `bg-${path.color}`;
    }

    const rowClass = "flex w-full items-center gap-3 bg-dark px-3 py-2 text-left";

    const row = (
        <>
            <span
                className={cn(
                    "min-w-0 flex-1 truncate font-bold capitalize",
                    _spell.name.length > 16 ? "text-sm" : "text-lg"
                )}
            >
                {_spell.name ?? ""}
            </span>
            <span className="flex shrink-0 items-center gap-2">
                {_spell.strain > 0 && (
                    <span
                        className="flex items-center gap-1"
                        aria-label={`${_spell.strain} strain`}
                    >
                        {_spell.strain > 3 && <span className="text-sm font-bold tabular-nums">{_spell.strain} ×</span>}
                        {Array.from({ length: _spell.strain > 3 ? 1 : _spell.strain }, (_, i) => (
                            <span
                                key={i}
                                className="inline-block h-4 w-4 shrink-0 rounded-full border-2 border-soul-700"
                            />
                        ))}
                    </span>
                )}
                {_spell.dice > 0 && (
                    <span
                        className="flex items-center gap-0.5"
                        aria-label={`${_spell.dice} dice`}
                    >
                        {Array.from({ length: _spell.dice }, (_, i) => (
                            <DiceOutlineIcon key={i} />
                        ))}
                    </span>
                )}
            </span>
        </>
    );

    const panel = (
        <div className="px-3 pb-3 pt-2 text-left">
            <div className="flex flex-wrap items-center gap-x-1 text-sm">
                {req}
                <span className="font-bold text-light-300">({activatorHash[_spell.activators - 1]})</span>
                <span className="capitalize italic text-light-300">{_spell.tags}</span>
            </div>

            {ee.map((line, i) => {
                return (
                    <Markdown
                        key={i}
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
                        className="text-left"
                    >
                        {line}
                    </Markdown>
                );
            })}

            {action && (
                <div className="mt-3 flex justify-end">
                    <Button
                        variant={action.variant ?? "dark"}
                        size="md"
                        onClick={action.onClick}
                    >
                        {action.label}
                    </Button>
                </div>
            )}
        </div>
    );

    return (
        <GlossaryTooltipLayer>
            <div
                className={cn(
                    "m-4 flex break-inside-avoid overflow-hidden rounded-md border-2 border-solid border-body-700/20 bg-dark-400",
                    isStatic && "max-h-96 print:max-h-full",
                    _className
                )}
            >
                <div className={cn("w-1 shrink-0", accent)} />
                <div className="min-w-0 flex-1 overflow-auto">
                    {isStatic ? (
                        <>
                            <div className={rowClass}>{row}</div>
                            {panel}
                        </>
                    ) : (
                        <Disclosure>
                            {({ open }) => (
                                <>
                                    <Disclosure.Button className={cn(rowClass, "hover:bg-dark-300")}>
                                        {row}
                                    </Disclosure.Button>
                                    <Disclosure.Panel
                                        static
                                        className={cn(!open && "hidden print:block")}
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
