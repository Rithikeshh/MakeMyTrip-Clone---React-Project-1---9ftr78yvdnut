import "./styles/App.css";
import allLogo from './assets/images/allLogos.png'
import mmtLogo from './assets/images/mmtLogoWhite.png'
import Header from "./components/Navbar/Header";
import Navbar from "./components/Navbar/Navbar";
import MainContent from "./MainContent";
import AuthProvider from "./provider/AuthProvider";



function App() {

 

  return (
    <div className="container" >
      <AuthProvider>
        <Header/>
        <Navbar/>
        <MainContent/>
      </AuthProvider>
      
    </div>
  );
}

export default App;
