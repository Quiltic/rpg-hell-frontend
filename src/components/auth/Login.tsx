import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { IAuthenticatedUser } from "../../types/auth";
import { Button } from "../ui/Button/Button";

export default function Login() {
    const { auth, setAuth } = useContext(AuthContext);

    console.log(auth);
    console.log(setAuth);

    useEffect(() => {
        // api call to get the logged-in state

        // TEMP TEST VERSION
        setAuth({
            discordId: "12345",
            avatarUrl:
                "https://cdn.discordapp.com/emojis/679179726740258826.gif?size=96&quality=lossless",
            username: "testddfg!",
            isAuthenticated: true,
            admin: true,
        });
    }, [setAuth]);

    // useEffect here that calls the soon to be made axios provider to run Login

    return (
        <>
            {auth.isAuthenticated ? (
                <div className="h-16 w-48 px-4 grid grid-cols-3 items-center overflow-hidden rounded-full bg-blurple">
                    <img
                        className="h-12 w-12 flex-none rounded-full bg-gray-50"
                        src={(auth as IAuthenticatedUser).avatarUrl}
                        alt="user's discord avatar"
                    ></img>
                    <span className="text-lg col-span-2">
                        {(auth as IAuthenticatedUser).username}
                    </span>
                </div>
            ) : (
                <>
                    <div className="h-18 w-32 px-2 align-middle bg-blurple">
                        <img
                            className="h-12 w-12 flex-none rounded-full bg-gray-50"
                            src="../../assets/discord.svg"
                            alt="user's discord avatar"
                        ></img>
                        <Button variant="link">Login</Button>
                    </div>
                </>
            )}
        </>
    );
}
