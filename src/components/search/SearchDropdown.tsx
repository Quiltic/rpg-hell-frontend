import { Combobox } from "@headlessui/react";
import type { SearchResult } from "../../search";
import { cn } from "../../styling/utilites";
import SearchResultRow from "./SearchResultRow";

export const SEE_ALL = "see-all";

type Props = {
    results: SearchResult[];
    showSeeAll: boolean;
    message?: string;
    expanded: string[];
    floating: boolean;
};

// Rendered inside the Combobox of GlobalSearch
export default function SearchDropdown({ results, showSeeAll, message, expanded, floating }: Props) {
    return (
        <div
            className={cn(
                "max-h-[70vh] overflow-y-auto bg-dark-700 text-left",
                floating
                    ? "absolute right-0 top-full z-20 mt-2 w-[36rem] max-w-[calc(100vw-2rem)] rounded-2xl p-2 shadow-lg"
                    : "mt-4"
            )}
        >
            {message ? (
                <div
                    className="px-3 py-2 text-light-300"
                    role="status"
                >
                    {message}
                </div>
            ) : (
                <Combobox.Options>
                    {results.map((result) => (
                        <Combobox.Option
                            key={result.id}
                            value={result.id}
                            className="cursor-pointer"
                        >
                            {({ active }) => (
                                <SearchResultRow
                                    result={result}
                                    active={active}
                                    expanded={expanded.includes(result.id)}
                                />
                            )}
                        </Combobox.Option>
                    ))}
                    {showSeeAll && (
                        <Combobox.Option
                            value={SEE_ALL}
                            className="cursor-pointer"
                        >
                            {({ active }) => (
                                <div
                                    className={cn(
                                        "rounded-lg px-3 py-2 text-sm text-soul-700",
                                        active && "bg-soul-500/20"
                                    )}
                                >
                                    See all results
                                </div>
                            )}
                        </Combobox.Option>
                    )}
                </Combobox.Options>
            )}
        </div>
    );
}
