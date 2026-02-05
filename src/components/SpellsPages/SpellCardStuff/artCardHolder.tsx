import { Spell } from "../../../client";
import ArtCard from "./artCard";

type Props = {
    shownSpells: Spell[];
    moveSpell?: (spell: Spell) => void;
    // header: string;
    // subNotes: string[];
};

export default function SpellCardHolder({
    shownSpells: _shownSpells,
    moveSpell,
}: Props)  {


    return (
        
        <div className="grid grid-cols-1 md:grid-cols-3 print:grid-cols-2 -m-4">
            {_shownSpells.map((spell, i) => {
                if (spell.name != 'Error') {
                    return (
                        <ArtCard _spell={spell} key={i}
                        moveSpell={moveSpell}
                        />
                    );
                }
            })}
        </div>
                                
    );
}


