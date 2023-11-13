 import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
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
    const [loading, setLoading] = useState(true);
    const [hotelName, setHotelName] = useState('');
    console.log(hotelId);
    useEffect(()=>{
      getHotel(hotelId, sethotel, setHotelName, setLoading)
      
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
        <div className='paths'>
            <Link to={'/'}><span>Home {" > "}</span></Link>
            <Link to={'/hotel/search'}><span>Hotels In {hotelBookingState.city} {" > "}</span></Link>
            <Link><span>{hotelName}</span></Link>
          </div>
        </div>
      </div>
      {loading ? 
        <div>Loading...</div> :
        <div id='carousel' className='hotel-cover-container'>

          {hotel.images.map((image, index)=>(
            <picture key={index} className='carousel-picture'>
              <img src={image} alt='cover'/>
            </picture>
          ))}
          
        </div>
      }
     </div>
   )
 }
 
 export default SingleHotel
 