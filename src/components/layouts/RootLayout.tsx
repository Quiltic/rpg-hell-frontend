import { useEffect } from "react";
import { Outlet, useMatches } from "react-router-dom";
import Header from "../nav/Header";
import ScrollButton from "../ui/ScrollButton";
import RootDicePopup from "../ui/Popups/rootDicePopup";
import AppToaster from "../ui/Toast";
import { SearchProvider } from "../../search";

export default function RootLayout() {
    const title = useMatches()
        .map((match) => (match.handle as { title?: string } | undefined)?.title)
        .filter(Boolean)
        .pop();

    useEffect(() => {
        document.title = title ? `${title} | RPG Hell` : "RPG Hell";
    }, [title]);

    return (
        <SearchProvider>
            <Header />
            <div className="mx-auto max-w-7xl p-2 text-center md:p-8">
                {/* max-w-[96rem] */}
                <Outlet />
            </div>
            <ScrollButton />
            <RootDicePopup
                startingDice={[1, 1]}
                startingBonus={0}
                startOpen={false}
            />
            <AppToaster />
        </SearchProvider>
    );
}
