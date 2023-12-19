import {useState, useEffect} from 'react';

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import useApi from "../../hooks/useApi";

import { convertDictionaryToMD, makeTableLine_Items } from "../../util/markdownTools";

// I dont understand why but i need the commented out colors in order for them to show up. its weird
export default function ItemsTablePage() {
    const [markdown, setMarkdown] = useState("");
    const { ItemsService } = useApi();

    // Runs on Render update (only on changes)
    useEffect(() => {
        
        
        async function getItemsMarkdown() {
            const items = await ItemsService.getAllItems();
            const parsedmd = convertDictionaryToMD(items,makeTableLine_Items,`| **Name** | **Requirements** | **Effect** | **Tags** | **Cost** | **Craft** |\n| --- | --- | --- | --- | --- | --- |\n`);
            console.log(parsedmd);
            setMarkdown(parsedmd);
        }
        getItemsMarkdown();

        
        // console.log(markdown)

    }, [ItemsService, markdown])

    return (
        <>
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
