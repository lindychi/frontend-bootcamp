import React from "react";
import { useMutation, useQueryClient } from "react-query";
import clsx from "clsx";

import { Todo } from "../../types/common";

import { completeTodo, startTodo } from "../../services/todoService";

import { FaPlayCircle, FaCheckCircle } from "react-icons/fa";

type Props = { todo: Todo; onSuccess?: () => void };

export default function ExecutableTodoItem({ todo, onSuccess }: Props) {
  const [isHover, setIsHover] = React.useState(false);

  const queryClient = useQueryClient();
  const { mutate: startTodoMutate } = useMutation(startTodo, {
    onSuccess: () => {
      // startTodo 성공 후 쿼리 재실행
      onSuccess?.();
      queryClient.invalidateQueries(["events"]);
      queryClient.invalidateQueries(["categories"]);
    },
  });

  const { mutate: completeTodoMutate } = useMutation(completeTodo, {
    onSuccess: () => {
      // completeTodo 성공 후 쿼리 재실행
      onSuccess?.();
      queryClient.invalidateQueries(["events"]);
      queryClient.invalidateQueries(["categories"]);
    },
  });

  return (
    <div
      key={todo.id}
      className="flex justify-between bg-inherit hover:brightness-75 rounded-md px-1 transition-all cursor-pointer w-full items-center"
      style={{
        color: todo.categories?.color,
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="flex items-center gap-1 w-[calc(100%)] justify-between">
        {todo.categories?.color && (
          <div
            className="min-w-2 min-h-2 w-2 h-2 rounded-full brightness-125"
            style={{ background: todo.categories.color }}
          ></div>
        )}
        <div className="truncate w-[173px]">{todo.title}</div>
      </div>
      <div
        className={clsx([
          "flex items-center transition-all gap-1",
          { "opacity-0": !isHover },
        ])}
      >
        {todo.progress === "planned" && (
          <>
            <div
              onClick={() => {
                try {
                  startTodoMutate({
                    todoId: todo.id,
                    categoryId: todo.categoryId,
                    title: todo.title,
                  });
                } catch (e) {
                  console.log(e);
                }
              }}
            >
              <FaPlayCircle />
            </div>
            <div
              onClick={() => {
                try {
                  completeTodoMutate({ todoId: todo.id });
                } catch (e) {
                  console.log(e);
                }
              }}
            >
              <FaCheckCircle />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
