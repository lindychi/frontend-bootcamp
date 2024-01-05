import React from "react";
import { useMutation, useQueryClient } from "react-query";

import { Category } from "../../types/common";

import { AddTodoRequest, addTodo } from "../../services/todoService";

type Props = {
  addTodoRequest: Partial<AddTodoRequest>;
  category: Category;
  onChange: (text: string) => void;
  onSuccess: () => void;
};

export default function AddTodo({
  addTodoRequest,
  category,
  onChange,
  onSuccess,
}: Props) {
  const queryClient = useQueryClient();
  const {
    data,
    isLoading,
    mutate: mutateAddTodo,
  } = useMutation(addTodo, {
    onSuccess: () => {
      // addTodo 성공 후 쿼리 재실행
      onSuccess();
      queryClient.invalidateQueries(["categories"]);
    },
    onError: () => {
      alert("추가 실패");
    },
  });

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
        onClick={() => {
          mutateAddTodo(addTodoRequest as AddTodoRequest);
        }}
      >
        추가
      </button>
    </div>
  );
}
