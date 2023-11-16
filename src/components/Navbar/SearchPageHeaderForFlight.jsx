import React, { useEffect } from 'react'
import SearchPageLocationInputContainer from '../SearchContentComponent/SearchPageLocationInputContainer'
import { useFlightBookingDetailsContext } from '../../provider/FlightBookingDetailsProvider'
import SearchPageCalendarInputContainer from '../SearchContentComponent/SearchPageCalendarInputContainer'
import getFlightList from '../../utils/getFlightList'
import { useFlightListContext } from '../../provider/FlightListProvider'
import getAirportShortName from '../../utils/airportNames'

function SearchPageHeaderForFlight({flightSourceRef, flightDestinationRef}) {

    const {flightBookingState, dispatchFlightBookingState} = useFlightBookingDetailsContext()
    const {setFlightList} = useFlightListContext()
    useEffect(()=>{
        getFlightList(getAirportShortName(flightBookingState.fromCity), getAirportShortName(flightBookingState.toCity), flightBookingState.travelDate.day.substring(0,3), setFlightList)
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
                    />
                    <SearchPageCalendarInputContainer
                        labelFor={'travelDate'}
                        spanHeading={'Depart'}
                        value={flightBookingState.travelDate}
                        dispatch={dispatchFlightBookingState}
                        type={'flightTravelDate'}
                    />
                    <div className='searchPage-booking-input'>
                        <label htmlFor='class' className='searchPage-booking-inputBox'>
                            <span className='dropdown'>PASSENGERS & CLASS</span>
                            <div>
                                <span >{'1'}{' Traveller, '}</span>
                                <span>{'All Class'}</span>
                            </div>
                        </label>
                    </div>
                </section>
                <section>
                    <p className='makeFlex make-justify-center'>
                        <button onClick={()=>{
                            const source = getAirportShortName(flightBookingState.fromCity)
                            const destination = getAirportShortName(flightBookingState.toCity);
                            getFlightList(source, destination, flightBookingState.travelDate.day.substring(0,3), setFlightList)
                            flightSourceRef.current = flightBookingState.fromCity
                            flightDestinationRef.current = flightBookingState.toCity

                        }} className='primaryBtn widgetSearchBtn bold-text' to="/hotel/search">SEARCH</button>
                    </p>
                </section>
            </div>
        </div>
    </>
  )
}

export default SearchPageHeaderForFlight
