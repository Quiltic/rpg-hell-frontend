

function getTabWidth(lengthOfName: number) {
    return lengthOfName < 5 ? "w-24" : lengthOfName < 7 ? "w-28" : "w-32";
}

type Props = {
    name: string;
    selected: number,
    setSelected: (s: number) => void;
    className: string;
}

export default function StatPillEditable({name: name, selected, setSelected, className:className }: Props) {

    className = className.concat(" rounded-lg p-2 mt-1 shadow-md flex ",getTabWidth(name.length),' bg-', name.toLowerCase());


    return (

        <div className={className} >
            <div className="flex flex-row capitalize ml-3">
                {name}
            </div>
            <input
                type="number"
                className="flex flex-row ml-2 bg-opacity-0 bg-mind w-7"
                value={selected}
                min="0" max="9"
                onChange={(e) => setSelected(parseInt(e.target.value))}
            />
        </div>

        // <div className="grid grid-rows-auto-auto-auto-1fr-auto gap-4 h-screen p-4 bg-dark-400 rounded-md">
            
        // </div>
    );
}

