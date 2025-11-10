import React from "react";
import { Link, useLocation } from "react-router-dom";

const rulebookPages = [
    { path: "character-creation", name: "Character Creation" },
    { path: "character-examples", name: "Character Examples" },
    { path: "combat", name: "Combat" },
    { path: "core-rules", name: "Core Rules" },
    { path: "effects", name: "Effects" },
    { path: "for-gms", name: "For GMs" },
    { path: "intro", name: "Introduction" },
    { path: "misc-rules", name: "Miscellaneous Rules" },
    { path: "stats", name: "Stats" },
    // Add other existing rulebook links if you want them here too, e.g.:
    // { path: "spells", name: "Spells Table" },
    // { path: "traits", name: "Traits Table" },
    // { path: "items", name: "Items Table" },
    // { path: "creatures", name: "Creatures Table" },
];

export default function RulebookNavigation() {
    const location = useLocation();
    const rulebookBasePath = "/rulebook/";
    return (
        <nav>
            <h2>Rulebook Pages</h2>
            <ul className="rounded-md bg-body-900/50 px-6 py-2 dark:bg-dark-300/80">
                {rulebookPages.map((page) => {
                    const absolutePath = `${rulebookBasePath}${page.path}`;
                    const isActive = location.pathname === absolutePath;

                    return (
                        <li key={page.path}>
                            <Link
                                to={absolutePath}
                                className={isActive ? "font-bold" : ""}
                                aria-current={isActive ? "page" : undefined}
                            >
                                {page.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
