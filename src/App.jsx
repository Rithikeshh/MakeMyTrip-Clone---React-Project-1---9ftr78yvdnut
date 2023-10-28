import "./styles/App.css";
import allLogo from './assets/images/allLogos.png'
import mmtLogo from './assets/images/mmtLogoWhite.png'
import Header from "./Header";
import Navbar from "./Navbar";
import MainContent from "./MainContent";

function App() {
  return (
    <div className="container">
      <Header/>
      <Navbar/>
      <MainContent/>
    </div>
  );
}

export default App;
