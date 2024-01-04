import React from "react";

import { Todo } from "../../types/common";

import { FaPlayCircle } from "react-icons/fa";
import clsx from "clsx";
import { startTodo } from "../../services/todoService";

type Props = { todo: Todo; onSuccess?: () => void };

export default function ExecutableTodoItem({ todo, onSuccess }: Props) {
  const [isHover, setIsHover] = React.useState(false);

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
      <div className="flex items-center gap-1 w-[calc(100%)]">
        {todo.categories?.color && (
          <div
            className="min-w-2 min-h-2 w-2 h-2 rounded-full brightness-125"
            style={{ background: todo.categories.color }}
          ></div>
        )}
        <div className="truncate w-[calc(100%)]">{todo.title}</div>
      </div>
      <div
        className={clsx([
          "flex items-center transition-all",
          { "opacity-0": !isHover },
        ])}
      >
        {todo.progress === "planned" && (
          <div
            onClick={() => {
              try {
                startTodo({
                  todoId: todo.id,
                  categoryId: todo.categoryId,
                  title: todo.title,
                });
                onSuccess?.();
              } catch (e) {
                console.log(e);
              }
            }}
          >
            <FaPlayCircle />
          </div>
        )}
      </div>
    </div>
  );
}
