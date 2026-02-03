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

import RulebookPage from "./components/RulebookPages/RulebookPage.tsx";
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
import CharacterCreationRulebookPage from "./components/RulebookPages/SubPages/CharacterCreationPage.tsx";
import CharacterExamplesPage from "./components/RulebookPages/SubPages/CharacterExamplesPage.tsx";
import CombatPage from "./components/RulebookPages/SubPages/CombatPage.tsx";
import CoreRulesPage from "./components/RulebookPages/SubPages/CoreRulesPage.tsx";
import EffectsPage from "./components/RulebookPages/SubPages/EffectsPage.tsx";
import ForGMsPage from "./components/RulebookPages/SubPages/GMRulesPage.tsx";
import IntroPage from "./components/RulebookPages/SubPages/IntroPage.tsx";
import MiscellaneousRulesPage from "./components/RulebookPages/SubPages/MiscellaneousRulesPage.tsx";
import StatsPage from "./components/RulebookPages/SubPages/StatsPage.tsx";
import LootGeneratorPage from "./components/ToolsPages/LootGeneratorPage.tsx";

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
                            element: <RulebookPage />,
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
                        // New pages in the rulebook update project
                        {
                            path: "character-creation",
                            element: <CharacterCreationRulebookPage />,
                        },
                        {
                            path: "character-examples/:example",
                            element: <CharacterExamplesPage />,
                        },
                        {
                            path: "combat",
                            element: <CombatPage />,
                        },
                        {
                            path: "core-rules",
                            element: <CoreRulesPage />,
                        },
                        {
                            path: "effects",
                            element: <EffectsPage />,
                        },
                        {
                            path: "for-gms",
                            element: <ForGMsPage />,
                        },
                        {
                            path: "intro",
                            element: <IntroPage />,
                        },
                        {
                            path: "misc-rules",
                            element: <MiscellaneousRulesPage />,
                        },
                        {
                            path: "stats",
                            element: <StatsPage />,
                        },
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
