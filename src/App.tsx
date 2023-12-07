import "./App.css";
import Login from "./components/auth/Login";

import { Button } from "./components/ui/Button/Button";

import { BookOpenIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

function App() {
    return (
        <>
            <div>
                <Login />

                <Button leftIcon={<BookOpenIcon />} variant="link-body">
                    Rulebook / Josh land
                </Button>
                <Link to={"rulebook"}>Actual link button</Link>
            </div>
        </>
    );
}

export default App;
