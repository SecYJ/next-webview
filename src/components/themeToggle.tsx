"use client";
import * as React from "react";
import { Button } from "./ui/button";

export function ThemeToggle() {
	const [mounted, setMounted] = React.useState(false);
	const [isDark, setIsDark] = React.useState(false);

	React.useEffect(() => {
		setMounted(true);
		try {
			const stored = localStorage.getItem("theme");
			const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
			const dark = stored ? stored === "dark" : prefersDark;
			setIsDark(dark);
			document.documentElement.classList.toggle("dark", dark);
		} catch (_e) {
			// noop
		}
	}, []);

	if (!mounted) return null;

	function toggleTheme() {
		const next = !isDark;
		setIsDark(next);
    try {
        localStorage.setItem("theme", next ? "dark" : "light");
        const root = document.documentElement;
        root.classList.toggle("dark", next);
        root.style.colorScheme = next ? "dark" : "light";
    } catch (_e) {
        // noop
    }
}

	return (
		<Button variant="outline" onClick={toggleTheme} aria-label="Toggle theme">
			{isDark ? "Light" : "Dark"}
		</Button>
	);
}
