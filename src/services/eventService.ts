import { ConflictEventItem, EventItem } from "../types/common";

import request from "../libs/request";
import { supabase } from "../libs/supabase";

export type DateNumberRequest = {
  year: number;
  month?: number;
  day?: number;
};

export const getDayEvents = async (params: DateNumberRequest) => {
  let startDate, endDate;

  if (params.year !== -1 && params.year !== undefined) {
    if (params.month === -1 || params.month === undefined) {
      // 해당 연도의 전체 범위 조회
      startDate = new Date(params.year, 0, 1);
      endDate = new Date(params.year + 1, 0, 1);
    } else if (params.day === -1 || params.day === undefined) {
      // 해당 월의 전체 범위 조회
      startDate = new Date(params.year, params.month - 1, 1);
      endDate = new Date(params.year, params.month, 1);
    } else {
      // 특정 일자 조회
      startDate = new Date(params.year, params.month - 1, params.day);
      // 다음 날짜로 설정하여 해당 일자의 23:59:59를 포함시킴
      endDate = new Date(params.year, params.month - 1, params.day + 1);
    }
  }

  if (startDate === undefined || endDate === undefined) {
    throw new Error(`Invalid date: ${JSON.stringify(params)}`);
  }

  // +9시간 적용
  startDate.setHours(startDate.getHours() + 9);
  endDate.setHours(endDate.getHours() + 9);

  const startDateString = startDate.toISOString();
  const endDateString = endDate.toISOString();

  // endedAt이 null인 이벤트 조회
  const { data: ongoingEvents, error: errorOngoing } = await supabase
    .from("events")
    .select(`*, categories (*)`)
    .or("endedAt.is.null");

  // endedAt을 체크하는 이벤트 조회
  const { data: endedEvents, error: errorEnded } = await supabase
    .from("events")
    .select(`*, categories (*)`)
    .or(`startedAt.lte.${endDateString},endedAt.gte.${startDateString}`)
    // 끝 날짜가 조회 시작 날짜보다 늦은 이벤트를 필터링
    .gte("endedAt", startDateString)
    // 시작 날짜가 조회 끝 날짜보다 이른 이벤트를 필터링
    .lte("startedAt", endDateString);

  if (errorOngoing || errorEnded) {
    throw new Error(errorOngoing?.message || errorEnded?.message);
  }

  // 두 결과 세트 병합
  const combinedEvents = [...ongoingEvents, ...endedEvents];

  // id를 기준으로 중복 제거
  const uniqueEvents = combinedEvents.reduce((acc, current) => {
    if (!acc.find((event: EventItem) => event.id === current.id)) {
      acc.push(current);
    }
    return acc;
  }, []);

  return uniqueEvents;
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
