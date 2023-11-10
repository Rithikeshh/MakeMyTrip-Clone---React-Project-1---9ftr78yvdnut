import React, { useEffect, useState } from 'react'
import SearchPageLocationInputContainer from '../SearchContentComponent/SearchPageLocationInputContainer'
import SearchPageCalendarInputContainer from '../SearchContentComponent/SearchPageCalendarInputContainer'
import { useHotelBookingDetailsContext } from '../../provider/HotelBookingDetailsProvider'
import { Link } from 'react-router-dom'
import getHotelList from '../../utils/getHotelList'
import { useHotelsListContext } from '../../provider/HotelsListProvider'

function SearchPageHeaderForHotel() {
    const {hotelBookingState, dispatchHotelBookingState} = useHotelBookingDetailsContext()
    const{setHotelList} = useHotelsListContext()
    const [active, setActive] = useState(0);

    useEffect(()=>{
        getHotelList(setHotelList ,hotelBookingState.city)
    },[])

  return (
    <>
    <div className='searchPage-header-container'>
        <div className='makeFlex'>
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
                <button onClick={()=>{
                    getHotelList(setHotelList ,hotelBookingState.city)
                }} className='primaryBtn widgetSearchBtn bold-text' to="/hotel/search">SEARCH</button>
            </p>
        </section>
      </div>
      
      <div className='hotels-filter-bar'>
            <ul>
                <li className='bold-text'>SORT BY:</li>
                <li className={`${active == 1 ? 'active' : ''} `}>
                    <span>Popular</span>
                </li>
                <li className={`${active == 2 ? 'active' : ''}`}>
                    <span>User Rating (Highest First)</span>
                </li>
                <li className={`${active == 3 ? 'active' : ''}`}>
                    <span>Price (Highest First)</span>
                </li>
                <li className={`${active == 4 ? 'active' : ''}`}>
                    <span>Price (Lowest First)</span>
                </li>
            </ul>
      </div>
      </div>
      </>
  )
}

export default SearchPageHeaderForHotel
