import React, { useEffect } from 'react'
import SearchPageHeaderForTrain from '../components/Navbar/SearchPageHeaderForTrain'

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

  return (
    <div>
      <SearchPageHeaderForTrain/>
      <div class="fullPageLoader v2Loader"><div class="loadingContent"><div class="fliListLdr"><div class="fliListLdrWrap"><div><div class="fliListSmallLineLdr"><p class="fliListLineLdr"></p></div><div class="fliListBigLineLdr"><p class="fliListLineLdr"></p></div></div><span class="fliListLdrIcon"></span></div></div><p class="blackFont fontSize22 textCenter appendTop65">Hold on, we’re fetching flights for you</p></div></div>
    </div>
  )
}

export default RailwaySearch
