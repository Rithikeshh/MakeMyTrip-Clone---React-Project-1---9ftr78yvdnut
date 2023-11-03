import React from 'react'
import '../styles/GenericMainContent.css'
import TicketCheckboxContainer from '../components/MainContentsComponents/TicketCheckboxContainer';


// Most css written in genericMainContent.css
const checkboxForTickets = [
    { id: 1, name: "Upto 4 Rooms" },
    { id: 2, name: "Group Deal" },
]
const paraText = 'Book Domestic and International Property Online. To list your property '
function HotelsContent() {
  return (
    <div>
      <TicketCheckboxContainer 
        checkboxForTickets={checkboxForTickets}
        paraText={paraText}
      />
      <section className='hotel-booking-details-container booking-details-container'>
        <div className='booking-inputBox'>
           alok
        </div>
        <div>b</div>
        <div>c</div>
        <div>d</div>
        <div>e</div>
      </section>
    </div>
  )
}

export default HotelsContent
