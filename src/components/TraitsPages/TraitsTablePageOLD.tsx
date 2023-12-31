import { useState, useEffect, useCallback } from "react";
import { Trait } from "../../client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import useApi from "../../hooks/useApi";

import {
    convertDictionaryToMD,
    makeTableLine_Trait,
} from "../../util/markdownTools";
import { bookOpenIcon } from "../../assets/IconSVGs/heroiconsSVG";

import { Button } from "../../components/ui/Button/Button";
import { Link } from "react-router-dom";

import json from "../../assets/OfflineJsons/Traits.json";

// I dont understand why but i need the commented out colors in order for them to show up. its weird
export default function TraitsTablePageOLD() {
    const [markdown, setMarkdown] = useState("");
    const { TraitsService } = useApi();

    const [searchValue, setSearchValue] = useState("");
    const [traitsObject, setTraitsObject] = useState<Array<Trait>>([]);
    const [traitsObjectFiltered, setTraitsObjectFiltered] = useState<
        Array<Trait>
    >([]);

    const updateMarkdown = useCallback(() => {
        const parsedmd = convertDictionaryToMD(
            traitsObjectFiltered,
            makeTableLine_Trait,
            `| **Name** | **Requirements** | **Dice** | **Effect** |\n| --- | --- | --- | --- |\n`
        );
        setMarkdown(parsedmd);
    }, [traitsObjectFiltered]);

    useEffect(() => {
        updateMarkdown();
    }, [traitsObjectFiltered, updateMarkdown]);

    // function sortObjects(traits: Trait[]): Trait[] {
    //     // const sortOrder = ["#", "Arcana", "Charm", "Crafting", "Nature", "Medicine", "Thieving", "Body", "Mind", "Soul"];
      
    //     return traits.sort((a, b) => {
    //       const reqA = a.req;
    //       const reqB = b.req;
      
    //       const indexA = sortOrder.indexOf(reqA);
    //       const indexB = sortOrder.indexOf(reqB);
      
    //       // If both req values are in the sortOrder array, compare their positions
    //       if (indexA !== -1 && indexB !== -1) {
    //         return indexA - indexB;
    //       }
      
          
      
    //       // If none of them are in the sortOrder array, compare them as strings
    //       return 0;
    //     });
    //   }



    // Runs on Render update (only on changes)
    useEffect(() => {
        async function getTraitsMarkdown() {
            try {
                const traits_raw = await TraitsService.getAllTraits();
                const traits = Object.values(traits_raw);
                setTraitsObject(traits);
                setTraitsObjectFiltered(traits);
            } catch (e) {
                if (e.message == "Network Error") {
                    console.log(
                        "WARNING YOU ARE OFFLINE! A backup is being used, however it is not up to date and may have incorect data."
                    );
                    const traits = Object.values(json);
                    setTraitsObject(traits);
                    setTraitsObjectFiltered(traits);
                }
            }

            // traits.sort((trait_a, trait_b) => {trait_a.req} )

            // value -> Arcana -> Charm -> Crafting -> Nature -> Medicine -> Thieving -> Body -> Mind -> Soul
        }
        getTraitsMarkdown();

        // console.log(traitsObject);
    }, [TraitsService]);

    function handleSearch() {
        if (searchValue == "") {
            setTraitsObjectFiltered(traitsObject);
            return;
        }

        const filteredTraits = traitsObject.filter((t) => {
            console.log(t.name);
            return (
                t.name.toLowerCase().includes(searchValue) ||
                t.effect?.toLowerCase().includes(searchValue)
            );
        });

        setTraitsObjectFiltered(filteredTraits);
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
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSearch();
                    }
                }}
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
