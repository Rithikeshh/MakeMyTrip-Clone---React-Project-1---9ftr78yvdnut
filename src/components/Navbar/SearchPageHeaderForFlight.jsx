import React, { useEffect, useState } from 'react'
import SearchPageLocationInputContainer from '../SearchContentComponent/SearchPageLocationInputContainer'
import { useFlightBookingDetailsContext } from '../../provider/FlightBookingDetailsProvider'
import SearchPageCalendarInputContainer from '../SearchContentComponent/SearchPageCalendarInputContainer'
import getFlightList from '../../utils/getFlightList'
import { useFlightListContext } from '../../provider/FlightListProvider'
import getAirportShortName from '../../utils/airportNames'
import FlightTravellerModal from '../../Modals/FlightTravellerModal'

function SearchPageHeaderForFlight({flightSourceRef, flightDestinationRef, setLoading}) {

    const {flightBookingState, dispatchFlightBookingState} = useFlightBookingDetailsContext()
    const {setFlightList} = useFlightListContext()
    useEffect(()=>{
        getFlightList(getAirportShortName(flightBookingState.fromCity), getAirportShortName(flightBookingState.toCity), flightBookingState.travelDate.day.substring(0,3), setFlightList, setLoading)
    },[])
  return (
    <>
        <div className='searchPage-header-container'>
            <div className='makeFlex'>
                <section className='searchPage-booking-details-container'>
                    <SearchPageLocationInputContainer
                        key={0}
                        inputId={'fromCity'}
                        spanHeading={'From'}
                        value={flightBookingState.fromCity}
                        dispatch={dispatchFlightBookingState}
                        type={'flightFromCity'}
                        modal={'flight'}
                        >
                        
                    </SearchPageLocationInputContainer>
                    <div onClick={()=>{
                            dispatchFlightBookingState({type:'swap'})
                        }}>
                            <div className='swap-icon'></div>
                        </div>
                    <SearchPageLocationInputContainer
                        key={1}
                        inputId={'toCity'}
                        spanHeading={'To'}
                        value={flightBookingState.toCity}
                        dispatch={dispatchFlightBookingState}
                        type={'flightToCity'}
                        modal={'flight'}
                    />
                    <SearchPageCalendarInputContainer
                        labelFor={'travelDate'}
                        spanHeading={'Depart'}
                        value={flightBookingState.travelDate}
                        dispatch={dispatchFlightBookingState}
                        type={'flightTravelDate'}
                    />
                    <SearchPageTravellerInput
                        value={flightBookingState}
                        dispatch={dispatchFlightBookingState}
                    />
                </section>
                <section>
                    <p className='makeFlex make-justify-center'>
                        <button onClick={()=>{
                            const source = getAirportShortName(flightBookingState.fromCity)
                            const destination = getAirportShortName(flightBookingState.toCity);
                            setLoading(true)
                            getFlightList(source, destination, flightBookingState.travelDate.day.substring(0,3), setFlightList, setLoading)
                            flightSourceRef.current = flightBookingState.fromCity
                            flightDestinationRef.current = flightBookingState.toCity

                        }} className='primaryBtn widgetSearchBtn bold-text'>SEARCH</button>
                    </p>
                </section>
            </div>
        </div>
    </>
  )
}

export default SearchPageHeaderForFlight

function SearchPageTravellerInput({value, dispatch}){
    const [showModal, setShowModal] = useState(false)
        return(
            <div onClick={(e)=>{
                e.stopPropagation()
                setShowModal(n=>!n)
              }} className='searchPage-booking-input'>
                <label htmlFor='class' className='searchPage-booking-inputBox'>
                    <span className='dropdown'>PASSENGERS & CLASS</span>
                    <div>
                        <span>{value.travellers.adults + value.travellers.children + value.travellers.infant}{' Traveller, '}</span>
                        <span>{value.ticketClass}</span>
                    </div>
                </label>
                {showModal && <FlightTravellerModal setShowModal={setShowModal} value={value} dispatch={dispatch} search={true}/>}
            </div>
        )
    }