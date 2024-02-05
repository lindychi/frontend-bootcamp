import React, { useEffect, useState } from "react";
import { addEvent, AddEventRequest } from "../services/eventService";
import { EventItem } from "../types/common";

type Props = {
  onClose: () => void;
  onEventAdded: () => void;
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

const EditEvent = ({ onClose, onEventAdded, eventItem }: Props) => {
  const [eventDate, setEventDate] = useState<AddEventRequest>({
    title: eventItem.title,
    startedAt: eventItem.startedAt,
    endedAt: eventItem.endedAt,
    // 다른 필요한 정보들을 초기값으로 설정
  });

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
      onEventAdded();
      onClose();
    } catch (error) {
      console.error("이벤트 추가 오류:", error);
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

      <button onClick={handleAddEvent} className="p-2 hover:brightness-75">
        Edit
      </button>

      <button onClick={onClose} className="p-2 hover:brightness-75">
        X
      </button>
    </div>
  );
};

export default EditEvent;
