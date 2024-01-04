import request from "../libs/request";
import { Category, CategoryWithTodo } from "../types/common";

export const getCategories = async () => {
  return request.get<Category[]>("/category");
};

export const getCategoriesWithTodo = async () => {
  return request.get<CategoryWithTodo[]>("/category/withTodo");
};
