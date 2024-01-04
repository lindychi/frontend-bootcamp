import React from "react";
import { HttpStatusCode } from "axios";

import { Category } from "../../types/common";

import { AddTodoRequest, addTodo } from "../../services/todoService";

type Props = {
  addTodoRequest: Partial<AddTodoRequest>;
  category: Category;
  onChange: (text: string) => void;
  onCancel: () => void;
};

export default function AddTodo({
  addTodoRequest,
  category,
  onChange,
  onCancel,
}: Props) {
  const handleAddTodo = async () => {
    const result = await addTodo(addTodoRequest as AddTodoRequest);
    if (result.status === HttpStatusCode.Ok) {
      onCancel();
    } else {
      alert("추가 실패");
    }
  };

  return (
    <div className="flex p-4 w-[320px] gap-2 items-center">
      <label htmlFor="title">할 일</label>
      <input
        type="text"
        id="title"
        name="title"
        required
        className="border-b"
        value={addTodoRequest.title || ""}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
      <button
        className="text-white hover:brightness-75 px-2 py-1"
        style={{ backgroundColor: category.color }}
        onClick={handleAddTodo}
      >
        추가
      </button>
    </div>
  );
}
