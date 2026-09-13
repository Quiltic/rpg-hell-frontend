import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.tsx";
import RootLayout from "./components/layouts/RootLayout.tsx";
import NotImplementedPage from "./components/NotImplementedPage/NotImplementedPage.tsx";
import ErrorPage from "./components/ErrorPage/ErrorPage.tsx";
import LoginCallbackPage from "./components/loginCallbackPage/LoginCallbackPage.tsx";
import RickRoll from "./components/loginCallbackPage/RickRoll.tsx";

import TraitsTablePage from "./components/TraitsPages/TraitsTablePage.tsx";
import ItemsTablePage from "./components/ItemPages/ItemsTablePage.tsx";
import SpellsTablePage from "./components/SpellsPages/SpellsTablePage.tsx";
import CharacterSheetPage from "./components/CharacterSheet/CharacterSheet.tsx";
import CreatureTablePage from "./components/CreaturesPages/CreaturesTablePage.tsx";
import JoshhellscapePage from "./components/joshhellscapePages/joshhellscapePage.tsx";
import UpdateDBTraitsPage from "./components/TraitsPages/UpdateDBTraitsPage.tsx";
import UpdateDBSpellsPage from "./components/SpellsPages/UpdateArtsPage.tsx";
import UpdateDBItemsPage from "./components/ItemPages/UpdateDBItemsPage.tsx";
import ToolsPage from "./components/ToolsPages/ToolsPage.tsx";
import CharacterSheetForm from "./components/CharacterSheet/CharacterSheetForm.tsx";
import CreatureCreator from "./components/CreaturesPages/CreatureCreator.tsx";
import WepCreatorPage from "./components/ItemPages/WepCreatorPage.tsx";
import CharacterExamplesPage from "./components/RulebookPages/SubPages/CharacterExamplesPage.tsx";
import LootGeneratorPage from "./components/ToolsPages/LootGeneratorPage.tsx";
import FullDoc from "./components/RulebookPages/FullDoc.tsx";
import RulebookMarkdownPage from "./rulebook/RulebookMarkdownPage.tsx";
import { RULEBOOK_PAGES } from "./rulebook/pages.ts";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <RootLayout />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: "",
                    element: <App />,
                },
                {
                    path: "character-sheet",
                    element: <CharacterSheetPage />,
                },
                {
                    path: "character-sheet2",
                    element: <CharacterSheetForm />,
                },
                {
                    path: "joshhellscape",
                    element: <JoshhellscapePage />,
                },
                {
                    path: "tools",
                    children: [
                        {
                            path: "",
                            element: <ToolsPage />,
                        },
                        {
                            path: "traits",
                            element: <UpdateDBTraitsPage />,
                        },
                        {
                            path: "spells",
                            element: <UpdateDBSpellsPage />,
                        },
                        {
                            path: "items",
                            element: <UpdateDBItemsPage />,
                        },
                        {
                            path: "creatures",
                            element: <CreatureCreator />,
                        },
                        {
                            path: "wepcreator",
                            element: <WepCreatorPage />,
                        },
                        {
                            path: "loot-generator",
                            element: <LootGeneratorPage />,
                        },
                    ],
                },
                {
                    path: "april",
                    element: <RickRoll />,
                },
                {
                    path: "rulebook",
                    children: [
                        {
                            path: "",
                            element: <RulebookMarkdownPage slug="intro" />,
                        },
                        {
                            path: "full-doc",
                            element: <FullDoc />,
                        },
                        {
                            path: "spells",
                            element: <SpellsTablePage />,
                        },
                        {
                            path: "traits",
                            element: <TraitsTablePage />,
                        },
                        {
                            path: "items",
                            element: <ItemsTablePage />,
                        },
                        {
                            path: "creatures",
                            element: <CreatureTablePage />,
                        },
                        {
                            path: "character-examples/:example",
                            element: <CharacterExamplesPage />,
                        },
                        ...RULEBOOK_PAGES.filter((page) => "file" in page).map(
                            (page) => ({
                                path: page.slug,
                                element: (
                                    <RulebookMarkdownPage slug={page.slug} />
                                ),
                            })
                        ),
                    ],
                },
                {
                    path: "callback",
                    element: <LoginCallbackPage />,
                },
            ],
        },
    ],
    { basename: "/rpg-hell-frontend" }
);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
