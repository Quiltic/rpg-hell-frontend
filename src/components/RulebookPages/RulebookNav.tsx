import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/Button/Button";

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
    { path: "core-rules", name: "Core Rules", icon: <>⚖️</>, variant: "soul" },
    { path: "combat", name: "Combat", icon: <>⚔️</>, variant: "body" },
    {
        path: "character-creation",
        name: "Character Creation",
        icon: <>🥸</>,
        variant: "arcana",
    },
    { path: "for-gms", name: "For GMs", icon: <>🐉</>, variant: "thieving" },
];

const additionalRulebookPages: RulebookPage[] = [
    { path: "effects", name: "Effects" },
    { path: "stats", name: "Stats" },
    { path: "character-examples", name: "Character Examples" },
    { path: "misc-rules", name: "Miscellaneous Rules" },
];

const directoryPages: RulebookPage[] = [
    { path: "traits", name: "Traits", icon: <>🎫</>, variant: "body" },
    { path: "items", name: "Items", icon: <>🛡️</>, variant: "mind" },
    { path: "spells", name: "Arts", icon: <>✨</>, variant: "soul" },
    {
        path: "creatures",
        name: "Creatures",
        icon: <>🐢</>,
        variant: "medicine",
    },
];

export default function RulebookNavigation() {
    const location = useLocation();
    const rulebookBasePath = "/rulebook/";
    return (
        <nav className="mx-auto max-w-4xl">
            <h2>Rulebook Pages</h2>
            <div className="flex-column mb-2 flex flex-wrap justify-center gap-4">
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

            <ul className="mx-auto max-w-lg rounded-md bg-body-900/50 px-6 py-2 dark:bg-dark-300/80">
                {additionalRulebookPages.map((page) => {
                    const absolutePath = `${rulebookBasePath}${page.path}`;
                    const isActive = location.pathname === absolutePath;

                    return (
                        <li key={page.path}>
                            <Link
                                to={absolutePath}
                                className={isActive ? "font-bold" : ""}
                                aria-current={isActive ? "page" : undefined}
                            >
                                <Button
                                    // leftIcon={page.icon}
                                    // variant={
                                    //     page.variant == undefined
                                    //         ? undefined
                                    //         : `link-${page.variant}`
                                    // }
                                    variant="link"
                                    className={
                                        isActive ? "ring-2 ring-light/75" : ""
                                    }
                                >
                                    {page.name}
                                </Button>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
