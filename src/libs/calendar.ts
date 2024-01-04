import { dayList } from "../consts/calendar";

import { ConflictEventItem, EventItem } from "../types/common";

export function getCalendarDates(year: number, month: number): Date[] {
  const dates: Date[] = [];

  // 이번 달의 첫째 날과 마지막 날을 구합니다.
  const firstDayOfMonth = new Date(year, month - 1, 1);
  const lastDayOfMonth = new Date(year, month, 0);

  // 이전 달의 마지막 주 날짜를 추가합니다. (일요일 시작)
  let current = new Date(firstDayOfMonth);
  while (current.getDay() !== 0) {
    current = new Date(current.getTime() - 24 * 60 * 60 * 1000);
  }
  // 이전 달의 마지막 주 날짜를 dates 배열에 추가합니다.
  while (current < firstDayOfMonth) {
    dates.push(new Date(current));
    current = new Date(current.getTime() + 24 * 60 * 60 * 1000);
  }

  // 이번 달의 날짜를 추가합니다.
  for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
    dates.push(new Date(year, month - 1, day));
  }

  // 다음 달의 첫째 주 날짜를 추가합니다.
  current = new Date(year, month, 1);
  while (current.getDay() !== 0) {
    dates.push(new Date(current));
    current = new Date(current.getTime() + 24 * 60 * 60 * 1000);
  }

  return dates;
}

// 선택된 월에 따라 해당하는 월 이름을 반환하는 함수
export const getMonthString = (selectedMonth: number) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[selectedMonth - 1] || "";
};

export const getTodoTop = (
  todo: EventItem,
  year: number,
  month: number,
  day: number
) => {
  const dayStart = new Date(year, month, day, 0, 0, 0, 0).getTime();
  const startTime = todo.startedAt.getTime();

  if (startTime < dayStart) {
    return 0;
  } else {
    return todo.startedAt.getHours() * 60 + todo.startedAt.getMinutes();
  }
};

export const getTodoHeight = (
  todo: EventItem,
  year: number,
  month: number,
  day: number
) => {
  const dayStart = new Date(year, month, day, 0, 0, 0, 0).getTime();
  const dayEnd = new Date(year, month, day, 23, 59, 59, 999).getTime();

  const startTime = todo.startedAt.getTime();
  const endTime = todo.endedAt?.getTime() ?? new Date().getTime();

  const diff =
    (dayEnd < endTime ? dayEnd : endTime) -
    (dayStart > startTime ? dayStart : startTime);
  const height = diff / 1000 / 60;

  if (height < 30) {
    return 30;
  }

  return height;
};

export const getMinute = (minute: number) => {
  return minute * 60 * 1000;
};

export const getStartEndTime = (todo: EventItem) => {
  const todoStart = todo.startedAt.getTime();
  const minimumEndTime = todoStart + getMinute(30);
  const realEndTime = todo.endedAt?.getTime() ?? new Date().getTime();
  const todoEnd = realEndTime > minimumEndTime ? realEndTime : minimumEndTime;
  return [todoStart, todoEnd];
};

export const sortTime = (a: EventItem, b: EventItem) =>
  a.startedAt.getTime() > b.startedAt.getTime() ? 1 : -1;

export const compareConflict = <T extends EventItem>(
  todo: EventItem,
  todoList: T[]
): T[] => {
  const [todoStart, todoEnd] = getStartEndTime(todo);
  const conflictList = todoList.filter((currentTodo) => {
    if (currentTodo.id === todo.id) {
      return false;
    }

    const [currentStart, currentEnd] = getStartEndTime(currentTodo);
    return (
      (todoStart < currentEnd && todoEnd > currentStart) ||
      (todoEnd > currentStart && todoStart < currentEnd)
    );
  });

  return conflictList;
};

export const getConflictTodoList = (
  todoList: EventItem[]
): ConflictEventItem[] => {
  const conflictTodoList: ConflictEventItem[] = [];

  // 최초에 인덱스 지정을 위해서 비교하는 부분
  todoList.sort(sortTime).forEach((todo) => {
    const conflictList = compareConflict(todo, todoList);

    if (conflictList.length === 0) {
      conflictTodoList.push({
        ...todo,
        conflictLength: 0,
        conflictIndex: 0,
      });
      return;
    }

    const conflictIndexList = conflictList.map(
      (todo) =>
        conflictTodoList.find((conflictTodo) => conflictTodo.id === todo.id)
          ?.conflictIndex ?? -1
    );
    let currentConflictIndex = 0;

    for (let i = 0; i < conflictIndexList.length + 1; i++) {
      if (!conflictIndexList.includes(i)) {
        currentConflictIndex = i;
        break;
      }
    }

    conflictTodoList.push({
      ...todo,
      conflictLength: conflictList.length,
      conflictIndex: currentConflictIndex,
    });
  });

  // 계산된 인덱스에 따라서 재배열 하는 부분
  let lengthCalculatedList = conflictTodoList.map((todo) => {
    const conflictList = compareConflict(todo, conflictTodoList);

    const conflictIndexList = conflictList.map(
      (todo) =>
        conflictTodoList.find((conflictTodo) => conflictTodo.id === todo.id)
          ?.conflictIndex ?? -1
    );
    const uniqueList = Array.from(new Set(conflictIndexList));

    return { ...todo, conflictLength: uniqueList.length };
  });

  const maxLengthCalculatedList = lengthCalculatedList.map((todo) => {
    const conflictList = compareConflict(todo, lengthCalculatedList);

    if (
      todo.conflictLength <
      Math.max(
        todo.conflictLength,
        ...conflictList.map((todo) => todo.conflictLength)
      )
    ) {
      lengthCalculatedList = lengthCalculatedList.map((prevTodo) =>
        prevTodo.id === todo.id
          ? {
              ...prevTodo,
              conflictLength: Math.max(
                prevTodo.conflictLength,
                ...conflictList.map((todo) => todo.conflictLength)
              ),
            }
          : prevTodo
      );
    }

    return {
      ...todo,
      conflictLength: Math.max(
        todo.conflictLength,
        ...conflictList.map((todo) => todo.conflictLength)
      ),
    };
  });

  // 범위가 엮여있는 위치간에는 최대 길이를 적용하는 부분
  return maxLengthCalculatedList;
};

export function getWeekDates(year: number, month: number, day: number): Date[] {
  // JavaScript의 Date는 월이 0에서 시작하므로, 입력받은 month에서 1을 빼야 합니다.
  const inputDate = new Date(year, month, day);

  // 일요일을 주의 시작으로 설정합니다.
  // getDay()는 일요일을 0으로 반환합니다.
  const dayOfWeek = inputDate.getDay();

  // 주의 첫 날(일요일)을 찾습니다.
  const startOfWeek = new Date(inputDate);
  startOfWeek.setDate(inputDate.getDate() - dayOfWeek);

  // 주간 날짜를 저장할 배열
  const weekDates: Date[] = [];

  // 일요일부터 토요일까지의 날짜를 배열에 추가
  for (let i = 0; i < dayList.length; i++) {
    const dayDate = new Date(startOfWeek);
    dayDate.setDate(startOfWeek.getDate() + i);
    weekDates.push(dayDate);
  }

  return weekDates;
}
