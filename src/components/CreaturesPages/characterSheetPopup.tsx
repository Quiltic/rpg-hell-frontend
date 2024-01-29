// import { PinIcon, RemoveIcon } from "../../assets/IconSVGs/heroiconsSVG";
import { Spell, Trait, Item, Creature } from "../../client";

import { XMarkIcon } from "@heroicons/react/20/solid";
import CreatureSheet from "./characterSheet";

import { Dialog, Transition } from "@headlessui/react";
import { Button } from "../ui/Button/Button";
import { Fragment, useState } from "react";

import { creaturesIcon } from "../../assets/IconSVGs/heroiconsSVG";

type Props = {
    displayedCreature: Creature;
    traitsList: Array<Trait>;
    spellsList: Array<Spell>;
    itemsList: Array<Item>;
};

export default function CreaturePopup({
    displayedCreature: displayedCreature,
    traitsList: traitsList,
    spellsList: spellsList,
    itemsList: itemsList,
}: Props) {
    const [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    return (
        <>
            <Button
                leftIcon={creaturesIcon}
                onClick={openModal}
                variant={"link-soul"}
            >
                Open {displayedCreature.name}
            </Button>

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
                                            {displayedCreature.name}
                                        </h3>

                                        <div className="mt-4">
                                            <XMarkIcon
                                                className="h-6 w-6 opacity-50 cursor-pointer"
                                                // visibility={clearButtonVisibility}
                                                onClick={closeModal}
                                            />
                                        </div>
                                    </Dialog.Title>

                                    <CreatureSheet
                                        displayedCreature={displayedCreature}
                                        traitsList={traitsList}
                                        spellsList={spellsList}
                                        itemsList={itemsList}
                                    />
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
