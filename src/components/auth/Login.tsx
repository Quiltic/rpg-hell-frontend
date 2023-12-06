import { useContext, useEffect, Fragment } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { IAuthenticatedUser } from "../../types/auth";
// import { Button } from "../ui/Button/Button";

import { Popover, Transition } from "@headlessui/react";

import discordLogo from "../../assets/discord.svg";

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

        // setAuth({ isAuthenticated: false });
    }, [setAuth]);

    // useEffect here that calls the soon to be made axios provider to run Login

    return (
        <>
            <Popover className="h-16 w-48 px-4 rounded-full bg-blurple cursor-pointer ">
                {auth.isAuthenticated ? (
                    <>
                        <Popover.Button className="h-full w-full rounded-full grid grid-cols-3 items-center overflow-hidden">
                            <img
                                className="h-12 w-12 flex-none rounded-full bg-light"
                                src={(auth as IAuthenticatedUser).avatarUrl}
                                alt="user's discord avatar"
                            ></img>
                            <span className="text-lg col-span-2">
                                {(auth as IAuthenticatedUser).username}
                            </span>
                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel className="absolute z-10 mt-3 w-48 h-16 rounded-lg bg-light-100 dark:bg-dark-100">
                                <div className="grid h-16 content-evenly grid-cols-1">
                                    <div>Profile</div>
                                    <div>dont judge I need to fix it</div>
                                    <div>Log out</div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                ) : (
                    <>
                        <button className="h-full grid grid-cols-3 items-center overflow-hidden ">
                            <img
                                className="h-12 w-12 flex-none"
                                src={discordLogo}
                                alt="user's discord avatar"
                            ></img>
                            <span className="text-lg col-span-2">Login</span>
                        </button>
                    </>
                )}
            </Popover>
        </>
    );
}
