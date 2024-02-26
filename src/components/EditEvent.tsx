import React, { useEffect, useState } from "react";
import { addEvent, AddEventRequest } from "../services/eventService";
import { EventItem } from "../types/common";
import { supabase } from "../libs/supabase";

type Props = {
  onClose: () => void;
  eventItem: EventItem;
};

const bbb = (date: Date): string => {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getUTCDate()).padStart(2, "0")}T${String(
    date.getUTCHours()
  ).padStart(2, "0")}:${String(date.getUTCMinutes()).padStart(2, "0")}`;
};

const EditEvent = ({ onClose, eventItem }: Props) => {
  console.log(eventItem);
  const [eventDate, setEventDate] = useState<EventItem>({
    id: eventItem.id,
    title: eventItem.title,
    startedAt: eventItem.startedAt,
    endedAt: eventItem.endedAt,
    // 다른 필요한 정보들을 초기값으로 설정
  } as EventItem);

  useEffect(() => {
    console.log("eventDate.startedAt:", eventDate.startedAt);
  }, [eventDate.startedAt]);

  const handleAddEvent = async () => {
    try {
      if (!eventDate.startedAt || !eventDate.endedAt) {
        // startedAt 또는 endedAt이 undefined일 경우에 대한 처리
        console.error("이벤트 시작 또는 종료 날짜가 유효하지 않습니다.");
        return;
      }

      await addEvent(eventDate);

      onClose();
    } catch (error) {
      console.error("이벤트 추가 오류:", error);
    }
  };
  const handleEditEvent = async () => {
    try {
      const { data, error } = await supabase
        .from("events")
        .update({
          title: eventDate.title,
          startedAt: eventDate.startedAt,
          endedAt: eventDate.endedAt,
        })
        .eq("id", eventDate?.id)
        .select();
      if (error) {
        throw error;
      }
      console.log("update data", data);
    } catch (e) {
      console.error(e);
    }
  };
  // try catch 비동기 async 여기 안에 비동기 함수가 있다라는 의미.비동기를 동기처럼 쓰겠다는 의미. 동기 sync 1,2,3,4,5 가 있다면 순서대로 처리.
  const handleDeletedEvent = async () => {
    // 삭제하는 로직 넣기
    try {
      const { data, error } = await supabase
        .from("events")
        .delete()
        .eq("id", eventDate?.id)
        .select();
      if (error) {
        throw error;
      }
      console.log("update data", data);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="modal">
      <input
        type="text"
        placeholder="이벤트 제목"
        value={eventDate.title}
        onChange={(e) => setEventDate({ ...eventDate, title: e.target.value })}
      />
      <input
        type="datetime-local"
        placeholder="Start Date and Time"
        value={bbb(new Date(eventDate.startedAt!!))}
        onChange={(e) => {
          const userSelectedDate = new Date(e.target.value);
          const utcDate = new Date(
            Date.UTC(
              userSelectedDate.getUTCFullYear(),
              userSelectedDate.getUTCMonth(),
              userSelectedDate.getUTCDate(),
              userSelectedDate.getUTCHours() + 9,
              userSelectedDate.getUTCMinutes()
            )
          );

          setEventDate({
            ...eventDate,
            startedAt: utcDate,
          });
        }}
      />

      <input
        type="datetime-local"
        placeholder="End Date and Time"
        value={bbb(new Date(eventDate.endedAt!!))}
        onChange={(e) => {
          const userSelectedDate = new Date(e.target.value);
          const utcDate = new Date(
            Date.UTC(
              userSelectedDate.getUTCFullYear(),
              userSelectedDate.getUTCMonth(),
              userSelectedDate.getUTCDate(),
              userSelectedDate.getUTCHours(),
              userSelectedDate.getUTCMinutes()
            )
          );
          setEventDate({ ...eventDate, endedAt: utcDate });
        }}
      />

      <button
        onClick={handleEditEvent}
        className="p-2 hover:brightness-75 bg-blue-500 rounded"
      >
        Edit
      </button>
      <button
        onClick={handleDeletedEvent}
        className="p-2 hover:brightness-75 bg-red-500 rounded"
      >
        Del
      </button>
      <button onClick={onClose} className="p-2 hover:brightness-75">
        X
      </button>
    </div>
  );
};

export default EditEvent;
