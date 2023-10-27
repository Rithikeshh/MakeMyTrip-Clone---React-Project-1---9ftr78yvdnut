import React from 'react'
import allLogo from './assets/images/allLogos.png'
import mmtLogo from './assets/images/mmtLogoWhite.png'

function Header() {
  return (
    <div className='margin-x'>
        <div className='makeFlex make-align-center make-justify-space padding-t-5 padding-b-50'>
        <div>
            <img className='mainLogo' src={mmtLogo} />
        </div>
        <div>
            <ul className="header-userLists makeFlex">
            <li className="header-userList-item makeFlex makeCenter">
                <span className="headerOfferIcon-container">
                <span className="headerOfferIcon-text">%</span>
                <span className="headerOfferIcon-logo"></span>
                </span>
                <div >
                <p className="font12 whiteText strongBold-text">Super Offers</p>
                <p className="font10 margin-y-3 grayText ">Explore great deals & offers</p>
                </div>
            </li>
            <li className="header-userList-item makeFlex makeCenter">
                <span className="myBizIcon landingSprite"></span>
                <div className="margin-r-5">
                <p className="font16 whiteText bold-text">Introducing myBiz</p>
                <p className="font10 margin-y-3 whiteText">Bussiness Travel Solution</p>
                </div>
            </li>
            <li className="header-userList-item makeFlex makeCenter">
                <span className="myTripIcon landingSprite"></span>
                <div className="margin-r-5">
                <p className="font12 whiteText bold-text">My Trips</p>
                <p className="font10 margin-y-3 grayText">Manage your bookings</p>
                </div>
            </li>
            <li className="header-userList-item makeFlex make-align-center login-user userLoggedOut font10">
                <span className="myIcon landingSprite"></span>
                <div className="flexOne whiteText bold-text">
                <p>Login or Create Account</p>
                </div>
            </li>
            <li className="header-userList-item makeFlex make-align-center geoSwitcher">
                <div>
                <div className="whiteText makeFlex makeCenter langSlct">
                    <span className="flags flagSprite margin-r-5 ind"></span>
                    <span class="bold-text capText font12">
                    <span>IN</span>
                    {" |"}
                    <span> eng</span>
                    {" |"}
                    <span> inr</span>
                    </span>
                    <span className="switcherDownArrow margin-l-10"></span>
                </div>
                </div>
            </li>
            </ul>
        </div>
        </div>
    </div>
  )
}

export default Header
