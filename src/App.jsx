import "./styles/App.css";
import allLogo from './assets/images/allLogos.png'
import mmtLogo from './assets/images/mmtLogoWhite.png'
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


const NavbarToggleContext = createContext();
function App() {

const [navbar, setNavbar] = useState(true); 
const location = useLocation();

useEffect(()=>{
  if(location.pathname.includes('search')){
    setNavbar(false)
  }
},[])


  return (
    <div className="container" >
      <AuthProvider>
        <NavbarToggleContext.Provider value={{navbar, setNavbar}}>
        <HotelBookingDetailsProvider>
        <TrainBookingDetailsProvider>
        <FlightBookingDetailsProvider>
        {navbar ?
         <>
          <Header/>
          <Navbar/>
        </> :
        <>
          <SearchNavbar/>
        </>
        }
          <Routes>
            <Route path="/" element={<MainContent><FlightsContent/></MainContent>}/>
            <Route path="/flights" element={<MainContent><FlightsContent/></MainContent>}/>
            <Route path="/hotels" element={<MainContent><HotelsContent/></MainContent>}/>
            <Route path="/railways" element={<MainContent><RailwaysContent/></MainContent>}/>
            <Route path="/flight/search" element={<FlightSearch/>}/>
          </Routes>
      </FlightBookingDetailsProvider>
      </TrainBookingDetailsProvider>
      </HotelBookingDetailsProvider>
      </NavbarToggleContext.Provider>
      </AuthProvider>
      
    </div>
  );
}

export default App;

export function useNavbarToggleContext(){
  return useContext(NavbarToggleContext)
}