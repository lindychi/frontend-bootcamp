import React, { useState } from "react";
import Hamburger from "../icons/Hamburger";
import DropDown from "./Dropdown";
import Search from "../icons/Search";
import Plus from "../icons/Plus";
import EventModal from "./AddEvent";
import { getMonthString } from "../libs/calendar";
import { useNavigate } from "react-router-dom";

enum View {
  Month = "month",
  Year = "year",
  Week = "week",
  Day = "Day",
}

type HeaderProps = {};

const Header: React.FC<HeaderProps> = ({}) => {
  const [currentView, setCurrentView] = useState<View>(View.Month);
  const [selectedMonth, setSelectedMonth] = useState<number>(2);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEventAdded = () => {
    // 이벤트가 추가된 후에 수행할 작업을 정의합니다.
    // 예: 이벤트 목록을 다시 불러오기
  };

  return (
    <div>
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
              onChange={(e) => navigate("" + e.target.value)}
            >
              <option value={"Day"}>Day</option>
              <option value={"Week"}>Week</option>
              <option value={"Month"}>Month</option>
              <option value={"Year"}>Year</option>
            </select>
          </div>
        </div>
        <div className="flex gap-3">
          <Search />

          <div>
            <button
              onClick={openModal}
              className="bg-blue-500 text-white hover:brightness-75 items-center p-2 flex flex-row gap-1"
            >
              Add Event <Plus />
            </button>

            {isModalOpen && (
              <EventModal
                onClose={closeModal}
                onEventAdded={handleEventAdded}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
