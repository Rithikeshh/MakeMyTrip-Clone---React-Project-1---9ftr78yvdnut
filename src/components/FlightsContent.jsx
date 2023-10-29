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
            <div className='flight-inputBox searchFromCity'>
              <label htmlFor="fromCity">
                <span className='label-input margin-b-10'>From</span>
                <input 
                  className='flight-inputField lineHeight-36 font30 strongBold-text' 
                  type="text" 
                  id='fromCity'
                  value={"Delhi"}
                />
                <p 
                  className='makeRelative'
                  title={'DEL, Delhi Airport India'}
                >
                  <span title='' className='airPortName'>
                    {'DEL, Delhi Airport India'}
                  </span>
                </p>
              </label>
            </div>
            <span className='flightSwapCircle'>
              <span className='flightsSprite flightSwapIcon'></span>
            </span>
            <div className='flight-inputBox searchToCity'>
              <label htmlFor="toCity">
                <span className='label-input margin-b-10'>To</span>
                <input 
                  className='flight-inputField lineHeight-36 font30 strongBold-text' 
                  type="text" 
                  id='toCity'
                  value={"Mumbai"}
                />
                <p 
                  className='makeRelative'
                  title={'BOM, Chhatrapati Shivaji International Airport India'}
                >
                  <span title='' className='airPortName'>
                    {'BOM, Chhatrapati Shivaji International Airport India'}
                  </span>
                </p>
              </label>
            </div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div>

        </div>
      </div>
    </div>
  )
}

export default FlightsContent
