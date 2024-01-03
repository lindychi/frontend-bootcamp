import request from "../libs/request";
import { TodoItem } from "../types/common";

export type DateNumberRequest = {
  year?: number;
  month?: number;
  day?: number;
};

export const getDayEvents = async (params: DateNumberRequest) => {
  return request.get<TodoItem[]>("/event", { params });
};
