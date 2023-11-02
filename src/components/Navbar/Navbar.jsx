import React from 'react'
import '../../styles/Navbar.css'
import { NavLink } from 'react-router-dom'
const navbarElements = [
    { name: "Flights", cssClassForHeaderIcons: "chFlights", path: "/flights" },
    { name: "Hotels", cssClassForHeaderIcons: "chHotels", path: "/hotels" },
    { name: "Homestays & Villas", cssClassForHeaderIcons: "chHomeStays", path: "/homestays" },
    { name: "Holidays Packages",  cssClassForHeaderIcons: "chHolidays",path: "/holidays-india" },
    { name: "Trains", cssClassForHeaderIcons: "chTrains", path: "/railways" },
    { name: "Buses", cssClassForHeaderIcons: "chBuses", path: "/bus-tickets" },
    { name: "Cabs", cssClassForHeaderIcons: "chCabs", path: "/cabs" },
    { name: "Forex Card & Currency", cssClassForHeaderIcons: "chForex", path: "/forex" },
    { name: "Travel Insurance", cssClassForHeaderIcons: "chTravelInsurance", path: "/insurance" },
]
function Navbar() {
  return (
    <div className='navbar-container makeFlex make-justify-center make-align-center'>
        <div className='navbarWrapper makeFlex make-justify-center make-align-center'>
        <nav className='bg-white navbar'>
            <ul className=' makeFlex font12 headerIconsGap'>
                {navbarElements.map((item, index)=>(
                    <li className='makeRelative'>
                        <NavLink to={item.path} className={({isActive})=>{
                            let classNames = 'makeFlex column make-align-center headerIcons'
                            index == 7 && (classNames+=' min-w-75')  
                            return isActive ? classNames+' active' : classNames
                        } }>
                            <span className='headerIconWrapper'>
                                <span className={`chSprite ${item.cssClassForHeaderIcons}`}></span>
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
