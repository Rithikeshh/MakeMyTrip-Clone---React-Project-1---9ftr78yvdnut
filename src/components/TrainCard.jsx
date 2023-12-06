import React from 'react'
import { useTrainBookingDetailsContext } from '../provider/TrainBookingDetailsProvider'
import { useNavigate, createSearchParams } from 'react-router-dom'

function TrainCard({train}) {

    const{trainBookingState} = useTrainBookingDetailsContext()
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const navigate = useNavigate();
   

    function handleNavigate(e, coach){

        navigate({
            pathname: `/railway/${train._id}`,
            search: createSearchParams({
                coachId: coach._id
            }).toString()
        })
        console.log(coach)
    }
  return (
    <div className='train-card'>
        <div className='train-details'>
            <div>
            <div>
                <h3>{train.trainName}</h3>
            </div>
            <div className='train-depart-days'>
                <span>#{train.trainNumber}</span>{" "}
                <span>|</span>{" "}
                <span>Departs on: {days.map((day, index)=>(
                <span key={index}
                    className={`${train.daysOfOperation.find(element=> element == day) ? 'trainOnDay' : ''} train-days`}
                >{day.substring(0,1)}</span>
                ))}</span>
            </div>
            </div>
            <div>
            <div>
                <h4>{train.departureTime}, {trainBookingState.travelDate.day.substring(0,3)}</h4>
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
                <h4>{train.arrivalTime}, {trainBookingState.travelDate.day.substring(0,3)}</h4>
            </div>
            <div className='source-station'>
                <span>{train.destination}</span>
            </div>
            </div>
        </div>
        <div className='train-ticket-details'>
        {
            train.coaches.map((coach,index)=>(
            <div key={index} onClick={(e)=>{
                handleNavigate(e,coach)
            }} className='train-ticket-details-coaches'>
                <div>
                <span>{coach.coachType}</span>
                <span>₹ {train.fare}</span>
                </div>
                <div>
                <span>AVAILABLE {coach.numberOfSeats}</span>
                </div>
                <div>
                <span>Free Cancellation</span>
                </div>
            </div>
            ))
        } 
        </div>
    </div>
  )
}

export default TrainCard
