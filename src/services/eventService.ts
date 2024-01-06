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
