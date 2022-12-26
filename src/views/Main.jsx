import React, { useState } from 'react'
import Calendar from '../components/Calendar'
import DayEvents from '../components/DayEvents'

const Main = () => {
  const [day, setDay] = useState("")

  
  return (
    <>
      <Calendar onClickProp={setDay} />
      <DayEvents day={day} />
    </>
  )
}

export default Main