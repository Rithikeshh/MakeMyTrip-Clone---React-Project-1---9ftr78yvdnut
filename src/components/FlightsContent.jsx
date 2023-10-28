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
      <div className='booking-details-container'>
        <div>
            
        </div>
      </div>
    </div>
  )
}

export default FlightsContent
