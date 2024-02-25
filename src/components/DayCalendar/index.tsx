import React from "react";
import TimeSlotLabel from "../TimeSlotLabel";
import DayColumn from "./DayColumn";
import { ConflictEventItem } from "../../types/common";
import AddEvent from "../AddEvent";

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
    setLeft(position.left + 5);
    setTop(position.top + 5);
    setEvent({
      ...data,
      startedAt: new Date(data.startedAt.getTime() + 1000 * 60 * 60 * 9),
      endedAt: data.endedAt
        ? new Date(data.endedAt?.getTime() + 1000 * 60 * 60 * 9)
        : undefined,
    });
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
        <div
          className="fixed bg-white z-50 p-3 rounded shadow-md"
          style={{ left, top }}
        >
          <AddEvent originEvent={event} onClose={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  );
}
