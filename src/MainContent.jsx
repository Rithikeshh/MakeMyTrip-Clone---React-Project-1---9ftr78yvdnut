import React from 'react'
import "./styles/MainContent.css";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import FlightsContent from './pages/FlightsContent';
import HotelsContent from './pages/HotelsContent';
import RailwaysContent from './pages/RailwaysContent';
import Header from './components/Navbar/Header';
import Navbar from './components/Navbar/Navbar';

const sections = {
  flights: <FlightsContent />,
  hotels: <HotelsContent />,
  railways: <RailwaysContent />
}
function MainContent() {
  const {section} = useParams()

  return (
    <div className="container" >
      <Header/>
      <Navbar/>
    <div className='mainContent-container-wrapper makeFlex make-justify-center'>
      <div className='mainContent-container'>
        {!sections[section] ? <FlightsContent/> : sections[section]}
      </div>
    </div>
    {/* <Routes>
      <Route path='/' element={<FlightsContent/>}/>
      <Route path='/flights' element={<FlightsContent/>}/>
      <Route path='/hotels' element={<HotelsContent/>}/>
      <Route path='/railways' element={<RailwaysContent/>}/>
    </Routes> */}
    </div>
  )
}

export default MainContent
