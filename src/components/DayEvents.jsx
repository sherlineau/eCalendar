import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import FormModal from "./FormModal";

const DayEvents = (props) => {
  const [showModal, setShowModal] = useState(false);

  const { month, day, currCalendarMonth, heading, WeekDays } = props;

  if (!currCalendarMonth) return null;
  const specificDate = currCalendarMonth.find((d) => d.day === day);

  let season = "";

  switch (month) {
    case 2: {
      season = "spring";
      break;
    }
    case 3: {
      season = "spring";
      break;
    }
    case 4: {
      season = "spring";
      break;
    }
    case 5: {
      season = "summer";
      break;
    }
    case 6: {
      season = "summer";
      break;
    }
    case 7: {
      season = "summer";
      break;
    }
    case 8: {
      season = "fall";
      break;
    }
    case 9: {
      season = "fall";
      break;
    }
    case 10: {
      season = "fall";
      break;
    }
    default:
      season = "winter";
  }

  const closeModal = (modal) => {
    console.log(modal);
    setShowModal(false);
  };

  return (
    <div className={`section-right ${season}`}>
      <div className="appointment-header">
        <div className="left">
          <h2>{WeekDays[specificDate.date.getDay()]}</h2>
          <h1>{`${heading[month]} ${day}`}</h1>
        </div>
        <div className="right">
          <AiOutlinePlus
            className="plus-icon"
            onClick={(e) => setShowModal(!showModal)}
          />
        </div>
      </div>
      <div className="events">
        <div className="line"></div>
        <div className="event-list">
          <table>
            {specificDate.events.length === 0 ? (
              <thead>
                <tr>
                  <th>No Appointments</th>
                </tr>
              </thead>
            ) : (
              specificDate.events.map((i, index) => {
                return (
                  <tr key={index}>
                    <td>{i.start}</td>
                    <td>{i.description}</td>
                  </tr>
                );
              })
            )}
          </table>
        </div>
      </div>
      <div className={`modal ${showModal ? "show-modal" : ""}`}>
        <FormModal onSubmitProp={closeModal} />
        <AiOutlineMinus
          onClick={(e) => setShowModal(!showModal)}
          className="minus-icon"
        />
      </div>
    </div>
  );
};

export default DayEvents;
