import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { supabase } from "../libs/supabase";
import CalendarSection from "../components/CalendarSection";
import Header from "../components/Header";
import { getCalendarDates } from "../libs/calendar";

type Props = {};

export default function Calendar({}: Props) {
  const navigate = useNavigate();

  const checkLogin = async () => {
    const { data } = await supabase.auth.getUser();
    if (!data) {
      navigate("/Login");
    }
  };
  useEffect(() => {
    checkLogin();
  }, []);

  const [selectedMonth, setSelectedMonth] = useState<number>(1);
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleEventAdded = () => {};

  const [selectedView, setselectedView] = useState("month");
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const handleSaveEvent = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setselectedView(e.target.value);
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

  const handleGoogleLogin = async () => {
    let { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <div className="flex flex-col items-center">
      Calendar
      <button
        onClick={async () => {
          await supabase.auth.signOut();
          navigate("/Login");
        }}
      >
        로그아웃
      </button>
      <div className="flex flex-row h-screen">
        <CalendarSection
          selectedMonth={selectedMonth}
          targetCalendarDates={targetCalendarDates}
          getDateClass={getDateClass}
        />

        <main>
          <header>
            <Header />
          </header>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
