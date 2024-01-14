import request from "../libs/request";
import { Todo } from "../types/common";

export type AddTodoRequest = {
  title: string;
  category: string;
};

export const addTodo = async (params: AddTodoRequest) => {
  return request.post<Todo>("/todo", params);
};

export type StartTodoRequest = {
  todoId: string;
  categoryId: string;
  title: string;
};

export const startTodo = async (params: StartTodoRequest) =>
  request.post("/todo/start", params);

export type CompleteTodoRequest = {
  todoId: string;
};

export const completeTodo = async (params: CompleteTodoRequest) => {
  return request.post("/todo/complete", params);
};
