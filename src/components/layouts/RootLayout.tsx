// import React from 'react'

import { Outlet } from "react-router-dom";
import { AuthProvider } from "../../context/AuthProvider";

export default function RootLayout() {
    return (
        <>
            <div className="max-w-7xl mx-auto p-8 text-center">
                <AuthProvider>
                    <Outlet />
                </AuthProvider>
            </div>
        </>
    );
}
