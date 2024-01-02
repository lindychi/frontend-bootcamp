import React from "react";

type Props = {};

export default function TimeSlotLabel({}: Props) {
  return (
    <div className="flex flex-col">
      {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
        <div key={hour} className="min-h-[60px] w-[70px] relative">
          {hour > 0 && (
            <div className="absolute -top-3.5 right-1">{`${
              hour >= 12 ? "오후" : "오전"
            } ${hour >= 12 ? hour - 12 : hour}시`}</div>
          )}
        </div>
      ))}
    </div>
  );
}
