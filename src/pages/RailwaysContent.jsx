import React from 'react'
import TicketCheckboxContainer from '../components/MainContentsComponents/TicketCheckboxContainer';

const checkboxForTickets = [
    { id: 1, name: "Book Train Tickets" },
    { id: 2, name: "Check PNR Status" },
    { id: 3, name: "Live Train Status" }
]
const paraText = 'Train Ticket Booking'
function RailwaysContent() {
  return (
    <div style={{paddingBottom:'11px'}}>
        <TicketCheckboxContainer
            checkboxForTickets={checkboxForTickets}
            paraText={paraText}
            spanText={'IRCTC Authorized e-ticketing'}
        />
        <section className='train-booking-details-container booking-details-container'>
            <div key={0} >
                <label htmlFor='fromCity' className='booking-inputBox'>
                    <span>From</span>
                    <input type="text" id='fromCity' value={'New Delhi'}/>
                    <span>{'NSDL, New Delhi Railway Station'}</span>
                </label>
            </div>
            <div key={1} >
                <label htmlFor='toCity' className='booking-inputBox'>
                    <span>To</span>
                    <input type="text" id='toCity' value={'Kolkata'}/>
                    <span>{'HWH, Kolkata Howrah Junction'}</span>
                </label>
            </div>
            
            <div key={2}>
                <label htmlFor='travelDate' className='booking-inputBox'>
                    <span className='dropdown'>Travel Date</span>
                    <div className='font20 lineHeight-36'>
                        <span className='p-r-6 lineHeight-36 font30 strongBold-text'>{1}</span>
                        <span>{'Nov'}</span>
                        <span className='shortYear'>{23}</span>
                    </div>
                    <span>{'Sunday'}</span>
                </label>
            </div>
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
