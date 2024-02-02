import { useState } from "react";
import StatPillEditable from "./StatPillEditable";

export default function JoshhellscapePage() {

    const [body, setBody] = useState(0);

    return (

        <div className="" >
            <StatPillEditable name="body" className="" selected={body} setSelected={setBody}/>
            <StatPillEditable name="Mind" className="" selected={body} setSelected={setBody}/>
            <StatPillEditable name="Soul" className="" selected={body} setSelected={setBody}/>
            <StatPillEditable name="Arcana" className="" selected={body} setSelected={setBody}/>
            <StatPillEditable name="Charm" className="" selected={body} setSelected={setBody}/>
            <StatPillEditable name="Crafting" className="" selected={body} setSelected={setBody}/>
            <StatPillEditable name="Nature" className="" selected={body} setSelected={setBody}/>
            <StatPillEditable name="Medicine" className="" selected={body} setSelected={setBody}/>
            <StatPillEditable name="Thieving" className="" selected={body} setSelected={setBody}/>
        </div>

        // <div className="grid grid-rows-auto-auto-auto-1fr-auto gap-4 h-screen p-4 bg-dark-400 rounded-md">
            
        // </div>
    );
}

