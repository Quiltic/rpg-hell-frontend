// import { useState, useEffect, useCallback } from "react";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

// import useApi from "../../hooks/useApi";
// import markdown from "../../assets/test.md";
import markdown from "./Rulebook.md"; // huh?

import { Button } from "../../components/ui/Button/Button";
import { Link } from "react-router-dom";
import {
    sparklesIcon,
    bagIcon,
    ticketIcon,
    creaturesIcon,
    ChevronIcon,
} from "../../assets/IconSVGs/heroiconsSVG";
import { formatEffectString } from "../../util/textFormatting";
import HeadingRenderer from "./headingRenderer";
// import TraitsTablePage from "../TraitsPages/TraitsTablePage";
// import SpellsTablePage from "../SpellsPages/SpellsTablePage";
// import ItemsTablePage from "../ItemPages/ItemsTablePage";
import { Disclosure } from "@headlessui/react";
import TableOfContents from "../TableOfContents/TableOfContents";
import TraitSimpleListing from "./TraitCardStuff/traitSimpleListing";

// import { useState, useEffect, useContext } from "react";
// import { SpellsService } from "../../client/services/SpellsService";

const formattedmd = formatEffectString(markdown);

export default function RulebookPage() {
    // useEffect(() => {
    //     async function checkAPI() {
    //         try {
    //             const spellsRaw = await SpellsService.getAllSpells();
    //         } catch (e) {
    //             // if (e instanceof Error && e.message == "Network Error") {
    //                 console.log(
    //                     "WARNING YOU ARE OFFLINE! A backup is being used, however it is not up to date and may have incorrect data."
    //                 );
    //                 window.localStorage.setItem(
    //                     "useBackup",
    //                     "true"
    //                 );
    //         }
    //     }
    //     checkAPI();
    // },[SpellsService]);
    

    return (
        <>
            <h3>Pages</h3>
            <div className="flex flex-column flex-wrap gap-4 justify-center mb-2">
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
                        Arts
                    </Button>
                </Link>
                <Link to={"creatures"}>
                    <Button leftIcon={creaturesIcon} variant="medicine">
                        Creatures
                    </Button>
                </Link>
            </div>

            <div className=" mx-auto text-left max-w-4xl markdown-styles">
                <h1>Table of Contents</h1>
                <TableOfContents />
                <Markdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                        h1: HeadingRenderer,
                        h2: HeadingRenderer,
                        h3: HeadingRenderer,
                        h4: HeadingRenderer,
                        h5: HeadingRenderer,
                        h6: HeadingRenderer,
                    }}
                >
                    {formattedmd}
                </Markdown>
            </div>

            <div className="justify-start">
                <Disclosure defaultOpen={false}>
                    {({ open }) => (
                        <>
                            <Disclosure.Button>
                                <Button
                                    variant={"dark"}
                                    size={"xl"}
                                    className="mb-2"
                                    open={open}
                                    rightIcon={ChevronIcon}
                                >
                                    All Tables
                                </Button>
                            </Disclosure.Button>
                            <Disclosure.Panel>
                                <TraitSimpleListing />
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            </div>
        </>
    );
}
