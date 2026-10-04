import { XMarkIcon } from "@heroicons/react/20/solid";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode, useRef } from "react";
import { cn } from "../../../styling/utilites";
// import { Button } from "../Button/Button";

type Props = {
    displayedContentName: string;
    displayedContent: ReactNode;
    isOpen: boolean;
    setIsOpen: (s: boolean) => void;
    isSmol: boolean;
};

export default function Popup({
    displayedContentName: displayedContentName,
    displayedContent: displayedContent,
    isOpen: isOpen,
    setIsOpen: setIsOpen,
    isSmol: isSmol = false,
}: Props) {
    // const [sizeClass, setSizeClass] = useState("h-[50%] transform overflow-hidden rounded-2xl p-6 pt-0 text-left align-middle shadow-xl transition-all bg-light dark:bg-dark");

    const closeButton = useRef<HTMLButtonElement>(null);

    function closeModal() {
        setIsOpen(false);
    }

    // function openModal() {
    //     setIsOpen(true);
    // }

    return (
        <>
            <Transition
                appear
                show={isOpen}
                as={Fragment}
            >
                <Dialog
                    as="div"
                    className="relative z-10"
                    onClose={closeModal}
                    initialFocus={closeButton}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="bg-black/25 fixed inset-0" />
                    </Transition.Child>

                    <div className="fixed inset-0 m-6 overflow-y-auto">
                        <div className="flex items-center justify-center p-4 pt-0 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    className={cn(
                                        isSmol ? "w-[100%] lg:w-[32%]" : "w-[95%] lg:w-[80%]",
                                        "h-[50%] transform overflow-hidden rounded-2xl bg-dark p-6 pt-0 text-left align-middle shadow-xl transition-all"
                                    )}
                                >
                                    <Dialog.Title
                                        as="div"
                                        className="flex flex-row justify-between text-lg font-medium leading-6"
                                    >
                                        <h3 className="capitalize">{displayedContentName}</h3>

                                        <div className="mt-4">
                                            <button
                                                type="button"
                                                ref={closeButton}
                                                aria-label="Close"
                                                onClick={closeModal}
                                            >
                                                <XMarkIcon
                                                    className="h-6 w-6 cursor-pointer opacity-50"
                                                    // visibility={clearButtonVisibility}
                                                />
                                            </button>
                                        </div>
                                    </Dialog.Title>

                                    {displayedContent}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
