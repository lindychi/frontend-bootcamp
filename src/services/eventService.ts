import { ConflictEventItem, EventItem } from "../types/common";

import request from "../libs/request";
import { supabase } from "../libs/supabase";

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

export type AddEventRequest = Omit<
  EventItem,
  "id" | "createdAt" | "startedAt" | "categories"
> & { startedAt?: Date; categoryId?: string };

export const addEvent = async (event: AddEventRequest) => {
  const { data, error } = await supabase
    .from("events")
    .insert([event])
    .single();
  if (error) throw new Error(error.message);
  return data;
};

export const editEvent = async (event: ConflictEventItem) => {
  const { categories, conflictIndex, conflictLength, ...editEventData } = event;

  const { data, error } = await supabase
    .from("events")
    .update(editEventData)
    .eq("id", editEventData.id)
    .single();
  if (error) throw new Error(error.message);
  return data;
};

export const deleteEvent = async (id: string) => {
  const { data, error } = await supabase
    .from("events")
    .delete()
    .eq("id", id)
    .single();
  if (error) throw new Error(error.message);
  return data;
};
