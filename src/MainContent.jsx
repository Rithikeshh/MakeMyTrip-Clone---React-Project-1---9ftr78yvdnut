import React from 'react'
import "./styles/MainContent.css";
import { Routes, Route, Navigate } from "react-router-dom";
import FlightsContent from './pages/FlightsContent';
import HotelsContent from './pages/HotelsContent';
import RailwaysContent from './pages/RailwaysContent';
function MainContent() {
  return (
    <div className='mainContent-container-wrapper makeFlex make-justify-center'>
        <div className='mainContent-container'>
          <Routes>
            <Route path="/" element={<FlightsContent/>}/>
            <Route path="/flights" element={<FlightsContent/>}/>
            <Route path="/hotels" element={<HotelsContent/>}/>
            <Route path="/railways" element={<RailwaysContent/>}/>
          </Routes>
        </div>
    </div>
  )
}

export default MainContent
