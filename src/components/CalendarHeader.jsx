import React from 'react'

const CalendarHeader = (props) => {
  const { month, year } = props
  const heading = ['January','February','March','April','May','June','July','August','September','October','November','December']
  return (
    <div>{heading[month]}
    {year}</div>
  )
}

export default CalendarHeader