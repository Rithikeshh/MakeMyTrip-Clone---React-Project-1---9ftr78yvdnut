import React, { useEffect, useState } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import SearchPageHeaderForTrain from '../components/Navbar/SearchPageHeaderForTrain'
import FlightLoader from '../components/FlightLoader'
import { useTrainListContext } from '../provider/TrainListProvider';
import { useTrainBookingDetailsContext } from '../provider/TrainBookingDetailsProvider';
import TrainCard from '../components/TrainCard';

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
  const [suggestedTrainList, setSuggestedTrainList] = useState([]);
  return (
    <div>
      <SearchPageHeaderForTrain setLoading={setLoading} setSuggestedTrainList={setSuggestedTrainList}/>
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
                <TrainCard key={train._id} train={train}/>
              )) }
              {
                trainList.length == 0 && 
                <div className='trainSearchPage-no-train-container'>
                  <h3>No trains found for the given day.</h3>
                </div>
              }
              <h3 style={{color:'#0084ff'}}>Suggested Journey</h3>
              {suggestedTrainList.map((train)=>(
                <TrainCard key={train._id} train={train}/>
              )) }
        </div>
      </div>
    </div>
  )
}

export default RailwaySearch
