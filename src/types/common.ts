export type KeyValue = {
  key: string;
  value: string;
};

export type Category = {
  id: number;
  name: string;
  color: string;
};

export type TodoItem = {
  id: number;
  title: string;
  createdAt: string;
  startedAt: Date;
  endedAt?: Date;
  categories?: Category;
};

export type ConflictTodoItem = TodoItem & {
  conflictLength: number;
  conflictIndex: number;
};
