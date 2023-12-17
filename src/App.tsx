import "./App.css";
import Header from "./components/nav/Header";

import { Button } from "./components/ui/Button/Button";

import { Link } from "react-router-dom";

const bookOpenIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
        />
    </svg>
);

function App() {
    return (
        <>
            <Header />
            <div className="max-w-7xl mx-auto p-8 text-center">
                <Link to={"rulebook"}>
                    <Button leftIcon={bookOpenIcon} variant="body">
                        Rulebook / Josh land
                    </Button>
                </Link>
            </div>
        </>
    );
}

export default App;
