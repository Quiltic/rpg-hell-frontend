import { Spell } from "../../../client";
import ArtCard from "./artCard";

type Props = {
    shownSpells: Spell[];
    action?: { label: string; onClick: (spell: Spell) => void };
    // header: string;
    // subNotes: string[];
};

export default function SpellCardHolder({ shownSpells: _shownSpells, action }: Props) {
    return (
        <div className="-m-4 grid grid-cols-1 print:grid-cols-2 md:grid-cols-3">
            {_shownSpells.map((spell, i) => {
                if (spell.name != "Error") {
                    return (
                        <ArtCard
                            _spell={spell}
                            key={i}
                            static
                            action={action && { label: action.label, onClick: () => action.onClick(spell) }}
                        />
                    );
                }
            })}
        </div>
    );
}
