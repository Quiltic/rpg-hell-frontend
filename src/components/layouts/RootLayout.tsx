// import React from 'react'

import { Outlet } from "react-router-dom";
import { AuthProvider } from "../../context/AuthProvider";
import Header from "../nav/Header";

export default function RootLayout() {
    return (
        <>
            <div>
                <AuthProvider>
                    <Header />
                    <div className="max-w-7xl mx-auto p-2 md:p-8 text-center">
                        <Outlet />
                    </div>
                </AuthProvider>
            </div>
        </>
    );
}
