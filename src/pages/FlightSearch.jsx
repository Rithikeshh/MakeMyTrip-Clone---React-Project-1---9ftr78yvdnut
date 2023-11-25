import React, { useEffect, useRef, useState } from 'react'
import Profile from '../components/Profile'
import LoginModalProvider from '../provider/LoginModalProvider'
import SearchNavbar from '../components/Navbar/SearchNavbar'
import { useParams } from 'react-router-dom'
import getFlightList from '../utils/getFlightList'
import SearchPageHeaderForFlight from '../components/Navbar/SearchPageHeaderForFlight'
import { useFlightListContext } from '../provider/FlightListProvider'
import { useFlightBookingDetailsContext } from '../provider/FlightBookingDetailsProvider'
import FlightCard from '../components/FlightCard'
import FlightLoader from '../components/FlightLoader'


function FlightSearch() {
  
  const {flightList} = useFlightListContext()
  console.log(flightList);
  const{flightBookingState} = useFlightBookingDetailsContext()
  const flightSourceRef = useRef(flightBookingState.fromCity)
  const flightDestinationRef = useRef(flightBookingState.toCity)

  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    document.body.style.backgroundColor = '#E5EEF4'
    return ()=>{
      document.body.style.backgroundColor = ''
    }
  },[])
  return (
    <div>
      {/* <SearchNavbar/> */}
      <SearchPageHeaderForFlight flightSourceRef={flightSourceRef} flightDestinationRef={flightDestinationRef} setLoading={setLoading}/>
      <div className='flightList-container'>
        
        <div>
          <div className='bold-text font24' style={{color:'#fff'}}>Flights from {flightSourceRef.current} to {flightDestinationRef.current}</div>
          <div className='flight-add-bar'>
            <div className='makeFlex'>
              <img src="https://imgak.mmtcdn.com/flights/assets/media/dt/listing/amex.png" alt="" />
              <div>
                <h4>FREE Zero Cancellation</h4>
                <span className='promotionRedline'></span><br></br>
                <span className='font12'>& FLAT 8% OFF* with American Express Cards. Code: AMEXZC </span>
              </div>
            </div>
            <div className='makeFlex'>
              <img src="https://imgak.mmtcdn.com/flights/assets/media/dt/listing/myMedRefund.png" alt="" />
              <div>
                <h4>Get Full Refund</h4>
                <span className='promotionRedline'></span><br></br>
                <span className='font12'>on your flight tickes, due to medical emergencies</span>
              </div>
            </div>
            <div className='makeFlex'>
              <img src="https://imgak.mmtcdn.com/flights/assets/media/dt/listing/lock_2.png" alt="" />
              <div>
                <h4>Price Lock: Pay Later</h4>
                <span className='promotionRedline'></span><br></br>
                <span className='font12'>Unsure about your plans? Secure prices now, pay later</span>
              </div>
            </div>
          </div>
          
          {loading  ? <FlightLoader/> :
          <>
          {
            flightList.length == 0 ? 
            <div style={{color:'white', textAlign:'center'}}>Oops No Hotel Found In This City!!</div> 
            :
            <ul className='flight-card-container'>
              
              {
                flightList.map((item) => (
                  <FlightCard key={item._id} flight={item}/>
                ))          
              }
            </ul>
          }</>}
        </div>
      </div>
    </div>
  )
}

export default FlightSearch
