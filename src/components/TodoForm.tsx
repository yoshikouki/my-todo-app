"use client";

import { useState, type FormEvent } from "react";

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
		<form onSubmit={handleSubmit} className="animate-slide-up">
			<div className="flex gap-3">
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="新しいTODOを入力..."
					className="
						flex-1 px-4 py-3 rounded-xl
						bg-white/50 dark:bg-dark-accent/50
						border border-gray-200 dark:border-gray-700
						text-gray-800 dark:text-gray-100
						placeholder-gray-400 dark:placeholder-gray-500
						shadow-inner-sm
						focus:outline-none focus:ring-2 focus:ring-primary-400
						transition-all duration-200
					"
				/>
				<button
					type="submit"
					className="
						px-6 py-3 rounded-xl
						bg-primary-500 hover:bg-primary-600
						dark:bg-primary-600 dark:hover:bg-primary-700
						text-white font-medium
						shadow-subtle hover:shadow-lg
						transform transition-all duration-200
						hover:scale-105 active:scale-95
						focus:outline-none focus:ring-2 focus:ring-primary-400
					"
				>
					追加
				</button>
			</div>
		</form>
	);
}
