import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import App from "./App.tsx";
import RootLayout from "./components/layouts/RootLayout.tsx";
import NotImplementedPage from "./components/NotImplementedPage/NotImplementedPage.tsx";
import ErrorPage from "./components/ErrorPage/ErrorPage.tsx";
import LoginCallbackPage from "./components/loginCallback/LoginCallbackPage.tsx";

import RulebookPage from "./components/RulebookPages/RulebookPage.tsx";
import SpellsTablePage from "./components/SpellsPages/SpellsTablePage.tsx";
import TraitsTablePage from "./components/TraitsPages/TraitsTablePage.tsx";
import ItemsTablePage from "./components/ItemPages/RulebookPage.tsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <App />,
            },
            {
                path: "traits",
                element: <NotImplementedPage pageName="Traits" />,
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
                ],
            },
            {
                path: "callback",
                element: <LoginCallbackPage />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
