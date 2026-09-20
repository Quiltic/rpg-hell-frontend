import Pill from "../ui/Pill";
import { SearchResult, snippetFor, snippetHtml } from "../../search";
import { cn } from "../../styling/utilites";
import { titleCase } from "../../util/textFormatting";

type Props = {
    result: SearchResult;
    active?: boolean;
    expanded?: boolean;
};

/**
 * @param result - the result to show
 * @param active - tints the row with the color of its source
 * @param expanded - hides the snippet; the caller renders `GlossaryResultDetail` after the row
 */
export default function SearchResultRow({ result, active = false, expanded = false }: Props) {
    const title = result.source === "rulebook" ? result.title : titleCase(result.title);
    // dark and aabase tints do not show against the dropdown background
    const tint = result.color === "dark" || result.color === "aabase" ? "light" : result.color;

    return (
        <div
            className={cn(
                "rounded-lg px-3 py-2 text-left",
                active && `bg-${tint}-500/20 ring-1 ring-inset ring-${tint}-600`
            )}
        >
            <div className="flex items-center justify-between gap-2">
                <span className="font-bold">{title}</span>
                {result.pill && <Pill colorClassName={result.pill}>{result.context}</Pill>}
            </div>
            {!result.pill && <div className="text-sm text-light-300">{result.context}</div>}
            {!expanded && (
                <div
                    className="text-sm"
                    dangerouslySetInnerHTML={{
                        __html: snippetHtml(snippetFor(result), result.terms),
                    }}
                />
            )}
        </div>
    );
}
