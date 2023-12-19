import {useState, useEffect} from 'react';

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import useApi from "../../hooks/useApi";
// import markdown from "../../assets/test.md";
import jsonfile from "../../assets/temp_trait.json";

import { convertDictionaryToMD_Traits, convertDictionaryToMD_Spells, convertDictionaryToMD_Items } from "../../util/markdownTools";
import { TraitsService, ItemsService, SpellsService } from '../../client';

// function runList() {
    
//     console.log(allTraits);
//     // return highlightKeywords(convertDictionaryToMD_Traits(allTraits));
// }

// runList()
// // const md = highlightKeywords(markdown);
// const md = highlightKeywords(convertDictionaryToMD_Traits(jsonfile));

// I dont understand why but i need the commented out colors in order for them to show up. its weird
export default function RulebookPage() {
    const [markdown, setMarkdown] = useState("");
    const { TraitsService } = useApi();

    // Runs on Render update (only on changes)
    useEffect(() => {
        
        async function getTraitsMarkdown() {
            const traits = await TraitsService.getAllTraits();
            const parsedmd = convertDictionaryToMD_Traits(traits);
            setMarkdown(parsedmd);
        }
        getTraitsMarkdown();

        // async function getSpellsMarkdown() {
        //     const spells = await SpellsService.getAllSpells();
        //     const parsedmd = convertDictionaryToMD_Spells(spells);
        //     console.log(parsedmd);
        //     setMarkdown(parsedmd);
        // }
        // getSpellsMarkdown();

        // Items are broken for some reason
        
        // async function getItemsMarkdown() {
        //     const items = await ItemsService.getAllItems();
        //     const parsedmd = convertDictionaryToMD_Items(items);
        //     console.log(parsedmd);
        //     setMarkdown(parsedmd);
        // }
        // getItemsMarkdown();

        

        
        
        // console.log(markdown)

    }, [TraitsService, markdown])

    return (
        <div className="max-w-7xl mx-auto p-8 text-center">
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
        </div>
    );
}
