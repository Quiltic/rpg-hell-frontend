import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.tsx";
import RootLayout from "./components/layouts/RootLayout.tsx";
import NotImplementedPage from "./components/NotImplementedPage/NotImplementedPage.tsx";
import ErrorPage from "./components/ErrorPage/ErrorPage.tsx";
import RulebookPage from "./components/RulebookPage/RulebookPage.tsx";

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
                element: <RulebookPage />,
                children: [
                    {
                        path: "rulebook/stats",
                        element: <NotImplementedPage pageName="Stats" />,
                    },
                    {
                        path: "rulebook/creating-a-character",
                        element: (
                            <NotImplementedPage pageName="Creating a Character" />
                        ),
                    },
                    {
                        path: "rulebook/magic",
                        element: <NotImplementedPage pageName="Magic" />,
                    },
                ],
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
