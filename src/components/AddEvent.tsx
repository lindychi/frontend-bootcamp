import React, { useState } from "react";
import { addEvent, AddEventRequest } from "../services/eventService";

const EventModal = ({
  onClose,
  onEventAdded,
}: {
  onClose: () => void;
  onEventAdded: () => void;
}) => {
  const [eventInfo, setEventInfo] = useState<AddEventRequest>({
    title: "",
    startedAt: new Date(),
    // 다른 필요한 정보들을 초기값으로 설정
  });

  const handleAddEvent = async () => {
    try {
      await addEvent(eventInfo);
      // 추가 후 필요한 작업 수행
      // 예: 이벤트 목록을 새로고침하거나 모달을 닫는 등
      onEventAdded();
      onClose();
    } catch (error) {
      // 오류 처리
      console.error("이벤트 추가 오류:", error);
    }
  };

  return (
    <div className="modal">
      {/* 모달에서 필요한 정보 입력 폼들 */}
      <input
        type="text"
        placeholder="이벤트 제목"
        value={eventInfo.title}
        onChange={(e) => setEventInfo({ ...eventInfo, title: e.target.value })}
      />
      <input
        type="date"
        placeholder="Date"
        value={
          eventInfo.startedAt
            ? eventInfo.startedAt.toISOString().split("T")[0]
            : ""
        }
        onChange={(e) =>
          setEventInfo({ ...eventInfo, startedAt: new Date(e.target.value) })
        }
      />
      {/* startedAt 는 string 형식이라 Date 형식에 할당할 수 없는 오류가 발생함 new Date 를 사용하여 문자열을 Date 객체로 변환하였음*/}
      <input
        type="date"
        placeholder="Date"
        value={
          eventInfo.endedAt ? eventInfo.endedAt.toISOString().split("T")[0] : ""
        }
        onChange={(e) =>
          setEventInfo({ ...eventInfo, endedAt: new Date(e.target.value) })
        }
      />
      {/* 추가 버튼 */}
      <button onClick={handleAddEvent} className="p-1 hover:brightness-75">
        Add
      </button>
      {/* 닫기 버튼 */}
      <button onClick={onClose} className="p-1 hover:brightness-75">
        X
      </button>
    </div>
  );
};

export default EventModal;
