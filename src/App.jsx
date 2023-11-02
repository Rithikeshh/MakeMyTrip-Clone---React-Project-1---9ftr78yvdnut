import "./styles/App.css";
import allLogo from './assets/images/allLogos.png'
import mmtLogo from './assets/images/mmtLogoWhite.png'
import Header from "./components/Navbar/Header";
import Navbar from "./components/Navbar/Navbar";
import MainContent from "./MainContent";
import { createContext, useState } from "react";

export const AuthContext = createContext();

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("userDetails") ? true : false
  )

  return (
    <div className="container" >
      <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
        <Header/>
        <Navbar/>
        <MainContent/>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
