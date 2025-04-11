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
			<div className="text-center text-gray-500 mt-8">
				TODOがありません。新しいTODOを追加してください。
			</div>
		);
	}

	return (
		<ul className="space-y-4">
			{todos.map((todo) => (
				<li
					key={todo.id}
					className="flex items-center gap-4 p-4 bg-white rounded shadow"
				>
					<input
						type="checkbox"
						checked={todo.completed}
						onChange={() => onToggle(todo.id)}
						className="w-5 h-5 border-2 rounded focus:ring-2 focus:ring-blue-500"
					/>
					{editingId === todo.id ? (
						<div className="flex-1 flex gap-2">
							<input
								type="text"
								value={editingTitle}
								onChange={(e) => setEditingTitle(e.target.value)}
								className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
								autoFocus
							/>
							<button
								onClick={() => handleSave(todo.id)}
								className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
							>
								保存
							</button>
							<button
								onClick={handleCancel}
								className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
							>
								キャンセル
							</button>
						</div>
					) : (
						<>
							<span
								className={`flex-1 ${todo.completed ? "line-through text-gray-500" : ""}`}
							>
								{todo.title}
							</span>
							<div className="flex gap-2">
								<button
									onClick={() => handleEdit(todo)}
									className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
								>
									編集
								</button>
								<button
									onClick={() => onDelete(todo.id)}
									className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
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
