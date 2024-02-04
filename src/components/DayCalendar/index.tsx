import React from "react";
import TimeSlotLabel from "../TimeSlotLabel";
import DayColumn from "./DayColumn";
import { ConflictEventItem } from "../../types/common";

type Props = { year: number; month: number; day: number };

export default function DayCalendar({ year, month, day }: Props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [left, setLeft] = React.useState(0);
  const [top, setTop] = React.useState(0);
  const [event, setEvent] = React.useState<ConflictEventItem>();

  const handleClickEvent = (
    e: React.MouseEvent<HTMLDivElement>,
    data: ConflictEventItem
  ) => {
    const position = (e.target as any).getBoundingClientRect();
    console.log(position, data);
    setIsOpen(true);
    setLeft(position.left);
    setTop(position.top);
    setEvent(data);
  };

  return (
    <div className="flex flex-col w-full h-[calc(100vh-70px)]">
      <div className="flex w-full h-[calc(100%)] overflow-y-scroll">
        <TimeSlotLabel />

        <DayColumn
          year={year}
          month={month}
          day={day}
          onClickEvent={handleClickEvent}
        />
      </div>
      {isOpen && (
        <div className="fixed bg-red-300 z-50" style={{ left, top }}>
          {/* 제목: {event?.title} */}
          수정 팝업
        </div>
      )}
    </div>
  );
}
