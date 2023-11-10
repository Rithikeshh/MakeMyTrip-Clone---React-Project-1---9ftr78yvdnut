import React from 'react'

function SearchPageLocationInputContainer({children, inputId, spanHeading, value, dispatch, type}) {
  return (
    <div className='searchPage-booking-input'>
        <label  htmlFor={inputId} className='searchPage-booking-inputBox'>
            <span>{spanHeading}</span>
            <input type="text" id={inputId} onChange={(e)=>{dispatch({type:type, payload: e.target.value})}} value={value}/> 
        </label>
        {children}
    </div>
  )
}

export default SearchPageLocationInputContainer
