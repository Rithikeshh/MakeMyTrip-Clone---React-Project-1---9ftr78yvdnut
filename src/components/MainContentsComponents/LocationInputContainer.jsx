import React from 'react'

function LocationInputContainer({children, inputId, spanHeading, value, dispatch, type, paddingLeft}) {
  return (
    <div>
        <label  htmlFor={inputId} className='booking-inputBox'>
            <span>{spanHeading}</span>
            <input type="text" id={inputId} onChange={(e)=>{dispatch({type:type, payload: e.target.value})}} value={value}/>
            <span>{'India'}</span>
        </label>
        {children}
    </div>
  )
}

export default LocationInputContainer
