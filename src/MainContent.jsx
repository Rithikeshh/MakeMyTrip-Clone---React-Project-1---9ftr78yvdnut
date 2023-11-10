import React from 'react'
import "./styles/MainContent.css";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import FlightsContent from './pages/FlightsContent';
import HotelsContent from './pages/HotelsContent';
import RailwaysContent from './pages/RailwaysContent';
import Header from './components/Navbar/Header';
import Navbar from './components/Navbar/Navbar';

function MainContent() {


  return (
    <div className="container" >
      <Header/>
      <Navbar/>
    <div className='mainContent-container-wrapper makeFlex make-justify-center'>
      <div className='mainContent-container'>
        
        <Routes>
          <Route path='/' element={<FlightsContent/>}/>
          <Route path='flights' element={<FlightsContent/>}/>
          <Route path='hotels' element={<HotelsContent/>}/>
          <Route path='railways' element={<RailwaysContent/>}/>
          <Route path='*' element={<div>Page Not Found!!</div>}/>
        </Routes>
      </div>
    </div>
    
    </div>
  )
}

export default MainContent
