import React, { useEffect, useRef, useState } from 'react'
import Profile from '../components/Profile'
import LoginModalProvider from '../provider/LoginModalProvider'
import SearchNavbar from '../components/Navbar/SearchNavbar'
import { useParams } from 'react-router-dom'
import getFlightList from '../utils/getFlightList'
import SearchPageHeaderForFlight from '../components/Navbar/SearchPageHeaderForFlight'
import { useFlightListContext } from '../provider/FlightListProvider'
import { useFlightBookingDetailsContext } from '../provider/FlightBookingDetailsProvider'


function FlightSearch() {
  
  const {flightList} = useFlightListContext()
  console.log(flightList);
  const{flightBookingState} = useFlightBookingDetailsContext()
  const flightSourceRef = useRef(flightBookingState.fromCity)
  const flightDestinationRef = useRef(flightBookingState.toCity)

  const [loading, setLoading] = useState(true)

  return (
    <div>
      {/* <SearchNavbar/> */}
      <SearchPageHeaderForFlight flightSourceRef={flightSourceRef} flightDestinationRef={flightDestinationRef}/>
      <div className='flightList-container'>
        <div>
        <div className='bold-text font24' style={{color:'#fff'}}>Flights from {flightSourceRef.current} to {flightDestinationRef.current}</div>

        {
          flightList.length == 0 ? 
          <div style={{color:'white', textAlign:'center'}}>Oops No Hotel Found In This City!!</div> 
          :
          <ul className=''>
            
            {
              flightList.map((item) => (
              //   <HotelCard key={item._id} hotel={item}/>
                <li className='hotel-card'>a</li>
              ))          
            }
          </ul>
        }
        </div>
      </div>
    </div>
  )
}

export default FlightSearch
