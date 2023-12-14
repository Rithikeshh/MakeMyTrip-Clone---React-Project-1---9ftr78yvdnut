import React, { useState } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link, useSearchParams } from 'react-router-dom';
import TicketCheckboxContainer from '../components/MainContentsComponents/TicketCheckboxContainer';
import LocationInputContainer from '../components/MainContentsComponents/LocationInputContainer';
import CalendarInputContainer from '../components/MainContentsComponents/CalendarInputContainer';
import { useFlightBookingDetailsContext } from '../provider/FlightBookingDetailsProvider';
import FlightTravellerModal from '../Modals/FlightTravellerModal';

const checkboxForTickets = [
  { id: 1, name: "One Way" },
  { id: 2, name: "Round Trip" },
  { id: 3, name: "Multi City" },
]
const paraText = 'Book Domestic Flights'
function FlightsContent() {

  const [search, setSearch] = useSearchParams();
  const {flightBookingState, dispatchFlightBookingState} = useFlightBookingDetailsContext()
  
  return (
    <div style={{paddingBottom:'11px'}}>
        <TicketCheckboxContainer 
          checkboxForTickets={checkboxForTickets}
          paraText={paraText}
        />
        <section className='flight-booking-details-container booking-details-container'>
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
              value={flightBookingState.fromCity}
              dispatch={dispatchFlightBookingState}
              type={'flightFromCity'}
              modal={'flight'}
            >
              <span onClick={()=>{
                dispatchFlightBookingState({type:'swap'})
              }} className='flightSwapCircle'>
                <span className='flightsSprite flightSwapIcon'></span>
              </span>
            </LocationInputContainer>
            
            <LocationInputContainer
                key={1}
                inputId={'toCity'}
                spanHeading={'To'}
                value={flightBookingState.toCity}
                dispatch={dispatchFlightBookingState}
                type={'flightToCity'}
                modal={'flight'}
            />
            <CalendarInputContainer
                labelFor={'travelDate'}
                spanHeading={'Departure'}
                value={flightBookingState.travelDate}
                dispatch={dispatchFlightBookingState}
                type={'flightTravelDate'}
            />
            {/* <div>
                <label htmlFor='class' className='booking-inputBox'>
                    <span className='dropdown'>Travellers & Class</span>
                    <div className='font20 lineHeight-36'>
                        <span className='p-r-6 lineHeight-36 font30 strongBold-text'>{'1'}</span>
                    </div>
                    <span>{'All Class'}</span>
                </label>
                <FlightTravellerModal/>
            </div> */}
            <TravellersInputContainer
              value={flightBookingState}
              dispatch={dispatchFlightBookingState}
            />
        </section>
        <section className='flight-booking-fare makeFlex make make-align-center make-justify-space margin-b-20'>
           <div className="makeFlex make-align-center">
             <span className='selectFareText font12 bold-text margin-r-5 noShrink'>
               Select A <br/> Fare Type:
             </span>
             <ul className='specialFareNew'>
               {/* Edit Details */}
               <FareItems/>  
               <FareItems/> 
               <FareItems/> 
               <FareItems/> 
             </ul>
           </div>
           <div className='recentSearchGrid margin-l-10 makeFlex make-align-center make-justify-center'>
             <span className='bold-text font12'>Trending Searches:</span>
               <ul className='fltRecentSearches makeFlex'>
                 <li>
                     <p className='font12'>
                       {"Mumbai"}
                       <span className='fltBlueOnewayArrowIcon flightsSprite margin-x-5'></span>  
                       {"Bangkok"}
                     </p>
                 </li>
                 <li>
                     <p className='font12'>
                       {"Dubai"}
                       <span className='fltBlueOnewayArrowIcon flightsSprite margin-x-5'></span>  
                       {"Delhi"}
                     </p>
                 </li>
               </ul>
           </div>
         </section>
        <section>
            <p className='makeFlex make-justify-center'>
                <Link 
                  className='primaryBtn widgetSearchBtn bold-text font24'
                  to="/flight/search"
                >
                  SEARCH
                </Link>
            </p>
      </section>
    </div>
  )
}
function FareItems(){
  return(
    <li className='font12 wrapFilter '>
      <p>{"Regular"}<br/>{"Fares"}</p>
      <div className='specialFareTooltip whiteText'>
        <p className="font12 bold-text margin-b-5">
          {"Armed Forces Fares"}
        </p>
        <p className='font11'>
          Applicable for serving and retired personnel of Armed Forces and Paramilitary Forces, their recognised dependants like spouses and children, and war widows. It is mandatory to show a valid ID or dependant card at the airport, without which boarding might be denied.
        </p>
      </div>
    </li>
  )
}
function TravellersInputContainer({value, dispatch}){
  const [showModal, setShowModal] = useState(false)
  return(
    <div onClick={(e)=>{
      e.stopPropagation()
      setShowModal(n=>!n)
    }}>
        <label htmlFor='class' className='booking-inputBox'>
            <span className='dropdown'>Travellers & Class</span>
            <div className='font20 lineHeight-36'>
                <span className='p-r-6 lineHeight-36 font30 strongBold-text'>{value.travellers.adults + value.travellers.children + value.travellers.infant}</span>
            </div>
            <span>{value.ticketClass}</span>
        </label>
        {showModal && <FlightTravellerModal setShowModal={setShowModal} value={value} dispatch={dispatch}/>}
    </div>
  )
}
// function InputBoxForCity({
//   mainDivClass,
//   inputId, 
//   spanText, 
//   paraTitle, 
//   inputValue
// }){
//   return(
//     <div className={`flight-inputBox ${mainDivClass}`}>
//       <label htmlFor={inputId}>
//         <span className='label-input margin-b-10'>{spanText}</span>
//         <input 
//           className='flight-inputField lineHeight-36 font30 strongBold-text' 
//           type="text" 
//           id={inputId}
//           value={inputValue}
//         />
//         <p 
//           className='makeRelative'
//           title={paraTitle}
//         >
//           <span title='' className='airPortName'>
//             {paraTitle}
//           </span>
//         </p>
//       </label>
//     </div>
//   )
// }

// function InputBoxForDateAndTravel({
//   mainDivClass,
//   inputId,
//   spanText,
//   lastParaValue
// }){
//   return(
//     <div className={`flight-inputBox ${mainDivClass}`}>
//       <label htmlFor={inputId}>
//         <span className='label-input margin-b-10'>{spanText}</span>
//         <p className='lineHeight-36 font20'>
//           {mainDivClass == 'dates' && 
//           <><span className='font30 strongBold-text'>
//             {"1"}{" "}
//           </span>
//           <span>{"Nov"}</span>
//           <span className="shortYear">
//             {"23"}
//           </span></>}
//           {mainDivClass == 'flightTravellers' && 
//             <>
//               <span>
//                 <span className='font30 strongBold-text'>{"4"}</span>
//                 {" Travellers"}
//               </span>
//             </>
//           }
//         </p>
//         <p>{lastParaValue}</p>
//       </label>
//     </div>
//   )
// }

export default FlightsContent
