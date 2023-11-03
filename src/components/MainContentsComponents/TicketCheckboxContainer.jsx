import React from 'react'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import '../../styles/GenericMainContent.css'

function TicketCheckboxContainer({checkboxForTickets, paraText}) {
  return (
    <div className='checkbox-ticket-container'>
        <div className='makeFlex gap-20 '>
            {checkboxForTickets.map((item,index)=>(
                <FormControlLabel className={`${index == 0 && ('checkbox-ticket-active')} p-r-8`} key={index}
                  control={
                    <Checkbox
                      checked={index == 0}
                      defaultChecked
                      disabled = {index != 0}
                      sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }}
                    />
                  }
                  label={item.name}
                />
            ))}
        </div>
        <div>
            <p>
                {paraText}
            </p>
        </div>
      </div>
  )
}

export default TicketCheckboxContainer
