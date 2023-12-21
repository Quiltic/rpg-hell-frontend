import { useState, useEffect, useCallback } from "react";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

// import useApi from "../../hooks/useApi";
// import markdown from "../../assets/test.md";
import markdown from "./Rulebook.md"; // huh?

import { Button } from "../../components/ui/Button/Button";
import { Link } from "react-router-dom";
import { sparklesIcon, bagIcon, ticketIcon } from "../../assets/IconSVGs/heroiconsSVG";


export default function RulebookPage() {
    // const [markdown, setMarkdown] = useState("");

    // // Runs on Render update (only on changes)

    // useEffect(() => {
    //     async function getTraitsMarkdown() {
    //         const traits_raw = await TraitsService.getAllTraits();
    //         const traits = Object.values(traits_raw);
    //         setTraitsObject(traits);
    //         setTraitsObjectFiltered(traits);
    //         // traits.sort((trait_a, trait_b) => {trait_a.req} )

    //         // value -> Arcana -> Charm -> Crafting -> Nature -> Medicine -> Thieving -> Body -> Mind -> Soul
    //     }
    //     getTraitsMarkdown();

    //     // console.log(traitsObject);
    // }, [TraitsService]);

    return (
        <>
            <Link to={"traits"}>
                <Button leftIcon={ticketIcon} variant="body">
                    Traits
                </Button>
            </Link>

            <Link to={"items"}>
                <Button leftIcon={bagIcon} variant="mind">
                    Items
                </Button>
            </Link>

            <Link to={"spells"}>
                <Button leftIcon={sparklesIcon} variant="soul">
                    Spells
                </Button>
            </Link>

            <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {markdown}
            </Markdown>
        </>
    );
}
