import { getCalendarDates } from "./calendar";

describe("getCalendarDates", () => {
  it("should return correct dates for December 2023", () => {
    const decemberDates = getCalendarDates(2023, 12);
    expect(decemberDates[0]).toEqual(new Date(2023, 10, 26)); // 11월 26일
    expect(decemberDates[decemberDates.length - 1]).toEqual(
      new Date(2024, 0, 6)
    ); // 1월 6일
  });

  it("should return correct dates for November 2023", () => {
    const novemberDates = getCalendarDates(2023, 11);
    expect(novemberDates[0]).toEqual(new Date(2023, 9, 29)); // 10월 29일
    expect(novemberDates[novemberDates.length - 1]).toEqual(
      new Date(2023, 11, 2)
    ); // 12월 2일
  });
});
