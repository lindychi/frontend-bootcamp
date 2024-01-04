export type KeyValue = {
  key: string;
  value: string;
};

export type Category = {
  id: string;
  title: string;
  color: string;
};

export type EventItem = {
  id: number;
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

export type Todo = {
  id: number;
  title: string;
  createdAt: string;
  categories: Category;
};
