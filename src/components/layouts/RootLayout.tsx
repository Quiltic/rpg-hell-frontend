// import React from 'react'

import { Outlet } from "react-router-dom";
import { AuthProvider } from "../../context/AuthProvider";
import Header from "../nav/Header";
import ScrollButton from "../ui/ScrollButton";
import RootDicePopup from "../ui/Popups/rootDicePopup";

export default function RootLayout() {
    return (
        <>
            <div>
                <AuthProvider>
                    <Header />
                    <div className="max-w-7xl mx-auto p-2 md:p-8 text-center">
                        {/* max-w-[96rem] */}
                        <Outlet />
                    </div>
                    <ScrollButton />
                    <RootDicePopup startingDice={[1,1]} startingBonus={0} startOpen={false}/>
                </AuthProvider>
            </div>
        </>
    );
}
