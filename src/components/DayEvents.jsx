import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import FormModal from "./FormModal";

const DayEvents = (props) => {
  const [ showModal , setShowModal ] = useState(false)
  const { month, day, currCalendarMonth } = props;
  const heading = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];

  const WeekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  if (!currCalendarMonth) return null;
  const specificDate = currCalendarMonth.find((d) => d.day === day);

  let season = "";
  if (month === 2 || month === 3 || month === 4) {
    // from march to may
    season = "spring";
  }
  // from june to august
  else if (month === 5 || month === 6 || month === 7) {
    season = "summer";
  }
  // from sept to nov
  else if (month === 8 || month === 9 || month === 10) {
    season = "fall";
  } else {
    season = "winter";
  }

  const closeModal = ( modal ) => {
    console.log(modal);
    setShowModal(false)
  }

  return (
    <div className={`section-right ${season}`}>
      <div className="appointment-header">
        <p>{WeekDays[specificDate.date.getDay()]}</p>
        <h1>{`${heading[month]} ${day}`}</h1>
      </div>
      <div className="events">
        <div className="line"></div>
        <div className="event-list">
          <table>
            {specificDate.events.length === 0
              ?
              <thead>
                <tr>
                  <th>No Appointments</th>
                </tr>
              </thead>
              : specificDate.events.map((i, index) => {
                  return (
                    <tr key={index}>
                      <td>{i.start}</td>
                      <td>{i.description}</td>
                    </tr>
                  );
                })}
          </table>
        </div>
      </div>
      <div className="event-bottom">
        <AiOutlinePlus className="plus-icon" onClick={e=>setShowModal(!showModal)} />
        <div className={`modal ${showModal ? "show-modal":""}`}>
          <FormModal onSubmitProp={closeModal} />
          <AiOutlineMinus onClick={e=>setShowModal(!showModal)} className="plus-icon"/>
        </div>
      </div>
    </div>
  );
};

export default DayEvents;
