import React, { useEffect, useState } from 'react'
import SearchNavbar from '../components/Navbar/SearchNavbar'
import { useParams } from 'react-router-dom'
import getFlight from '../utils/getFlight'
import { airportAndCity} from '../utils/airportNames'
import { useFlightBookingDetailsContext } from '../provider/FlightBookingDetailsProvider'

const flightIcons = {
    '6E' :{img: "https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/6E.png?v=17", name: 'IndiGo'},
    'UK' :{img: "https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/UK.png?v=17", name: 'Vistara'},
    'AI' :{img: "https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/AI.png?v=17", name: 'Air India'},
    'SG' :{img: "https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/SG.png?v=17", name: 'Spice Jet'},
    'G8' :{img: 'https://airhex.com/images/airline-logos/go-first.png', name: 'Go First'}
}

function FlightBookingPage() {
    const {flightId} = useParams()
    const [flight, setFlight] = useState(null)
    const [loading, setLoading] = useState(true);
    const {flightBookingState} = useFlightBookingDetailsContext()

    useEffect(()=>{
        getFlight(flightId, setFlight, setLoading)
        document.body.style.backgroundColor = '#E5EEF4'
        return ()=>{
        document.body.style.backgroundColor = ''
        }
    },[])

  return (
    <div>
      <SearchNavbar/>
      <div className='searchPage-header-container'>
        <h2 className='flightBookingPage-heading' style={{color:'#fff'}}>Complete your booking</h2>
      </div>
      {loading ?
        <div>Loading...</div>
        :
        <div className='flightBookingPage-bookingDetails-container'>
            <div>
                <div className='flightBookingPage-bookingDetails'>
                    <div>
                        <div>
                            <span style={{textTransform:'capitalize', fontSize:'18px', fontWeight:'700'}}>{airportAndCity[flight.source].city} → {airportAndCity[flight.destination].city}</span>
                            <div>
                                <span style={{backgroundColor:'#FFEDD1', padding:'0px 4px', fontWeight:'500'}}>{flightBookingState.travelDate.day}, {flightBookingState.travelDate.month} {flightBookingState.travelDate.date}</span>{' '}
                                <span style={{fontSize:'14px'}}>{flight.stops ? flight.stops : 'Non'} stop · {`${flight.duration} h`}</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                <img style={{width:'28px', height:'28px'}} src={flightIcons[flight.flightID.slice(0,2)].img} alt="" />
                                <span style={{fontWeight:'500'}}>{flightIcons[flight.flightID.slice(0,2)].name}</span>
                                <span >{flight.flightID.slice(0,2) +" "+flight.flightID.slice(-3)}</span>
                                <span style={{border:'1px solid grey', borderRadius:'12px', fontSize:'12px', fontWeight:'500', padding:'0 8px', color:'grey'}}>Airbus A320</span>
                            </div>
                            <div>
                                <span>{"Economy"}</span> {/*make dynamic*/}
                            </div>
                        </div>
                        <div>
                            <div>
                                <div>
                                    <span style={{fontWeight:'500'}}>{flight.departureTime}</span>
                                    <span></span>
                                    <span style={{fontWeight:'500', textTransform:'capitalize'}}>{airportAndCity[flight.source].city} ({flight.source})</span>
                                </div>
                                <div>
                                    <span style={{fontSize:'14px'}}>{flight.duration}h</span>
                                </div>
                                <div>
                                    <span style={{fontWeight:'500'}}>{flight.arrivalTime}</span>
                                    <span></span>
                                    <span style={{fontWeight:'500', textTransform:'capitalize'}}>{airportAndCity[flight.destination].city} ({flight.destination})</span>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <img style={{width:'24px', height:'24px'}} src="https://imgak.mmtcdn.com/flights/assets/media/dt/review/cabin_baggage_icon.png" alt="" />
                                    <span><b>Cabin Baggage:</b> 7 Kgs (1 piece only) / Adult</span>
                                </div>
                                <div>
                                    <img style={{width:'24px', height:'24px'}} src="https://imgak.mmtcdn.com/flights/assets/media/dt/review/checkin_baggage_icon.png" alt="" />
                                    <span><b>Check-In Baggage:</b> 15 Kgs (1 piece only) / Adult</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>alok</div>
            </div>
            <div>
                <div className='flightBookingPage-fareDetails'></div>
            </div>
        </div>
      }
    </div>
  )
}

export default FlightBookingPage
