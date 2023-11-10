import React, { useReducer, useRef, useState } from 'react'
import '../styles/GenericMainContent.css'
import TicketCheckboxContainer from '../components/MainContentsComponents/TicketCheckboxContainer';
// import hotelReducer,{hotalBookingDetails} from '../reducer/hotelReducer';
import { useHotelBookingDetailsContext } from '../provider/HotelBookingDetailsProvider';
import LocationInputContainer from '../components/MainContentsComponents/LocationInputContainer';
import CalendarInputContainer from '../components/MainContentsComponents/CalendarInputContainer';
import { Link } from 'react-router-dom';



// Most css written in genericMainContent.css
const checkboxForTickets = [
    { id: 1, name: "Upto 4 Rooms" },
    { id: 2, name: "Group Deal" },
]
const paraText = 'Fix this text to make responsive; Book Domestic and International Property Online. To list your property '
function HotelsContent() {

  const{hotelBookingState, dispatchHotelBookingState} = useHotelBookingDetailsContext()


  
  return (
    <div style={{paddingBottom:'11px'}}>
      <TicketCheckboxContainer 
        checkboxForTickets={checkboxForTickets}
        paraText={paraText}
      />
      <section className='hotel-booking-details-container booking-details-container'>

        <LocationInputContainer 
          inputId={'location'} 
          spanHeading={'City, Property Name Or Location'}
          value={hotelBookingState.city}
          dispatch={dispatchHotelBookingState}
          type={'hotelLocation'}
        />
        <CalendarInputContainer
          labelFor={'checkIn'}
          spanHeading={'Check-In'}
          value={hotelBookingState.checkIn}
          dispatch={dispatchHotelBookingState}
          type={'hotleCheckIn'}
        />
        <CalendarInputContainer
          labelFor={'checkOut'}
          spanHeading={'Check-Out'}
          value={hotelBookingState.checkOut}
          dispatch={dispatchHotelBookingState}
          type={'hotleCheckOut'}
        />
        <div key={3}>
          <label htmlFor='rooms' className='booking-inputBox'>
            <span className='dropdown'>Rooms & Guests</span>
            <div className='font20 lineHeight-36'>
              <span className='p-r-6 lineHeight-36 font30 strongBold-text'>{1}</span>
              <span>{'Room'}</span>
              <span className='p-r-6 p-l-6 lineHeight-36 font30 strongBold-text'>{2}</span>
              <span>{'Adults'}</span>
            </div>
          </label>
        </div>
        <div key={4}>
          <label htmlFor='price' className='booking-inputBox'>
            <span className='dropdown'>Price Per Night</span>
            <span style={{whiteSpace:"normal", color:'gray', fontWeight:'700'}}>₹0-₹1500, ₹1500-₹2500,...</span>
          </label>
        </div>
      </section>
      <section>
        <p style={{color:'#3f3f3f',paddingBottom:'11px'}}>Last Search: {" "}</p>
      </section>
      <section>
        <p className='makeFlex make-justify-center'>
            <Link className='primaryBtn widgetSearchBtn bold-text font24' to="/hotel/search">SEARCH</Link>
        </p>
      </section>
    </div>
  )
}

export default HotelsContent
