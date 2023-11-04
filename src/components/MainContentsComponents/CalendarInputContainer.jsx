import React from 'react'

function CalendarInputContainer({labelFor, spanHeading, dispatch, state, type}) {
    // implementation remaining
  return (
    <div>
        <label htmlFor={labelFor} className='booking-inputBox'>
        <span className='dropdown'>{spanHeading}</span>
        <div className='font20 lineHeight-36'>
            <span className='p-r-6 lineHeight-36 font30 strongBold-text'>{state.checkIn.date}</span>
            <span>{state.checkIn.month}</span>
            <span className='shortYear'>{state.checkIn.year}</span>
        </div>
        <span>{state.checkIn.day}</span>
        </label>
    </div>
  )
}

export default CalendarInputContainer
