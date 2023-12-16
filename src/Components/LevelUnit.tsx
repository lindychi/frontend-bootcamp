import React from "react";
import { TodoIcon } from "../App";
import clsx from "clsx";
import { TodoItem } from "../consts/todoList";

// type Props = {}
type Props = { level: number; currentLevel: number; priority: string };

export default function LevelUnit({ level, currentLevel, priority }: Props) {
  return (
    <div style={{ width: 24, height: 24 }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 55 55"
        fill="none"
        width="100%"
        height="100%"
      >
        <path
          d="M0.737061 14.2498H45.856C50.8397 14.2498 54.8797 18.2898 54.8797 23.2735V33.5864C54.8797 37.8582 51.4168 41.3211 47.1451 41.3211H27.8084C12.8573 41.3211 0.737061 29.2008 0.737061 14.2498Z"
          className={clsx([
            {
              "!fill-[#D9D9D9]": level < currentLevel,
              "fill-[#2D41A7]": priority === "low",
              "fill-[#ECB800]": priority === "medium",
              "fill-[#E42C5F]": priority === "high",
            },
          ])}
        />
      </svg>
    </div>
  );
}
