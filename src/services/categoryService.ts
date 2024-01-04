import request from "../libs/request";
import { Category } from "../types/common";

export const getCategories = async () => {
  return request.get<Category[]>("/category");
};
