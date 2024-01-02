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
