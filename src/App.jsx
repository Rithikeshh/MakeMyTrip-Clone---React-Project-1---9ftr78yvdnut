import "./styles/App.css";
import allLogo from './assets/images/allLogos.png'
import mmtLogo from './assets/images/mmtLogoWhite.png'
import Header from "./Header";
import Navbar from "./Navbar";

function App() {
  return (
    <div className="container">
      <Header/>
      <Navbar/>
    </div>
  );
}

export default App;
