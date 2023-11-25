import React, { useEffect, useState } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import SearchPageHeaderForTrain from '../components/Navbar/SearchPageHeaderForTrain'
import FlightLoader from '../components/FlightLoader'
import { useTrainListContext } from '../provider/TrainListProvider';
import { useTrainBookingDetailsContext } from '../provider/TrainBookingDetailsProvider';

function RailwaySearch() {
  
  // useEffect(()=>{
  //   const token = sessionStorage.getItem("userToken");
  //   const config = {
  //     method: "POST",
  //     body : JSON.stringify({
  //       "bookingType" : "flight",
  //       "userId" : "6543652daf9136fdbc0eece0",
  //       "bookingDetails" : {
  //         "flightId":"651d50168c0d8593552252ef",
  //         "startDate":"2023-10-09T10:03:53",
  //         "endDate" : "2023-10-09T10:05:53"
  //       }
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //       "projectID": "f104bi07c490",
  //       "Authorization": `Bearer ${token}`
  //     }
  //   }
  //   fetch('https://academics.newtonschool.co/api/v1/bookingportals/booking',config).then((res)=>{
  //     return res.json();
  //   }).then((result)=>{
  //     console.log(result)
  //   }).catch((e)=>{
  //     console.log(e);
  //   })

  // },[])
  const {trainBookingState, dispatchTrainBookingState} = useTrainBookingDetailsContext()
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const {trainList} = useTrainListContext()
  const [loading, setLoading] = useState(true)
  return (
    <div>
      <SearchPageHeaderForTrain setLoading={setLoading}/>
      {loading && <FlightLoader/>}
      <div className='trainSearchPage-main-container'>
        <div className='trainSearchPage-filter-container'>
          <h3 style={{fontWeight:'600'}}>Filters</h3>
          <div className='trainSearchPage-filter-items'>
            <FormControlLabel 
              control={
                <Checkbox
                  checked={false}
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                />
              }
              label={'AC'}
            />
            <FormControlLabel 
              control={
                <Checkbox
                  checked={false}
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                />
              }
              label={'AC'}
            />
          </div>
        </div>
        <div className='trainSearchPage-card-container'>
              {trainList.map((train)=>(
                <div className='train-card'>
                  <div className='train-details'>
                      <div>
                        <div>
                          <h3>{train.trainName}</h3>
                        </div>
                        <div className='train-depart-days'>
                          <span>#{train.trainNumber}</span>{" "}
                          <span>|</span>{" "}
                          <span>Departs on: {days.map((day)=>(
                            <span
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
                </div>
              )) }
        </div>
      </div>
    </div>
  )
}

export default RailwaySearch
