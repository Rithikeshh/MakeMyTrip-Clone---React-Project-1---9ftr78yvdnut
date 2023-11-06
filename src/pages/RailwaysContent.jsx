import React from 'react'
import TicketCheckboxContainer from '../components/MainContentsComponents/TicketCheckboxContainer';
import LocationInputContainer from '../components/MainContentsComponents/LocationInputContainer';
import { useTrainBookingDetailsContext } from '../provider/TrainBookingDetailsProvider';
import CalendarInputContainer from '../components/MainContentsComponents/CalendarInputContainer';

const checkboxForTickets = [
    { id: 1, name: "Book Train Tickets" },
    { id: 2, name: "Check PNR Status" },
    { id: 3, name: "Live Train Status" }
]
const paraText = 'Train Ticket Booking'
function RailwaysContent() {
    const {trainBookingState, dispatchTrainBookingState} = useTrainBookingDetailsContext()
  return (
    <div style={{paddingBottom:'11px'}}>
        <TicketCheckboxContainer
            checkboxForTickets={checkboxForTickets}
            paraText={paraText}
            spanText={'IRCTC Authorized e-ticketing'}
        />
        <section className='train-booking-details-container booking-details-container'>
            {/* <div key={0} >
                <label htmlFor='fromCity' className='booking-inputBox'>
                    <span>From</span>
                    <input type="text" id='fromCity' value={'New Delhi'}/>
                    <span>{'NSDL, New Delhi Railway Station'}</span>
                </label>
            </div> */}
            <LocationInputContainer
                key={0}
                inputId={'fromCity'}
                spanHeading={'From'}
                value={trainBookingState.fromCity}
                dispatch={dispatchTrainBookingState}
                type={'trainFromCity'}
            >
                <span className='flightSwapCircle'>
                    <span className='flightsSprite flightSwapIcon'></span>
                </span>
            </LocationInputContainer>
            <LocationInputContainer
                key={1}
                inputId={'toCity'}
                spanHeading={'To'}
                value={trainBookingState.toCity}
                dispatch={dispatchTrainBookingState}
                type={'trainToCity'}
            />
            <CalendarInputContainer
                labelFor={'travelDate'}
                spanHeading={'Travel Date'}
                value={trainBookingState.travelDate}
                dispatch={dispatchTrainBookingState}
                type={'trainTravelDate'}
            />
            <div key={3}>
                <label htmlFor='class' className='booking-inputBox'>
                    <span className='dropdown'>Class</span>
                    <div className='font20 lineHeight-36'>
                        <span className='p-r-6 lineHeight-36 font30 strongBold-text'>{'All'}</span>
                    </div>
                    <span>{'All Class'}</span>
                </label>
            </div>
        </section>
        <section>
            <p className='makeFlex make-justify-center'>
                <a className='primaryBtn widgetSearchBtn bold-text font24' href="">SEARCH</a>
            </p>
      </section>
    </div>
  )
}

export default RailwaysContent
