import React from "react";

import { cn } from "../../../styling/utilites";

import { buttonVariants } from "../../../styling/buttonVariants";

import { BaseButton } from "./BaseButton";
import { VariantProps } from "class-variance-authority";

export const Button = React.forwardRef<
    React.ElementRef<typeof BaseButton>,
    React.ComponentPropsWithoutRef<typeof BaseButton> &
        VariantProps<typeof buttonVariants>
>(({ className, variant, ...props }, ref) => (
    <BaseButton
        className={cn(buttonVariants({ variant, className })).concat(
            " focus:ring-2 focus:ring-light/75"
        )}
        {...props}
        ref={ref}
    />
));

Button.displayName = "Button";
