import React from 'react'
import { useAuth } from '../provider/AuthProvider'
import { useLoginModalContext } from '../provider/LoginModalProvider'

function HotelCard({hotel}) {
  const {isLoggedIn} = useAuth()
  const {setIsLoginModalVisible} = useLoginModalContext()

  function handleModal(){
    setIsLoginModalVisible(true) 
  }
  return (
    <li className='hotel-card'>
              <img src={hotel.images[0]} alt="" />
              <div>
                <h2>{hotel.name}</h2>
                <span>{hotel.location}</span>
                {
                  hotel.houseRules.guestProfile.unmarriedCouplesAllowed &&
                  <span className='coupleCheck'>Couple Friendly</span>
                }
                {
                  hotel.rooms[0].cancellationPolicy &&
                  <span className='cancelCheck'>&#8226;{" "+hotel.rooms[0].cancellationPolicy}</span>
                }
              </div>
              <section>
                <span>Rating <span>{hotel.rating}</span></span>
                <div>
                  <span>₹ {hotel.rooms[0].costDetails.baseCost}</span><br />
                  <span>+₹ {hotel.rooms[0].costDetails.taxesAndFees} taxes & fees</span> <br />
                  <span>Per Night</span>
                </div>
                {
                  !isLoggedIn && 
                  <span onClick={(e)=>{
                    e.stopPropagation()
                    handleModal()
                  }}>Login to unlock the best deals</span>
                }
              </section>
            </li>
  )
}

export default HotelCard
