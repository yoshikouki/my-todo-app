"use client";

import { useState, FormEvent } from "react";

interface TodoFormProps {
	onSubmit: (title: string) => void;
}

export function TodoForm({ onSubmit }: TodoFormProps) {
	const [title, setTitle] = useState("");

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (!title.trim()) return;
		onSubmit(title.trim());
		setTitle("");
	};

	return (
		<form onSubmit={handleSubmit} className="mb-8">
			<div className="flex gap-2">
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="新しいTODOを入力..."
					className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-dark-secondary dark:text-dark-primary dark:border-gray-600 dark:placeholder-gray-400"
				/>
				<button
					type="submit"
					className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700"
				>
					追加
				</button>
			</div>
		</form>
	);
}
