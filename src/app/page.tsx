import { TodoApp } from "@/components/TodoApp";

export default function Home() {
	return (
		<main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-dark-primary dark:to-dark-secondary py-8 transition-all duration-300">
			<div className="absolute inset-0 bg-gradient-radial from-primary-400/5 to-transparent dark:from-primary-400/10" />
			<div className="relative">
				<TodoApp />
			</div>
		</main>
	);
}
