"use client";

import { useState, useEffect } from "react";
import type { Todo } from "@/types/todo";
import { TodoStorage } from "@/services/todoStorage";
import { TodoList } from "./TodoList";
import { TodoForm } from "./TodoForm";

export function TodoApp() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const todoStorage = TodoStorage.getInstance();

	useEffect(() => {
		setTodos(todoStorage.getAllTodos());
	}, []);

	const handleCreateTodo = (title: string) => {
		const newTodo = todoStorage.createTodo({ title });
		setTodos((prev) => [...prev, newTodo]);
	};

	const handleToggleTodo = (id: string) => {
		const todo = todos.find((t) => t.id === id);
		if (!todo) return;

		const updatedTodo = todoStorage.updateTodo(id, {
			completed: !todo.completed,
		});
		if (!updatedTodo) return;

		setTodos((prev) => prev.map((t) => (t.id === id ? updatedTodo : t)));
	};

	const handleUpdateTodo = (id: string, title: string) => {
		const updatedTodo = todoStorage.updateTodo(id, { title });
		if (!updatedTodo) return;

		setTodos((prev) => prev.map((t) => (t.id === id ? updatedTodo : t)));
	};

	const handleDeleteTodo = (id: string) => {
		const deleted = todoStorage.deleteTodo(id);
		if (!deleted) return;

		setTodos((prev) => prev.filter((t) => t.id !== id));
	};

	return (
		<div className="max-w-2xl mx-auto p-4 animate-fade-in">
			<h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100 animate-slide-up">
				TODOアプリ
			</h1>
			<div className="bg-white/80 dark:bg-dark-secondary/80 backdrop-blur-md rounded-2xl shadow-glass dark:shadow-glass-dark p-6 space-y-6 animate-scale-in">
				<TodoForm onSubmit={handleCreateTodo} />
				<TodoList
					todos={todos}
					onToggle={handleToggleTodo}
					onUpdate={handleUpdateTodo}
					onDelete={handleDeleteTodo}
				/>
			</div>
		</div>
	);
}
