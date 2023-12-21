import { useState, useEffect, useCallback } from "react";
import { Spell } from "../../client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import useApi from "../../hooks/useApi";

import { convertDictionaryToMD, makeTableLine_Spells } from "../../util/markdownTools";

import { Button } from "../../components/ui/Button/Button";
import { Link } from "react-router-dom";
import { bookOpenIcon } from "../../assets/IconSVGs/heroiconsSVG";


// I dont understand why but i need the commented out colors in order for them to show up. its weird
export default function SpellsTablePage() {
    const [markdown, setMarkdown] = useState("");
    const { SpellsService } = useApi();

    const [searchValue, setSearchValue] = useState("");
    const [spellsObject, setSpellsObject] = useState<Array<Spell>>([]);
    const [spellsObjectFiltered, setSpellsObjectFiltered] = useState< Array<Spell> >([]);
    const [spellsObjectSorted, setSpellsObjectSorted] = useState< Array<Spell> >([]);

    const updateMarkdown = useCallback(() => {
        const parsedmd = convertDictionaryToMD(
            spellsObjectSorted,
            makeTableLine_Spells,
            `| **Name** | **Strain** | **Dice** | **Effect** | **Tags** |\n| --- | --- | --- | --- | --- |\n`
            );

        // console.log(parsedmd);
        setMarkdown(parsedmd);

    }, [spellsObjectSorted]);

    const sortObjects = useCallback(() => {
        const sortedSpells = spellsObjectFiltered.sort((t1,t2) => {
            // console.log(t.name);
            return (
                t1.level - t2.level
            );
        });

        // console.log(parsedmd);
        setSpellsObjectSorted(sortedSpells)

    }, [spellsObjectFiltered]);

    useEffect(() => {
        sortObjects()
        updateMarkdown()
    },[spellsObjectFiltered, updateMarkdown, sortObjects])
    
    // Runs on Render update (only on changes)
    useEffect(() => {

        async function getSpellsMarkdown() {
            const spells_raw = await SpellsService.getAllSpells();
            const spells = Object.values(spells_raw);
            setSpellsObject(spells);
            setSpellsObjectSorted(spells);
            setSpellsObjectFiltered(spells);
            
        }
        getSpellsMarkdown();

        // console.log(markdown)

    }, [SpellsService])


    function handleSearch() {
        if (searchValue == "") {
            setSpellsObjectFiltered(spellsObject);
            return;
        }

        const filteredSpells = spellsObjectFiltered.filter((t) => {
            console.log(t.name);
            return (
                t.name.toLowerCase().includes(searchValue) ||
                t.effect?.toLowerCase().includes(searchValue)
            );
        });

        setSpellsObjectFiltered(filteredSpells);
    }

    return (
        <>
            <Link to={".."}>
                <Button leftIcon={bookOpenIcon} variant="subtle">
                    Back
                </Button>
            </Link>

            <span>Search:</span>
            <input
                type="text"
                name="search"
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => {if (e.key === "Enter") {handleSearch()}}}
            />
            <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {markdown}
            </Markdown>
            {/* <span className="text-body-700">asssss</span> */}
            {/* <span className="text-mind-700">asssss</span> */}
            {/* <span className="text-soul-700">asssss</span> */}
            {/* <span className="text-arcana-700">asssss</span> */}
            {/* <span className="text-charm-700">asssss</span> */}
            {/* <span className="text-crafting-700">asssss</span> */}
            {/* <span className="text-nature-700">asssss</span> */}
            {/* <span className="text-medicine-700">asssss</span> */}
            {/* <span className="text-thieving-700">asssss</span> */}

            {/* <span className="bg-arcana">asssss</span> */}
            {/* <span className="bg-charm">asssss</span> */}
            {/* <span className="bg-crafting">asssss</span> */}
            {/* <span className="bg-nature">asssss</span> */}
            {/* <span className="bg-medicine">asssss</span> */}
            {/* <span className="bg-thieving">asssss</span> */}
        </>
    );
}