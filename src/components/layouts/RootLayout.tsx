// import React from 'react'

import { Outlet } from "react-router-dom";
import { AuthProvider } from "../../context/AuthProvider";

export default function RootLayout() {
    return (
        <>
            <AuthProvider>
                <Outlet />
            </AuthProvider>
        </>
    );
}