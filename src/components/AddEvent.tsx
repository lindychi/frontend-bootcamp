import React, { useEffect, useRef, useState } from 'react';
import { addEvent, AddEventRequest } from '../services/eventService';

export default function AddEvent() {
  const modalRef = useRef<HTMLDivElement>(null);

  const [eventData, setEventData] = useState<AddEventRequest>({
    title: '',
    startedAt: new Date(),
    endedAt: undefined,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]:
        name === 'endedAt' || name === 'startedAt' ? new Date(value) : value,
    }));
  };

  const handleAddEvent = async () => {
    try {
      await addEvent(eventData);
      // Additional logic for successful event addition if needed
    } catch (error) {
      console.error('이벤트 추가 오류:', error);
      // Additional logic for failed event addition if needed
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      // Optional: Add logic for handling clicks outside the modal if needed
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef]);

  return (
    <div
      className="AddEventBox px-[40px]"
      style={{
        position: 'absolute',
        top: '18px',
        right: 0,
        zIndex: 2,
        display: 'block',
      }}
    >
      <div className="modal w-auto h-auto rounded-lg border px-[4px] py-[8px] bg-white text-center drop-shadow-lg ">
        <div className="grid-rows-4 py-2 ">
          <div className="title text-ml text pb-[5px] px-[40px] text-left">
            일정
            <input
              type="text"
              name="title"
              value={eventData.title}
              onChange={handleInputChange}
              style={{
                border: '1px solid #D8D8D8',
                padding: '2px',
                marginLeft: '22px',
                borderRadius: '5px',
                width: 'calc(100% - 60px)',
              }}
            />
          </div>

          <div className="startedAt text-ml pb-[5px] px-[40px] text-left">
            시작일
            <input
              type="datetime-local"
              name="startedAt"
              value={
                eventData.startedAt
                  ? new Date(eventData.startedAt.getTime() + 9 * 60 * 60 * 1000)
                      ?.toISOString()
                      .slice(0, 16)
                  : ''
              }
              onChange={handleInputChange}
              style={{
                padding: '2px',
                marginLeft: '8px',
                borderRadius: '5px',
                width: 'calc(100% - 60px)',
              }}
            />
          </div>
          <div className="endedAt text-ml pb-[5px] px-[40px] text-left">
            종료일
            <input
              type="datetime-local"
              name="endedAt"
              value={
                eventData.endedAt
                  ? eventData.endedAt?.toISOString().slice(0, 8) + 9
                  : ''
              }
              onChange={handleInputChange}
              style={{
                padding: '2px',
                marginLeft: '8px',
                borderRadius: '5px',
                width: 'calc(100% - 60px)',
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
                marginLeft: '8px',
                borderRadius: '5px',
                width: 'calc(100% - 80px)',
              }}
            />
          </div>
          <div className="py-1 px-2">
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
