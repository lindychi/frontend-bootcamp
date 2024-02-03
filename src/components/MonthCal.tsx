import React, { useEffect, useState } from 'react';
import { getCalendarDates } from '../libs/calendar';
import clsx from 'clsx';
import { DateName, dayList } from '../consts/calendar';
import SevenDays from './SevenDays';
import { getDayEvents } from '../services/eventService';
import { EventItem } from '../types/common';

type Props = {};

export default function MonthCal({}: Props) {
  const [selectedMonth, setSelectedMonth] = React.useState(2);
  const [selectedYear, setSelectedYear] = React.useState(2024);
  const targetCalendarDates: Date[] = getCalendarDates(
    selectedYear,
    selectedMonth
  );

  const [events, setEvents] = useState<EventItem[]>([]);
  const today = new Date();

  const loadEvents = async () => {
    // 이벤트 상태 및 현재 날짜 가져오기
    const result = await getDayEvents({
      year: selectedYear,
      month: selectedMonth,
    });
    setEvents(result.data);
  };

  // 컴포넌트가 처음 로드될 때 이벤트를 가져오는 효과
  useEffect(() => {
    loadEvents();
  }, [selectedMonth, selectedYear]);

  return (
    <div>
      <div className="border-t">
        <SevenDays dayList={dayList} />
      </div>

      {/* 달력 그리드 */}
      <div className="mediumDates relative  w-100% h-[calc(100vh-(77px+44px))]  grid grid-cols-7">
        {/* 달력 날짜를 표시하는 부분 */}
        {targetCalendarDates.map((date: Date) => (
          <div
            key={date.getDate()} // 각 날짜에 대한 고유한 key
            className={clsx(
              // "bg-red-300",
              'inner-date',
              'p-2.5',
              'font-medium',
              'text-xs',
              'border',
              'solid',
              'rgba(157, 158, 159, 0.60)',
              {
                'text-gray-800': date.getMonth() === selectedMonth - 1,
                'text-gray-400': date.getMonth() !== selectedMonth - 1,
              }
            )}
          >
            {/* 현재 날짜를 강조하여 표시 */}
            <div
              className={clsx({
                'bg-blue-500 w-6 h-6 flex items-center justify-center rounded-full text-white':
                  date.getDate() === new Date().getDate() &&
                  date.getMonth() === new Date().getMonth(),
              })}
            >
              {date.getDate()}
            </div>

            {/* 이벤트 표시 */}
            <div className="monthEvent">
              {/* 현재 날짜에 해당하는 이벤트 필터링 */}
              {events
                .filter((event) => {
                  const eventDate = new Date(event.startedAt);
                  return (
                    eventDate.getDate() === date.getDate() &&
                    eventDate.getMonth() === date.getMonth() &&
                    eventDate.getFullYear() === date.getFullYear()
                  );
                })
                .slice(0, 3) // 최대 3개까지만 표시
                .map((event, index) => (
                  <div
                    key={event.id}
                    className="w-[80px] truncate"
                    style={{
                      backgroundColor:
                        event.categories?.color + '80' || 'initial',
                      borderRadius: '5px',
                      zIndex: '1',
                      width: '100%',
                      padding: '2px 0',
                      margin: '4px 0',
                      paddingLeft: '8px',
                    }}
                  >
                    {event.title}
                  </div>
                ))}

              {/* 남은 이벤트 갯수 확인 후 "+n more" 표시 */}
              {events.filter((event) => {
                const eventDate = new Date(event.startedAt);
                return (
                  eventDate.getDate() === date.getDate() &&
                  eventDate.getMonth() === date.getMonth() &&
                  eventDate.getFullYear() === date.getFullYear()
                );
              }).length > 3 && (
                <div
                  style={{
                    top: '20px', // 높이를 고정값으로 설정
                    fontWeight: 'bold',
                    padding: '10px 0',
                    whiteSpace: 'nowrap', // 줄바꿈 방지
                    textOverflow: 'ellipsis', // 넘칠 경우 말줄임표 표시
                  }}
                >
                  +
                  {events.filter((event) => {
                    const eventDate = new Date(event.startedAt);
                    return (
                      eventDate.getDate() === date.getDate() &&
                      eventDate.getMonth() === date.getMonth() &&
                      eventDate.getFullYear() === date.getFullYear()
                    );
                  }).length - 3}{' '}
                  more
                </div>
              )}
            </div>
          </div>
        ))}
        {/* 각 날짜에 대한 루프 끝 */}
      </div>
    </div>
  );
}
