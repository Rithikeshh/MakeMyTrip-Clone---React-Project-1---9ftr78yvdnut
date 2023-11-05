import "./styles/App.css";
import allLogo from './assets/images/allLogos.png'
import mmtLogo from './assets/images/mmtLogoWhite.png'
import Header from "./components/Navbar/Header";
import Navbar from "./components/Navbar/Navbar";
import MainContent from "./MainContent";
import AuthProvider from "./provider/AuthProvider";
import { Route, Routes } from "react-router-dom";
import FlightsContent from "./pages/FlightsContent";
import HotelsContent from "./pages/HotelsContent";
import RailwaysContent from "./pages/RailwaysContent";
import HotelBookingDetailsProvider from "./provider/HotelBookingDetailsProvider";
import TrainBookingDetailsProvider from "./provider/TrainBookingDetailsProvider";



function App() {

 

  return (
    <div className="container" >
      <AuthProvider>
        <HotelBookingDetailsProvider>
        <TrainBookingDetailsProvider>
        <Header/>
        <Navbar/>
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
        {/* <Routes>
        
        </Routes> */}
      </TrainBookingDetailsProvider>
      </HotelBookingDetailsProvider>
      </AuthProvider>
      
    </div>
    // <div>
    //   <Routes>
    //       <Route path="/search" element={<div>



    //       </div>}/>
    //     </Routes>
    // </div>
  );
}

export default App;
