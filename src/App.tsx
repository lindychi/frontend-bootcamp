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
import DayView from "./components/DayView";

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

  const [events, setEvents] = useState<
    {
      date: string;
      name: string;
      time: string;
    }[]
  >([]);

  const [sortedEvents, setSortedEvents] = useState<
    {
      date: string;
      name: string;
      time: string;
    }[]
  >([]);

  useEffect(() => {
    const sortedByDate = [...events].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });

    const sortedByDateTime = [...sortedByDate].sort((a, b) => {
      const timeA = new Date(`1970-01-01T${a.time}`);
      const timeB = new Date(`1970-01-01T${b.time}`);
      return timeA.getTime() - timeB.getTime();
    });

    setSortedEvents(sortedByDateTime);
  }, [events]);

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

  const today = new Date();
  // 모달에 필요한 함수
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEventName("");
    setEventDate("");
    setEventTime("");
  };
  const handleSaveEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const [hours, minutes] = eventTime.split(":").map(Number);

    const newDate = new Date(eventDate);

    newDate.setHours(hours);
    newDate.setMinutes(minutes);

    const newEvent = {
      date: newDate.toISOString(),
      name: eventName,
      time: eventTime,
    };

    setEvents([...events, newEvent]);
    closeModal();
  };
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
        events={sortedEvents}
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
                ? `${getMonthString(selectedMonth)} ${selectedYear}`
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
            <div className="flex-row bg-primary text-white p-2 gap-1">
              <button onClick={openModal}>Add Event</button>
              {isModalOpen && (
                <div className="modal-background">
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
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                      />
                      <input
                        type="date"
                        placeholder="Date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                      />
                      <input
                        type="time"
                        placeholder="Time"
                        value={eventTime}
                        onChange={(e) => setEventTime(e.target.value)}
                      />
                      <button type="submit" className="save-button">
                        Save
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {currentView === View.Month ? (
          <BigCalendar
            dayList={dayList}
            targetCalendarDates={targetCalendarDates}
            getSecondDateClass={getSecondDateClass}
            events={events}
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
          <WeekView
            dayList={dayList}
            targetCalendarDates={targetCalendarDates}
            getSecondDateClass={getSecondDateClass}
            events={events}
          />
        )}
      </div>
      <div></div>
    </div>
  );
}

export default App;
