import React, { useRef } from 'react'

function SearchPageCalendarInputContainer({labelFor, spanHeading, value, dispatch, type}) {
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
    <div className='searchPage-booking-input'>
      <label
        onClick={()=>{
          dateRef.current.showPicker()
        }}
        htmlFor={labelFor} className='searchPage-booking-inputBox'>
        <span className='dropdown'>{spanHeading}</span>
        <div>
          <input 
            min={currentDate}
            style={{position:'absolute', visibility:'hidden', left:'0', top:'0px'}}
            type="date" 
            ref={dateRef}
            onChange={handleInputChange}
          />
        <span>{value.day.substring(0,3)+", "}</span>
          <span>{value.date}</span>{" "}
          <span>{value.month}</span>{' '}
          <span>{value.year}</span>
        </div>
      </label>
    </div>
  )
}

export default SearchPageCalendarInputContainer
