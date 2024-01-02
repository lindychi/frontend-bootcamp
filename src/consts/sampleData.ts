import { Category, TodoItem } from "../types/common";

export const getMonthTodoList = (year: number, month: number) => {
  const todoList = todoDateList.filter((todo) => {
    const todoDate = new Date(todo.startedAt);
    return todoDate.getFullYear() === year && todoDate.getMonth() + 1 === month;
  });
  return todoList;
};

export const getDayTodoList = (year: number, month: number, day: number) => {
  const todoList = todoDateList.filter((todo) => {
    const todoDate = new Date(todo.startedAt);
    return (
      todoDate.getFullYear() === year &&
      todoDate.getMonth() + 1 === month &&
      todoDate.getDate() === day
    );
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
  {
    id: 3,
    name: "Robustique",
    color: "#2C5A41",
  },
  {
    id: 4,
    name: "부트캠프",
    color: "#2563eb",
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
    startedAt: new Date("2024-01-01T09:00:00"),
    endedAt: new Date("2024-01-01T10:30:00"),
    category: categoryList[0],
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
  {
    id: 20,
    title: "컴피 사장님 새해 인사",
    createdAt: "2024-01-02",
    startedAt: new Date("2024-01-02T10:16:00"),
    category: categoryList[2],
  },
  {
    id: 21,
    title: "김*원님 작업지지서 송달",
    createdAt: "2024-01-02",
    startedAt: new Date("2024-01-02T10:00:00"),
    endedAt: new Date("2024-01-02T10:30:00"),
    category: categoryList[2],
  },
  {
    id: 22,
    title: "안산 인터넷 해지",
    createdAt: "2024-01-02",
    startedAt: new Date("2024-01-02T10:20:00"),
    endedAt: new Date("2024-01-02T10:25:00"),
    category: categoryList[0],
  },
  {
    id: 23,
    title: "일력 시간 겹칠 시, 구분 출력 개선",
    createdAt: "2024-01-02",
    startedAt: new Date("2024-01-02T10:30:00"),
    endedAt: new Date("2024-01-02T11:31:00"),
    category: categoryList[3],
  },
  {
    id: 24,
    title: "점심 식사",
    createdAt: "2024-01-02",
    startedAt: new Date("2024-01-02T11:41:00"),
    endedAt: new Date("2024-01-02T12:06:00"),
    category: categoryList[0],
  },
  {
    id: 25,
    title: "일력 시간 겹칠 시, 구분 출력 개선",
    createdAt: "2024-01-02",
    startedAt: new Date("2024-01-02T12:06:00"),
    endedAt: new Date("2024-01-02T12:17:00"),
    category: categoryList[3],
  },
  {
    id: 26,
    title: "주력 추가, 일정 우측에 시간 출력",
    createdAt: "2024-01-02",
    startedAt: new Date("2024-01-02T12:46:00"),
    endedAt: new Date("2024-01-02T13:33:00"),
    category: categoryList[3],
  },
  {
    id: 27,
    title: "건축물 대장 확인",
    createdAt: "2024-01-02",
    startedAt: new Date("2024-01-02T13:36:00"),
    endedAt: new Date("2024-01-02T13:43:00"),
    category: categoryList[0],
  },
  {
    id: 28,
    title: "김*원님 작업지시서 작성",
    createdAt: "2024-01-02",
    startedAt: new Date("2024-01-02T14:15:00"),
    endedAt: new Date("2024-01-02T14:29:00"),
    category: categoryList[2],
  },
  {
    id: 29,
    title: "김*원님 작업지시서 전달, 손*서님 수선 문의 전달",
    createdAt: "2024-01-02",
    startedAt: new Date("2024-01-02T14:30:00"),
    endedAt: new Date("2024-01-02T15:01:00"),
    category: categoryList[2],
  },
  {
    id: 30,
    title: "달력 중복 출력 개선",
    createdAt: "2024-01-02",
    startedAt: new Date("2024-01-02T15:01:00"),
    endedAt: new Date("2024-01-02T15:48:00"),
    category: categoryList[3],
  },
];
