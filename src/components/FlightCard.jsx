import React from 'react'

const flightIcons = [
    ["https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/6E.png?v=17", 'IndiGo'],
    ["https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/UK.png?v=17", 'Vistara'],
    ["https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/AI.png?v=17", 'Air India'],
    ["https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/SG.png?v=17", 'Spice Jet']
]

function FlightCard({flight}) {

    const iconIndex = Math.floor((Math.random() * 4))

  return (
    <li className='flight-card'>
        
        <div className='flightIcon-container'>
            <img className='flightIcon' src={flightIcons[iconIndex][0]} alt="" />
            <div>
                <h5>{flightIcons[iconIndex][1]}</h5>
                <span className='font12'>{flight.flightID.split('-')[1]}</span>
            </div>
        </div>
        <div>
            <h3>{flight.departureTime}</h3>
            <span>{flight.source}</span>
        </div>
        <div>
            <span className='font12'>{`0${flight.duration} h`}</span>
            <span>Non stop</span>
        </div>
        <div>
            <h3>{flight.arrivalTime}</h3>
            <span>{flight.destination}</span>
        </div>
        <div>
            <div>
                <h3>₹ {flight.ticketPrice}</h3>
                <span className='font12'>per traveller</span>
            </div>
            <button>BOOK NOW</button>
        </div>
    </li>
  )
}

export default FlightCard
