import React, { useEffect, useRef, useState } from "react";
import { addEvent, AddEventRequest } from "../services/eventService";

type Props = { onClose: () => void }; // 모달 닫기를 위한 콜백 함수 전달

export default function AddEvent({ onClose }: Props) {
  // useRef를 사용하여 모달의 DOM 요소에 대한 참조 생성
  const modalRef = useRef<HTMLDivElement>(null);

   
  // 모달
  const [eventData, setEventData] = useState<AddEventRequest>({
    title: "",
    startedAt: new Date(), // 초기값 설정
    endedAt: undefined, // 초기값 비어있는 경우 undefined로 설정
    // categoryId: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name,value.slice(0, 8) )

    setEventData((prevData) => ({
      ...prevData,
      // 만약 입력값이 "endedAt"이라면 문자열을 Date 객체로 변환하여 저장
      [name]:
        name === "endedAt" || name === "startedAt" ? new Date(value.slice(0, 8)) : value,
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


   // 외부 클릭 처리 이벤트 핸들러
   const handleClickOutside = (e: MouseEvent) => {
    // 모달이 존재하고, 클릭된 요소가 모달의 외부에 있다면 모달을 닫음
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  // useEffect를 사용하여 컴포넌트가 마운트될 때 이벤트 리스너 추가
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);



  return (
    <div
      className="AddEventBox px-[40px]"
      style={{
        position: "absolute",
        top: "18px",
        right: 0,
        zIndex: 2,
      }}
    >
      <div className=" modal w-auto h-auto rounded-lg border px-[4px] py-[8px] bg-white text-center drop-shadow-lg ">
        
        
          
          <div className="grid-rows-4 py-2 ">
          <div className="title  text-ml text pb-[5px] px-[40px] text-left">
                일정
                <input
                  type="text"
                  name="title"
                  value={eventData.title}
                  onChange={handleInputChange}
                  style={{ 
                    border: '1px solid #D8D8D8', 
                    padding: '2px',
                    marginLeft: "22px",
                    borderRadius : "5px",
                    width : "calc(100% - 60px)",
                }}
                />      
        </div>
          
          <div className="startedAt text-ml pb-[5px] px-[40px] text-left">
            시작일 {eventData.startedAt?.toISOString()}
            <input
              type="datetime-local" // type을 'text'에서 'date'로 변경
              name="startedAt"
              value={
                eventData.startedAt
                  ? eventData.startedAt?.toISOString().slice(0,8)+9                  : ""
              } // 날짜 형식으로 변환
              onChange={handleInputChange}
              style={{ 
                padding: '2px',
                marginLeft: "8px",
                borderRadius : "5px",
                width : "calc(100% - 60px)",
            }}
            />
          </div>
          <div className="endedAt text-ml pb-[5px] px-[40px] text-left">
            종료일
            <input
              type="date" // type을 'text'에서 'date'로 변경
              name="endedAt"
              value={
                eventData.endedAt
                  ? eventData.endedAt?.toISOString().split("T")[0]
                  : ""
              } // 날짜 형식으로 변환
              onChange={handleInputChange}
              style={{ 
                padding: '2px',
                marginLeft: "8px",
                borderRadius : "5px",
                width : "calc(100% - 60px)",
                
            }}
            />
          </div>
          <div className="categoryId text-ml pb-[15px] px-[40px] text-left">
            카테고리
            <input
              type="text"
              name="categoryId"
              value={eventData.categoryId}
              onChange={handleInputChange}
              style={{ 
                padding: '2px',
                marginLeft: "8px",
                borderRadius : "5px",
                width : "calc(100% - 80px)",
            }}
              
            />
          </div>
          <div className="py-1 px-2 ">
            <button
              className="bg-blue-500 text-white rounded-lg hover:brightness-75 py-[5px] px-[40px] rounded-ml w-full"
              onClick={handleAddEvent}
            >
              추가
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
