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
			colors: {
				primary: {
					50: "#f0f9ff",
					100: "#e0f2fe",
					200: "#bae6fd",
					300: "#7dd3fc",
					400: "#38bdf8",
					500: "#0ea5e9",
					600: "#0284c7",
					700: "#0369a1",
					800: "#075985",
					900: "#0c4a6e",
				},
				dark: {
					primary: "#18181b",
					secondary: "#27272a",
					accent: "#3f3f46",
				},
			},
			animation: {
				"fade-in": "fade-in 0.5s ease-out",
				"slide-in": "slide-in 0.3s ease-out",
				"slide-up": "slide-up 0.3s ease-out",
				"scale-in": "scale-in 0.2s ease-out",
			},
			keyframes: {
				"fade-in": {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				"slide-in": {
					"0%": { transform: "translateX(-10px)", opacity: "0" },
					"100%": { transform: "translateX(0)", opacity: "1" },
				},
				"slide-up": {
					"0%": { transform: "translateY(10px)", opacity: "0" },
					"100%": { transform: "translateY(0)", opacity: "1" },
				},
				"scale-in": {
					"0%": { transform: "scale(0.95)", opacity: "0" },
					"100%": { transform: "scale(1)", opacity: "1" },
				},
			},
			boxShadow: {
				"inner-sm": "inset 0 1px 2px 0 rgb(0 0 0 / 0.05)",
				subtle: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
				glass: "0 0 15px rgba(0, 0, 0, 0.1)",
				"glass-dark": "0 0 15px rgba(255, 255, 255, 0.1)",
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
			},
		},
	},
	plugins: [],
};
export default config;
