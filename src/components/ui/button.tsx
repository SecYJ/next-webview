"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "default" | "secondary" | "outline" | "ghost" | "link";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant = "default", type = "button", ...props }, ref) => {
		const baseStyles =
			"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 dark:focus-visible:ring-neutral-500";

		const variantStyles: Record<ButtonVariant, string> = {
			default:
				"bg-black text-white hover:bg-black/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-200",
			secondary:
				"bg-neutral-200 text-black hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-700",
			outline:
				"border border-neutral-300 bg-transparent hover:bg-neutral-100 text-black dark:border-neutral-700 dark:text-neutral-50 dark:hover:bg-neutral-800",
			ghost: "bg-transparent hover:bg-neutral-100 text-black dark:text-neutral-50 dark:hover:bg-neutral-800",
			link: "bg-transparent underline-offset-4 hover:underline text-black dark:text-neutral-50",
		};

		return (
			<button ref={ref} type={type} className={cn(baseStyles, variantStyles[variant], className)} {...props} />
		);
	}
);
Button.displayName = "Button";
