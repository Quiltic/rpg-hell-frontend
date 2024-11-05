import { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

// an example of what to give this
// const people = [
//     { id: 1, name: 'Wade Cooper' },
//     { id: 2, name: 'Arlene Mccoy' },
//     { id: 3, name: 'Devon Webb' },
//     { id: 4, name: 'Tom Cook' },
//     { id: 5, name: 'Tanya Fox' },
//     { id: 6, name: 'Hellen Schmidt' },
//   ]
// type SelectableOption = {
//     id: number;
//     name: string;
// };

type Props = {
    items: Array<string>;
    className: string;
    selected: string;
    setSelected: (s: string) => void;
};

export default function CleanCombobox({
    items: items,
    className: className,
    selected,
    setSelected,
}: Props) {
    // const [selected, setSelected] = useState<Prop>({'id':0,'name':""})
    const [query, setQuery] = useState("");
    let classnm = className;

    const filteredItems =
        query === ""
            ? items
            : items.filter((item) =>
                  item
                      .toLowerCase()
                      .replace(/\s+/g, "")
                      .includes(query.toLowerCase().replace(/\s+/g, ""))
              );

    // useEffect(() => {
    //     if (items[0].id == 0) {
    //         setSelected(items[0]);
    //     } else {
    //         setSelected({'id':0,'name':""});
    //     }
    // }, [items]);

    // useEffect(() => {
    //     setSelected(selected);
    // }, [selected]);

    return (
        <div className={classnm}>
            <Combobox value={selected} onChange={setSelected}>
                <div className="relative mt-1 w-full">
                    <div className="relative w-full cursor-default overflow-hidden rounded-lg text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-light focus-visible:ring-offset-2 focus-visible:ring-offset-light sm:text-sm">
                        <Combobox.Input
                            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-light focus:ring-0"
                            displayValue={(item: string) => item}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                                className="h-5 w-5 text-light-400"
                                aria-hidden="true"
                            />
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery("")}
                    >
                        <Combobox.Options className="absolute bg-dark-300 mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-dark focus:outline-none sm:text-sm z-50">
                            {filteredItems.length === 0 && query !== "" ? (
                                <div className="relative cursor-default select-none px-4 py-2 text-dark-300">
                                    Nothing found.
                                </div>
                            ) : (
                                filteredItems.map((item, i) => (
                                    <Combobox.Option
                                        key={i}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                active
                                                    ? "bg-dark-300 text-light"
                                                    : "text-light-700"
                                            }`
                                        }
                                        value={item}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${
                                                        selected
                                                            ? "font-medium"
                                                            : "font-normal"
                                                    }`}
                                                >
                                                    {item}
                                                </span>
                                                {selected ? (
                                                    <span
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                            active
                                                                ? "text-white"
                                                                : "text-teal-600"
                                                        }`}
                                                    >
                                                        <CheckIcon
                                                            className="h-5 w-5"
                                                            aria-hidden="true"
                                                        />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    );
}
