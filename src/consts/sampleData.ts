import { Category, TodoItem } from "../types/common";

/* 12월 31일부터 1월 7일까지 하루에 여러 일정이 있어도 상관없으니 샘플 데이터를 추가해줘 */

export const getMonthTodoList = (year: number, month: number) => {
  const todoList = todoDateList.filter((todo) => {
    const todoDate = new Date(todo.startedAt);
    return todoDate.getFullYear() === year && todoDate.getMonth() + 1 === month;
  });
  return todoList;
};

export const categoryList: Category[] = [
  {
    id: 1,
    name: "일상",
    color: "#E7C160",
  },
  {
    id: 2,
    name: "휴일",
    color: "#2C5A41",
  },
];

export const todoDateList: TodoItem[] = [
  /* 2023년 12월부터 2024년 1월까지 샘플 데이터 만들어줘 */
  {
    id: 1,
    title: "2023년 12월 31일에 해야할 일",
    createdAt: "2023-12-31",
    startedAt: new Date("2023-12-31"),
    endedAt: new Date("2023-12-31"),
  },
  {
    id: 2,
    title: "2024년 1월 1일에 해야할 일",
    createdAt: "2024-01-01",
    startedAt: new Date("2024-01-01"),
    endedAt: new Date("2024-01-01"),
  },
  {
    id: 3,
    title: "2024년 1월 2일에 해야할 일",
    createdAt: "2024-01-02",
    startedAt: new Date("2024-01-02"),
    endedAt: new Date("2024-01-02"),
  },
  {
    id: 4,
    title: "2024년 1월 3일에 해야할 일",
    createdAt: "2024-01-03",
    startedAt: new Date("2024-01-03"),
    endedAt: new Date("2024-01-03"),
  },
  {
    id: 5,
    title: "2024년 1월 4일에 해야할 일",
    createdAt: "2024-01-04",
    startedAt: new Date("2024-01-04"),
    endedAt: new Date("2024-01-04"),
  },
  {
    id: 6,
    title: "2024년 1월 5일에 해야할 일",
    createdAt: "2024-01-05",
    startedAt: new Date("2024-01-05"),
    endedAt: new Date("2024-01-05"),
  },
  {
    id: 7,
    title: "2024년 1월 6일에 해야할 일",
    createdAt: "2024-01-06",
    startedAt: new Date("2024-01-06"),
    endedAt: new Date("2024-01-06"),
  },
  {
    id: 8,
    title: "2024년 1월 7일에 해야할 일",
    createdAt: "2024-01-07",
    startedAt: new Date("2024-01-07"),
    endedAt: new Date("2024-01-07"),
  },
  {
    id: 9,
    title: "2024년 1월 8일에 해야할 일",
    createdAt: "2024-01-08",
    startedAt: new Date("2024-01-08"),
    endedAt: new Date("2024-01-08"),
  },
  {
    id: 10,
    title: "2024년 1월 9일에 해야할 일",
    createdAt: "2024-01-09",
    startedAt: new Date("2024-01-09"),
    endedAt: new Date("2024-01-09"),
  },
  {
    id: 11,
    title: "2024년 1월 10일에 해야할 일",
    createdAt: "2024-01-10",
    startedAt: new Date("2024-01-10"),
    endedAt: new Date("2024-01-10"),
  },
  {
    id: 12,
    title: "2024년 1월 11일에 해야할 일",
    createdAt: "2024-01-11",
    startedAt: new Date("2024-01-11"),
    endedAt: new Date("2024-01-11"),
  },
  {
    id: 13,
    title: "2024년 1월 12일에 해야할 일",
    createdAt: "2024-01-12",
    startedAt: new Date("2024-01-12"),
    endedAt: new Date("2024-01-12"),
  },
  {
    id: 14,
    title: "2024년 1월 13일에 해야할 일",
    createdAt: "2024-01-13",
    startedAt: new Date("2024-01-13"),
    endedAt: new Date("2024-01-13"),
  },
  {
    id: 15,
    title: "포트럭 파티",
    createdAt: "2024-01-14",
    startedAt: new Date("2023-12-24T16:00:00"),
    endedAt: new Date("2023-12-24T19:00:00"),
  },
  {
    id: 16,
    title: "크리스마스 이브",
    createdAt: "2023-12-24",
    startedAt: new Date("2023-12-24T00:00:00"),
    endedAt: new Date("2023-12-24T23:59:59"),
    category: categoryList[1],
  },
  {
    id: 17,
    title: "크리스마스",
    createdAt: "2023-12-25",
    startedAt: new Date("2023-12-25T00:00:00"),
    endedAt: new Date("2023-12-25T23:59:59"),
    category: categoryList[1],
  },
  {
    id: 18,
    title: "입을 옷 준비하기",
    createdAt: "2023-12-24",
    startedAt: new Date("2023-12-24T09:00:00"),
    endedAt: new Date("2023-12-24T09:30:00"),
    category: categoryList[0],
  },
  {
    id: 19,
    title: "늦지않게 나가기",
    createdAt: "2023-12-24",
    startedAt: new Date("2023-12-24T15:00:00"),
    endedAt: new Date("2023-12-2415:30:00"),
    category: categoryList[0],
  },
];
