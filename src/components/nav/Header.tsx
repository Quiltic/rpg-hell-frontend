import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import { Link } from "react-router-dom";
import Login from "../auth/Login";

import GodHeadIcon from "../../assets/godhead.svg";

type HeaderPageLink = {
    name: string;
    href: string;
    color: string;
};

const pages: HeaderPageLink[] = [
    {
        name: "Home",
        href: "/",
        color: "dark:hover:text-body-700 dark:text-body-600 hover:underline",
    },
    {
        name: "Rulebook",
        href: "rulebook",
        color: "dark:hover:text-soul-700 dark:text-soul-600 hover:underline",
    },
    {
        name: "Character Sheet",
        href: "character-sheet",
        color: "dark:hover:text-mind-700 dark:text-mind-600 hover:underline",
    },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    return (
        <header className="header-bg-gradient dark:bg-dark-600">
            <nav
                className="mx-auto flex max-w-7xl items-center justify-between md:justify-start md:gap-x-12 px-8 py-4 md-px-8"
                aria-label="Global"
            >
                <div className="flex ">
                    <a href="/rpg-hell-frontend" className="-m-1.5 p-1.5">
                        <span className="sr-only">RPG Hell</span>
                        <img
                            className="h-12 w-auto"
                            src={GodHeadIcon}
                            alt="temporary logo"
                        ></img>
                    </a>
                </div>
                <div className="flex md:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="hidden md:flex md:gap-x-12">
                    {pages.map((page, i) => (
                        <Link to={page.href} key={i}>
                            <span
                                className={classNames(
                                    page.color,
                                    "text-gray-300 hover:text-gray-300 text-lg"
                                )}
                            >
                                {page.name}
                            </span>
                        </Link>
                    ))}
                </div>
                <div className="hidden md:flex md:flex-1 md:justify-end">
                    <Login />
                </div>
            </nav>
            <Dialog
                as="div"
                className="md:hidden"
                open={mobileMenuOpen}
                onClose={setMobileMenuOpen}
            >
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="bg-light dark:bg-dark fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-dark-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="/rpg-hell-frontend" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                className="h-12 w-auto"
                                src={GodHeadIcon}
                                alt="temporary logo"
                            ></img>
                        </a>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {pages.map((page, i) => (
                                    <Link to={page.href} key={i}>
                                        <span
                                            className={classNames(
                                                page.color,
                                                "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50"
                                            )}
                                        >
                                            {page.name}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                            <div className="py-6">
                                <Login />
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    );
}
