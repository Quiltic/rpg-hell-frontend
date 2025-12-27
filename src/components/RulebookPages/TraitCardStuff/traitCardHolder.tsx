
import { Trait } from "../../../client";
// import { getNames } from "../../../util/tableTools";
import TraitCard from "./traitCard";

type Props = {
    shownTraits: Trait[];
    // wantedLoneList: string;
    // wantedComboList: string;
    header: string;
    subNotes: string[];
};

export default function TraitCardHolder({
    shownTraits: _shownTraits,
    // wantedLoneList: _wantedLoneList,
    // wantedComboList: _wantedComboList,
    header: _header,
    subNotes: _subNotes,
}: Props)  {

    // const loneTraits = getNames(_wantedLoneList, _allTraits) as Trait[];
    // const shownTraits = getNames(_wantedComboList, _allTraits) as Trait[];

    return (
        
        <div>
            <h1 className={`capitalize text-${_header.toLowerCase()} text-5xl`} id={`traits-simple-${_header}`}>{_header}</h1>
            <p className="italic" >{_subNotes[0]}</p>
            {/* <div className="grid grid-cols-1 md:grid-cols-4">
                {loneTraits.map((trait, i) => {
                    if (trait.name != 'Error') {
                        return (
                        <TraitCard _trait={trait} key={i}/>
                        );
                    }
                })}
            </div> */}
            
            <div className="grid grid-cols-1 md:grid-cols-3">
                {/* <h3 className="capitalize" >{_header[1]}</h3>
                <h3 className="capitalize" >{_header[2]}</h3>
                <h3 className="capitalize" >{_header[3]}</h3>
                <p className="italic text-sm" >{_subNotes[1]}</p>
                <p className="italic text-sm" >{_subNotes[2]}</p>
                <p className="italic text-sm" >{_subNotes[3]}</p> */}

                {_shownTraits.map((trait, i) => {
                    if (trait.name != 'Error') {
                        return (
                        <TraitCard _trait={trait} key={i}/>
                        );
                    }
                })}
            </div>
            
        </div>
        

    );
}


