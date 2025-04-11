"use client";

import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
	theme: Theme;
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
}

interface ThemeProviderProps {
	children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
	const [mounted, setMounted] = useState(false);
	const [theme, setTheme] = useState<Theme>("light");

	useEffect(() => {
		// ローカルストレージから保存されたテーマを取得
		const savedTheme = localStorage.getItem("theme") as Theme | null;
		// システムのカラースキーム設定を取得
		const prefersDark = window.matchMedia(
			"(prefers-color-scheme: dark)",
		).matches;

		// 保存されたテーマがあればそれを使用、なければシステム設定に従う
		const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
		setTheme(initialTheme);
		document.documentElement.classList.toggle("dark", initialTheme === "dark");
		setMounted(true);
	}, []);

	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		document.documentElement.classList.toggle("dark", newTheme === "dark");
		localStorage.setItem("theme", newTheme);
	};

	// マウント前はレンダリングを遅延させる
	if (!mounted) {
		return null;
	}

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}
