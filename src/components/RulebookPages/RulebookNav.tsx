import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/Button/Button";

import { TicketIcon } from "@heroicons/react/24/outline";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { BugAntIcon } from "@heroicons/react/24/outline";
import { RulebookPageSlug, pageTitle } from "../../rulebook/pages";

type NavEntry = {
    slug: RulebookPageSlug;
    to?: string;
    icon?: React.ReactElement;
    variant?:
        | "body"
        | "mind"
        | "soul"
        | "arcana"
        | "charm"
        | "crafting"
        | "medicine"
        | "nature"
        | "thieving";
};

const rulebookPages: NavEntry[] = [
    {
        slug: "core-rules",
        icon: <>⚖️</>,
        variant: "nature",
    },
    { slug: "combat", icon: <>⚔️</>, variant: "crafting" },
    {
        slug: "character-creation",
        icon: <>🥸</>,
        variant: "arcana",
    },
    { slug: "for-gms", icon: <>🐉</>, variant: "thieving" },
];

const additionalRulebookPages: NavEntry[] = [
    { slug: "effects", icon: <>🌀</> },
    {
        slug: "character-examples",
        to: "character-examples/all",
        icon: <>🧙🧌🧝</>,
    },
    { slug: "misc-rules", icon: <>💡</> },
    { slug: "full-doc", icon: <>🗎</> },
];

const directoryPages: NavEntry[] = [
    {
        slug: "traits",
        icon: <TicketIcon className="h-6 w-6" />,
        variant: "body",
    },
    {
        slug: "items",
        icon: <ShoppingBagIcon className="h-6 w-6" />,
        variant: "mind",
    },
    {
        slug: "spells",
        icon: <SparklesIcon className="h-6 w-6" />,
        variant: "soul",
    },
    {
        slug: "creatures",
        icon: <BugAntIcon className="h-6 w-6" />,
        variant: "medicine",
    },
];

export default function RulebookNavigation() {
    const location = useLocation();
    const rulebookBasePath = "/rulebook/";
    return (
        <>
            <h2 className="print:hidden">Rulebook Pages</h2>
            <nav className="m-4 mx-auto max-w-4xl rounded-md bg-dark-400 p-2 print:hidden">
                <div className="flex-column m-2 flex flex-wrap justify-center gap-4">
                    {directoryPages.map((page, id) => {
                        const absolutePath = `${rulebookBasePath}${page.to ?? page.slug}`;
                        const isActive = location.pathname === absolutePath;
                        return (
                            <Link
                                to={absolutePath}
                                className={isActive ? "font-bold" : ""}
                                aria-current={isActive ? "page" : undefined}
                                key={id}
                            >
                                <Button
                                    leftIcon={page.icon}
                                    variant={
                                        page.variant == undefined
                                            ? undefined
                                            : `${page.variant}`
                                    }
                                    className={
                                        isActive ? "ring-2 ring-light/75" : ""
                                    }
                                >
                                    {pageTitle(page.slug)}
                                </Button>
                            </Link>
                        );
                    })}
                </div>
                <div className="flex-column mb-2 flex flex-wrap justify-center gap-4">
                    {rulebookPages.map((page, id) => {
                        const absolutePath = `${rulebookBasePath}${page.to ?? page.slug}`;
                        const isActive = location.pathname === absolutePath;
                        return (
                            <Link
                                to={absolutePath}
                                className={isActive ? "font-bold" : ""}
                                aria-current={isActive ? "page" : undefined}
                                key={id}
                            >
                                <Button
                                    leftIcon={page.icon}
                                    variant={page.variant}
                                    className={
                                        isActive ? "ring-2 ring-light/75" : ""
                                    }
                                >
                                    {pageTitle(page.slug)}
                                </Button>
                            </Link>
                        );
                    })}
                </div>
                <div className="flex-column mb-2 flex flex-wrap justify-center gap-4">
                    {additionalRulebookPages.map((page, id) => {
                        const absolutePath = `${rulebookBasePath}${page.to ?? page.slug}`;
                        const isActive = location.pathname === absolutePath;
                        return (
                            <Link
                                to={absolutePath}
                                className={isActive ? "font-bold" : ""}
                                aria-current={isActive ? "page" : undefined}
                                key={id}
                            >
                                <Button
                                    variant="dark"
                                    leftIcon={page.icon}
                                    size={"sm"}
                                    className={
                                        isActive ? "ring-2 ring-light/75" : ""
                                    }
                                >
                                    {pageTitle(page.slug)}
                                </Button>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </>
    );
}
