"use client";

import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
	const { theme, toggleTheme } = useTheme();
	const isDark = theme === "dark";

	return (
		<button
			type="button"
			onClick={toggleTheme}
			className={`
				fixed bottom-6 right-6 p-3
				rounded-full backdrop-blur-md
				shadow-glass dark:shadow-glass-dark
				bg-white/80 dark:bg-dark-secondary/80
				text-gray-800 dark:text-gray-200
				hover:bg-gray-100 dark:hover:bg-dark-accent
				focus:outline-none focus:ring-2 focus:ring-primary-400
				transform transition-all duration-200
				hover:scale-110 active:scale-95
				animate-fade-in
			`}
			aria-label={`${isDark ? "ライトモード" : "ダークモード"}に切り替え`}
		>
			<span className="sr-only">
				{isDark ? "ライトモード" : "ダークモード"}に切り替え
			</span>
			{isDark ? (
				<svg
					className="w-6 h-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
					/>
				</svg>
			) : (
				<svg
					className="w-6 h-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
					/>
				</svg>
			)}
		</button>
	);
}
