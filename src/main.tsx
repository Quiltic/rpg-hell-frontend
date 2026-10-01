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
import { RULEBOOK_PAGES, pageTitle } from "./rulebook/pages.ts";
import SearchPage from "./components/search/SearchPage.tsx";
import CharacterPage from "./components/CharacterSheet/CharacterPage.tsx";
import CharacterBuilderPage from "./components/CharacterSheet/CharacterBuilder/CharacterBuilderPage.tsx";

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
                    path: "characters/new",
                    element: <CharacterBuilderPage />,
                    handle: { title: "Character Builder" },
                },
                {
                    path: "characters/:character",
                    element: <CharacterPage />,
                    handle: { title: "Character" },
                },
                {
                    path: "character-sheet",
                    element: <CharacterSheetPage />,
                    handle: { title: "Character Sheet" },
                },
                {
                    path: "character-sheet2",
                    element: <CharacterSheetForm />,
                    handle: { title: "Character Sheet" },
                },
                {
                    path: "search",
                    element: <SearchPage />,
                    handle: { title: "Search" },
                },
                {
                    path: "joshhellscape",
                    element: <JoshhellscapePage />,
                    handle: { title: "Joshhellscape" },
                },
                {
                    path: "tools",
                    children: [
                        {
                            path: "",
                            element: <ToolsPage />,
                            handle: { title: "Tools" },
                        },
                        {
                            path: "traits",
                            element: <UpdateDBTraitsPage />,
                            handle: { title: "Update Traits" },
                        },
                        {
                            path: "spells",
                            element: <UpdateDBSpellsPage />,
                            handle: { title: "Update Arts" },
                        },
                        {
                            path: "items",
                            element: <UpdateDBItemsPage />,
                            handle: { title: "Update Items" },
                        },
                        {
                            path: "creatures",
                            element: <CreatureCreator />,
                            handle: { title: "Creature Creator" },
                        },
                        {
                            path: "wepcreator",
                            element: <WepCreatorPage />,
                            handle: { title: "Weapon Creator" },
                        },
                        {
                            path: "loot-generator",
                            element: <LootGeneratorPage />,
                            handle: { title: "Loot Generator" },
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
                            handle: { title: "Rulebook" },
                        },
                        {
                            path: "full-doc",
                            element: <FullDoc />,
                            handle: { title: pageTitle("full-doc") },
                        },
                        {
                            path: "spells",
                            element: <SpellsTablePage />,
                            handle: { title: pageTitle("spells") },
                        },
                        {
                            path: "traits",
                            element: <TraitsTablePage />,
                            handle: { title: pageTitle("traits") },
                        },
                        {
                            path: "items",
                            element: <ItemsTablePage />,
                            handle: { title: pageTitle("items") },
                        },
                        {
                            path: "creatures",
                            element: <CreatureTablePage />,
                            handle: { title: pageTitle("creatures") },
                        },
                        {
                            path: "character-examples/:example",
                            element: <CharacterExamplesPage />,
                            handle: { title: pageTitle("character-examples") },
                        },
                        ...RULEBOOK_PAGES.filter((page) => "file" in page).map((page) => ({
                            path: page.slug,
                            element: <RulebookMarkdownPage slug={page.slug} />,
                            handle: { title: page.title },
                        })),
                    ],
                },
                {
                    path: "callback",
                    element: <LoginCallbackPage />,
                    handle: { title: "Logging In" },
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
