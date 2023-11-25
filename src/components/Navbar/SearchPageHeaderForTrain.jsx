import React, { useEffect } from 'react'
import SearchPageLocationInputContainer from '../SearchContentComponent/SearchPageLocationInputContainer';
import { useTrainBookingDetailsContext } from '../../provider/TrainBookingDetailsProvider';
import SearchPageCalendarInputContainer from '../SearchContentComponent/SearchPageCalendarInputContainer';
import { useTrainListContext } from '../../provider/TrainListProvider';
import getTrainList from '../../utils/getTrainList';

function SearchPageHeaderForTrain({setLoading}) {
  const {trainBookingState, dispatchTrainBookingState} = useTrainBookingDetailsContext()
  const {setTrainList} = useTrainListContext()
    useEffect(()=>{
        getTrainList(trainBookingState.fromCity, trainBookingState.toCity, trainBookingState.travelDate.day.substring(0,3), setTrainList, setLoading)
    },[])
  return (
    <div className='searchPage-header-container'>
            <div className='makeFlex'>
                <section className='searchPage-booking-details-container'>
                    <SearchPageLocationInputContainer
                        key={0}
                        inputId={'fromCity'}
                        spanHeading={'From'}
                        value={trainBookingState.fromCity}
                        dispatch={dispatchTrainBookingState}
                        type={'trainFromCity'}
                        >
                        
                    </SearchPageLocationInputContainer>
                    <div onClick={()=>{
                            dispatchTrainBookingState({type:'swap'})
                        }}>
                            <div className='swap-icon'></div>
                        </div>
                    <SearchPageLocationInputContainer
                        key={1}
                        inputId={'toCity'}
                        spanHeading={'To'}
                        value={trainBookingState.toCity}
                        dispatch={dispatchTrainBookingState}
                        type={'trainToCity'}
                    />
                    <SearchPageCalendarInputContainer
                        labelFor={'travelDate'}
                        spanHeading={'Depart'}
                        value={trainBookingState.travelDate}
                        dispatch={dispatchTrainBookingState}
                        type={'trainTravelDate'}
                    />
                    <div className='searchPage-booking-input'>
                        <label htmlFor='class' className='searchPage-booking-inputBox'>
                            <span className='dropdown'>PASSENGERS & CLASS</span>
                            <div>
                                <span >{trainBookingState.travellers}{' Traveller, '}</span>
                                <span>{'All Class'}</span>
                            </div>
                        </label>
                    </div>
                </section>
                <section>
                    <p className='makeFlex make-justify-center'>
                        <button onClick={()=>{
                            const source = trainBookingState.fromCity
                            const destination = trainBookingState.toCity;
                            setLoading(true)
                            getTrainList(source, destination, trainBookingState.travelDate.day.substring(0,3), setTrainList, setLoading)
                            // flightSourceRef.current = flightBookingState.fromCity
                            // flightDestinationRef.current = flightBookingState.toCity

                        }} className='primaryBtn widgetSearchBtn bold-text'>SEARCH</button>
                    </p>
                </section>
            </div>
        </div>
  )
}

export default SearchPageHeaderForTrain
