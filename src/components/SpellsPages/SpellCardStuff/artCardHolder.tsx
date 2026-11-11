import { Spell } from "../../../client";
import ArtCard from "./artCard";

type Props = {
    shownSpells: Spell[];
    action?: { label: string; onClick: (spell: Spell) => void };
    showEmpty?: boolean;
    // header: string;
    // subNotes: string[];
};

export default function SpellCardHolder({ shownSpells, action, showEmpty }: Props) {
    const _shownSpells = shownSpells.filter((spell) => spell.name != "Error");
    if (showEmpty && _shownSpells.length == 0)
        return <p className="text-center text-light/50">I activate nothing! No Arts Found</p>;
    return (
        <div className="-m-4 grid grid-cols-1 print:grid-cols-2 md:grid-cols-3">
            {_shownSpells.map((spell, i) => (
                <ArtCard
                    _spell={spell}
                    key={i}
                    static
                    action={action && { label: action.label, onClick: () => action.onClick(spell) }}
                />
            ))}
        </div>
    );
}
