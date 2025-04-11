import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
	// Next.jsのアプリケーションへのパスを指定
	dir: "./",
});

// Jestの設定
const config: Config = {
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
	testEnvironment: "jest-environment-jsdom",
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
	},
};

export default createJestConfig(config);
