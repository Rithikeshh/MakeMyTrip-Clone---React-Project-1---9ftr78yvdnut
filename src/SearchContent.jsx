import React from 'react'
import SearchNavbar from './components/Navbar/SearchNavbar'
import { Route, Routes, useParams } from 'react-router-dom'
import FlightSearch from './pages/FlightSearch'
import HotelSearch from './pages/HotelSearch'
import { useLoginModalContext } from './provider/LoginModalProvider'

const sections = {
    flight: <FlightSearch />,
    hotel: <HotelSearch />,
    // railway: <RailwaysContent />
  }
function SearchContent() {
    const {section} = useParams()
    const {isLoginModalVisible, setIsLoginModalVisible} = useLoginModalContext()
    console.log(isLoginModalVisible)
    console.log(section)
  return (
    <div>
        <SearchNavbar/>
        {/* <Routes>
          <Route path="/flight/search" element={<FlightSearch/>}/>
          <Route path="/hotel/search" element={<HotelSearch/>}/>
        </Routes> */}
        {sections[section] && sections[section]}
    </div>
  )
}

export default SearchContent
