import React, { useEffect, useRef, useState } from 'react'
import SearchPageLocationInputContainer from '../SearchContentComponent/SearchPageLocationInputContainer'
import SearchPageCalendarInputContainer from '../SearchContentComponent/SearchPageCalendarInputContainer'
import { useHotelBookingDetailsContext } from '../../provider/HotelBookingDetailsProvider'
import { Link } from 'react-router-dom'
import getHotelList from '../../utils/getHotelList'
import { useHotelsListContext } from '../../provider/HotelsListProvider'
import HotelRoomAndTravellerModal from '../../Modals/HotelRoomAndTravellerModal'

function SearchPageHeaderForHotel({ setFilteredHotelList, hotelCityRef}) {
    const {hotelBookingState, dispatchHotelBookingState} = useHotelBookingDetailsContext()
    const{setHotelList} = useHotelsListContext()
    const [active, setActive] = useState(1);
    
    useEffect(()=>{
        getHotelList(setHotelList ,hotelBookingState.city)
    },[])
    function handlePopularFilter(){
        setActive(1)
        getHotelList(setHotelList ,hotelBookingState.city)
    }
    function handleRatingFilter(){
        setFilteredHotelList((oldList)=>{
            const newList = oldList.sort((item1,item2)=>item2.rating-item1.rating)
            return [...newList]
        })
        setActive(2)
    }
    function handlePriceHighestFirst(){
        setActive(3)
        setFilteredHotelList((oldList)=>{
            const newList = oldList.sort((item1, item2)=>item2.rooms[0].costDetails.baseCost - item1.rooms[0].costDetails.baseCost)
            return [...newList]
        })
    }
    function handlePriceLowestFirst(){
        setActive(4)
        setFilteredHotelList((oldList)=>{
            const newList = oldList.sort((item1, item2)=>item1.rooms[0].costDetails.baseCost - item2.rooms[0].costDetails.baseCost)
            return [...newList]
        })
    }
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
            modal={'hotel'}
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
            <SearchPageTravellerAndRoomInput
                value={hotelBookingState}
                dispatch={dispatchHotelBookingState}
            />
        </section>
        <section>
            <p className='makeFlex make-justify-center'>
                <button onClick={()=>{
                    getHotelList(setHotelList ,hotelBookingState.city)
                    hotelCityRef.current = hotelBookingState.city
                }} className='primaryBtn widgetSearchBtn bold-text' >SEARCH</button>
            </p>
        </section>
      </div>
      
      <div className='hotels-filter-bar'>
            <ul>
                <li className='bold-text'>SORT BY:</li>
                <li onClick={handlePopularFilter} className={`${active == 1 ? 'active' : ''} `}>
                    <span>Popular</span>
                </li>
                <li onClick={handleRatingFilter} className={`${active == 2 ? 'active' : ''}`}>
                    <span>User Rating (Highest First)</span>
                </li>
                <li onClick={handlePriceHighestFirst} className={`${active == 3 ? 'active' : ''}`}>
                    <span>Price (Highest First)</span>
                </li>
                <li onClick={handlePriceLowestFirst} className={`${active == 4 ? 'active' : ''}`}>
                    <span>Price (Lowest First)</span>
                </li>
            </ul>
      </div>
      </div>
      </>
  )
}

export default SearchPageHeaderForHotel

export function SearchPageTravellerAndRoomInput({value, dispatch}){

    const [showModal, setShowModal] = useState(false)
    const myElementRef = useRef(null)
    return(
        <div ref={myElementRef} onClick={(e)=>{
            setShowModal(n=>!n)
          }}className='searchPage-booking-input'>
            <label htmlFor='rooms' className='searchPage-booking-inputBox'>
                <span className='dropdown'>Rooms & Guests</span>
                <div >
                <span >{value.room}</span>{' '}
                <span>{'Room'}</span>{', '}
                <span>{value.adults}</span>{' '}
                <span>{'Adults'}</span>
                </div>
            </label>
            {showModal && <HotelRoomAndTravellerModal myElementRef={myElementRef} setShowModal={setShowModal} value={value} dispatch={dispatch} search={true}/>}
        </div>
    )
}