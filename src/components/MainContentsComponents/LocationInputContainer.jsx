import React from 'react'

function LocationInputContainer({inputId, spanHeading, value, dispatch, type}) {
  return (
    <div>
        <label htmlFor={inputId} className='booking-inputBox'>
            <span>{spanHeading}</span>
            <input type="text" id={inputId} onChange={(e)=>{dispatch({type:type, payload: e.target.value})}} value={value}/>
            <span>{'India'}</span>
        </label>
    </div>
  )
}

export default LocationInputContainer
