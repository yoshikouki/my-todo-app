"use client";

import { useState, type FormEvent } from "react";
import type { Priority, CreateTodoInput } from "@/types/todo";

interface TodoFormProps {
	onSubmit: (input: CreateTodoInput) => void;
}

export function TodoForm({ onSubmit }: TodoFormProps) {
	const [title, setTitle] = useState("");
	const [priority, setPriority] = useState<Priority>("medium");
	const [dueDate, setDueDate] = useState<string>("");
	const [category, setCategory] = useState("");

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (!title.trim()) return;
		onSubmit({
			title: title.trim(),
			priority,
			dueDate: dueDate ? new Date(dueDate) : null,
			category: category.trim() || null,
		});
		setTitle("");
		setPriority("medium");
		setDueDate("");
		setCategory("");
	};

	return (
		<form onSubmit={handleSubmit} className="animate-slide-up space-y-4">
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
						transform transition-all duration-200
						hover:scale-105 active:scale-95
						focus:outline-none focus:ring-2 focus:ring-primary-400
					"
				>
					追加
				</button>
			</div>
			<div className="flex gap-3 flex-wrap">
				<div className="flex-1 min-w-[200px]">
					<label
						htmlFor="priority"
						className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
					>
						優先度
					</label>
					<select
						id="priority"
						value={priority}
						onChange={(e) => setPriority(e.target.value as Priority)}
						className="
							w-full px-4 py-2 rounded-lg
							bg-white/50 dark:bg-dark-accent/50
							border border-gray-200 dark:border-gray-700
							text-gray-800 dark:text-gray-100
							focus:outline-none focus:ring-2 focus:ring-primary-400
							transition-all duration-200
						"
					>
						<option value="low">低</option>
						<option value="medium">中</option>
						<option value="high">高</option>
					</select>
				</div>
				<div className="flex-1 min-w-[200px]">
					<label
						htmlFor="dueDate"
						className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
					>
						期限
					</label>
					<input
						id="dueDate"
						type="datetime-local"
						value={dueDate}
						onChange={(e) => setDueDate(e.target.value)}
						className="
							w-full px-4 py-2 rounded-lg
							bg-white/50 dark:bg-dark-accent/50
							border border-gray-200 dark:border-gray-700
							text-gray-800 dark:text-gray-100
							focus:outline-none focus:ring-2 focus:ring-primary-400
							transition-all duration-200
						"
					/>
				</div>
				<div className="flex-1 min-w-[200px]">
					<label
						htmlFor="category"
						className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
					>
						カテゴリ
					</label>
					<input
						id="category"
						type="text"
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						placeholder="カテゴリを入力..."
						className="
							w-full px-4 py-2 rounded-lg
							bg-white/50 dark:bg-dark-accent/50
							border border-gray-200 dark:border-gray-700
							text-gray-800 dark:text-gray-100
							placeholder-gray-400 dark:placeholder-gray-500
							focus:outline-none focus:ring-2 focus:ring-primary-400
							transition-all duration-200
						"
					/>
				</div>
			</div>
		</form>
	);
}
