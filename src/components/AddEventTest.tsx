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
        type="date"
        placeholder="Start Date"
        value={
          eventDate.startedAt
            ? eventDate.startedAt.toISOString().split("T")[0]
            : ""
        }
        onChange={(e) =>
          setEventDate({ ...eventDate, startedAt: new Date(e.target.value) })
        }
      />
      <input
        type="date"
        placeholder="End Date"
        value={
          eventDate.endedAt ? eventDate.endedAt.toISOString().split("T")[0] : ""
        }
        onChange={(e) =>
          setEventDate({ ...eventDate, endedAt: new Date(e.target.value) })
        }
      />

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
