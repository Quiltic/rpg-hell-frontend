import React, { useEffect, useState } from "react";
import { classNames } from "../../util/tableTools";

type Props = {
    color: string;
    statName: string;
    statScore: number;
    onIncrementClick: () => void; // setSelected: (s: number) => void;
    onDecrementClick: () => void;
    maxValue: number;
    incrementDisabled: boolean;
    // isDecrementDisabled: boolean;
};

export default function CharacterSheetStatIncrementor({
    color: color,
    statName: statName,
    statScore: statScore,
    onIncrementClick: onIncrementClick,
    onDecrementClick: onDecrementClick,
    maxValue: maxValue, // isDecrementDisabled: isDecrementDisabled,
    incrementDisabled: incrementDisabled,
}: Props) {
    const [isDecrementDisabled, setIsDecrementDisabled] = useState(
        statScore >= 0
    );
    const [isIncrementDisabled, setIsIncrementDisabled] = useState(
        statScore <= maxValue
    );

    useEffect(() => {

        setIsDecrementDisabled(statScore <= 0);
        setIsIncrementDisabled(statScore >= maxValue);

    }, [statScore]);

    useEffect(() => {
        setIsIncrementDisabled(incrementDisabled);
    }, [incrementDisabled]);

    return (
        <div
            className={classNames(
                color,
                "grid grid-rows-1 grid-cols-6 w-full md:mw-72 h-14 justify-items-center align-middle items-center rounded-full text-3xl capitalize px-2 select-none",
                statScore > 0 ? "ring-2 ring-light" : ""
            )}
        >
            <div
                className={classNames(
                    "col-span-1 pb-2 z-10 pl-6 md:pl-3 pr-8 md:pr-4 -m-2 text-4xl font-semibold ",
                    isIncrementDisabled
                        ? "opacity-0 cursor-not-allowed"
                        : "cursor-pointer hover:opacity-60"
                )}
                onClick={() => {if (!isIncrementDisabled) {onIncrementClick()}}}
            >
                +
            </div>
            <div className="col-span-3">{statName}</div>
            <div className="col-span-1">{statScore}</div>
            <div
                className={classNames(
                    "col-span-1 pb-2 z-10 pl-8 md:pl-4 pr-6 md:pr-3 -m-2 text-4xl font-semibold",
                    isDecrementDisabled
                        ? "opacity-0 cursor-not-allowed"
                        : "cursor-pointer hover:opacity-60"
                )}
                onClick={() => { if (!isDecrementDisabled) {onDecrementClick()}}}
            >
                -
            </div>
        </div>
    );
    // return (
    //     <div className="grid grid-rows-1 grid-cols-3 w-36 justify-items-center select-none">
    //         <div
    //             className={classNames(
    //                 color,
    //                 "rounded-lg flex flex-col justify-evenly text-light w-24 h-24 p-2 row-span-2 col-span-2 capitalize"
    //             )}
    //         >
    //             <span className="text-xl">{statName}</span>
    //             <span className="text-5xl">{statScore}</span>
    //         </div>
    //         <div className="flex flex-col justify-evenly">
    //             <div
    //                 className={classNames(
    //                     color,
    //                     "rounded-lg h-8 w-8 text-xl hover:opacity-80 cursor-pointer"
    //                 )}
    //             >
    //                 +
    //             </div>
    //             <div
    //                 className={classNames(
    //                     color,
    //                     "rounded-lg h-8 w-8 text-xl hover:opacity-80 cursor-pointer"
    //                 )}
    //             >
    //                 -
    //             </div>
    //         </div>
    //     </div>
    // );
}
