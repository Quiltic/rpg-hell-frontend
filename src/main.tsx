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
import UpdateDBSpellsPage from "./components/SpellsPages/UpdateDBSpellsPage.tsx";
import UpdateDBItemsPage from "./components/ItemPages/UpdateDBItemsPage.tsx";
import ToolsPage from "./components/ToolsPages/ToolsPage.tsx";
import CharacterSheetForm from "./components/CharacterSheet/CharacterSheetForm.tsx";

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
                    path: "update-db",
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
                            element: (
                                <NotImplementedPage pageName="Update DB creatures" />
                            ),
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
