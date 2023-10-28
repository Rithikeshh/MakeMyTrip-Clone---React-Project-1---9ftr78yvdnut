import React from 'react'
import "./styles/MainContent.css";
import { Routes, Route, Navigate } from "react-router-dom";
import FlightsContent from './components/FlightsContent';
function MainContent() {
  return (
    <div className='mainContent-container-wrapper makeFlex make-justify-center'>
        <div className='mainContent-container'>
            <FlightsContent/>
        </div>
    </div>
  )
}

export default MainContent
