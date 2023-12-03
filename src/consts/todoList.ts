export type Progress = "TODO" | "DONE";
export type Priority = "high" | "medium" | "low";
export type Date = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
export type Level = 1 | 2 | 3;

export interface TodoItem {
  id:number;
  progress: Progress;
  title: string;
  level: Level;
  priority: Priority;
  dueDate: Date;
  author: string;
}

export const todoData: TodoItem[] = [
  {
    id:1 ,
    progress: "DONE",
    title: "3주차 과제 노티하기",
    level: 2,
    priority: "medium",
    dueDate: "Tue",
    author: "한치",
  },
  { id:2,
    progress: "TODO",
    title: "3주차 과제",
    level: 3,
    priority: "high",
    dueDate: "Sat",
    author: "라라",
  },
  { id:3,
    progress: "TODO",
    title: "3주차 과제",
    level: 3,
    priority: "high",
    dueDate: "Sat",
    author: "루나",
  },
  { id: 4,
    progress: "TODO",
    title: "3주차 과제",
    level: 3,
    priority: "high",
    dueDate: "Sat",
    author: "김기혁",
  },
  { id: 5,
    progress: "DONE",
    title: "투두 데이터 준비",
    level: 1,
    priority: "high",
    dueDate: "Mon",
    author: "한치",
  },
  { id: 6,
    progress: "DONE",
    title: "샘플 사이트 작성",
    level: 3,
    priority: "high",
    dueDate: "Mon",
    author: "한치",
  },
  { id: 7,
    progress: "TODO",
    title: "강습생 별 브랜치 준비",
    level: 2,
    priority: "high",
    dueDate: "Mon",
    author: "한치",
  },
  { id: 8,
    progress: "TODO",
    title: "피그마 개발자 모드 가이드",
    level: 1,
    priority: "medium",
    dueDate: "Mon",
    author: "한치",
  },
  { id: 9,
    progress: "TODO",
    title: "VSCODE 새로고침 하는 법 가이드",
    level: 1,
    priority: "low",
    dueDate: "Sat",
    author: "한치",
  },
];
