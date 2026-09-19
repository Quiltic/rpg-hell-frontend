import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useSearch } from "../../search";
import { Button } from "../ui/Button/Button";
import GlossaryResultDetail from "./GlossaryResultDetail";
import SearchResultRow from "./SearchResultRow";
import { glossaryHitFor } from "./glossaryHit";

const DEBOUNCE_MS = 120;
const LIMIT = 200;
const BATCH = 25;

export default function SearchPage() {
    const { status, ensure, search } = useSearch();
    const [searchParams, setSearchParams] = useSearchParams();
    const q = searchParams.get("q") ?? "";
    const [query, setQuery] = useState(q);
    const [shown, setShown] = useState(BATCH);
    const [expanded, setExpanded] = useState<string[]>([]);

    useEffect(ensure, [ensure]);

    useEffect(() => {
        setQuery(q);
        setShown(BATCH);
        setExpanded([]);
    }, [q]);

    useEffect(() => {
        if (query === q) return;
        const id = setTimeout(() => setSearchParams(query ? { q: query } : {}, { replace: true }), DEBOUNCE_MS);
        return () => clearTimeout(id);
    }, [query, q, setSearchParams]);

    const trimmed = q.trim();
    const results = useMemo(() => search(trimmed, LIMIT), [search, trimmed]);

    let message: string;
    if (!trimmed) message = "Type to search the rulebook, traits, arts, items and creatures.";
    else if (status === "failed") message = "Search unavailable";
    else if (status !== "ready") message = "Building index…";
    else if (results.length === 0) message = `No results for “${trimmed}”`;
    else message = `${results.length} ${results.length === 1 ? "result" : "results"} for “${trimmed}”`;

    function toggle(id: string) {
        setExpanded(expanded.includes(id) ? expanded.filter((i) => i !== id) : [...expanded, id]);
    }

    return (
        <div className="mx-auto max-w-3xl text-left">
            <input
                type="search"
                className="w-full rounded-full bg-dark-700 px-4 py-2 text-light ring-1 ring-dark-300 placeholder:text-light-300 focus:outline-none focus:ring-light-300"
                placeholder="Search"
                aria-label="Search everything"
                autoComplete="off"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
            />
            <div
                className="px-3 py-2 text-light-300"
                role="status"
            >
                {message}
            </div>
            <ul role="list">
                {results.slice(0, shown).map((result) => {
                    const row = (
                        <SearchResultRow
                            result={result}
                            hoverable
                            expanded={expanded.includes(result.id)}
                        />
                    );
                    return (
                        <li key={result.id}>
                            {glossaryHitFor(result) ? (
                                <button
                                    type="button"
                                    className="group block w-full rounded-lg focus:outline-none"
                                    aria-expanded={expanded.includes(result.id)}
                                    onClick={() => toggle(result.id)}
                                >
                                    {row}
                                </button>
                            ) : (
                                <Link
                                    to={result.to}
                                    className="group block rounded-lg hover:no-underline hover:opacity-100 focus:outline-none"
                                >
                                    {row}
                                </Link>
                            )}
                            {expanded.includes(result.id) && (
                                <div className="px-3 pb-2">
                                    <GlossaryResultDetail result={result} />
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
            {results.length > shown && (
                <Button
                    variant="subtle-soul"
                    className="mt-4"
                    onClick={() => setShown(shown + BATCH)}
                >
                    Show more
                </Button>
            )}
        </div>
    );
}
