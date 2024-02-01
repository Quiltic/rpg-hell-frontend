import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button/Button";

export default function ErrorPage() {
    return (
        <>
            <div>Error 404 im not good at this 😭</div>
            <Link to={".."}>
                <Button variant="dark">Back</Button>
            </Link>
        </>
    );
}
