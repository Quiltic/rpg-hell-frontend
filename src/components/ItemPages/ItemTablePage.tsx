import { useState, useEffect, useCallback } from "react";
import { Item } from "../../client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import useApi from "../../hooks/useApi";

import { convertDictionaryToMD, makeTableLine_Items } from "../../util/markdownTools";

import { Button } from "../../components/ui/Button/Button";
import { Link } from "react-router-dom";

const bookOpenIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
        />
    </svg>
);

// I dont understand why but i need the commented out colors in order for them to show up. its weird
export default function ItemsTablePage() {
    const [markdown, setMarkdown] = useState("");
    const { ItemsService } = useApi();

    const [searchValue, setSearchValue] = useState("");
    const [itemsObject, setItemsObject] = useState<Array<Item>>([]);
    const [itemsObjectFiltered, setItemsObjectFiltered] = useState< Array<Item> >([]);

    const updateMarkdown = useCallback(() => {
        const parsedmd = convertDictionaryToMD(
            itemsObjectFiltered,
            makeTableLine_Items,
            `| **Name** | **Requirements** | **Effect** | **Tags** | **Cost** | **Craft** |\n| --- | --- | --- | --- | --- | --- |\n`
            );

        // console.log(parsedmd);
        setMarkdown(parsedmd);

    }, [itemsObjectFiltered]);

    useEffect(() => {
        updateMarkdown()
    },[itemsObjectFiltered, updateMarkdown])
    
    // Runs on Render update (only on changes)
    useEffect(() => {

        async function getSpellsMarkdown() {
            const items_raw = await ItemsService.getAllItems();
            const items = Object.values(items_raw);
            setItemsObject(items);
            setItemsObjectFiltered(items);
            
        }
        getSpellsMarkdown();

        // console.log(markdown)

    }, [ItemsService])


    function handleSearch() {
        if (searchValue == "") {
            setItemsObjectFiltered(itemsObject);
            return;
        }

        const filteredItems = itemsObjectFiltered.filter((t) => {
            console.log(t.name);
            return (
                t.name.toLowerCase().includes(searchValue) ||
                t.effect?.toLowerCase().includes(searchValue)
            );
        });

        setItemsObjectFiltered(filteredItems);
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
