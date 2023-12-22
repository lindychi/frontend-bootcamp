import React, { useState, useEffect } from "react";
import clsx from "clsx";
import "./App.css";
import { dayList } from "./consts/calendar";
import { getCalendarDates, getMonthString } from "./libs/calendar";
import Arrow from "./icons/Arrow";
import Hamburger from "./icons/Hamburger";
import Search from "./icons/Search";
import Plus from "./icons/Plus";
import DropDown from "./components/Dropdown";
import CalendarSection from "./components/CalendarSection";
import BigCalendar from "./components/BigCalendar";
import YearDropDown from "./components/YearDropDown";
import "./Modal.css";

function App() {
  const [selectedMonth, setSelectedMonth] = useState<number>(12);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [targetCalendarDates, setTargetCalendarDates] = useState<Date[] | null>(
    null
  );

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
    const sorted = [...events].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });
    setSortedEvents(sorted);
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
    const newEvent = {
      date: eventDate,
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
    return "";
  };

  return (
    <div className="flex flex-row h-screen">
      <CalendarSection
        selectedMonth={selectedMonth}
        targetCalendarDates={targetCalendarDates}
        getDateClass={getDateClass}
        events={sortedEvents}
      />

      <div>
        <div className="w-[1600px] h-[90px] flex flex-row justify-between p-3 items-center border border-state-300 rounded-tr-lg">
          <div className="flex justify-start gap-5 ">
            <Hamburger />
            <div className="text-4xl">
              {getMonthString(selectedMonth)} {selectedYear}
            </div>
            {/* 드롭다운버튼 */}
            <DropDown
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
            />
            <YearDropDown
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
            />
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
                    <h2>Add Event</h2>
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

        <BigCalendar
          dayList={dayList}
          targetCalendarDates={targetCalendarDates}
          getSecondDateClass={getSecondDateClass}
          events={events}
        />
      </div>
      <div></div>
    </div>
  );
}

export default App;
