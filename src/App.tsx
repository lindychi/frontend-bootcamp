import React, { useState, useEffect } from "react";
import clsx from "clsx";
import "./App.css";
import { dayList } from "./consts/calendar";
import { getCalendarDates, getMonthString } from "./libs/calendar";
import Hamburger from "./icons/Hamburger";
import Search from "./icons/Search";
import Plus from "./icons/Plus";
import DropDown from "./components/Dropdown";
import CalendarSection from "./components/CalendarSection";
import BigCalendar from "./components/BigCalendar";
import "./Modal.css";
import YearView from "./components/YearView";
import WeekView from "./components/WeekView";
import WeeklyView from "./components/WeeklyView";
import DayView from "./components/DayView";
import MonthView from "./components/MonthView";
import EventModal from "./components/AddEvent";

enum View {
  Month = "month",
  Year = "year",
  Week = "week",
  Day = "Day",
}
function App() {
  const [selectedMonth, setSelectedMonth] = useState<number>(1);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [targetCalendarDates, setTargetCalendarDates] = useState<Date[] | null>(
    null
  );
  const [currentView, setCurrentView] = useState<View>(View.Month);

  const handleViewChange = (view: View) => {
    setCurrentView(view);
  };

  useEffect(() => {
    setTargetCalendarDates(null);
    const newDates: Date[] = getCalendarDates(selectedYear, selectedMonth);
    setTargetCalendarDates(newDates);
  }, [selectedMonth, selectedYear]);

  // const [events, setEvents] = useState<
  //   {
  //     date: string;
  //     name: string;
  //     time: string;
  //     endTime: string;
  //   }[]
  // >([]);

  // const [sortedEvents, setSortedEvents] = useState<
  //   {
  //     date: string;
  //     name: string;
  //     time: string;
  //     endTime: string;
  //   }[]
  // >([]);

  // useEffect(() => {
  //   const sortedByDate = [...events].sort((a, b) => {
  //     const dateA = new Date(a.date);
  //     const dateB = new Date(b.date);
  //     return dateA.getTime() - dateB.getTime();
  //   });

  //   const sortedByDateTime = [...sortedByDate].sort((a, b) => {
  //     const timeA = new Date(`1970-01-01T${a.time}`);
  //     const timeB = new Date(`1970-01-01T${b.time}`);
  //     return timeA.getTime() - timeB.getTime();
  //   });

  //   setSortedEvents(sortedByDateTime);
  // }, [events]);
  const today = new Date();
  const getDateClass = (date: Date): string => {
    if (date.getMonth() + 1 !== selectedMonth) {
      return "text-gray-400";
    }
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return "bg-primary rounded-full text-white";
    }
    if (date.getDay() === 6 || date.getDay() === 0) {
      return "text-red-500";
    }
    return "";
  };

  // // 모달에 필요한 함수
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [eventName, setEventName] = useState("");
  // const [eventDate, setEventDate] = useState("");
  // const [eventTime, setEventTime] = useState("");
  // const [eventEndTime, setEventEndTime] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    //   setEventName("");
    //   setEventDate("");
    //   setEventTime("");
  };
  const handleEventAdded = () => {
    // 이벤트가 추가된 후에 수행할 작업을 정의합니다.
    // 예: 이벤트 목록을 다시 불러오기
  };

  const [selectedView, setselectedView] = useState("month");
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const handleSaveEvent = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setselectedView(e.target.value);
  };

  // const [hours, minutes] = eventTime.split(":").map(Number);
  // const [endHours, endMinutes] = eventEndTime.split(":").map(Number);

  // const newDate = new Date(eventDate);
  // const startDate = new Date(
  //   newDate.getFullYear(),
  //   newDate.getMonth(),
  //   newDate.getDate(),
  //   hours,
  //   minutes
  // );

  // let endDate = new Date(
  //   newDate.getFullYear(),
  //   newDate.getMonth(),
  //   newDate.getDate(),
  //   endHours,
  //   endMinutes
  // );

  //   const newEvent = {
  //     date: startDate.toISOString(),
  //     name: eventName,
  //     time: eventTime,
  //     endTime: endDate.toISOString(),
  //   };

  //   setEvent([...event, newEvent]);
  //   closeModal();
  // };
  // 작은달력에 넣었던 효과가 큰달력에 적용되지 않아서 한번 더  추가함
  const getSecondDateClass = (date: Date): string => {
    if (date.getMonth() + 1 !== selectedMonth) {
      return "text-gray-400 bg-zinc-100";
    }
    if (date.getDay() === 6 || date.getDay() === 0) {
      return "text-red-500";
    }
    return "";
  };
  const getTodayDayOfWeek = (): string => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const today = new Date().getDay();
    return daysOfWeek[today];
  };
  return (
    <div className="flex flex-row h-screen">
      <CalendarSection
        selectedMonth={selectedMonth}
        targetCalendarDates={targetCalendarDates}
        getDateClass={getDateClass}
        // events={sortedEvents}
      />

      <div className="w-full h-full">
        <div className="w-full h-[90px] flex flex-row justify-between p-3 items-center border border-state-300 rounded-tr-lg">
          <div className="flex justify-start gap-5 ">
            <Hamburger />
            <div className="text-4xl">
              {currentView === View.Month
                ? `${getMonthString(selectedMonth)} ${selectedYear}`
                : currentView === View.Year
                ? `${selectedYear}`
                : currentView === View.Week
                ? `${getMonthString(selectedMonth)} ${selectedYear}`
                : currentView === View.Day
                ? `${getTodayDayOfWeek()} `
                : ""}
            </div>

            <DropDown
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
            />
            <div className="flex text-primary border border-primary rounded-md p-2 ">
              <select
                className={"text-primary"}
                value={currentView}
                onChange={(e) => handleViewChange(e.target.value as View)}
              >
                <option value={View.Day}>Day</option>
                <option value={View.Week}>Week</option>
                <option value={View.Month}>Month</option>
                <option value={View.Year}>Year</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3">
            <Search />
            {/* <div className="flex-row bg-primary text-white p-2 gap-1">
              <button
                onClick={openModal}
                className="flex flex-row items-center gap-1"
              >
                Add Event <Plus />
              </button>
              {isModalOpen && (
                <div className="modal-background z-10">
                  <div className="modal-content">
                    <span className="close" onClick={closeModal}>
                      &times;
                    </span>
                    <h2>
                      Add Event
                      <Plus />
                    </h2>
                    <form onSubmit={handleSaveEvent}>
                      <input
                        type="text"
                        placeholder="Event Name"
                        value={title}
                        onChange={(e) => setEventName(e.target.value)}
                      />
                      <input
                        type="date"
                        placeholder="Date"
                        value={startAt}
                        onChange={(e) => setEventDate(e.target.value)}
                      />
                      <input
                        type="time"
                        placeholder="Time"
                        value={eventTime}
                        onChange={(e) => setEventTime(e.target.value)}
                      />
                      <input
                        type="time"
                        placeholder="End Time"
                        value={eventEndTime}
                        onChange={(e) => setEventEndTime(e.target.value)}
                      />
                      <button type="submit" className="save-button">
                        Save
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div> */}
            {/* <button
              className="bg-blue-500 text-white hover:brightness-75"
              onClick={async () => {
                addEvent({
                  title: event.title as string,
                  startedAt: event.startedAt as Date,
                  endedAt: event.endedAt,
                  }as EventItem);
              }}
            >
              추가
            </button> */}
            <div>
              {/* 이벤트 추가 버튼 */}
              <button
                onClick={openModal}
                className="bg-blue-500 text-white hover:brightness-75 items-center p-2 flex flex-row gap-1"
              >
                Add Event <Plus />
              </button>

              {/* 모달 */}
              {isModalOpen && (
                <EventModal
                  onClose={closeModal}
                  onEventAdded={handleEventAdded}
                />
              )}

              {/* 이벤트 목록 등을 표시하는 부분 */}
            </div>
          </div>
        </div>

        {currentView === View.Month ? (
          // <BigCalendar
          //   targetCalendarDates={targetCalendarDates}
          //   getSecondDateClass={getSecondDateClass}
          //   events={events}
          // />
          <MonthView
            targetCalendarDates={targetCalendarDates}
            getSecondDateClass={getSecondDateClass}
          />
        ) : currentView === View.Year ? (
          <YearView
            year={selectedYear}
            getDateClass={getDateClass}
            dayList={dayList}
          />
        ) : currentView === View.Day ? (
          <DayView />
        ) : (
          <WeekView />
        )}
      </div>
      <div></div>
    </div>
  );
}

export default App;
