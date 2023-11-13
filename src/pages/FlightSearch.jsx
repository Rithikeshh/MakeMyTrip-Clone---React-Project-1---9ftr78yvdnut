import React, { useEffect } from 'react'
import Profile from '../components/Profile'
import LoginModalProvider from '../provider/LoginModalProvider'
import SearchNavbar from '../components/Navbar/SearchNavbar'
import { useParams } from 'react-router-dom'


function FlightSearch() {
  const {section} = useParams()
  console.log(section);
  useEffect(()=>{

    const config = {
      Method : "GET",
      headers : {
        "Content-Type": "application/json",
        projectID: "f104bi07c490"
      }
    }
    fetch(`https://academics.newtonschool.co/api/v1/bookingportals/flight?day=Wed&search={"source":"del","destination":"ccu"}`,
      config
    ).then((res)=>{
      return res.json()
    }).then((result)=>{
      console.log(result)
    }).catch((error)=>{
      console.log('error', error);
    })

  },[])
  return (
    <div>
      {/* <SearchNavbar/> */}

      
    </div>
  )
}

export default FlightSearch
