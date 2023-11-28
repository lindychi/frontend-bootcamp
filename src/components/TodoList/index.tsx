import React, { ReactNode } from "react";
import TodoListItem from "../TodoListItem";

type Props = { icon: ReactNode; title?: string; list?: any[] };

export default function TodoList({ icon, title, list }: Props) {
  return (
    <div className="bg-blue-100 rounded-xl p-10">
      <div className="flex gap-1 items-center text-2xl text-blue-800">
        {icon}
        {title}
      </div>

      <div className="flex flex-col gap-1">
        {list?.map((item) => (
          <TodoListItem {...item} />
        ))}
      </div>
    </div>
  );
}
