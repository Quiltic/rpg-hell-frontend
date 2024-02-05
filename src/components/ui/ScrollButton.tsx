import React, { useState } from "react";
import { ChevronIcon } from "../../assets/IconSVGs/heroiconsSVG";
import { classNames } from "../../util/tableTools";
import { Button } from "./Button/Button";

const ScrollButton = () => {
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true);
        } else if (scrolled <= 300) {
            setVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
            /* you can also use 'auto' behaviour 
         in place of 'smooth' */
        });
    };

    window.addEventListener("scroll", toggleVisible);

    return (
        <Button
            variant={"subtle"}
            leftIcon={ChevronIcon}
            className={classNames(
                "bottom-10 right-14 rounded-full w-10 h-10 rotate-180 transform",
                visible ? "fixed " : "hidden"
            )}
            onClick={scrollToTop}
        />
    );
    // return (
    //     <div
    //         className={classNames(
    //             visible ? "fixed bottom-10 right-10" : "hidden"
    //         )}
    //         onClick={scrollToTop}
    //     >
    //         {ChevronIcon}
    //     </div>
    // );
};

export default ScrollButton;
