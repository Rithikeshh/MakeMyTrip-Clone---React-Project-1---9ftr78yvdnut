 import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SearchNavbar from '../components/Navbar/SearchNavbar';
import SearchPageLocationInputContainer from '../components/SearchContentComponent/SearchPageLocationInputContainer';
import SearchPageCalendarInputContainer from '../components/SearchContentComponent/SearchPageCalendarInputContainer';
import { useHotelBookingDetailsContext } from '../provider/HotelBookingDetailsProvider';
import { useHotelsListContext } from '../provider/HotelsListProvider';
import getHotel from '../utils/getHotel';
 
 function SingleHotel() {
    const {hotelId} = useParams()
    const {hotelBookingState, dispatchHotelBookingState} = useHotelBookingDetailsContext()
    const navigate = useNavigate()
    const [hotel, sethotel] = useState(null)
    const [hotelName, setHotelName] = useState(null);
    console.log(hotelId);
    useEffect(()=>{
      getHotel(hotelId, sethotel, setHotelName)
    },[])
   return (
     <div>
       <SearchNavbar/>
       <div className='searchPage-header-container'>
       <div className='makeFlex'>
        <section className='searchPage-booking-details-container'>
            
            <div className='searchPage-booking-input'>
                <label  htmlFor='location' className='searchPage-booking-inputBox'>
                    <span>{'City, Area Or Property'}</span>
                    <input type="text" id={'location'} onChange={(e)=>setHotelName(e.target.value)} value={hotelName}/> 
                </label>
                
            </div>
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
                    dispatchHotelBookingState({type:'hotelLocation', payload: hotelName})
                    navigate('/hotel/search')
                }} className='primaryBtn widgetSearchBtn bold-text' to="/hotel/search">SEARCH</button>
            </p>
        </section>
      </div>
     </div>
     </div>
   )
 }
 
 export default SingleHotel
 