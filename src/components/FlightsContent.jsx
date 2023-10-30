import React, { useState } from 'react'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
const checkboxForTickets = [
    { id: 1, name: "One Way" },
    { id: 2, name: "Round Trip" },
    { id: 3, name: "Multi City" },
]
function FlightsContent() {

    const [value, setValue] = useState(1);
    const handleChange = (event) => {
      setValue(event.target.value);
    };
  return (
    <div>
      <div className='makeFlex make-align-center make-justify-space '>
        <div className='makeFlex gap-20 '>
            {checkboxForTickets.map((item,index)=>(
                <FormControlLabel className={`${value==item.id && ('flights-ticket-active')} p-r-8`} key={index}
                  control={
                    <Checkbox
                      checked={value==item.id}
                      value={item.id}
                      onChange={handleChange}
                      inputProps={{ 'aria-label': 'controlled' }}
                      defaultChecked
                      sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }}
                    />
                  }
                  label={item.name}
                />
            ))}
        </div>
        <div>
            <p>
                Book {" "}
                <Link to="/international-flights">International</Link>
                {" "}and{" "}
                <Link to="/flights">Domestic Flights</Link>
            </p>
        </div>
      </div>
      <div className='flight-booking-details-container'>
        <div className='flight-booking-details makeFlex make-align-center makeRelative'>
          <InputBoxForCity 
            mainDivClass='searchFromCity'
            inputId = 'fromCity'
            spanText = 'From'
            paraTitle = {'DEL, Delhi Airport India'}
            inputValue = {'Delhi'} 
          />
          <span className='flightSwapCircle'>
            <span className='flightsSprite flightSwapIcon'></span>
          </span>
          <InputBoxForCity 
            mainDivClass='searchToCity'
            inputId = 'toCity'
            spanText = 'To'
            paraTitle = {'BOM, Chhatrapati Shivaji International Airport India'}
            inputValue = {'Mumbai'}
          />
          <InputBoxForDate
            mainDivClass='dates'
            inputId = 'departure'            
            spanText = 'Departure'
            lastParaValue = 'Wednseday'
          />
          <InputBoxForDate
            mainDivClass='dates'
            inputId = 'return'            
            spanText = 'Return'
            lastParaValue = 'Friday'
          />
          <InputBoxForDate
            mainDivClass='flightTravellers'
            inputId = 'travellers'            
            spanText = 'Travellers & Class'
            lastParaValue = 'Business'
          />
        </div>
        <div>

        </div>
      </div>
    </div>
  )
}
function InputBoxForCity({
  mainDivClass,
  inputId, 
  spanText, 
  paraTitle, 
  inputValue
}){
  return(
    <div className={`flight-inputBox ${mainDivClass}`}>
      <label htmlFor={inputId}>
        <span className='label-input margin-b-10'>{spanText}</span>
        <input 
          className='flight-inputField lineHeight-36 font30 strongBold-text' 
          type="text" 
          id={inputId}
          value={inputValue}
        />
        <p 
          className='makeRelative'
          title={paraTitle}
        >
          <span title='' className='airPortName'>
            {paraTitle}
          </span>
        </p>
      </label>
    </div>
  )
}

function InputBoxForDate({
  mainDivClass,
  inputId,
  spanText,
  lastParaValue
}){
  return(
    <div className={`flight-inputBox ${mainDivClass}`}>
      <label htmlFor={inputId}>
        <span className='label-input margin-b-10'>{spanText}</span>
        <p className='lineHeight-36 font20'>
          {mainDivClass == 'dates' && 
          <><span className='font30 strongBold-text'>
            {"1"}{" "}
          </span>
          <span>{"Nov"}</span>
          <span className="shortYear">
            {"23"}
          </span></>}
          {mainDivClass == 'flightTravellers' && 
            <>
              <span>
                <span className='font30 strongBold-text'>{"4"}</span>
                {" Travellers"}
              </span>
            </>
          }
        </p>
        <p>{lastParaValue}</p>
      </label>
    </div>
  )
}

export default FlightsContent
