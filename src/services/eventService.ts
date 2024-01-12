import request from "../libs/request";
import { EventItem } from "../types/common";

export type DateNumberRequest = {
  year?: number;
  month?: number;
  day?: number;
};

export const getDayEvents = async (params: DateNumberRequest) => {
  return request.get<EventItem[]>("/event", { params });
};

export type AddEventRequest = Omit<
  EventItem,
  "id" | "createdAt" | "startedAt" | "categories"
> & { startedAt?: Date; categoryId?: string };

export const addEvent = (params: AddEventRequest) =>
  request.post("/event", params);
