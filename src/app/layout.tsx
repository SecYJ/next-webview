import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import "./globals.css";
import { ThemeToggle } from "@/components/themeToggle";

export const metadata: Metadata = {
	title: "Admin",
	description: "Admin dashboard",
};

const navItems: Array<{ href: string; label: string }> = [
	{ href: "/dashboard", label: "Dashboard" },
	{ href: "/reports", label: "Reports" },
	{ href: "/settings", label: "Settings" },
	{ href: "/users/new", label: "New User" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<Script id="theme-init" strategy="beforeInteractive">
					{`
                    try {
                      const stored = localStorage.getItem('theme');
                      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                      const dark = stored ? stored === 'dark' : prefersDark;
                      const root = document.documentElement;
                      root.classList.toggle('dark', dark);
                      root.style.colorScheme = dark ? 'dark' : 'light';
                    } catch (_) { /* noop */ }
                    `}
				</Script>
			</head>
			<body className="min-h-screen bg-white text-black dark:bg-neutral-950 dark:text-neutral-50">
				<div className="grid min-h-screen grid-cols-[220px_1fr]">
					<aside className="border-r border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950">
						<div className="px-4 py-4 text-base font-semibold">Admin</div>
						<nav className="px-2">
							<ul className="space-y-1">
								{navItems.map((item) => (
									<li key={item.href}>
										<Link
											className="flex items-center rounded-md px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900"
											href={item.href}
										>
											{item.label}
										</Link>
									</li>
								))}
							</ul>
						</nav>
					</aside>
					<main className="p-6">
						<div className="mb-4 flex justify-end">
							<ThemeToggle />
						</div>
						{children}
					</main>
				</div>

				{/* page.tsx - api call loader */}
				<div>
					<div>
						<div></div>
					</div>
				</div>
			</body>
		</html>
	);
}
