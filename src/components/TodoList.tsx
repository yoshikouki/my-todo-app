"use client";

import { useState } from "react";
import type { Todo, Priority } from "@/types/todo";

interface TodoListProps {
	todos: Todo[];
	onToggle: (id: string) => void;
	onUpdate: (id: string, title: string) => void;
	onDelete: (id: string) => void;
}

const priorityColors: Record<Priority, string> = {
	low: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
	medium:
		"bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
	high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

const priorityLabels: Record<Priority, string> = {
	low: "低",
	medium: "中",
	high: "高",
};

export function TodoList({
	todos,
	onToggle,
	onUpdate,
	onDelete,
}: TodoListProps) {
	const [editingId, setEditingId] = useState<string | null>(null);
	const [editingTitle, setEditingTitle] = useState("");
	const [sortBy, setSortBy] = useState<"priority" | "dueDate" | "createdAt">(
		"createdAt",
	);

	const handleEdit = (todo: Todo) => {
		setEditingId(todo.id);
		setEditingTitle(todo.title);
	};

	const handleSave = (id: string) => {
		if (!editingTitle.trim()) return;
		onUpdate(id, editingTitle.trim());
		setEditingId(null);
	};

	const handleCancel = () => {
		setEditingId(null);
	};

	const formatDate = (date: Date | null) => {
		if (!date) return "";
		return new Date(date).toLocaleString("ja-JP", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const sortedTodos = [...todos].sort((a, b) => {
		switch (sortBy) {
			case "priority": {
				const priorityOrder: Record<Priority, number> = {
					high: 0,
					medium: 1,
					low: 2,
				};
				return priorityOrder[a.priority] - priorityOrder[b.priority];
			}
			case "dueDate":
				if (!a.dueDate && !b.dueDate) return 0;
				if (!a.dueDate) return 1;
				if (!b.dueDate) return -1;
				return a.dueDate.getTime() - b.dueDate.getTime();
			default:
				return b.createdAt.getTime() - a.createdAt.getTime();
		}
	});

	if (todos.length === 0) {
		return (
			<div className="text-center text-gray-400 dark:text-gray-500 py-8 animate-fade-in">
				TODOがありません。新しいTODOを追加してください。
			</div>
		);
	}

	return (
		<div className="space-y-4">
			<div className="flex gap-2">
				<button
					type="button"
					onClick={() => setSortBy("priority")}
					className={`
						px-3 py-1 rounded-lg text-sm font-medium
						transition-all duration-200
						${
							sortBy === "priority"
								? "bg-primary-500 text-white"
								: "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
						}
					`}
				>
					優先度順
				</button>
				<button
					type="button"
					onClick={() => setSortBy("dueDate")}
					className={`
						px-3 py-1 rounded-lg text-sm font-medium
						transition-all duration-200
						${
							sortBy === "dueDate"
								? "bg-primary-500 text-white"
								: "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
						}
					`}
				>
					期限順
				</button>
				<button
					type="button"
					onClick={() => setSortBy("createdAt")}
					className={`
						px-3 py-1 rounded-lg text-sm font-medium
						transition-all duration-200
						${
							sortBy === "createdAt"
								? "bg-primary-500 text-white"
								: "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
						}
					`}
				>
					作成順
				</button>
			</div>
			<ul className="space-y-3">
				{sortedTodos.map((todo) => (
					<li
						key={todo.id}
						className="
							group
							animate-slide-in
							flex items-start gap-4 p-4
							bg-white/50 dark:bg-dark-accent/50
							rounded-xl border border-gray-100 dark:border-gray-700
							shadow-subtle hover:shadow-lg
							transition-all duration-200
							hover:scale-[1.02]
						"
					>
						<input
							type="checkbox"
							checked={todo.completed}
							onChange={() => onToggle(todo.id)}
							className="
								mt-1.5 w-5 h-5
								border-2 rounded-lg
								text-primary-500
								focus:ring-2 focus:ring-primary-400
								dark:border-gray-600 dark:bg-dark-primary
								transition-all duration-200
								hover:scale-110
							"
						/>
						<div className="flex-1 space-y-2">
							{editingId === todo.id ? (
								<div className="flex gap-2">
									<input
										type="text"
										value={editingTitle}
										onChange={(e) => setEditingTitle(e.target.value)}
										className="
											flex-1 px-3 py-2 rounded-lg
											bg-white/80 dark:bg-dark-primary/80
											border border-gray-200 dark:border-gray-700
											text-gray-800 dark:text-gray-100
											focus:outline-none focus:ring-2 focus:ring-primary-400
											transition-all duration-200
										"
									/>
									<button
										type="button"
										onClick={() => handleSave(todo.id)}
										className="
											px-4 py-2 rounded-lg
											bg-green-500 hover:bg-green-600
											dark:bg-green-600 dark:hover:bg-green-700
											text-white font-medium
											transform transition-all duration-200
											hover:scale-105 active:scale-95
											focus:outline-none focus:ring-2 focus:ring-green-400
										"
									>
										保存
									</button>
									<button
										type="button"
										onClick={handleCancel}
										className="
											px-4 py-2 rounded-lg
											bg-gray-500 hover:bg-gray-600
											dark:bg-gray-600 dark:hover:bg-gray-700
											text-white font-medium
											transform transition-all duration-200
											hover:scale-105 active:scale-95
											focus:outline-none focus:ring-2 focus:ring-gray-400
										"
									>
										キャンセル
									</button>
								</div>
							) : (
								<div className="flex items-start justify-between gap-4">
									<div className="space-y-1">
										<div
											className={`text-lg ${
												todo.completed
													? "line-through text-gray-400 dark:text-gray-500"
													: "text-gray-800 dark:text-gray-100"
											}`}
										>
											{todo.title}
										</div>
										<div className="flex flex-wrap gap-2 text-sm">
											<span
												className={`px-2 py-0.5 rounded-md ${priorityColors[todo.priority]}`}
											>
												{priorityLabels[todo.priority]}
											</span>
											{todo.category && (
												<span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
													{todo.category}
												</span>
											)}
											{todo.dueDate && (
												<span
													className={`px-2 py-0.5 rounded-md ${
														new Date(todo.dueDate) < new Date()
															? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
															: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
													}`}
												>
													期限: {formatDate(todo.dueDate)}
												</span>
											)}
										</div>
									</div>
									<div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
										<button
											type="button"
											onClick={() => handleEdit(todo)}
											className="
												p-2 rounded-lg
												text-gray-500 hover:text-gray-700
												dark:text-gray-400 dark:hover:text-gray-200
												hover:bg-gray-100 dark:hover:bg-gray-700
												transition-all duration-200
											"
										>
											編集
										</button>
										<button
											type="button"
											onClick={() => onDelete(todo.id)}
											className="
												p-2 rounded-lg
												text-red-500 hover:text-red-700
												dark:text-red-400 dark:hover:text-red-200
												hover:bg-red-100 dark:hover:bg-red-900
												transition-all duration-200
											"
										>
											削除
										</button>
									</div>
								</div>
							)}
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
