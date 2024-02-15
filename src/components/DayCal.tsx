import React, { useEffect, useState } from 'react';
import { getDayEvents } from '../services/eventService';
import { EventItem } from '../types/common';
import AddEvent from './AddEvent';

type Props = {};

export default function DayCal({}: Props) {
  // 이벤트 목록과 현재 시간을 상태로 관리
  const [events, setEvents] = useState<EventItem[]>([]);
  const today = new Date();
  const currentHours = today.getHours();
  const currentMinutes = today.getMinutes();
  const currentTime = currentHours * 60 + currentMinutes; // 현재 시간을 분 단위로 계산

  // 서버에서 이벤트 데이터를 가져오는 함수
  const loadEvents = async () => {
    const result = await getDayEvents({
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate(),
    });
    setEvents(result.data);
  };

  // 컴포넌트가 마운트될 때 이벤트 데이터를 로드
  useEffect(() => {
    loadEvents();
  }, []);

  // 각 이벤트의 시작 위치를 분 단위로 계산
  const calculateTopPosition = (startedAt: Date) => {
    const startedTime = new Date(startedAt);
    const hours = startedTime.getHours();
    const minutes = startedTime.getMinutes();
    return hours * 60 + minutes;
  };
  const [isOpen, setIsOpen] = React.useState(false);
  const [left, setLeft] = React.useState(0);
  const [top, setTop] = React.useState(0);
  const [event, setEvent] = React.useState<EventItem>();

  const handleClickEvent = (
    e: React.MouseEvent<HTMLDivElement>,
    data: EventItem
  ) => {
    const positon = (e.target as any).getBoundingClientRect();
    console.log(positon, data);
    setIsOpen(true);
    setLeft(positon.left);
    setTop(positon.top);
    setEvent(data);
  };

  // 각 이벤트의 높이를 분 단위로 계산
  const calculateEventHeight = (startedAt: Date, endedAt: Date | undefined) => {
    if (!endedAt) {
      return 0; // 종료 시간이 없으면 높이 0
    }
    const startedTime = new Date(startedAt);
    const endedTime = new Date(endedAt);
    const duration = endedTime.getTime() - startedTime.getTime();
    const minutes = duration / (1000 * 60);
    return minutes; // 분 단위로 높이 계산
  };

  return (
    <div>
      <div className="todo relative">
        {/* 이벤트 목록을 표시 */}
        <div>
          {events.map((event) => (
            <div
              key={event.id}
              className="absolute truncate w-[80px]"
              style={{
                top: calculateTopPosition(event.startedAt),
                left: '64px',
                fontSize: '15px',
                backgroundColor: event.categories?.color || 'initial',
                borderRadius: '5px',
                height: `${calculateEventHeight(
                  event.startedAt,
                  event.endedAt
                )}px`,
                zIndex: '1', // z-index 설정-다른요소들보다 위에
                width: 'calc(100% - 68px)',
              }}
              onClick={(e) => handleClickEvent(e, event)}
            >
              {event.title}
            </div>
          ))}
        </div>
      </div>

      <div>
        {/* 24시간을 표시 */}
        {Array(24)
          .fill(0)
          .map((_, index) => (
            <div key={index}>
              <div className="dayCal-Container  relative flex w-full">
                <div className="timeBox w-[60px] border-r border-dashed "></div>
                {/* 각 시간대의 시간 표시 */}
                <div className="time absolute top-[50px] text-xs px-4">
                  {' '}
                  {index === 23
                    ? ''
                    : ('00' + ((index + 1) % 24)).slice(-2) + ':00'}
                </div>

                <div className="weekBox w-full h-[60px] p-5 border-b border-dashed text-start">
                  {/* 현재 시간에만 빨간색 실선을 표시 */}
                  {currentTime >= index * 60 &&
                  currentTime < (index + 1) * 60 ? (
                    <div
                      style={{
                        borderBottom: '2px solid #585858',
                        width: 'calc(100% - 60px)',
                        left: '60px',
                        position: 'absolute',
                        top: `${
                          ((currentHours - index) % 24) * 60 + currentMinutes
                        }px`,
                      }}
                    ></div>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
      </div>

      {isOpen && (
        <div className="absolute bg-green-300 z-20" style={{ left, top }}>
          {/* 제목 : {event?.title } */}
          <AddEvent event={event} />
        </div>
      )}
    </div>
  );
}
