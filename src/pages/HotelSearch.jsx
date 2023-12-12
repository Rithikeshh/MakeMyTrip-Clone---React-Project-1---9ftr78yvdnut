import React, { useEffect, useRef, useState } from 'react'
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
  const [filteredHotelList, setFilteredHotelList] = useState([])
  const [priceFilter, setPriceFilter] = useState({
    'below2k': false, 'between2kAnd4k': false, 'between4kand6k': false, 'above6k': false
  })
  function handleFilter(){
    let filteredResult=[]
    let isFilterApply = false;
    for(const element in priceFilter){
      if(priceFilter[element]){
        isFilterApply = true;
      }
    }
    if(isFilterApply){
     if(priceFilter.below2k){
      const filteredArr = hotelList.filter((hotel)=>{
        return hotel.rooms[0].costDetails.baseCost < 2000
      })
      filteredResult = [...filteredResult, ...filteredArr]
     }
     if(priceFilter.between2kAnd4k){
      const filteredArr = hotelList.filter((hotel)=>{
        return hotel.rooms[0].costDetails.baseCost >= 2000 && hotel.rooms[0].costDetails.baseCost <= 4000
      })
      filteredResult = [...filteredResult, ...filteredArr]
     }
     if(priceFilter.between4kand6k){
      const filteredArr = hotelList.filter((hotel)=>{
        return hotel.rooms[0].costDetails.baseCost >= 4000 && hotel.rooms[0].costDetails.baseCost <= 6000
      })
      filteredResult = [...filteredResult, ...filteredArr]
     }
     if(priceFilter.above6k){
      const filteredArr = hotelList.filter((hotel)=>{
        return hotel.rooms[0].costDetails.baseCost > 6000 
      })
      filteredResult = [...filteredResult, ...filteredArr]
     }
     setFilteredHotelList([...filteredResult])
    }
    else{
      setFilteredHotelList([...hotelList])
    }
  }
  
  useEffect(()=>{
    handleFilter()
  },[hotelList, priceFilter])
  function handlePriceFilter(e){
    const {name} = e.target
    setPriceFilter({...priceFilter, [name]: !priceFilter[name]})
  }
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
      <SearchPageHeaderForHotel setFilteredHotelList={setFilteredHotelList} priceFilter={priceFilter} hotelCityRef={hotelCityRef}/>
      <div className='hotel-searchPage-list-container'>
        <div>
          <div className='flight-filters' style={{top: '136px'}}>
            <div className='flight-popularFilter'>
              <h4>Price Filters</h4>
              <label htmlFor="below2k">
                <input onChange={handlePriceFilter} value={priceFilter['below2k']} name='below2k' type="checkbox" id='below2k'/>
                below ₹ 2000
              </label>
              <label htmlFor="between2kAnd4k">
                <input onChange={handlePriceFilter} value={priceFilter['between2kAnd4k']} name='between2kAnd4k' type="checkbox" id='between2kAnd4k'/>
                ₹ 2000 - 4000
              </label>
              <label htmlFor="between4kand6k">
                <input onChange={handlePriceFilter} value={priceFilter['between4kand6k']} name='between4kand6k' type="checkbox" id='between4kand6k'/>
                ₹ 4000 - 6000
              </label>
              <label htmlFor="above6k">
                <input onChange={handlePriceFilter} value={priceFilter['above6k']} name='above6k' type="checkbox" id='above6k'/>
                above ₹ 6000
              </label>
            </div>
          </div>
        </div>
        <div className='hotelList-container'>
          {
            filteredHotelList.length == 0 ? 
            <div style={{color:'white', textAlign:'center'}}>Oops No Hotel Found In This City!!</div> 
            :
            <ul className='hotel-card-container'>
              <li className='bold-text font24'>Showing Properties in {hotelCityRef.current}</li>
              {
                filteredHotelList.map((item) => (
                  <HotelCard key={item._id} hotel={item}/>
                ))
              }
            </ul>
          }
        </div>
      </div>
      </div>
  )
}

export default HotelSearch
