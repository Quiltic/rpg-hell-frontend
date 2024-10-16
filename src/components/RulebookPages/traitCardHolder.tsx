
import { Trait } from "../../client";
import { getNames } from "../../util/tableTools";
import TraitsLittleWindow from "../RulebookPages/traitsLittleWindow";

type Props = {
    allTraits: Trait[];
    wantedLoneList: string;
    wantedComboList: string;
    headers: string[];
    subNotes: string[];
};

export default function TraitCardHolder({
    allTraits: _allTraits,
    wantedLoneList: _wantedLoneList,
    wantedComboList: _wantedComboList,
    headers: _headers,
    subNotes: _subNotes,
}: Props)  {

    const loneTraits = getNames(_wantedLoneList, _allTraits) as Trait[];
    const comboTraits = getNames(_wantedComboList, _allTraits) as Trait[];

    return (
        
        <div>
            <h1 className={`capitalize text-${_headers[0]} text-5xl`} >{_headers[0]}</h1>
            <p className="italic" >{_subNotes[0]}</p>
            <div className="grid grid-cols-1 md:grid-cols-4">
                {loneTraits.map((trait, i) => {
                    if (trait.name != 'Error') {
                        return (
                        <TraitsLittleWindow _trait={trait} key={i}/>
                        );
                    }
                })}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3">
                <h3 className="capitalize" >{_headers[1]}</h3>
                <h3 className="capitalize" >{_headers[2]}</h3>
                <h3 className="capitalize" >{_headers[3]}</h3>
                <p className="italic text-sm" >{_subNotes[1]}</p>
                <p className="italic text-sm" >{_subNotes[2]}</p>
                <p className="italic text-sm" >{_subNotes[3]}</p>

                {comboTraits.map((trait, i) => {
                    if (trait.name != 'Error') {
                        return (
                        <TraitsLittleWindow _trait={trait} key={i}/>
                        );
                    }
                })}
            </div>
            
        </div>
        

    );
}


