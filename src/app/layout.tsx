import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "TODOアプリ",
	description: "シンプルで使いやすいTODOアプリケーション",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ja" suppressHydrationWarning>
			<head>
				<Script id="theme-script" strategy="beforeInteractive">
					{`
						(function() {
							const theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
							document.documentElement.classList.toggle('dark', theme === 'dark');
						})();
					`}
				</Script>
			</head>
			<body className={`${inter.className} transition-colors`}>
				<ThemeProvider>
					{children}
					<ThemeToggle />
				</ThemeProvider>
			</body>
		</html>
	);
}
