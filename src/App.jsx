import "./styles/App.css";
import Header from "./components/Navbar/Header";
import Navbar from "./components/Navbar/Navbar";
import MainContent from "./MainContent";
import AuthProvider from "./provider/AuthProvider";
import { Route, Routes, useLocation } from "react-router-dom";
import FlightsContent from "./pages/FlightsContent";
import HotelsContent from "./pages/HotelsContent";
import RailwaysContent from "./pages/RailwaysContent";
import HotelBookingDetailsProvider from "./provider/HotelBookingDetailsProvider";
import TrainBookingDetailsProvider from "./provider/TrainBookingDetailsProvider";
import FlightBookingDetailsProvider from "./provider/FlightBookingDetailsProvider";
import { createContext, useContext, useEffect, useState } from "react";
import FlightSearch from "./pages/FlightSearch";
import SearchNavbar from "./components/Navbar/SearchNavbar";
import SearchContent from "./SearchContent";
import HotelsListProvider from "./provider/HotelsListProvider";
import LoginModalProvider from "./provider/LoginModalProvider";
import SingleHotel from "./pages/SingleHotel";
import FlightListProvider from "./provider/FlightListProvider";
import FlightBookingPage from "./pages/FlightBookingPage";
import TrainListProvider from "./provider/TrainListProvider";



function App() {


  return (
    
      <AuthProvider>
      <LoginModalProvider>
      <HotelBookingDetailsProvider>
      <TrainBookingDetailsProvider>
      <FlightBookingDetailsProvider>
        <HotelsListProvider>
          <FlightListProvider>
            <TrainListProvider>
          <Routes>
            <Route path="/*" element={<MainContent/>}/>
            <Route path="/:section/search" element={<SearchContent/>}/>
            <Route path="/hotel/:hotelId" element={<SingleHotel/>}/>
            <Route path="/flight/:flightId" element={<FlightBookingPage/>}/>
          </Routes>
          </TrainListProvider>
          </FlightListProvider>
          </HotelsListProvider>
      </FlightBookingDetailsProvider>
      </TrainBookingDetailsProvider>
      </HotelBookingDetailsProvider>
      </LoginModalProvider>
      </AuthProvider>
      
    
      );
    }

export default App;

