import React, { useState } from "react";
import { AddEventRequest, addEvent } from "../../services/eventService";
import { useQuery } from "react-query";
import { getCategoriesWithTodo } from "../../services/categoryService";
import { HttpStatusCode } from "axios";

type Props = { onClose?: () => void };

export default function AddEvent({ onClose }: Props) {
  const [event, setEvent] = useState<Partial<AddEventRequest>>({});

  const loadCategories = async () => {
    const result = await getCategoriesWithTodo();
    if (result.status === HttpStatusCode.Ok) {
      return result.data;
    }
  };

  const { data: categories } = useQuery(["categories"], loadCategories);

  const handleAddEvent = async () => {
    try {
      const reuslt = await addEvent({
        title: event.title as string,
        startedAt: event.startedAt as Date,
        endedAt: event.endedAt,
        categoryId: event.categoryId,
      });
      if (reuslt.status === HttpStatusCode.Ok) {
        setEvent({});
        onClose?.();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex">
        <label htmlFor="title" className="w-[75px]">
          제목:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          className="border-b"
          value={event.title}
          onChange={(e) => {
            setEvent({ ...event, title: e.target.value });
          }}
        />
      </div>
      <div className="flex">
        <label htmlFor="startedAt" className="w-[75px]">
          시작 시간:
        </label>
        <input
          type="datetime-local"
          id="startedAt"
          name="startedAt"
          required
          className="border-b"
          value={event.startedAt?.toISOString().split("Z")[0]}
          onChange={(e) => {
            const date = new Date(e.target.value);
            const newDate = new Date(
              date.getTime() - date.getTimezoneOffset() * 60 * 1000
            );
            setEvent({ ...event, startedAt: newDate });
          }}
        />
      </div>
      <div className="flex">
        <label htmlFor="endedAt" className="w-[75px]">
          종료 시간:
        </label>
        <input
          type="datetime-local"
          id="endedAt"
          name="endedAt"
          className="border-b"
          value={event.endedAt?.toISOString().split("Z")[0] ?? ""}
          onChange={(e) => {
            const date = new Date(e.target.value);
            const newDate = new Date(
              date.getTime() - date.getTimezoneOffset() * 60 * 1000
            );
            setEvent({ ...event, endedAt: newDate });
          }}
        />
      </div>
      <div className="flex">
        <label htmlFor="category">카테고리:</label>
        <select
          id="category"
          name="category"
          value={event.categoryId}
          onChange={(e) => {
            setEvent({ ...event, categoryId: e.target.value });
          }}
        >
          {categories?.map((category) => (
            <option value={category.id}>{category.title}</option>
          ))}
        </select>
      </div>
      <button
        className="bg-blue-500 text-white hover:brightness-75"
        onClick={handleAddEvent}
      >
        추가
      </button>
    </div>
  );
}
