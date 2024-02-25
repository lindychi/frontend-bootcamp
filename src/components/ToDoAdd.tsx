import React, { useEffect, useState } from "react";
import { addEvent } from "../services/eventService";
import { EventItem } from "../types/common";
import { supabase } from "../libs/supabase";

type Todo = {
  title: string;
  startedAt: Date;
  endedAt: Date;
};

type ToDoAddProps = {
  todoData?: EventItem;
};

function toUTC(dateString: string) {
  const localDate = new Date(dateString);
  localDate.setHours(localDate.getHours() + 9);
  return localDate;
}

const ToDoAdd: React.FC<ToDoAddProps> = ({ todoData }) => {
  const [title, setTitle] = useState("");
  const [selectedStartedAt, setStartedAt] = useState("");
  const [selectEndedAt, setEndedAt] = useState("");

  const handleAddTodo = async () => {
    if (title && selectedStartedAt && selectEndedAt) {
      const newTodo = {
        title,
        startedAt: toUTC(selectedStartedAt),
        endedAt: toUTC(selectEndedAt),
      };

      try {
        await addEvent(newTodo);

        const existingTodos = JSON.parse(localStorage.getItem("todos") || "[]");
        const updatedTodos = [...existingTodos, newTodo];
        localStorage.setItem("todos", JSON.stringify(updatedTodos));

        setTitle("");
        setStartedAt("");
        setEndedAt("");
      } catch (error) {
        // API 호출 중 에러 발생 시 처리
        console.error("Todo 추가 중 에러 발생", error);
      }
    }
  };

  useEffect(() => {
    setTitle(todoData?.title ?? "");
    const startStr =
      typeof todoData?.startedAt === "string" ? todoData.startedAt : "";
    const endStr =
      typeof todoData?.endedAt === "string" ? todoData.endedAt : "";

    setStartedAt(startStr);
    setEndedAt(endStr);
  }, [todoData]);

  const handleEditEvent = async () => {
    try {
      const { data, error } = await supabase
        .from("events")
        .update({
          title,
          startedAt: toUTC(selectedStartedAt),
          endedAt: toUTC(selectEndedAt),
        })
        .eq("id", todoData?.id)
        .select();
      if (error) {
        throw error;
      }
      console.log("updated data", data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteEvent = async () => {
    try {
      const { data, error } = await supabase
        .from("events")
        .delete()
        .eq("id", todoData?.id)
        .select();
      if (error) {
        throw error;
      }
      console.log("deleted data", data);
    } catch (e) {}
  };

  return (
    <div className="flex flex-col">
      제목{""}
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      일정 시작{" "}
      <input
        type="datetime-local"
        value={selectedStartedAt}
        onChange={(event) => setStartedAt(event.target.value)}
      />
      일정 끝{" "}
      <input
        type="datetime-local"
        value={selectEndedAt}
        onChange={(event) => setEndedAt(event.target.value)}
      />
      <button
        className="bg-lime-300 text-white"
        onClick={todoData ? handleEditEvent : handleAddTodo}
      >
        {todoData ? "변경" : "추가"}
      </button>
      <button className="bg-lime-300 text-white" onClick={handleDeleteEvent}>
        삭제
      </button>
      {JSON.stringify(ToDoAdd)}
    </div>
  );
};

export default ToDoAdd;
