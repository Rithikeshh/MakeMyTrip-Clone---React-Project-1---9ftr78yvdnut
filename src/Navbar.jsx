import React from 'react'
import './styles/Navbar.css'
import { NavLink } from 'react-router-dom'
const navbarElements = [
    { name: "Flights", classForCss: "chFlights", path: "/flights" },
    { name: "Hotels", classForCss: "chHotels", path: "/hotels" },
    { name: "Homestays & Villas", classForCss: "chHomeStays", path: "/homestays" },
    { name: "Holidays Packages",  classForCss: "chHolidays",path: "/holidays-india" },
    { name: "Trains", classForCss: "chTrains", path: "/railways" },
    { name: "Buses", classForCss: "chBuses", path: "/bus-tickets" },
    { name: "Cabs", classForCss: "chCabs", path: "/cabs" },
    { name: "Forex Card & Currency", classForCss: "chForex", path: "/forex" },
    { name: "Travel Insurance", classForCss: "chTravelInsurance", path: "/insurance" },
]
function Navbar() {
  return (
    <div className='navbar-container makeFlex make-justify-center make-align-center'>
        <div className='navbarWrapper makeFlex make-justify-center make-align-center'>
        <nav className='bg-white navbar'>
            <ul className=' makeFlex font12 headerIconsGap'>
                {navbarElements.map((item)=>(
                    <li className='makeRelative'>
                        <NavLink to={item.path} className={({isActive})=>{
                            let classNames = 'makeFlex column make-align-center headerIcons'  
                            return isActive ? classNames+' active' : classNames
                        } }>
                            <span className='headerIconWrapper'>
                                <span className={`chSprite ${item.classForCss}`}></span>
                            </span>
                            <span className='headerIconTextAlignment chNavText darkGreyText'>
                                {item.name}
                            </span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
        </div>
    </div>
  )
}

export default Navbar
