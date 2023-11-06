import React, { useRef } from 'react'

function CalendarInputContainer({labelFor, spanHeading, value, dispatch, type}) {

    const dateRef = useRef()
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    day = day < 10 ? '0'+day : day;
    month = month < 10 ? '0'+month : month;
    let currentDate = `${year}-${month}-${day}`

    function handleInputChange(e){

      const value = e.target.value
      const valueArr = value.split('-')
      dispatch(
        {
          type: type, 
          payload: {
            date: +valueArr[2],
            month: +valueArr[1]-1,
            year: +valueArr[0],
            day: new Date(value).getDay()
          }
        }
      )
    }
  return (
    <div>
      <label
        onClick={()=>{
          dateRef.current.showPicker()
        }}
        htmlFor={labelFor} className='booking-inputBox'>
        <span className='dropdown'>{spanHeading}</span>
        <div className='font20 lineHeight-36'>
          <input 
            min={currentDate}
            style={{position:'absolute', visibility:'hidden', left:'0', top:'14px'}}
            type="date" 
            ref={dateRef}
            onChange={handleInputChange}
          />
          <span className='p-r-6 lineHeight-36 font30 strongBold-text'>{value.date}</span>
          <span>{value.month}</span>
          <span className='shortYear'>{value.year}</span>
        </div>
        <span>{value.day}</span>
      </label>
    </div>
  )
}

export default CalendarInputContainer
