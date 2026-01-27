
import { useState } from "react";
import { cn } from "../../styling/utilites";

type Props = {
    text: any;
    display:any;
    className?: string;
};

export default function Tooltip({
    text: text,
    display: display,
    className: className
}: Props) {


    // The below stuff is to see if we need to put the tooltip above or below the hover part
    const [top, setTop] = useState(false);

    const toggleVisible = () => {
        const scrolled = document.documentElement.getBoundingClientRect();
        // console.log(scrolled)
        if (scrolled.top > 200) {
            setTop(false);
        } else if (scrolled.top <= 200) {
            setTop(true);
        }
    };

    window.addEventListener("scroll", toggleVisible);

    return (
        <div className={cn("mr-1 ml-1",className)}>
            <div className="relative group">
                {/* <!-- Tooltip Words --> */}
                <div className="tooltip_main underline decoration-dotted">
                    {text}
                </div>
                
                {/* Tooltip Show */}
                <div className={cn("tooltip_hide", (top ? "bottom-[60%]" : "top-full"))}>
                    {display}
                </div>
            </div>
        </div>
    );
}


