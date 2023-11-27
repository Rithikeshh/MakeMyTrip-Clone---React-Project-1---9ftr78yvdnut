import React, { useEffect, useRef, useState } from 'react'
import SearchNavbar from '../components/Navbar/SearchNavbar'
import { useParams, useSearchParams } from 'react-router-dom';
import getTrain from '../utils/getTrain';
import { useTrainBookingDetailsContext } from '../provider/TrainBookingDetailsProvider';

function RailwayBookingPage() {

    const[loading, setLoading] = useState(true);
    const[train, setTrain] = useState()
    const {trainId} = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const{trainBookingState} = useTrainBookingDetailsContext()
    const [coach, setCoach] = useState(null)
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const coachId = useRef(searchParams.get('coachId'));
    useEffect(()=>{
        getTrain(trainId, setTrain, setLoading, coachId, setCoach)
    },[])
  return (
    <div>
      <SearchNavbar/>
      <div className='searchPage-header-container'>
        <h2 className='flightBookingPage-heading' style={{color:'#fff'}}>Select Travellers</h2>
      </div>
        {loading ? 
            <div>Loading...</div>
            :
            <div className='trainBookingPage-bookingDetails-container'>
                <div>
                    <div className='trainBookingPage-train-details-container'>
                        <div className='train-details'>
                            <div>
                            <div>
                                <h2>{train.trainName}</h2>
                            </div>
                            <div className='train-depart-days'>
                                <span>#{train.trainNumber}</span>{" "}
                                <span>|</span>{" "}
                                <span>Departs on: {days.map((day)=>(
                                <span
                                    className={`${train.daysOfOperation.find(element=> element == day) ? 'trainOnDay' : ''} train-days`}
                                >{day.substring(0,1)}</span>
                                ))}</span>
                            </div>
                            </div>
                            <div>
                            <div>
                                <h4>{train.departureTime}, <span style={{fontWeight:'400', color:'grey'}}>{trainBookingState.travelDate.date} {trainBookingState.travelDate.month}</span></h4>
                            </div>
                            <div className='source-station'>
                                <span>{train.source}</span>
                            </div>
                            </div>
                            <div>
                            <div className='travel-duration'>
                                <span>____ </span>
                                <span>{train.travelDuration}</span>
                                <span> ____</span>
                            </div>
                            </div>
                            <div>
                            <div>
                                <h4>{train.arrivalTime}, <span style={{fontWeight:'400', color:'grey'}}>{trainBookingState.travelDate.date} {trainBookingState.travelDate.month}</span></h4>
                            </div>
                            <div className='source-station'>
                                <span>{train.destination}</span>
                            </div>
                            </div>
                        </div>
                        <div className='trainBookingpage-seat-details'>
                            <div>
                                <div>
                                    <span>Availability Status</span>
                                </div>
                                <div>
                                    <div>
                                        <span>{coach.coachType}</span>
                                        <span>AVAILABLE-{coach.numberOfSeats}</span>
                                    </div>
                                    <div>
                                        <span>
                                            Updated few minutes ago
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <span>Your Boarding Station</span>
                                </div>
                                <div>
                                    <span className='boarding-station-details' title={`${train.source} - ${train.departureTime} (${trainBookingState.travelDate.date} ${trainBookingState.travelDate.month})`}>{train.source} - {train.departureTime} ({trainBookingState.travelDate.date} {trainBookingState.travelDate.month})</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div>Alok</div>
            </div>  
        }
    </div>
  )
}

export default RailwayBookingPage
