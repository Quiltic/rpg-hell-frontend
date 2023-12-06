import "./App.css";

import { Button } from "./components/ui/Button/Button";

function App() {
    return (
        <>
            <div>
                <h2 className="text-xl pb-2">Button Testing</h2>
                <div className="mx-auto w-1/4 grid gap-4 grid-cols-3">
                    <Button>Button</Button>
                    <Button variant={"mind"}>mind</Button>
                    <Button variant={"body"}>body</Button>
                    <Button variant={"soul"}>soul</Button>
                    <Button variant={"subtle-mind"}>mind</Button>
                    <Button variant={"subtle-body"}>body</Button>
                    <Button variant={"subtle-soul"}>body</Button>
                    <Button variant={"link-mind"}>mind</Button>
                    <Button variant={"link-body"}>body</Button>
                    <Button variant={"link-soul"}>body</Button>
                    <Button variant={"link"}>yup</Button>
                    <Button variant={"subtle"}>yup</Button>
                </div>
            </div>
        </>
    );
}

export default App;
