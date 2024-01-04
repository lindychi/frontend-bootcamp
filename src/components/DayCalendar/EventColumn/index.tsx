import React from "react";
import clsx from "clsx";

import { ConflictEventItem } from "../../../types/common";

import { getTodoHeight, getTodoTop } from "../../../libs/calendar";
import { isBrightness, reduceBrightness } from "../../../libs/color";

import { completeEvent, stopEvent } from "../../../services/eventService";

import { FaCheckCircle, FaPauseCircle } from "react-icons/fa";

type Props = {
  event: ConflictEventItem;
  year: number;
  month: number;
  day: number;
};

export default function EventColumn({ event, year, month, day }: Props) {
  const [isHover, setIsHover] = React.useState(false);

  return (
    <div
      className="absolute p-[1px]"
      style={{
        top: getTodoTop(event, year, month, day),
        height: `${getTodoHeight(event, year, month, day)}px`,
        left:
          event.conflictLength === 0
            ? 0
            : `${(event.conflictIndex / (event.conflictLength + 1)) * 100}%`,
        width:
          event.conflictLength === 0
            ? "100%"
            : `${(1 / (event.conflictLength + 1)) * 100}%`,
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div
        key={event.id}
        className="brightness-125 px-1 text-sm rounded border h-full flex items-start"
        style={{
          backgroundColor: event.categories?.color,
          borderColor: isBrightness(event.categories?.color ?? "#000000")
            ? reduceBrightness(event.categories?.color ?? "#000000", 0.5) ??
              "black"
            : reduceBrightness(event.categories?.color ?? "#000000", 2) ??
              "white",
          color: isBrightness(event.categories?.color ?? "#000000")
            ? reduceBrightness(event.categories?.color ?? "#000000", 0.5) ??
              "black"
            : reduceBrightness(event.categories?.color ?? "#000000", 2) ??
              "white",
        }}
      >
        <div className="truncate w-[calc(100%-15px)]">{event.title}</div>
        <div>
          {event.startedAt.getHours().toString().padStart(2, "0")}:
          {event.startedAt.getMinutes().toString().padStart(2, "0")}
        </div>
      </div>

      <div
        className={clsx([
          "absolute transition-all right-2 bottom-2 flex items-center gap-1",
          { "opacity-0": !isHover },
        ])}
      >
        {!event?.endedAt && (
          <div
            className="cursor-pointer"
            onClick={() => {
              try {
                const result = stopEvent({ eventId: event.id });
              } catch (e) {
                console.log(e);
              }
            }}
          >
            <FaPauseCircle />
          </div>
        )}
        {!event?.endedAt && (
          <div
            className="cursor-pointer"
            onClick={() => {
              try {
                const result = completeEvent({ eventId: event.id });
              } catch (e) {
                console.log(e);
              }
            }}
          >
            <FaCheckCircle />
          </div>
        )}
      </div>
    </div>
  );
}