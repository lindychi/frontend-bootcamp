import React, { useState } from "react";
import { Date, Level, Priority, TodoItem } from "../consts/todoList";

type Props = {
  onClickAdd: (todo: TodoItem) => void;
};

export default function Todoheader({ onClickAdd }: Props) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [dueDate, setDueDate] = useState("Mon");
  const [level, setlevel] = useState(1);
  // 레벨이 "level"으로 설정되어 있어서 string타입으로 되어 있어서 error가나왔음 1 | 2 | 3; 숫자로 바꿨음 , 대표값 하나만 넣으면 된다.
  const [priority, setPriority] = useState("Priority");

  const dueDateList = [
    { key: "Mon", value: "월요일" },
    { key: "Tue", value: "화요일" },
    { key: "Wed", value: "수요일" },
    { key: "Thu", value: "목요일" },
    { key: "Fri", value: "금요일" },
    { key: "Sat", value: "토요일" },
    { key: "Sun", value: "일요일" },
  ];
  const priorityList = [
    { key: "high", value: "높음" },
    { key: "medium", value: "중간" },
    { key: "low", value: "낮음" },
  ];
  const levelList = [
    { key: "1", value: "1" },
    { key: "2", value: "2" },
    { key: "3", value: "3" },
  ];

  return (
    <div>
      <div className="p-4 bg-blue-100 rounded gap-3">
        제목
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        작성자
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        요일 {dueDate}
        <select value={dueDate} onChange={(e) => setDueDate(e.target.value)}>
          {dueDateList.map((item) => (
            <option value={item.key}>{item.value}</option>
          ))}
        </select>
        우선순위
        <select onChange={(e) => setPriority(e.target.value)} value={priority}>
          {priorityList.map((item) => (
            <option value={item.key}>{item.value}</option>
          ))}
        </select>
        level
        <select
          onChange={(e) => setlevel(Number(e.target.value))}
          // setlevel(e.target.value)라고 되어있어서 에러가 나옴 Number를 넣어서 string을 숫자로 바꿔야함
          value={level}
        >
          {levelList.map((item) => (
            <option value={item.key}>{item.value}</option>
          ))}
        </select>
        <button
          onClick={() => {
            onClickAdd({
              title,
              progress: "TODO",
              level: level as Level,
              priority: priority as Priority,
              dueDate: dueDate as Date,
              author,
            });

            setTitle("");
            setAuthor("");
          }}
        >
          추가
        </button>
      </div>
    </div>
  );
}
