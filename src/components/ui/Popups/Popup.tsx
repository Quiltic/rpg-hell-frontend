
import { XMarkIcon } from "@heroicons/react/20/solid";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
// import { Button } from "../Button/Button";


type Props = {
    displayedContentName:string;
    displayedContent:any;
    isOpen: boolean;
    setIsOpen: (s: boolean) => void;
};

export default function Popup({
    displayedContentName: displayedContentName,
    displayedContent: displayedContent,
    isOpen: isOpen,
    setIsOpen: setIsOpen
}: Props) {
    // const [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }

    // function openModal() {
    //     setIsOpen(true);
    // }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
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
                                <Dialog.Panel className="w-[95%] lg:w-[80%] h-[50%] transform overflow-hidden rounded-2xl p-6 pt-0 text-left align-middle shadow-xl transition-all bg-light dark:bg-dark">
                                    <Dialog.Title
                                        as="div"
                                        className="text-lg font-medium leading-6 flex flex-row justify-between"
                                    >
                                        <h3 className="capitalize">
                                            {displayedContentName}
                                        </h3>

                                        <div className="mt-4">
                                            <XMarkIcon
                                                className="h-6 w-6 opacity-50 cursor-pointer"
                                                // visibility={clearButtonVisibility}
                                                onClick={closeModal}
                                            />
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
