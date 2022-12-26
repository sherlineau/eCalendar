import React, { useState } from "react";
import CalendarHeader from "./CalendarHeader";

// helper functions to get dates 
const getFirstDateOfMonth = (year, month) => {
  return new Date(year, month - 1, 1);
};

const getLastDateOfMonth = (year, month) => {
  return new Date(year, month, 0);
};

const getLastDateOfPrevMonth = (year, month) => {
  return new Date(year, month - 1, 0);
};

const getCalendar = (year, month) => {
  // get prev months first date and last day
  if (month === 0) {
    let prevMonthLastDay = getLastDateOfPrevMonth(year - 1, month);
  }
  let prevMonthLastDay = getLastDateOfPrevMonth(year, month);

  // get this months first day and last day
  let firstDayMonth = getFirstDateOfMonth(year, month);
  let lastDayMonth = getLastDateOfMonth(year, month);

  let temp = prevMonthLastDay.getDate();
  let currCalendarMonth = [];

  // this loop adds the prevs months last days to my array based on the day the 1st of current month lands on.
  // ex -> firstDayMonth.getDay() returns 4 for thursday.. I need the previous months last days between sunday-wednesday
  for (let i = 0; i < firstDayMonth.getDay(); i++) {
    currCalendarMonth.push(temp);
    temp--;
  }

  // above loop inserts the days in descending order -> needs to be sorted in ascending order
  currCalendarMonth.sort();

  // increment and add each "day" to the current month
  for (let i = 1; i <= lastDayMonth.getDate(); i++) {
    currCalendarMonth.push(i);
  }

  // I want the calendar to display six weeks -> 6 weeks * 7 days = 42days
  // check if the length of currentCalendarMonth is not 42
  // only run code to add remaining days, since the next month starts with 1 i just need to increment from one depending on how many remaining days I need
  if (currCalendarMonth !== 42) {
    let remaining = 43 - currCalendarMonth.length;
    for (let i = 1; i < remaining; i++) {
      currCalendarMonth.push(i);
    }
  }

  return currCalendarMonth;
};

// function to render calendar
const Calendar = ( props ) => {
  const { onClickProp } = props

  // get todays date, year, and month
  const date = new Date();

  const [year, setYear] = useState (date.getFullYear())
  const [month, setMonth] = useState(date.getMonth());
  const [currCalendar, setCalendar] = useState(
    getCalendar(year, month + 1)
  );

  // on click event functions
  const pastMonth = (e) => {
    let temp = month
    let tempYear = year
    if (temp === 0) {
      temp = 11
      tempYear--
    }
    else {
      temp--
    }
    setMonth(temp)
    setYear(tempYear)
    setCalendar(getCalendar(tempYear,temp + 1))
    // let temp = month;
    // temp--;
    // if (temp < 0) {
    //   setCalendar(getCalendar(year - 1, 11));
    //   setMonth(11)
    //   setYear(year - 1)
    // } else {
    //   setCalendar(getCalendar(year, temp));
    //   setMonth(temp)
    // }
  };

  const nextMonth = ( e ) => {
    let temp = month
    let tempYear = year
    if (temp === 11) {
      // get next year and month = 1
      temp = 0
      tempYear++
    }
    else {
      // get next month
      temp++
    }
    setMonth(temp)
    setYear(tempYear)
    setCalendar(getCalendar(tempYear,temp + 1))
    // let temp = month;
    // temp++;
    // if (temp > 12) {
    //   setCalendar(getCalendar(year + 1, 0));
    //   setMonth(1)
    //   setYear(year + 1)
    // } else {
    //   setCalendar(getCalendar(year, temp))
    //   setMonth(temp)
    // }
  }

  const handleClick = (month,day) => {
    const str = `${month} ${day}`
    onClickProp(str)
  }

  return (
    <div>
      <CalendarHeader month={month} year={year}/>
      <button onClick={(e) => pastMonth()}>-</button>
      <button onClick={(e) => nextMonth()}>+</button>
      {
      currCalendar.map((day, index) => {
        return <button onClick={e => handleClick(month,day)}>{day}</button>;
      })}
    </div>
  );
};

export default Calendar;
