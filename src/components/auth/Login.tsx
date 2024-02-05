import { useContext, useEffect, Fragment, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { IAuthenticatedUser } from "../../types/auth";
import { Button } from "../ui/Button/Button";

import { Popover, Transition } from "@headlessui/react";

import discordLogo from "../../assets/discord.svg";
import loadingIcon from "../../assets/IconSVGs/loadingIcon.svg";
import useApi from "../../hooks/useApi";
import { Link, useNavigate } from "react-router-dom";

const arrowLeftOnRectangleIcon = (
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
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
        />
    </svg>
);

const userIcon = (
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
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
        />
    </svg>
);

const toolsIcon = (
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
            d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
        />
    </svg>
);

export default function Login() {
    const [loginURL, setLoginURL] = useState("");
    const { auth, authLoading } = useContext(AuthContext);
    const { UsersService } = useApi();

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchLoginURL() {
            const res = await UsersService.login();
            setLoginURL(res.url);
        }
        fetchLoginURL();
    }, [UsersService]);

    function handleLoginButtonClick() {
        const location = window.location.pathname;
        window.localStorage.setItem("loginCallbackDestination", location);
        window.location.href = loginURL;
    }

    function handleLogoutButtonClick() {
        async function fetchLogout() {
            await UsersService.logout();
            navigate("/", { replace: true });
        }
        fetchLogout();
    }

    return (
        <>
            <Popover className="h-12 w-40 px-4 rounded-full bg-blurple cursor-pointer ">
                {auth.isAuthenticated ? (
                    <>
                        <Popover.Button className="h-full w-full rounded-full grid grid-cols-3 items-center overflow-hidden">
                            <img
                                className="h-10 w-10 flex-none rounded-full bg-light"
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
                            <Popover.Panel className="relative z-10 mt-3 right-3 px-2 w-40 h-20 rounded-lg bg-light-100 dark:bg-dark-100">
                                <div className="grid h-20 content-evenly grid-cols-1">
                                    {auth.admin && (
                                        <>
                                            <Link
                                                to={"/update-db"}
                                                replace
                                                className="h-8 w-full"
                                            >
                                                <Button
                                                    leftIcon={toolsIcon}
                                                    variant="soul"
                                                    className="h-8 rounded-lg"
                                                >
                                                    Tools
                                                </Button>
                                            </Link>
                                        </>
                                    )}
                                    <Button
                                        leftIcon={arrowLeftOnRectangleIcon}
                                        variant="body"
                                        className="h-8 rounded-lg"
                                    >
                                        Profile
                                    </Button>
                                    <Button
                                        leftIcon={userIcon}
                                        variant="mind"
                                        className="h-8 rounded-lg"
                                        onClick={handleLogoutButtonClick}
                                    >
                                        Log out
                                    </Button>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                ) : (
                    <>
                        <button
                            onClick={handleLoginButtonClick}
                            className="h-full w-full grid grid-cols-3 items-center overflow-hidden "
                        >
                            {authLoading ? (
                                <>
                                    <img
                                        className="h-10 w-10 flex-none"
                                        src={loadingIcon}
                                        alt="loading spinner"
                                    ></img>
                                    <span className="text-lg col-span-2 text-light">
                                        Loading...
                                    </span>
                                </>
                            ) : (
                                <>
                                    <img
                                        className="h-10 w-10 flex-none"
                                        src={discordLogo}
                                        alt="user's discord avatar"
                                    ></img>
                                    <span className="text-lg col-span-2 text-light">
                                        Login
                                    </span>
                                </>
                            )}
                        </button>
                    </>
                )}
            </Popover>
        </>
    );
}
