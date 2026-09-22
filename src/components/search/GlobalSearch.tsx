import { useEffect, useMemo, useRef, useState } from "react";
import { Combobox, Dialog } from "@headlessui/react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";
import { hrefFor, useSearch } from "../../search";
import SearchDropdown, { SEE_ALL } from "./SearchDropdown";
import { glossaryHitFor } from "./glossaryHit";

const DEBOUNCE_MS = 120;

function SearchBox({ floating }: { floating: boolean }) {
    const { status, ensure, search } = useSearch();
    const navigate = useNavigate();
    const location = useLocation();
    const [query, setQuery] = useState("");
    const [debounced, setDebounced] = useState("");
    const [expanded, setExpanded] = useState<string[]>([]);
    // Headless UI activates the first row on open; it only counts once the user moves to a row
    const [navigated, setNavigated] = useState(false);
    const openButton = useRef<HTMLButtonElement>(null);
    const input = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setQuery("");
        setExpanded([]);
        setNavigated(false);
    }, [location]);

    useEffect(() => {
        const id = setTimeout(() => setDebounced(query.trim()), DEBOUNCE_MS);
        return () => clearTimeout(id);
    }, [query]);

    // the fourth result only decides whether "See all" is shown
    const results = useMemo(() => search(debounced, 4), [search, debounced]);

    const trimmed = query.trim();
    let message: string | undefined;
    if (status === "failed") message = "Search unavailable";
    else if (status !== "ready") message = "Building index…";
    else if (results.length === 0 && debounced === trimmed) message = `No results for “${trimmed}”`;

    function seeAll() {
        navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    }

    // the Combobox value is the list of expanded glossary rows, so a change is one row toggled
    function activate(ids: string[]) {
        const id = ids.find((i) => !expanded.includes(i)) ?? expanded.find((i) => !ids.includes(i));
        if (id === SEE_ALL) return seeAll();
        const result = results.find((r) => r.id === id);
        if (!result) return;
        if (glossaryHitFor(result)) setExpanded(ids);
        else navigate(hrefFor(result, debounced));
    }

    return (
        <Combobox
            value={expanded}
            onChange={activate}
            multiple
        >
            {({ open }) => (
                <div className="relative w-full">
                    <MagnifyingGlassIcon
                        className="pointer-events-none absolute left-3 top-2.5 h-5 w-5 text-light-300"
                        aria-hidden="true"
                    />
                    <Combobox.Input
                        ref={input}
                        className="w-full rounded-full bg-dark-700 py-2 pl-10 pr-10 text-light ring-1 ring-dark-300 placeholder:text-light-300 focus:outline-none focus:ring-light-300"
                        placeholder="Search"
                        aria-label="Search"
                        autoComplete="off"
                        value={query}
                        displayValue={() => query}
                        onChange={(event) => {
                            ensure();
                            setQuery(event.target.value);
                            setNavigated(false);
                        }}
                        onFocus={() => {
                            if (!open) openButton.current?.click();
                        }}
                        onKeyDown={(event) => {
                            if (navigated || event.nativeEvent.isComposing) return;
                            if (event.key === "ArrowDown" && open) {
                                event.preventDefault();
                                setNavigated(true);
                            } else if (event.key === "ArrowUp") {
                                setNavigated(true);
                            } else if (event.key === "Enter" && trimmed) {
                                event.preventDefault();
                                seeAll();
                            }
                        }}
                    />
                    {query && (
                        <button
                            type="button"
                            className="absolute right-3 top-2.5 text-light-300 hover:text-light"
                            onClick={() => {
                                setQuery("");
                                setExpanded([]);
                                input.current?.focus();
                            }}
                        >
                            <span className="sr-only">Clear search</span>
                            <XMarkIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                            />
                        </button>
                    )}
                    <Combobox.Button
                        ref={openButton}
                        className="hidden"
                    />
                    {open && trimmed && (
                        <SearchDropdown
                            results={results.slice(0, 3)}
                            query={debounced}
                            showSeeAll={results.length > 3}
                            message={message}
                            expanded={expanded}
                            floating={floating}
                            highlight={navigated}
                            onPointerMove={() => setNavigated(true)}
                        />
                    )}
                </div>
            )}
        </Combobox>
    );
}

type Props = {
    variant: "bar" | "icon";
};

/**
 * @param variant - `bar` is the input with a floating dropdown, `icon` is a button that opens the same input in a full-screen dialog
 */
export default function GlobalSearch({ variant }: Props) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const location = useLocation();

    useEffect(() => setDialogOpen(false), [location]);

    if (variant === "bar") return <SearchBox floating />;

    return (
        <>
            <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-light-300"
                onClick={() => setDialogOpen(true)}
            >
                <span className="sr-only">Open search</span>
                <MagnifyingGlassIcon
                    className="h-6 w-6"
                    aria-hidden="true"
                />
            </button>
            <Dialog
                as="div"
                className="md:hidden"
                open={dialogOpen}
                onClose={setDialogOpen}
            >
                <Dialog.Panel className="fixed inset-0 z-20 overflow-y-auto bg-dark-700 px-6 py-6">
                    <div className="flex items-start gap-4">
                        <div className="flex-1">
                            <SearchBox floating={false} />
                        </div>
                        <button
                            type="button"
                            className="rounded-md p-2 text-light-300"
                            onClick={() => setDialogOpen(false)}
                        >
                            <span className="sr-only">Close search</span>
                            <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                            />
                        </button>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </>
    );
}
