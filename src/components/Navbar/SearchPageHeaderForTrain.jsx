import React, { useEffect, useRef, useState } from 'react'
import SearchPageLocationInputContainer from '../SearchContentComponent/SearchPageLocationInputContainer';
import { useTrainBookingDetailsContext } from '../../provider/TrainBookingDetailsProvider';
import SearchPageCalendarInputContainer from '../SearchContentComponent/SearchPageCalendarInputContainer';
import { useTrainListContext } from '../../provider/TrainListProvider';
import getTrainList from '../../utils/getTrainList';
import TrainClassModal from '../../Modals/TrainClassModal';

function SearchPageHeaderForTrain({setLoading, setSuggestedTrainList}) {
  const {trainBookingState, dispatchTrainBookingState} = useTrainBookingDetailsContext()
  const {setTrainList} = useTrainListContext()
    useEffect(()=>{
        getTrainList(trainBookingState.fromCity, trainBookingState.toCity, trainBookingState.travelDate.day.substring(0,3), setTrainList, setLoading, setSuggestedTrainList)
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
                        modal={'train'}
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
                        modal={'train'}
                    />
                    <SearchPageCalendarInputContainer
                        labelFor={'travelDate'}
                        spanHeading={'Depart'}
                        value={trainBookingState.travelDate}
                        dispatch={dispatchTrainBookingState}
                        type={'trainTravelDate'}
                    />
                    <SearchPageTrainClassInput
                        value={trainBookingState}
                        dispatch={dispatchTrainBookingState}
                    />
                </section>
                <section>
                    <p className='makeFlex make-justify-center'>
                        <button onClick={()=>{
                            const source = trainBookingState.fromCity
                            const destination = trainBookingState.toCity;
                            setLoading(true)
                            getTrainList(source, destination, trainBookingState.travelDate.day.substring(0,3), setTrainList, setLoading, setSuggestedTrainList)
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

function SearchPageTrainClassInput({value, dispatch}){
    
    const [showModal, setShowModal] = useState(false)
    const myElementRef = useRef(null)
    return(
        <div ref={myElementRef} onClick={(e)=>{
            setShowModal(n=>!n)
          }} className='searchPage-booking-input'>
            <label htmlFor='class' className='searchPage-booking-inputBox'>
                <span className='dropdown'>PASSENGERS & CLASS</span>
                <div>
                    <span >{value.ticketClass.text}, </span>
                    <span>{value.ticketClass.head}</span>
                </div>
            </label>
            {showModal && <TrainClassModal myElementRef={myElementRef} setShowModal={setShowModal} value={value} dispatch={dispatch} search={true}/>}
        </div>
    )
}