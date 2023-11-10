import React, { useEffect } from 'react'
import Profile from '../components/Profile'
import LoginModalProvider from '../provider/LoginModalProvider'
import SearchNavbar from '../components/Navbar/SearchNavbar'
import { useParams } from 'react-router-dom'


function FlightSearch() {
  const {section} = useParams()
  console.log(section);
  return (
    <div>
      {/* <SearchNavbar/> */}
      
    </div>
  )
}

export default FlightSearch
