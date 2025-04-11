import { TodoApp } from "@/components/TodoApp";

export default function Home() {
	return (
		<main className="min-h-screen bg-gray-100 dark:bg-dark-primary py-8 transition-colors">
			<TodoApp />
		</main>
	);
}
