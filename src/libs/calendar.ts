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
