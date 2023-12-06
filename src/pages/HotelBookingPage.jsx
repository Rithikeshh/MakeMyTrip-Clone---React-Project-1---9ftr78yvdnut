import React from 'react'
import SearchNavbar from '../components/Navbar/SearchNavbar'

function HotelBookingPage() {
  return (
    <div>
      <SearchNavbar/>
      <div className='searchPage-header-container'>
        <h2 className='flightBookingPage-heading' style={{color:'#fff'}}>Review your booking</h2>
      </div>
      <div className='trainBookingPage-bookingDetails-container'>

      </div>
    </div>
  )
}

export default HotelBookingPage
