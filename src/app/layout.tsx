import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";

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
		<html lang="ja">
			<body className={`${inter.className} transition-colors`}>
				<ThemeProvider>
					{children}
					<ThemeToggle />
				</ThemeProvider>
			</body>
		</html>
	);
}
