"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"rounded-lg border border-neutral-200 bg-white text-black shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100",
				className
			)}
			{...props}
		/>
	);
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
	return <h3 className={cn("text-lg font-semibold leading-none", className)} {...props} />;
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
	return <p className={cn("text-sm text-neutral-600 dark:text-neutral-400", className)} {...props} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return <div className={cn("p-6 pt-0", className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return <div className={cn("flex items-center p-6 pt-0", className)} {...props} />;
}
