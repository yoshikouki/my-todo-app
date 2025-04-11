"use client";

import { useState } from "react";
import type { Todo } from "@/types/todo";

interface TodoListProps {
	todos: Todo[];
	onToggle: (id: string) => void;
	onUpdate: (id: string, title: string) => void;
	onDelete: (id: string) => void;
}

export function TodoList({
	todos,
	onToggle,
	onUpdate,
	onDelete,
}: TodoListProps) {
	const [editingId, setEditingId] = useState<string | null>(null);
	const [editingTitle, setEditingTitle] = useState("");

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

	if (todos.length === 0) {
		return (
			<div className="text-center text-gray-400 dark:text-gray-500 py-8 animate-fade-in">
				TODOがありません。新しいTODOを追加してください。
			</div>
		);
	}

	return (
		<ul className="space-y-3">
			{todos.map((todo) => (
				<li
					key={todo.id}
					className="
						group
						animate-slide-in
						flex items-center gap-4 p-4
						bg-white/50 dark:bg-dark-accent/50
						rounded-xl border border-gray-100 dark:border-gray-700
						shadow-subtle hover:shadow-lg
						transform transition-all duration-200
						hover:scale-[1.02]
					"
				>
					<input
						type="checkbox"
						checked={todo.completed}
						onChange={() => onToggle(todo.id)}
						className="
							w-5 h-5
							border-2 rounded-lg
							text-primary-500
							focus:ring-2 focus:ring-primary-400
							dark:border-gray-600 dark:bg-dark-primary
							transition-all duration-200
							hover:scale-110
						"
					/>
					{editingId === todo.id ? (
						<div className="flex-1 flex gap-2">
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
						<>
							<span
								className={`
									flex-1
									text-gray-800 dark:text-gray-100
									transition-all duration-200
									${todo.completed ? "line-through text-gray-400 dark:text-gray-500" : ""}
								`}
							>
								{todo.title}
							</span>
							<div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
								<button
									type="button"
									onClick={() => handleEdit(todo)}
									className="
										px-4 py-2 rounded-lg
										bg-primary-500 hover:bg-primary-600
										dark:bg-primary-600 dark:hover:bg-primary-700
										text-white font-medium
										transform transition-all duration-200
										hover:scale-105 active:scale-95
										focus:outline-none focus:ring-2 focus:ring-primary-400
									"
								>
									編集
								</button>
								<button
									type="button"
									onClick={() => onDelete(todo.id)}
									className="
										px-4 py-2 rounded-lg
										bg-red-500 hover:bg-red-600
										dark:bg-red-600 dark:hover:bg-red-700
										text-white font-medium
										transform transition-all duration-200
										hover:scale-105 active:scale-95
										focus:outline-none focus:ring-2 focus:ring-red-400
									"
								>
									削除
								</button>
							</div>
						</>
					)}
				</li>
			))}
		</ul>
	);
}
