export type Priority = "low" | "medium" | "high";

export type Todo = {
	id: string;
	title: string;
	completed: boolean;
	priority: Priority;
	dueDate: Date | null;
	category: string | null;
	createdAt: Date;
	updatedAt: Date;
};

export type CreateTodoInput = {
	title: string;
	priority?: Priority;
	dueDate?: Date | null;
	category?: string | null;
};

export type UpdateTodoInput = {
	title?: string;
	completed?: boolean;
	priority?: Priority;
	dueDate?: Date | null;
	category?: string | null;
};
