import React, { useEffect, useState } from 'react'
import { airportAndCity } from '../../utils/airportNames';


function SearchPageLocationInputContainer({children, inputId, spanHeading, value, dispatch, type}) {
  const [showModal, setShowModal] = useState(false);
  useEffect(()=>{
    document.body.addEventListener('click', (e)=>{
      setShowModal(false)
    })
  },[])
  return (
    <div onClick={(e)=>{e.stopPropagation()}} className='searchPage-booking-input'>
        <label  htmlFor={inputId} className='searchPage-booking-inputBox'>
            <span>{spanHeading}</span>
            <input onClick={()=>{
              setShowModal(n=>!n)
            }} type="text" id={inputId} readOnly style={{caretColor:"transparent"}} value={value}/> 
        </label>
        {children}
        {showModal && <FlightsLocationModal spanHeading={spanHeading} dispatch={dispatch} type={type} setShowModal={setShowModal}/>}
    </div>
  )
}

export default SearchPageLocationInputContainer
function FlightsLocationModal({dispatch, type, setShowModal, spanHeading}){
  const airport = []
  for(const element in airportAndCity){
    airport.push(element)
  }
  
  return(
    <div className='flight-location-modal flight-search-location-modal'>
      <div>
        <img  src="https://upload.wikimedia.org/wikipedia/commons/c/ca/VisualEditor_-_Icon_-_Search.svg" alt="" />
        <input readOnly placeholder={spanHeading} type="text" />
      </div>
      <ul>
        {
          airport.map((city, index)=>{
            return(
              <li key={index} onClick={()=>{
                dispatch({type:type, payload: airportAndCity[city].city})
                setShowModal(false)
              }}>
                <div>
                <span>{city}</span>
                </div>
                <div>
                <span>{airportAndCity[city].city}</span>
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

