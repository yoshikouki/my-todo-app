"use client";

import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
	const { theme, toggleTheme } = useTheme();

	return (
		<button
			type="button"
			onClick={toggleTheme}
			className="fixed bottom-4 right-4 p-3 rounded-full bg-gray-200 dark:bg-dark-secondary text-gray-800 dark:text-dark-primary hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
			aria-label={`${theme === "light" ? "ダークモード" : "ライトモード"}に切り替え`}
		>
			{theme === "light" ? "🌙" : "☀️"}
		</button>
	);
}
