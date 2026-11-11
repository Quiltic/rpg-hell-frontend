import { Listbox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { cn } from "../../styling/utilites";

type Props = {
    label: string;
    options: string[];
    value: string;
    onChange: (next: string) => void;
};

/**
 * @param label - the text shown beside the dropdown
 * @param options - the values to pick from
 * @param value - the option currently picked
 * @param onChange - called with the next option
 * @example
 * ```tsx
 * <FilterListbox label="Rarity" options={["any", "rare"]} value={rarity} onChange={setRarity} />
 * ```
 */
export default function FilterListbox({ label, options, value, onChange }: Props) {
    return (
        <Listbox
            value={value}
            onChange={onChange}
        >
            <div className="m-1 flex flex-row items-center justify-center self-start rounded-md bg-dark-600">
                <Listbox.Label className="m-1 ml-2 capitalize">{label}</Listbox.Label>
                <div className="relative m-1">
                    <Listbox.Button className="relative flex h-6 w-28 items-center rounded-lg bg-dark-400 pl-2 pr-7 text-left capitalize shadow-md ring-aabase focus:outline-none focus-visible:ring-2">
                        <span className="truncate">{value}</span>
                        <ChevronUpDownIcon
                            className="absolute right-1 h-4 w-4 text-light-400"
                            aria-hidden="true"
                        />
                    </Listbox.Button>
                    <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-dark-400 py-1 shadow-lg ring-1 ring-dark focus:outline-none">
                        {options.map((option) => (
                            <Listbox.Option
                                key={option}
                                value={option}
                                className={({ active, selected }) =>
                                    cn(
                                        "cursor-default select-none px-2 py-1 text-left capitalize",
                                        active ? "bg-dark-600" : "",
                                        selected ? "font-bold" : ""
                                    )
                                }
                            >
                                {option}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </div>
            </div>
        </Listbox>
    );
}
