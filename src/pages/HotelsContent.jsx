import React from 'react'
import '../styles/GenericMainContent.css'
import TicketCheckboxContainer from '../components/MainContentsComponents/TicketCheckboxContainer';


// Most css written in genericMainContent.css
const checkboxForTickets = [
    { id: 1, name: "Upto 4 Rooms" },
    { id: 2, name: "Group Deal" },
]
const paraText = 'Fix this text to make responsive; Book Domestic and International Property Online. To list your property '
function HotelsContent() {
  return (
    <div style={{paddingBottom:'11px'}}>
      <TicketCheckboxContainer 
        checkboxForTickets={checkboxForTickets}
        paraText={paraText}
      />
      <section className='hotel-booking-details-container booking-details-container'>
        <div key={0}>
           <label htmlFor='location' className='booking-inputBox'>
              <span>City, Property Name Or Location</span>
              <input type="text" id='location' value={'Goa'}/>
              <span>{'India'}</span>
           </label>
        </div>
        <div key={1}>
          <label htmlFor='checkIn' className='booking-inputBox'>
            <span className='dropdown'>Check-In</span>
            <div className='font20 lineHeight-36'>
              <span className='p-r-6 lineHeight-36 font30 strongBold-text'>1</span>
              <span>{'Nov'}</span>
              <span className='shortYear'>{23}</span>
            </div>
            <span>{'Sunday'}</span>
          </label>
        </div>
        <div key={2}>
          <label htmlFor='checkOut' className='booking-inputBox'>
            <span className='dropdown'>Check-Out</span>
            <div className='font20 lineHeight-36'>
              <span className='p-r-6 lineHeight-36 font30 strongBold-text'>{1}</span>
              <span>{'Nov'}</span>
              <span className='shortYear'>{23}</span>
            </div>
            <span>{'Sunday'}</span>
          </label>
        </div>
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
            <a className='primaryBtn widgetSearchBtn bold-text font24' href="">SEARCH</a>
        </p>
      </section>
    </div>
  )
}

export default HotelsContent
