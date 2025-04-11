import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	darkMode: "class",
	theme: {
		extend: {
			backgroundColor: {
				"dark-primary": "#1a1a1a",
				"dark-secondary": "#2d2d2d",
			},
			textColor: {
				"dark-primary": "#ffffff",
				"dark-secondary": "#a3a3a3",
			},
		},
	},
	plugins: [],
};
export default config;
