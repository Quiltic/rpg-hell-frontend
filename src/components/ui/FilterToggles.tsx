import { colorFor } from "../../search/documents/palette";
import { cn } from "../../styling/utilites";

type Props = {
    options: string[];
    selected: string[];
    onChange: (next: string[]) => void;
};

/**
 * @param options - the toggle labels, shown after the "All" button
 * @param selected - the labels currently switched on; empty means "All"
 * @param onChange - called with the next selection
 * @example
 * ```tsx
 * <FilterToggles options={["weapon", "armor"]} selected={selected} onChange={setSelected} />
 * ```
 */
export default function FilterToggles({ options, selected, onChange }: Props) {
    return (
        <div className="flex flex-wrap gap-2 p-1">
            <button
                type="button"
                aria-pressed={selected.length === 0}
                onClick={() => onChange([])}
                className={cn(
                    "w-10 rounded-md bg-dark-600 px-2 py-1 ring-aabase hover:font-bold",
                    selected.length === 0 ? "ring-2" : ""
                )}
            >
                All
            </button>
            {options.map((n) => {
                const isSelected = selected.includes(n);
                return (
                    <button
                        key={n}
                        type="button"
                        data-label={n}
                        aria-pressed={isSelected}
                        onClick={() => onChange(isSelected ? selected.filter((s) => s !== n) : [...selected, n])}
                        className={cn(
                            "whitespace-nowrap rounded-md bg-dark-600 px-1 py-1 capitalize ring-aabase after:invisible after:block after:h-0 after:overflow-hidden after:font-bold after:content-[attr(data-label)] hover:font-bold",
                            `text-${colorFor(n)}-700 ring-${colorFor(n)}-600`,
                            isSelected ? "ring-2" : ""
                        )}
                    >
                        {n}
                    </button>
                );
            })}
        </div>
    );
}
