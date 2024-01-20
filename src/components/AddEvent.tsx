import React, { useState } from "react";
import { addEvent, AddEventRequest } from "../services/eventService";

const EventModal = ({
  onClose,
  onEventAdded,
}: {
  onClose: () => void;
  onEventAdded: () => void;
}) => {
  const [eventDate, setEventDate] = useState<AddEventRequest>({
    title: "",
    startedAt: new Date(),
    endedAt: undefined,
    // 다른 필요한 정보들을 초기값으로 설정
  });

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
      {/* 모달에서 필요한 정보 입력 폼들 */}
      <input
        type="text"
        placeholder="이벤트 제목"
        value={eventDate.title}
        onChange={(e) => setEventDate({ ...eventDate, title: e.target.value })}
      />
      <input
        type="datetime-local"
        placeholder="Start Date and Time"
        value={
          eventDate.startedAt
            ? `${eventDate.startedAt.getUTCFullYear()}-${String(
                eventDate.startedAt.getUTCMonth() + 1
              ).padStart(2, "0")}-${String(
                eventDate.startedAt.getUTCDate()
              ).padStart(2, "0")}T${String(
                eventDate.startedAt.getUTCHours()
              ).padStart(2, "0")}:${String(
                eventDate.startedAt.getUTCMinutes()
              ).padStart(2, "0")}`
            : ""
        }
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

          setEventDate({
            ...eventDate,
            startedAt: utcDate,
          });
        }}
      />
      {/* <input
        type="time"
        placeholder="Start Time"
        value={
          eventDate.startedAt
            ? eventDate.startedAt.toISOString().slice(11, 16)
            : ""
        }
        onChange={(e) =>
          setEventDate({
            ...eventDate,
            startedAt: new Date(`2024-01-01T${e.target.value}:00.000Z`),
          })
        }
      /> */}
      <input
        type="datetime-local"
        placeholder="End Date and Time"
        value={
          eventDate.endedAt
            ? `${eventDate.endedAt.getFullYear()}-${String(
                eventDate.endedAt.getMonth() + 1
              ).padStart(2, "0")}-${String(
                eventDate.endedAt.getDate()
              ).padStart(2, "0")}T${String(
                eventDate.endedAt.getHours()
              ).padStart(2, "0")}:${String(
                eventDate.endedAt.getMinutes()
              ).padStart(2, "0")}`
            : ""
        }
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
      {/* <input
        type="time"
        placeholder="Start Time"
        value={
          eventDate.endedAt ? eventDate.endedAt.toISOString().slice(11, 16) : ""
        }
        onChange={(e) =>
          setEventDate({
            ...eventDate,
            startedAt: new Date(`2024-01-01T${e.target.value}:00.000Z`),
          })
        }
      /> */}
      {/* 추가 버튼 */}
      <button onClick={handleAddEvent} className="p-2 hover:brightness-75">
        Add
      </button>
      {/* 닫기 버튼 */}
      <button onClick={onClose} className="p-2 hover:brightness-75">
        X
      </button>
    </div>
  );
};

export default EventModal;
