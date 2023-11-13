import React, { useRef } from 'react'
import SearchPageHeaderForHotel from '../components/Navbar/SearchPageHeaderForHotel'
import { useHotelsListContext } from '../provider/HotelsListProvider'
import { useHotelBookingDetailsContext } from '../provider/HotelBookingDetailsProvider'
import { useAuth } from '../provider/AuthProvider'
import { useLoginModalContext } from '../provider/LoginModalProvider'
import HotelCard from '../components/HotelCard'


function HotelSearch() {
    
  const{hotelList} = useHotelsListContext()
  const{hotelBookingState} = useHotelBookingDetailsContext()
  console.log(hotelList);
  const hotelCityRef = useRef(hotelBookingState.city)

  return (
    <div>
      {/* <div className='searchPage-header-container'>
        <section className='searchPage-booking-details-container'>
        <SearchPageLocationInputContainer
          inputId={'location'} 
          spanHeading={'City, Area Or Property'}
          value={hotelBookingState.city}
          dispatch={dispatchHotelBookingState}
          type={'hotelLocation'}
        />
        <SearchPageCalendarInputContainer
          labelFor={'checkIn'}
          spanHeading={'Check-In'}
          value={hotelBookingState.checkIn}
          dispatch={dispatchHotelBookingState}
          type={'hotleCheckIn'}
        />
        <SearchPageCalendarInputContainer
          labelFor={'checkOut'}
          spanHeading={'Check-Out'}
          value={hotelBookingState.checkOut}
          dispatch={dispatchHotelBookingState}
          type={'hotleCheckOut'}
        />
         <div className='searchPage-booking-input'>
          <label htmlFor='rooms' className='searchPage-booking-inputBox'>
            <span className='dropdown'>Rooms & Guests</span>
            <div >
              <span >{1}</span>{' '}
              <span>{'Room'}</span>{', '}
              <span>{2}</span>{' '}
              <span>{'Adults'}</span>
            </div>
          </label>
        </div>
        </section>
        <section>
        <p className='makeFlex make-justify-center'>
            <Link className='primaryBtn widgetSearchBtn bold-text' to="/hotel/search">SEARCH</Link>
        </p>
      </section>
      </div> */}
      <SearchPageHeaderForHotel hotelCityRef={hotelCityRef}/>
      <div className='hotelList-container'>
        {
          hotelList.length == 0 ? 
          <div style={{color:'white', textAlign:'center'}}>Oops No Hotel Found In This City!!</div> 
          :
          <ul className='hotel-card-container'>
            <li className='bold-text font24'>Showing Properties in {hotelCityRef.current}</li>
            {
              hotelList.map((item) => (
                <HotelCard key={item._id} hotel={item}/>
              ))
            }
          </ul>
        }
      </div>
      </div>
  )
}

export default HotelSearch
