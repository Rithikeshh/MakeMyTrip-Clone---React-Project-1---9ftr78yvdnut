import React, { Children } from 'react'
import "./styles/MainContent.css";
import { Routes, Route, Navigate } from "react-router-dom";
import FlightsContent from './pages/FlightsContent';
import HotelsContent from './pages/HotelsContent';
import RailwaysContent from './pages/RailwaysContent';
function MainContent({children}) {
  return (
    <div className='mainContent-container-wrapper makeFlex make-justify-center'>
      <div className='mainContent-container'>
        {children}
      </div>
    </div>
  )
}

export default MainContent
