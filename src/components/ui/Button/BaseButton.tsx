import "react";

import { baseButtonVariants } from "../../../styling/buttonVariants";

import { VariantProps } from "class-variance-authority";

import { cn } from "../../../styling/utilites";
import React from "react";

export type BaseButtonProps = React.ComponentPropsWithoutRef<"button"> &
    VariantProps<typeof baseButtonVariants> & {
        isLoading?: boolean;
        open?: boolean;
        leftIcon?: React.ReactElement;
        rightIcon?: React.ReactElement;
    };

export const BaseButton = React.forwardRef<
    React.ElementRef<"button">,
    BaseButtonProps
>(
    (
        {
            className,
            size,
            leftIcon,
            rightIcon,
            children,
            isLoading,
            disabled,
            open,
            ...props
        },
        ref
    ) => {
        const { icon, iconPlacement } = React.useMemo(() => {
            let icon = rightIcon ? rightIcon : leftIcon;

            if (isLoading) {
                icon = (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 animate-spin"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                        />
                    </svg>
                );
            }

            return {
                icon,
                iconPlacement: rightIcon
                    ? ("right" as const)
                    : ("left" as const),
            };
        }, [isLoading, leftIcon, rightIcon]);

        return (
            <button //Most of the time I use a polymorphic component that change to a link when there is href in props
                className={cn(baseButtonVariants({ size, className }), disabled==true ? "bg-base hover:bg-base cursor-not-allowed opacity-50 hover" : "")}
                ref={ref}
                disabled={disabled || isLoading}
                data-state={isLoading ? "loading" : undefined}
                {...props}
            >
                {icon && iconPlacement === "left" ? (
                    <span
                        className={cn(
                            { "mr-2": !!children },
                            "inline-flex shrink-0 self-center",
                            open ? "rotate-180 transform" : ""
                        )}
                    >
                        {icon}
                    </span>
                ) : null}
                {children}
                {icon && iconPlacement === "right" ? (
                    <span
                        className={cn(
                            { "ml-2": !!children },
                            "inline-flex shrink-0 self-center",
                            open ? "rotate-180 transform" : ""
                        )}
                    >
                        {icon}
                    </span>
                ) : null}
            </button>
        );
    }
);

BaseButton.displayName = "BaseButton";
