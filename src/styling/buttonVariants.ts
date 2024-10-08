// Concept grabbed from: https://vincentdusautoir.com/posts/button-variants-tailwindcss
// Thanks, Vincent!

// https://codepen.io/nrowe/pen/PoaLxN
// fancy gradient buttons later?

import { cva } from "class-variance-authority";

export const baseButtonVariants = cva(
    "font-medium text-center relative whitespace-nowrap align-middle outline-none inline-flex items-center justify-center rounded-full",
    {
        variants: {
            size: {
                xs: "text-xs h-6 min-w-6 px-2",
                sm: "text-sm h-8 min-w-8 px-3",
                md: "text-base h-10 min-w-10 px-4",
                lg: "text-lg h-12 min-w-12 px-6",
                xl: "text-xl h-14 min-w-14 px-8",
            },
        },
        defaultVariants: {
            size: "md",
        },
    }
);

// const solidVariants = cva("", { // "brand" here has a gradient in it as an example
//     variants: {
//         variant: {
//             default:
//                 "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200",
//             brand: "outline-none bg-gradient-to-r from-brand-600 via-brand-400 to-brand-600 text-white hover:outline-2 outline-offset-0 hover:outline-zinc-900 transition-all bg-left hover:bg-right bg-[size:200%]",
//             destructive:
//                 "bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-600",
//         },
//     },
// });

const solidVariants = cva("", {
    variants: {
        variant: {
            default:
                "bg-dark text-light hover:bg-dark-100 dark:bg-light dark:text-dark dark:hover:bg-light-100",
            mind: "bg-mind text-light hover:bg-mind-600 dark:hover:bg-mind-600",
            body: "bg-body text-light hover:bg-body-600 dark:hover:bg-body-600",
            soul: "bg-soul text-light hover:bg-soul-600 dark:hover:bg-soul-600",
            nature: "bg-nature text-light hover:bg-nature-600 dark:hover:bg-nature-600",
            medicine:
                "bg-medicine text-light hover:bg-medicine-600 dark:hover:bg-medicine-600",
            arcana: "bg-arcana text-light hover:bg-arcana-600 dark:hover:bg-arcana-600",
            charm: "bg-charm text-light hover:bg-charm-600 dark:hover:bg-charm-600",
            crafting: "bg-crafting text-light hover:bg-crafting-600 dark:hover:bg-crafting-600",
            thieving: "bg-thieving text-light hover:bg-thieving-600 dark:hover:bg-thieving-600",
            gradient: "bg-gradient-to-br from-body-600 from-20% via-mind-600 via-50% to-soul-600 to-80% text-light ",
            dark: "bg-dark-700 text-light hover:text-light-400",
        },
    },
});

const subtleVariants = cva("", {
    variants: {
        variant: {
            default:
                "text-dark bg-dark/20 hover:bg-dark/40 dark:text-light dark:hover:bg-light/40 dark:bg-light/20",
            mind: "text-mind bg-mind/20 hover:bg-mind/30 border-mind",
            body: "text-body bg-body/20 hover:bg-body/30 border-body",
            soul: "text-soul bg-soul/20 hover:bg-soul/30 border-soul",
            nature: "text-nature bg-nature/20 hover:bg-nature/30 border-nature",
            medicine:
                "text-medicine bg-medicine/20 hover:bg-medicine/30 border-medicine",
            arcana: "text-arcana bg-arcana/20 hover:bg-arcana/30 border-arcana",
            charm: "text-charm bg-charm/20 hover:bg-charm/30 border-charm",
            crafting: "text-crafting bg-crafting/20 hover:bg-crafting/30 border-crafting",
            thieving: "text-thieving bg-thieving/20 hover:bg-thieving/30 border-thieving",
            dark: "text-dark bg-dark/20 hover:bg-dark/40",
        },
    },
});

const linkVariants = cva("", {
    variants: {
        variant: {
            default:
                "bg-transparent underline-offset-4 underline hover:text-dark-100 text-dark dark:text-light hover:bg-transparent dark:hover:text-light-100 dark:hover:bg-transparent",
            mind: "bg-transparent underline-offset-4 underline hover:text-mind-700 text-mind-600 hover:bg-transparent",
            body: "bg-transparent underline-offset-4 underline hover:text-body-700 text-body-600 hover:bg-transparent",
            soul: "bg-transparent underline-offset-4 underline hover:text-soul-700 text-soul-600 hover:bg-transparent",
            nature: "bg-transparent underline-offset-4 underline hover:text-nature-700 text-nature-600 hover:bg-transparent",
            arcana: "bg-transparent underline-offset-4 underline hover:text-arcana-700 text-arcana-600 hover:bg-transparent",
            charm: "bg-transparent underline-offset-4 underline hover:text-charm-700 text-charm-600 hover:bg-transparent",
            crafting: "bg-transparent underline-offset-4 underline hover:text-crafting-700 text-crafting-600 hover:bg-transparent",
            thieving: "bg-transparent underline-offset-4 underline hover:text-thieving-700 text-thieving-600 hover:bg-transparent",
            gradient: "text-transparent bg-clip-text bg-gradient-to-r from-body-600 via-mind-600 to-soul-600",
            medicine:
                "bg-transparent underline-offset-4 underline hover:text-medicine-700 text-medicine-600 hover:bg-transparent",
        },
    },
});

export const buttonVariants = cva("...", {
    variants: {
        variant: {
            default: solidVariants({ variant: "default" }),
            mind: solidVariants({ variant: "mind" }),
            body: solidVariants({ variant: "body" }),
            soul: solidVariants({ variant: "soul" }),
            nature: solidVariants({ variant: "nature" }),
            medicine: solidVariants({ variant: "medicine" }),
            dark: solidVariants({ variant: "dark" }),
            gradient: solidVariants({ variant: "gradient" }),
            link: linkVariants({ variant: "default" }),
            "link-mind": linkVariants({ variant: "mind" }),
            "link-body": linkVariants({ variant: "body" }),
            "link-soul": linkVariants({ variant: "soul" }),
            "link-nature": linkVariants({ variant: "nature" }),
            "link-medicine": linkVariants({ variant: "medicine" }),
            "link-gradient": linkVariants({ variant: "gradient" }),
            subtle: subtleVariants({ variant: "default" }),
            "subtle-mind": subtleVariants({ variant: "mind" }),
            "subtle-body": subtleVariants({ variant: "body" }),
            "subtle-soul": subtleVariants({ variant: "soul" }),
            "subtle-nature": subtleVariants({ variant: "nature" }),
            "subtle-medicine": subtleVariants({ variant: "medicine" }),
            "subtle-dark": subtleVariants({ variant: "dark" }),
            arcana: solidVariants({ variant: "arcana" }),
            "link-arcana": linkVariants({ variant: "arcana" }),
            "subtle-arcana": subtleVariants({ variant: "arcana" }),
            charm: solidVariants({ variant: "charm" }),
            "link-charm": linkVariants({ variant: "charm" }),
            "subtle-charm": subtleVariants({ variant: "charm" }),
            crafting: solidVariants({ variant: "crafting" }),
            "link-crafting": linkVariants({ variant: "crafting" }),
            "subtle-crafting": subtleVariants({ variant: "crafting" }),
            thieving: solidVariants({ variant: "thieving" }),
            "link-thieving": linkVariants({ variant: "thieving" }),
            "subtle-thieving": subtleVariants({ variant: "thieving" }),
            unstyled: "",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});
