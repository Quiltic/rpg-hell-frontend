import { GlossaryDefinition } from "../../glossary";
import { SearchResult, hrefFor } from "../../search";
import { glossaryHitFor } from "./glossaryHit";

type Props = {
    result: SearchResult;
    query: string;
    onNavigate?: () => void;
};

export default function GlossaryResultDetail({ result, query, onNavigate }: Props) {
    const hit = glossaryHitFor(result);
    if (!hit) return null;
    return (
        <div className="border-t border-dark-300 pt-1">
            <GlossaryDefinition
                hit={hit}
                href={hrefFor(result, query)}
                onNavigate={onNavigate}
            />
        </div>
    );
}
