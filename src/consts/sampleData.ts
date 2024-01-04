import { Category, EventItem } from "../types/common";

export const getMonthTodoList = (year: number, month: number) => {
  const todoList = todoDateList.filter((todo) => {
    const todoDate = new Date(todo.startedAt);
    return todoDate.getFullYear() === year && todoDate.getMonth() + 1 === month;
  });
  return todoList;
};

export const getDayTodoList = (year: number, month: number, day: number) => {
  const todoList = todoDateList.filter((todo) => {
    const startDate = todo.startedAt;
    const endDate = todo.endedAt;
    return (
      (startDate.getFullYear() === year &&
        startDate.getMonth() + 1 === month &&
        startDate.getDate() === day) ||
      (endDate &&
        endDate.getFullYear() === year &&
        endDate.getMonth() + 1 === month &&
        endDate.getDate() === day)
    );
  });
  return todoList;
};

export const categoryList: Category[] = [
  {
    id: "1",
    title: "일상",
    color: "#E7C160",
  },
  {
    id: "2",
    title: "휴일",
    color: "#2C5A41",
  },
  {
    id: "3",
    title: "Robustique",
    color: "#2C5A41",
  },
  {
    id: "4",
    title: "부트캠프",
    color: "#2563eb",
  },
  {
    id: "5",
    title: "투스카이",
    color: "#7dd3fc",
  },
  {
    id: "6",
    title: "창부캠",
    color: "#f5a3c7",
  },
];

export const todoDateList: EventItem[] = [
  /* 2023년 12월부터 2024년 1월까지 샘플 데이터 만들어줘 */
  {
    id: "1",
    title: "2023년 12월 31일에 해야할 일",
    createdAt: "2023-12-31",
    startedAt: new Date("2023-12-31"),
    endedAt: new Date("2023-12-31"),
  },
  {
    id: "2",
    title: "2024년 1월 1일에 해야할 일",
    createdAt: "2024-01-01",
    startedAt: new Date("2024-01-01T09:00:00"),
    endedAt: new Date("2024-01-01T10:30:00"),
    categories: categoryList[0],
  },
  {
    id: "3",
    title: "2024년 1월 2일에 해야할 일",
    createdAt: "2024-01-02",
    startedAt: new Date("2024-01-02"),
    endedAt: new Date("2024-01-02"),
  },
  {
    id: "4",
    title: "2024년 1월 3일에 해야할 일",
    createdAt: "2024-01-03",
    startedAt: new Date("2024-01-03"),
    endedAt: new Date("2024-01-03"),
  },
  {
    id: "5",
    title: "2024년 1월 4일에 해야할 일",
    createdAt: "2024-01-04",
    startedAt: new Date("2024-01-04"),
    endedAt: new Date("2024-01-04"),
  },
  {
    id: "6",
    title: "2024년 1월 5일에 해야할 일",
    createdAt: "2024-01-05",
    startedAt: new Date("2024-01-05"),
    endedAt: new Date("2024-01-05"),
  },
  {
    id: "7",
    title: "2024년 1월 6일에 해야할 일",
    createdAt: "2024-01-06",
    startedAt: new Date("2024-01-06"),
    endedAt: new Date("2024-01-06"),
  },
  {
    id: "8",
    title: "2024년 1월 7일에 해야할 일",
    createdAt: "2024-01-07",
    startedAt: new Date("2024-01-07"),
    endedAt: new Date("2024-01-07"),
  },
  {
    id: "9",
    title: "2024년 1월 8일에 해야할 일",
    createdAt: "2024-01-08",
    startedAt: new Date("2024-01-08"),
    endedAt: new Date("2024-01-08"),
  },
  {
    id: "10",
    title: "2024년 1월 9일에 해야할 일",
    createdAt: "2024-01-09",
    startedAt: new Date("2024-01-09"),
    endedAt: new Date("2024-01-09"),
  },
  {
    id: "11",
    title: "2024년 1월 10일에 해야할 일",
    createdAt: "2024-01-10",
    startedAt: new Date("2024-01-10"),
    endedAt: new Date("2024-01-10"),
  },
  {
    id: "12",
    title: "2024년 1월 11일에 해야할 일",
    createdAt: "2024-01-11",
    startedAt: new Date("2024-01-11"),
    endedAt: new Date("2024-01-11"),
  },
  {
    id: "13",
    title: "2024년 1월 12일에 해야할 일",
    createdAt: "2024-01-12",
    startedAt: new Date("2024-01-12"),
    endedAt: new Date("2024-01-12"),
  },
  {
    id: "14",
    title: "2024년 1월 13일에 해야할 일",
    createdAt: "2024-01-13",
    startedAt: new Date("2024-01-13"),
    endedAt: new Date("2024-01-13"),
  },
  {
    id: "15",
    title: "포트럭 파티",
    createdAt: "2024-01-14",
    startedAt: new Date("2023-12-24T16:00:00"),
    endedAt: new Date("2023-12-24T19:00:00"),
  },
  {
    id: "16",
    title: "크리스마스 이브",
    createdAt: "2023-12-24",
    startedAt: new Date("2023-12-24T00:00:00"),
    endedAt: new Date("2023-12-24T23:59:59"),
    categories: categoryList[1],
  },
  {
    id: "17",
    title: "크리스마스",
    createdAt: "2023-12-25",
    startedAt: new Date("2023-12-25T00:00:00"),
    endedAt: new Date("2023-12-25T23:59:59"),
    categories: categoryList[1],
  },
  {
    id: "18",
    title: "입을 옷 준비하기",
    createdAt: "2023-12-24",
    startedAt: new Date("2023-12-24T09:00:00"),
    endedAt: new Date("2023-12-24T09:30:00"),
    categories: categoryList[0],
  },
  {
    id: "19",
    title: "늦지않게 나가기",
    createdAt: "2023-12-24",
    startedAt: new Date("2023-12-24T15:00:00"),
    endedAt: new Date("2023-12-2415:30:00"),
    categories: categoryList[0],
  },
  {
    id: "20",
    title: "컴피 사장님 새해 인사",
    createdAt: "2024-01-02",
    startedAt: new Date("2024-01-02T10:16:00"),
    categories: categoryList[2],
  },
  {
    id: "21",
    title: "김*원님 작업지지서 송달",
    createdAt: "2024-01-02",
    startedAt: new Date("2024-01-02T10:00:00"),
    endedAt: new Date("2024-01-02T10:30:00"),
    categories: categoryList[2],
  },
  {
    id: "22",
    title: "안산 인터넷 해지",
    createdAt: "2024-01-02",
    startedAt: new Date("2024-01-02T10:20:00"),
    endedAt: new Date("2024-01-02T10:25:00"),
    categories: categoryList[0],
  },
  {
    id: "23",
    title: "일력 시간 겹칠 시, 구분 출력 개선",
    createdAt: "2024-01-02",
    startedAt: new Date("2024-01-02T10:30:00"),
    endedAt: new Date("2024-01-02T11:31:00"),
    categories: categoryList[3],
  },
  {
    id: "24",
    title: "점심 식사",
    createdAt: "2024-01-02",
    startedAt: new Date("2024-01-02T11:41:00"),
    endedAt: new Date("2024-01-02T12:06:00"),
    categories: categoryList[0],
  },
  {
    id: "25",
    title: "일력 시간 겹칠 시, 구분 출력 개선",
    createdAt: "2024-01-02",
    startedAt: new Date("2024-01-02T12:06:00"),
    endedAt: new Date("2024-01-02T12:17:00"),
    categories: categoryList[3],
  },
  {
    id: "26",
    title: "주력 추가, 일정 우측에 시간 출력",
    createdAt: "2024-01-02",
    startedAt: new Date("2024-01-02T12:46:00"),
    endedAt: new Date("2024-01-02T13:33:00"),
    categories: categoryList[3],
  },
  {
    id: "27",
    title: "건축물 대장 확인",
    createdAt: "2024-01-02",
    startedAt: new Date("2024-01-02T13:36:00"),
    endedAt: new Date("2024-01-02T13:43:00"),
    categories: categoryList[0],
  },
  {
    id: "28",
    title: "김*원님 작업지시서 작성",
    createdAt: "2024-01-02",
    startedAt: new Date("2024-01-02T14:15:00"),
    endedAt: new Date("2024-01-02T14:29:00"),
    categories: categoryList[2],
  },
  {
    id: "29",
    title: "김*원님 작업지시서 전달, 손*서님 수선 문의 전달",
    createdAt: "2024-01-02",
    startedAt: new Date("2024-01-02T14:30:00"),
    endedAt: new Date("2024-01-02T15:01:00"),
    categories: categoryList[2],
  },
  {
    id: "30",
    title: "달력 중복 출력 개선",
    createdAt: "2024-01-02",
    startedAt: new Date("2024-01-02T15:01:00"),
    endedAt: new Date("2024-01-02T15:48:00"),
    categories: categoryList[3],
  },
  {
    id: "31",
    title: "에어컨 예약 시도 및 취소",
    createdAt: "2024-01-02",
    startedAt: new Date("2024-01-02T16:22:00"),
    endedAt: new Date("2024-01-02T16:27:00"),
    categories: categoryList[0],
  },
  {
    id: "32",
    title: "Bastion 호스트 제거 이미지 적용",
    createdAt: "2024-01-02",
    startedAt: new Date("2024-01-02T16:27:00"),
    endedAt: new Date("2024-01-02T18:51:00"),
    categories: categoryList[4],
  },
  {
    id: "33",
    title: "치맥 /w 홍*태님, 현*환님",
    createdAt: "2024-01-02",
    startedAt: new Date("2024-01-02T18:51:00"),
    endedAt: new Date("2024-01-02T19:51:00"),
    categories: categoryList[4],
  },
  {
    id: "34",
    title: "귀가",
    createdAt: "2024-01-02",
    startedAt: new Date("2024-01-02T19:51:00"),
    endedAt: new Date("2024-01-02T20:11:00"),
    categories: categoryList[0],
  },
  {
    id: "35",
    title: "마케팅 수강",
    createdAt: "2024-01-02",
    startedAt: new Date("2024-01-02T20:11:00"),
    endedAt: new Date("2024-01-03T01:30:00"),
    categories: categoryList[5],
  },
  {
    id: "36",
    title: "클래스 리뷰 #6",
    createdAt: "2024-01-02",
    startedAt: new Date("2024-01-02T20:11:00"),
    endedAt: new Date("2024-01-02T22:56:00"),
    categories: categoryList[5],
  },
  {
    id: "37",
    title: "출근",
    createdAt: "2024-01-03",
    startedAt: new Date("2024-01-03T08:55:00"),
    endedAt: new Date("2024-01-03T09:35:00"),
    categories: categoryList[0],
  },
  {
    id: "38",
    title: "수면",
    createdAt: "2024-01-03",
    startedAt: new Date("2024-01-03T01:30:00"),
    endedAt: new Date("2024-01-03T08:15:00"),
    categories: categoryList[0],
  },
  {
    id: "39",
    title: "샤워",
    createdAt: "2024-01-03",
    startedAt: new Date("2024-01-03T08:15:00"),
    endedAt: new Date("2024-01-03T08:35:00"),
    categories: categoryList[0],
  },
  {
    id: "40",
    title: "Query Editor short url, image 업데이트",
    createdAt: "2024-01-03",
    startedAt: new Date("2024-01-03T09:35:00"),
    endedAt: new Date("2024-01-03T11:00:00"),
    categories: categoryList[4],
  },
  {
    id: "41",
    title: "컴피 방문(손*서님 수선, 조*찬님 창갈이)",
    createdAt: "2024-01-03",
    startedAt: new Date("2024-01-03T12:00:00"),
    endedAt: new Date("2024-01-03T12:55:00"),
    categories: categoryList[2],
  },
  {
    id: "42",
    title: "점심 식사",
    createdAt: "2024-01-03",
    startedAt: new Date("2024-01-03T11:25:00"),
    endedAt: new Date("2024-01-03T11:55:00"),
    categories: categoryList[0],
  },
  {
    id: "43",
    title: "Daytona 2.4.10 배포 작업",
    createdAt: "2024-01-03",
    startedAt: new Date("2024-01-03T18:00:00"),
    endedAt: new Date("2024-01-03T18:30:00"),
    categories: categoryList[4],
  },
  {
    id: "44",
    title: "샌디 FO 국제화 작업",
    createdAt: "2024-01-03",
    startedAt: new Date("2024-01-03T13:00:00"),
    endedAt: new Date("2024-01-03T18:30:00"),
    categories: categoryList[4],
  },
  {
    id: "46",
    title: "Daytona 2.4.10 배포 준비",
    createdAt: "2024-01-03",
    startedAt: new Date("2024-01-03T17:10:00"),
    endedAt: new Date("2024-01-03T18:30:00"),
    categories: categoryList[4],
  },
];
