import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

export default function TableOfContentsDiscl() {
    return (
        <>
            <Disclosure>
                {({ open }) => (
                    <>
                        <Disclosure.Button className="flex justify-between items-center px-4 py-2 text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-soul">
                            <h1>Table of Contents</h1>
                            <ChevronUpIcon
                                className={`${
                                    open ? "rotate-180 transform" : ""
                                } h-10 w-10`}
                            />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm grid grid-rows-auto-auto-auto-1fr-auto gap-4 p-4 bg-grey-500 dark:bg-dark-400 rounded-md">
                            <div className="grid grid-cols-3 p-4 gap-4">
                                <div className="bg-grey-400 dark:bg-dark-300 capitalize whitespace-pre-wrap p-2">
                                    <ul>
                                        <li>
                                            <a
                                                href="#basics"
                                                className="font-semibold mb-2"
                                            >
                                                Basics
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#lock">Locking Dice</a>
                                        </li>
                                        <li>
                                            <a href="#magic-simple">Magic</a>
                                        </li>
                                        <li>
                                            <a href="#rest-n-travel">
                                                Rest and Travel
                                            </a>
                                            <ul>
                                                <li>
                                                    <a href="#rest">Rest</a>
                                                </li>
                                                <li>
                                                    <a href="#travel">Travel</a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="#out-of-combat-rules">
                                                Out of Combat Rules
                                            </a>
                                            <ul>
                                                <li>
                                                    <a href="#actions">
                                                        Actions
                                                    </a>
                                                    <ul>
                                                        <li>
                                                            <a href="#checks">
                                                                Checks
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#contests">
                                                                Contests
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="#combat">Combat</a>
                                            <ul>
                                                <li>
                                                    <a href="#initiative">
                                                        Initiative
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#action-dice-ad">
                                                        Action Dice (AD)
                                                    </a>
                                                    <ul>
                                                        <li>
                                                            <a href="#ad-values-matter">
                                                                AD Values Matter
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <a href="#damage-and-armor">
                                                        Damage and Armor
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#deaths-door">
                                                        Deaths Door
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-grey-400 dark:bg-dark-300 whitespace-pre-wrap p-2">
                                    <ul>
                                        <li>
                                            <a
                                                href="#common-actions"
                                                className="font-semibold  mb-2"
                                            >
                                                Stats and Skills
                                            </a>
                                            <ul>
                                                <li>
                                                    <a href="#body">
                                                        <span className="text-body dark:text-body-700">
                                                            Body
                                                        </span>
                                                    </a>
                                                    <ul>
                                                        <li>
                                                            <a href="#physical-feats">
                                                                Physical Feats
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#acrobatics-or-athletics">
                                                                Acrobatics or
                                                                Athletics
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <a href="#mind">
                                                        <span className="text-mind dark:text-mind-700">
                                                            Mind
                                                        </span>
                                                    </a>
                                                    <ul>
                                                        <li>
                                                            <a href="#investigate">
                                                                Investigate
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#remember">
                                                                Remember
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <a href="#soul">
                                                        <span className="text-soul dark:text-soul-700">
                                                            Soul
                                                        </span>
                                                    </a>
                                                    <ul>
                                                        <li>
                                                            <a href="#make-a-prayer">
                                                                Make a Prayer
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <a href="#arcana">
                                                        <span className="text-arcana dark:text-arcana-700">
                                                            Arcana
                                                        </span>
                                                    </a>
                                                    <ul>
                                                        <li>
                                                            <a href="#read-runes">
                                                                Read Runes
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <a href="#charm">
                                                        <span className="text-charm dark:text-charm-700">
                                                            Charm
                                                        </span>
                                                    </a>
                                                    <ul>
                                                        <li>
                                                            <a href="#convince-someone-of-something">
                                                                Convince someone
                                                                of something
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#discern-others-intentions">
                                                                Discern others
                                                                intentions
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <a href="#crafting">
                                                        <span className="text-crafting dark:text-crafting-700">
                                                            Crafting
                                                        </span>
                                                    </a>
                                                    <ul>
                                                        <li>
                                                            <a href="#make-an-item">
                                                                Make an item
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#understand-a-contraption">
                                                                Understand a
                                                                contraption.
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#performance:-sing,-tell-a-story,-or-tell-a-joke">
                                                                Performance:
                                                                Sing/Tell a
                                                                Story/Tell a
                                                                Joke
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <a href="#nature">
                                                        <span className="text-nature dark:text-nature-700">
                                                            Nature
                                                        </span>
                                                    </a>
                                                    <ul>
                                                        <li>
                                                            <a href="#scrounge">
                                                                Scrounge
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#handle-a-beast">
                                                                Handle a beast.
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#track-a-creature">
                                                                Track a creature
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <a href="#medicine">
                                                        <span className="text-medicine dark:text-medicine-700">
                                                            Medicine
                                                        </span>
                                                    </a>
                                                    <ul>
                                                        <li>
                                                            <a href="#identify-an-illness-or-curse">
                                                                Identify an
                                                                Illness or Curse
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <a href="#thieving">
                                                        <span className="text-thieving dark:text-thieving-700">
                                                            Thieving
                                                        </span>
                                                    </a>
                                                    <ul>
                                                        <li>
                                                            <a href="#steal-or-place-an-item">
                                                                Steal/place an
                                                                item
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#hide">
                                                                Hide
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-grey-400 dark:bg-dark-300 flex-row capitalize whitespace-pre-wrap p-2">
                                    <ul>
                                        <li>
                                            <a
                                                href="#making-a-character"
                                                className="font-semibold mb-2"
                                            >
                                                Making a Character
                                            </a>
                                            <ul>
                                                <li>
                                                    <a href="#level-1">
                                                        Level 1
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#leveling-up">
                                                        Leveling Up!
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#useful-level-table">
                                                        Useful Level Table
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#races-table">
                                                        Races Table
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="#stack-effects">
                                                Stack Effects
                                            </a>
                                            <ul>
                                                <li>
                                                    <ul>
                                                        <li>
                                                            <a href="#soul">
                                                                <span className="text-soul-700">
                                                                    Soul Strain
                                                                </span>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#deaths-door-1">
                                                                Death's Door
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#burn">
                                                                Burn
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#wet">
                                                                Wet
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#bleed">
                                                                Bleed
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#poisoned">
                                                                Poisoned
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#stun">
                                                                Stun
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#webbed">
                                                                Webbed
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#grappled">
                                                                Grappled
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#blinded">
                                                                Blinded
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#marked">
                                                                Marked
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#hidden">
                                                                Hidden
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#invisible">
                                                                Invisible
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#flying">
                                                                Flying
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#incorporeal">
                                                                Incorporeal
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#silence">
                                                                Silence
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </>
    );
}
