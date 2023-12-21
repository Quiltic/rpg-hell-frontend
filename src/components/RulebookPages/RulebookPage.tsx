import { useState, useEffect, useCallback } from "react";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

// import useApi from "../../hooks/useApi";
// import markdown from "../../assets/test.md";
import markdown from "./Rulebook.md"; // huh?

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
                <Button leftIcon={bookOpenIcon} variant="body">
                    Traits
                </Button>
            </Link>
            
            <Link to={"items"}>
                <Button leftIcon={bookOpenIcon} variant="mind">
                    Items
                </Button>
            </Link>

            <Link to={"spells"}>
                <Button leftIcon={bookOpenIcon} variant="soul">
                    Spells
                </Button>
            </Link>
            
            

            <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {markdown}
            </Markdown>
        </>
    );
}
