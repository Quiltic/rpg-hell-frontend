import { GlossaryDefinition } from "../../glossary";
import type { SearchResult } from "../../search";
import { glossaryHitFor } from "./glossaryHit";

type Props = {
    result: SearchResult;
    onNavigate?: () => void;
};

export default function GlossaryResultDetail({ result, onNavigate }: Props) {
    const hit = glossaryHitFor(result);
    if (!hit) return null;
    return (
        <div className="border-t border-dark-300 pt-1">
            <GlossaryDefinition
                hit={hit}
                onNavigate={onNavigate}
            />
        </div>
    );
}
