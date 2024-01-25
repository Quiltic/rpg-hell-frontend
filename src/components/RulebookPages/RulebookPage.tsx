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
} from "../../assets/IconSVGs/heroiconsSVG";
import { formatEffectString } from "../../util/textFormatting";
import HeadingRenderer from "./headingRenderer";
import TableOfContentsDiscl from "./tableofContentsDiscl";

const formattedmd = formatEffectString(markdown);

export default function RulebookPage() {
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
                        Spells
                    </Button>
                </Link>
                <Link to={"creatures"}>
                    <Button leftIcon={creaturesIcon} variant="medicine">
                        Creatures
                    </Button>
                </Link>
            </div>

            <div className=" mx-auto text-left max-w-4xl markdown-styles">
                <TableOfContentsDiscl />
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
        </>
    );
}
