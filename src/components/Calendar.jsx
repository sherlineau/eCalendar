import React, { useState } from "react";
import CalendarHeader from "./CalendarHeader";
import DayEvents from "./DayEvents";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const getCalendar = (year, month) => {
  // get prev months first date and last day
  let prevMonthLastDay = new Date();
  if (month === 0) {
    prevMonthLastDay = new Date(year - 1, month - 1, 0);
  }
  prevMonthLastDay = new Date(year, month - 1, 0);

  // get this months first day and last day
  let firstDayMonth = new Date(year, month - 1, 1);
  let lastDayMonth = new Date(year, month, 0);

  // initialize arrays for sections of calendar
  const prevCalendarMonth = [];
  const currCalendarMonth = [];
  const nextCalendarMonth = [];

  // this loop adds the prevs months last days to my array based on the day the 1st of current month lands on.
  // ex -> firstDayMonth.getDay() returns 4 for thursday.. I need the previous months last days between sunday-wednesday
  let temp = prevMonthLastDay.getDate();
  for (let i = 0; i < firstDayMonth.getDay(); i++) {
    prevCalendarMonth.push(temp);
    temp--;
  }

  // above loop inserts the days in descending order -> needs to be sorted in ascending order
  prevCalendarMonth.sort();

  // increment and add each "day" to the current month
  for (let i = 1; i <= lastDayMonth.getDate(); i++) {
    let tempDate = new Date(year, month - 1, i);
    let temp = {
      date: tempDate,
      month: month,
      day: i,
      events: [],
    };
    // junk data for events
    if (i === 31) {
      temp = {
        date: tempDate,
        month: month,
        day: i,
        events: [
          {
            start: "10:00",
            end: "11:00",
            description: "Goat Yoga",
          },
          {
            start: "11:00",
            end: "11:30",
            description: "Hot Yoga",
          },
          {
            start: "11:30",
            end: "12:00",
            description: "Perpetual Yoga",
          },
        ],
      };
    }
    currCalendarMonth.push(temp);
  }

  // I want the calendar to display six weeks -> 6 weeks * 7 days = 42days
  // check if the length of currentCalendarMonth is not 42
  // only run code to add remaining days, since the next month starts with 1 i just need to increment from one depending on how many remaining days I need
  if (currCalendarMonth.length + prevCalendarMonth.length !== 42) {
    let remaining = 43 - (currCalendarMonth.length + prevCalendarMonth.length);
    for (let i = 1; i < remaining; i++) {
      nextCalendarMonth.push(i);
    }
  }
  return { prevCalendarMonth, currCalendarMonth, nextCalendarMonth };
};

// function to render calendar
const Calendar = () => {
  const date = new Date();
  const today = date;

  // get todays date, year, and month
  // variables to send to functions and other components
  const [day, setDay] = useState(date.getDate());
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth());
  const [calendar, setCalendar] = useState(getCalendar(year, month + 1));
  const heading = ["January","February","March","April","May","June","July","August","September","October","November","December"]

  const WeekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  const { prevCalendarMonth, currCalendarMonth, nextCalendarMonth } = calendar;

  // on click event functions
  const pastMonth = (e) => {
    let temp = month;
    let tempYear = year;
    if (temp === 0) {
      temp = 11;
      tempYear--;
    } else {
      temp--;
    }
    setMonth(temp);
    setYear(tempYear);
    setCalendar(getCalendar(tempYear, temp + 1));
  };

  const nextMonth = (e) => {
    let temp = month;
    let tempYear = year;
    if (temp === 11) {
      // increment to next year and set month to index 0 [january]
      temp = 0;
      tempYear++;
    } else {
      // get next month
      temp++;
    }
    setMonth(temp);
    setYear(tempYear);
    setCalendar(getCalendar(tempYear, temp + 1));
  };

  const handleClick = (day) => {
    setDay(day);
  };

  return (
    <div className="section">
      <div className="section-left">
        <CalendarHeader month={month} year={year} heading={heading} />
        <div className="content">
          <div className="calendar-buttons">
            <AiOutlineArrowLeft onClick={(e) => pastMonth()} className="btn" />
          </div>
          <div className="calendar">
            {WeekDays.map((w, i) => {
              return (
                <div className="weekday" key={i}>
                  {w.substring(0, 3).toUpperCase()}
                </div>
              );
            })}
            {prevCalendarMonth.map((day, index) => {
              return (
                <div className="square greyed-out" key={index}>
                  <span className="day-number">{day}</span>
                </div>
              );
            })}
            {currCalendarMonth.map((day, index) => {
              return (
                <div
                  key={index}
                  onClick={(e) => handleClick(day.day)}
                  className="square"
                >
                  <span
                    className={`day-number ${
                      day.date.getMonth() === today.getMonth() &&
                      day.date.getDate() === today.getDate()
                        ? "today"
                        : ""
                    }`}
                  >
                    {day.day}
                  </span>
                </div>
              );
            })}
            {nextCalendarMonth.map((day, index) => {
              return (
                <div className="square greyed-out" key={index}>
                  <span className="day-number">{day}</span>
                </div>
              );
            })}
          </div>
          <div className="calendar-buttons">
            <AiOutlineArrowRight onClick={(e) => nextMonth()} className="btn" />
          </div>
        </div>
      </div>
      <DayEvents
        month={month}
        day={day}
        currCalendarMonth={calendar.currCalendarMonth}
        heading={heading}
        WeekDays={WeekDays}
      />
    </div>
  );
};

export default Calendar;
