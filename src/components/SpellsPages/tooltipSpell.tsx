
import { useSpells } from "../../hooks/useSpells";


import { useState, useEffect } from "react";
import { Spell } from "../../client";
import { formatEffectString, toPillElement } from "../../util/textFormatting";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Link } from "react-router-dom";
import Tooltip from "../ui/Tooltip";
import ArtCard from "./SpellCardStuff/artCard";

type Props = {
    name: string;
};

export default function TooltipSpell({
    name: name
}: Props) {

    const [curArt, setCurArt] = useState<Spell>( {"name":"Loading","level":1,"stat":"body","tags":"","strain":0,"dice":0,"effect":"Tis Loading","activators":1} );

    const {
        allSpells
    } = useSpells();

    useEffect(() => {
        const filtered = allSpells.filter( (s) => { return name.toLowerCase().includes(s.name);})
        setCurArt(filtered.length ? filtered[0] : curArt)
    }, [allSpells]);

    return (

        <Tooltip text={
                <Link
                    to={"/rulebook/spells"}
                    className={`tooltip_main capitalize text-${curArt.stat}`}
                    aria-current={undefined}
                >
                    {curArt.name}
                </Link>
            } 
            display={
                <ArtCard _spell={curArt} _className="m-0"/>
            }
        />
    );
}


