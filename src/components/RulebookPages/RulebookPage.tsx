import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import { Button } from "../../components/ui/Button/Button";
import { Link } from "react-router-dom";
import {
    sparklesIcon,
    bagIcon,
    ticketIcon,
    creaturesIcon,
    ChevronIcon,
} from "../../assets/IconSVGs/heroiconsSVG";
import { Disclosure } from "@headlessui/react";
import TraitSimpleListing from "./TraitCardStuff/traitSimpleListing";
import RulebookNavigation from "./RulebookNav";

import intro from "../../assets/RulebookFiles/markdown/intro.md";
import MarkdownRenderer from "../../util/MarkdownRenderer";

export default function RulebookPage() {
    return (
        <>
            <h3>Directories</h3>
            <div className="flex-column mb-2 flex flex-wrap justify-center gap-4">
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

            <RulebookNavigation />

            <MarkdownRenderer markdown={intro as string} />

            <div className="justify-start">
                <Disclosure defaultOpen={true}>
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
                                    Trait Simple Listing
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
