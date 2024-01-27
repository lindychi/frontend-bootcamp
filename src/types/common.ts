export type Category = {
  id: string;
  title: string;
  color: string;
};

export type EventItem = {
  id: string;
  title: string;
  createdAt: string;
  startedAt: Date;
  endedAt?: Date;
  categories?: Category;
  todoId?: string;
};

export type CalendarType = "year" | "month" | "week" | "day";