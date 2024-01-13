import React, { useState } from "react";
import { addEvent, AddEventRequest } from "../services/eventService";
import { getDayEvents } from "../services/eventService";

type Props = { onClose: () => void }; // 모달 닫기를 위한 콜백 함수 전달

export default function AddEvent({ onClose }: Props) {
  // 모달
  const [eventData, setEventData] = useState<AddEventRequest>({
    title: "",
    startedAt: new Date(), // 초기값 설정
    endedAt: undefined,
    categoryId: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      // 만약 입력값이 "endedAt"이라면 문자열을 Date 객체로 변환하여 저장
      [name]: name === "endedAt" ? new Date(value) : value,
    }));
  };

    const handleAddEvent = async () => {
      try {
        await addEvent(eventData);
        // 이벤트 추가가 성공했을 때 필요한 로직 추가
        onClose(); // 추가 후에 모달을 닫기 위해 onClose 함수 호출
      } catch (error) {
        console.error("이벤트 추가 오류:", error);
        // 이벤트 추가에 실패했을 때 필요한 로직 추가
      }
    };

    

 // 모달 열림 상태 관리
 const [isAddEventOpen, setIsAddEventOpen] = useState(true);

 // 모달 열기/닫기 토글하는 핸들러 함수
 const handleCloseAddEvent = () => {
   // 현재 상태의 반대값으로 설정하여 토글
   setIsAddEventOpen((prevIsOpen) => !prevIsOpen);
 };

  return (
    <div
      className="AddEventBox"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1000,
      }}
    >
      {isAddEventOpen && (
        <div className="modal w-[500px] h-[500px] rounded-2xl bg-red-200 text-center px-3 py-1">
          <div className="flex justify-end">
            <button
              className="close text-4xl rotate-45"
              onClick={handleCloseAddEvent}
            >
              +
            </button>
          </div>
          <div>
            <div className="title p-3">
              title
              <input
                type="text"
                name="title"
                value={eventData.title}
                onChange={handleInputChange}
              />
            </div>

            <div className="startedAt p-3">
              startedAt
              <input
                type="date" // type을 'text'에서 'date'로 변경
                name="startedAt"
                value={
                  eventData.startedAt
                    ? eventData.startedAt.toISOString().split("T")[0]
                    : ""
                } // 날짜 형식으로 변환
                onChange={handleInputChange}
              />
            </div>
            <div className="endedAt p-3">
              endedAt
              <input
                type="date" // type을 'text'에서 'date'로 변경
                name="endedAt"
                value={
                  eventData.endedAt
                    ? eventData.endedAt.toISOString().split("T")[0]
                    : ""
                } // 날짜 형식으로 변환
                onChange={handleInputChange}
              />
            </div>
            <div className="categoryId p-3">
              categoryId
              <input
                type="text"
                name="categoryId"
                value={eventData.categoryId}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <button
                className="bg-blue-500 text-white hover:brightness-75"
                onClick={handleAddEvent}
              >
                추가
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
