export type KeyValue = {
  key: string;
  value: string;
};

export type Category = {
  id: string;
  title: string;
  color: string;
};

export type CategoryWithTodo = Category & {
  todos: Todo[];
};

export type EventItem = {
  id: string;
  title: string;
  createdAt: string;
  startedAt: Date;
  endedAt?: Date;
  categories?: Category;
};

export type ConflictEventItem = EventItem & {
  conflictLength: number;
  conflictIndex: number;
};

export type TodoProgress = "planned" | "ongoing" | "done";

export type Todo = {
  id: string;
  title: string;
  createdAt: string;
  categoryId: string;
  categories: Category;
  progress: TodoProgress;
};

export type CalendarType = "year" | "month" | "week" | "day";
