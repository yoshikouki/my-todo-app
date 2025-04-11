import type {
	Todo,
	CreateTodoInput,
	UpdateTodoInput,
	Priority,
} from "@/types/todo";

const STORAGE_KEY = "todos";

export class TodoStorage {
	private static instance: TodoStorage;

	private constructor() {}

	static getInstance(): TodoStorage {
		if (!TodoStorage.instance) {
			TodoStorage.instance = new TodoStorage();
		}
		return TodoStorage.instance;
	}

	private getStoredTodos(): Todo[] {
		if (typeof window === "undefined") return [];
		const todosJson = localStorage.getItem(STORAGE_KEY);
		if (!todosJson) return [];
		return JSON.parse(todosJson).map(
			(
				todo: Omit<Todo, "createdAt" | "updatedAt" | "dueDate"> & {
					createdAt: string;
					updatedAt: string;
					dueDate: string | null;
				},
			) => ({
				...todo,
				createdAt: new Date(todo.createdAt),
				updatedAt: new Date(todo.updatedAt),
				dueDate: todo.dueDate ? new Date(todo.dueDate) : null,
			}),
		);
	}

	private storeTodos(todos: Todo[]): void {
		if (typeof window === "undefined") return;
		localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
	}

	getAllTodos(): Todo[] {
		return this.getStoredTodos();
	}

	createTodo(input: CreateTodoInput): Todo {
		const todos = this.getStoredTodos();
		const newTodo: Todo = {
			id: crypto.randomUUID(),
			title: input.title,
			completed: false,
			priority: input.priority || "medium",
			dueDate: input.dueDate || null,
			category: input.category || null,
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		this.storeTodos([...todos, newTodo]);
		return newTodo;
	}

	updateTodo(id: string, input: UpdateTodoInput): Todo | null {
		const todos = this.getStoredTodos();
		const todoIndex = todos.findIndex((todo) => todo.id === id);
		if (todoIndex === -1) return null;

		const updatedTodo: Todo = {
			...todos[todoIndex],
			...input,
			updatedAt: new Date(),
		};
		todos[todoIndex] = updatedTodo;
		this.storeTodos(todos);
		return updatedTodo;
	}

	deleteTodo(id: string): boolean {
		const todos = this.getStoredTodos();
		const filteredTodos = todos.filter((todo) => todo.id !== id);
		if (filteredTodos.length === todos.length) return false;
		this.storeTodos(filteredTodos);
		return true;
	}
}
