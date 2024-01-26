import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button/Button";

export default function ErrorPage() {
    return (
        <>
            <div>Error 404 im not good at this 😭</div>
            <Link to={"/rpg-hell-backend"}>
                <Button variant="dark">Home</Button>
            </Link>
        </>
    );
}
