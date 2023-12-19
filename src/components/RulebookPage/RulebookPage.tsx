import {useState, useEffect} from 'react';

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import useApi from "../../hooks/useApi";
// import markdown from "../../assets/test.md";
import jsonfile from "../../assets/temp_trait.json";

import { Trait } from "../../client";

import { highlightKeywords, convertDictionaryToMD_Traits } from "../../util/markdownTools";

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
            const parsedmd = highlightKeywords(convertDictionaryToMD_Traits(traits));
            setMarkdown(parsedmd);
        }
        getTraitsMarkdown();
        
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
        </div>
    );
}
