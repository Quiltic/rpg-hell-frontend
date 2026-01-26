import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/Button/Button";

import { TicketIcon } from "@heroicons/react/24/outline";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { BugAntIcon } from "@heroicons/react/24/outline";

type RulebookPage = {
    path: string;
    name: string;
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

const rulebookPages: RulebookPage[] = [
    {
        path: "core-rules",
        name: "Core Rules",
        icon: <>⚖️</>,
        variant: "nature",
    },
    { path: "combat", name: "Combat", icon: <>⚔️</>, variant: "crafting" },
    {
        path: "character-creation",
        name: "Character Creation",
        icon: <>🥸</>,
        variant: "arcana",
    },
    { path: "for-gms", name: "For GMs", icon: <>🐉</>, variant: "thieving" },
];

const additionalRulebookPages: RulebookPage[] = [
    { path: "effects", name: "Effects", icon: <>🌀</> },
    { path: "stats", name: "Stats", icon: <>📊</> },
    {
        path: "character-examples",
        name: "Character Examples",
        icon: <>🧙🧌🧝</>,
    },
    { path: "misc-rules", name: "Miscellaneous Rules", icon: <>💡</> },
];

const directoryPages: RulebookPage[] = [
    {
        path: "traits",
        name: "Traits",
        icon: <TicketIcon className="h-6 w-6" />,
        variant: "body",
    },
    {
        path: "items",
        name: "Items",
        icon: <ShoppingBagIcon className="h-6 w-6" />,
        variant: "mind",
    },
    {
        path: "spells",
        name: "Arts",
        icon: <SparklesIcon className="h-6 w-6" />,
        variant: "soul",
    },
    {
        path: "creatures",
        name: "Creatures",
        icon: <BugAntIcon className="h-6 w-6" />,
        variant: "medicine",
    },
];

export default function RulebookNavigation() {
    const location = useLocation();
    const rulebookBasePath = "/rulebook/";
    return (
        <>
            <h2>Rulebook Pages</h2>
            <nav className="m-4 mx-auto max-w-4xl rounded-md p-2 bg-dark-400">
                <div className="flex-column m-2 flex flex-wrap justify-center gap-4">
                    {directoryPages.map((page) => {
                        const absolutePath = `${rulebookBasePath}${page.path}`;
                        const isActive = location.pathname === absolutePath;
                        return (
                            <Link
                                to={absolutePath}
                                className={isActive ? "font-bold" : ""}
                                aria-current={isActive ? "page" : undefined}
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
                                    {page.name}
                                </Button>
                            </Link>
                        );
                    })}
                </div>
                <div className="flex-column mb-2 flex flex-wrap justify-center gap-4">
                    {rulebookPages.map((page) => {
                        const absolutePath = `${rulebookBasePath}${page.path}`;
                        const isActive = location.pathname === absolutePath;
                        return (
                            <Link
                                to={absolutePath}
                                className={isActive ? "font-bold" : ""}
                                aria-current={isActive ? "page" : undefined}
                            >
                                <Button
                                    leftIcon={page.icon}
                                    variant={page.variant}
                                    className={
                                        isActive ? "ring-2 ring-light/75" : ""
                                    }
                                >
                                    {page.name}
                                </Button>
                            </Link>
                        );
                    })}
                </div>
                <div className="flex-column mb-2 flex flex-wrap justify-center gap-4">
                    {additionalRulebookPages.map((page) => {
                        const absolutePath = `${rulebookBasePath}${page.path}`;
                        const isActive = location.pathname === absolutePath;
                        return (
                            <Link
                                to={absolutePath}
                                className={isActive ? "font-bold" : ""}
                                aria-current={isActive ? "page" : undefined}
                            >
                                <Button
                                    variant="dark"
                                    leftIcon={page.icon}
                                    size={"sm"}
                                    className={
                                        isActive ? "ring-2 ring-light/75" : ""
                                    }
                                >
                                    {page.name}
                                </Button>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </>
    );
}
