import React, { useState } from "react";
import { Date, Level, Priority, TodoItem } from "../consts/todoList";
import { TodoIcon } from "../App";

type Props = {
  onClickAdd: (todo: TodoItem) => void;
};

export default function TodoHeader({ onClickAdd }: Props) {
  const [value, setValue] = useState("");
  const [author, setAuthor] = useState(""); //외워야함댜
  const [dueDate, setDueDate] = useState("Mon");
  const [priority, setPriority] = useState("high");
  const [level, setLevel] = useState(1);

  return (
    <div className="w-[481px] h-fit bg-blue-100 rounded-lg p-6">
      제목{""}
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      작성자{""}
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      요일 {dueDate}
      <select onChange={(e) => setDueDate(e.target.value)} value={dueDate}>
        <option value="Mon">월</option>
        <option value="Tue">화</option>
        <option value="Wed">수</option>
        <option value="Thu">목</option>
        <option value="Fri">금</option>
        <option value="Sat">토</option>
        <option value="sun">일</option>
      </select>
      우선순위 {priority}
      <select onChange={(e) => setPriority(e.target.value)} value={priority}>
        <option value="high">높음</option>
        <option value="medium">중간</option>
        <option value="low">낮음</option>
      </select>
      난이도 {level}
      <select
        onChange={(e) => setLevel(Number(e.target.value))}
        // 스트링이므로 e타겟을 넘버로 바꿔준다.
        value={level}
      >
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
      </select>
      <div className="bg-white whitespace-break-spaces">
        {JSON.stringify({
          title: value,
          progress: "TODO",
          level: 1,
          priority: "high",
          dueDate: "Mon",
          author: author,
          // 같은거면:이후 생략가능 ex author
        })}
      </div>
      <button
        onClick={() => {
          onClickAdd({
            title: value,
            progress: "TODO",
            level: level as Level,
            priority: priority as Priority,
            dueDate: dueDate as Date,
            author: author,
          });
          // 같은거면:이후 생략가능 ex author

          setValue("");
          setAuthor("");
          // 빈칸으로 돌아가기
        }}
      >
        추가
      </button>
    </div>
  );
}
