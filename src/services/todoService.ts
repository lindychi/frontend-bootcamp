import request from "../libs/request";
import { Todo } from "../types/common";

export type AddTodoRequest = {
  title: string;
  category: string;
};

export const addTodo = async (params: AddTodoRequest) => {
  return request.post<Todo>("/todo", params);
};
