import React, { useState } from 'react'

const FormModal = (props ) => {
  const {onSubmitProp} = props

  const [ title, setTitle ] = useState("")
  const [ startDate, setStartDate ] = useState("")
  const [ endDate, setEndDate ] = useState("")
  const [ startTime, setStartTime ] = useState("")
  const [ endTime, setEndTime ] = useState("")
  const [ people, setPeople ] = useState("")
  const [ location, setLocation ] = useState("")
  const [ description, setDescription ] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitProp({title,startDate,endDate,startTime,endTime,people,location,description})

  }
  
  return (
    <div className='form-container'>
      <h1>Create Event/Appointment</h1>
      <form onSubmit={handleSubmit} className='form'>
        <label htmlFor="title">Title</label>
        <input type="text" value={title} onChange={e=> setTitle(e.target.value)} required/>

        <label htmlFor="startDate">Start Date</label>
        <input type="date"value={startDate} onChange={e=> setStartDate(e.target.value)} required/>

        <label htmlFor="endDate">End Date</label>
        <input type="date" value={endDate} onChange={e=> setEndDate(e.target.value)} required/>

        <label htmlFor="startTime">Begins</label>
        <input type="time" value={startTime} onChange={e=> setStartTime(e.target.value)}/>

        <label htmlFor="endTime">Ends</label>
        <input type="time" value={endTime} onChange={e=> setEndTime(e.target.value)}/>

        <label htmlFor="people">People</label>
        <input type="text" value={people} onChange={e=> setPeople(e.target.value)}/>

        <label htmlFor="location">Location</label>
        <input type="text" value={location} onChange={e=> setLocation(e.target.value)}/>

        <label htmlFor="description">Description</label>
        <input type="text" value={description} onChange={e=> setDescription(e.target.value)}/>

        <button className='full-width btn'>Add Event</button>
      </form>
    </div>
  )
}

export default FormModal