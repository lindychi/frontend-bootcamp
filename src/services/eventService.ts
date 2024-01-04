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

export type EventIdRequest = {
  eventId: string;
};

export const stopEvent = (params: EventIdRequest) =>
  request.post("/event/stop", params);

export const completeEvent = (params: EventIdRequest) =>
  request.post("/event/complete", params);
