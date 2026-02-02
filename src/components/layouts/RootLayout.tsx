import { Outlet } from "react-router-dom";
import Header from "../nav/Header";
import ScrollButton from "../ui/ScrollButton";
import RootDicePopup from "../ui/Popups/rootDicePopup";

export default function RootLayout() {
    return (
        <>
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
        </>
    );
}
