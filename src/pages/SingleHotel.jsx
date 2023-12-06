 import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import SearchNavbar from '../components/Navbar/SearchNavbar';
import SearchPageLocationInputContainer from '../components/SearchContentComponent/SearchPageLocationInputContainer';
import SearchPageCalendarInputContainer from '../components/SearchContentComponent/SearchPageCalendarInputContainer';
import { useHotelBookingDetailsContext } from '../provider/HotelBookingDetailsProvider';
import { useHotelsListContext } from '../provider/HotelsListProvider';
import getHotel from '../utils/getHotel';
import './SingleHotel.css'
 
 function SingleHotel() {
    const {hotelId} = useParams()
    const {hotelBookingState, dispatchHotelBookingState} = useHotelBookingDetailsContext()
    const navigate = useNavigate()
    const [hotel, sethotel] = useState(null)
    const [loading, setLoading] = useState(true);
    const [hotelName, setHotelName] = useState('');
    const mapRef = useRef();
    const carouselRef = useRef();
    const carouselIndexRef = useRef(0);
    const stopMoveCarouselRef = useRef();
    const startMoveCarouselRef = useRef()
    console.log(hotelId);
    useEffect(()=>{
      getHotel(hotelId, sethotel, setHotelName, setLoading)
      // moveCarousel();
      
      return ()=>{
        clearInterval(stopMoveCarouselRef.current)
      }
    },[])
    function moveCarousel(){
      stopMoveCarouselRef.current =setInterval(()=>{
        scrollRight()
      },3000)
    }
    function scrollLeft(){
      if(carouselIndexRef.current > 0){
        carouselRef.current.scrollLeft -= document.body.clientWidth;
        carouselIndexRef.current -= 1
      }
      else{
        carouselRef.current.scrollLeft += 10000;
        carouselIndexRef.current = 3;
      }
    }
    function scrollRight(){
      if(carouselIndexRef.current < 3){
        carouselRef.current.scrollLeft += document.body.clientWidth;
        carouselIndexRef.current += 1
      }
      else{
        carouselRef.current.scrollLeft -= 10000;
        carouselIndexRef.current = 0;
      }
    }
    function startCarousel(){
      if(startMoveCarouselRef.current){
        clearTimeout(startMoveCarouselRef.current)
      }
      startMoveCarouselRef.current = setTimeout(()=>{
        moveCarousel()
      },10000);
    }
   return (
     <div>
       <SearchNavbar/>
       <div className='searchPage-header-container'>
       <div className='makeFlex'>
        <section className='searchPage-booking-details-container'>
            
            <div className='searchPage-booking-input'>
                <label  htmlFor='location' className='searchPage-booking-inputBox'>
                    <span>{'City, Area Or Property'}</span>
                    <input type="text" id={'location'} onChange={(e)=>setHotelName(e.target.value)} value={hotelName}/> 
                </label>
            </div>
            {/* <SearchPageLocationInputContainer
            inputId={'location'} 
            spanHeading={'City, Area Or Property'}
            value={hotelBookingState.city}
            dispatch={dispatchHotelBookingState}
            type={'hotelLocation'}
            /> */}
            <SearchPageCalendarInputContainer
            labelFor={'checkIn'}
            spanHeading={'Check-In'}
            value={hotelBookingState.checkIn}
            dispatch={dispatchHotelBookingState}
            type={'hotleCheckIn'}
            />
            <SearchPageCalendarInputContainer
            labelFor={'checkOut'}
            spanHeading={'Check-Out'}
            value={hotelBookingState.checkOut}
            dispatch={dispatchHotelBookingState}
            type={'hotleCheckOut'}
            />
            <div className='searchPage-booking-input'>
                <label htmlFor='rooms' className='searchPage-booking-inputBox'>
                    <span className='dropdown'>Rooms & Guests</span>
                    <div >
                    <span >{1}</span>{' '}
                    <span>{'Room'}</span>{', '}
                    <span>{2}</span>{' '}
                    <span>{'Adults'}</span>
                    </div>
                </label>
            </div>
        </section>
        <section>
            <p className='makeFlex make-justify-center'>
                <button onClick={()=>{
                    // dispatchHotelBookingState({type:'hotelLocation', payload: hotelName})
                    navigate('/hotel/search')
                }} className='primaryBtn widgetSearchBtn bold-text' to="/hotel/search">SEARCH</button>
            </p>
        </section>
        <div className='paths'>
            <Link to={'/'}><span>Home {" > "}</span></Link>
            <Link to={'/hotel/search'}><span>Hotels In {hotelBookingState.city} {" > "}</span></Link>
            <Link><span>{hotelName}</span></Link>
          </div>
        </div>
      </div>
      {loading ? 
        <div>Loading...</div> :
        <>
        <div style={{position:"relative"}}>
          <div ref={carouselRef} id='carousel' className='hotel-cover-container'>

            {hotel.images.map((image, index)=>(
              <picture key={index} className='carousel-picture'>
                <img src={image} alt='cover'/>
              </picture>
            ))}
            
          </div>
          <div>
            <button onClick={()=>{
              scrollLeft();
              clearInterval(stopMoveCarouselRef.current);
              startCarousel()
            }} className='carousel-scroll-left'></button>
            <button onClick={()=>{
              scrollRight();
              clearInterval(stopMoveCarouselRef.current);
              startCarousel();
            }} className='carousel-scroll-right'></button>
          </div>
          <div className='fix-book-hotel'>
            <div className='fix-book-hotel-non-scrollable'>
              <img src={hotel.images[0]} alt="" />
              <h3>Recommended room</h3>
              <div className='fix-book-hotel-room-details'>
                <div>
                  <span><span>Room 1: </span>{hotel.rooms[0].roomType}</span>
                  <span><span>Bed : </span>{hotel.rooms[0].bedDetail}</span>
                </div>
                <div>
                  <span>Price per night </span>
                  <span>₹ {hotel.rooms[0].costPerNight}</span>
                </div>
              </div>
              <div className='fix-book-hotel-bookNow'>
                <button>Book Now</button>
              </div>
            </div>
          </div>
          <div className='hotel-name'>
            <h1>{hotelName}</h1>
          </div>
        </div>
        <div className='rating'>
            <div>
              <span>Rating </span>
              <span>{hotel.rating}</span>
            </div>
            <div>
              <div>
                <img src="//imgak.mmtcdn.com/pwa_v3/pwa_hotel_assets/map-bg-new.png" alt="" />
              </div>
              <span onClick={()=>{
                let rect = mapRef.current.getBoundingClientRect()
                console.log(rect);
                window.scrollBy({top:rect.top-100, left:0, behavior: "smooth"})
              }}>View On Map</span>
            </div>
        </div>
        <div className='singleHotel-about'>
          <h1>About {hotelName}</h1>
          <p>{hotelName} is the epitome of world-class architecture and comfort with premium dining spaces, world-class leisure amenities, and unbeatable hospitality. </p>
          <div className='singleHotel-about-list'>
              <ul>
                <li>Take a refreshing dip in the outdoor swimming pool while kids splash around in the kids' pool.</li>
                <li>Relish gourmet Indian specialities at the property's award-winning restaurant, Baluchi.</li>
                <li>Enjoy a holistic spa session or a beauty treatment at in-house spa and salon.</li>
              </ul>
          </div>
        </div>
        <div className='singleHotel-select-rooms'>
            <div className='singleHotel-card-container'>
              <h2>Select Rooms</h2>
              {hotel.rooms.map((room, index)=>(
              <div key={index} className='singleHotel-card'>
                <div >
                  <p className='singleHotel-card-heading'>{hotelName} Executive {room.roomType}, {room.bedDetail.split(' ')[1]} Bed with Sit out Living Room/ Seperate Dining Area and Bathtub</p>
                  <div className='singleHotel-card-room-imageAndBed'>
                    <img src={hotel.images[Math.ceil(Math.random()*3)]} alt="" />
                    <div className='singleHotel-card-bedDetails'>
                      <ul>
                        <li>
                          <img src="https://promos.makemytrip.com/Hotels_product/Hotel_SR/Android/drawable-hdpi/view.png" alt="" />
                          <span>{room.roomSize} sq. ft</span>
                        </li>
                        <li>
                          <img src="https://promos.makemytrip.com/Hotels_product/Hotel_SR/Android/drawable-hdpi/view.png" alt="" />
                          <span>City View</span>
                        </li>
                        <li>
                          <img src="https://promos.makemytrip.com/Hotels_product/Hotel_SR/Android/drawable-hdpi/bed.png" alt="" />
                          <span>{room.bedDetail}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div>
                  <div className='singleHotel-card-breakfastOption'>
                    <span>Room with Breakfast</span>
                    <div>
                      <span className='cross-icon'></span>
                      <span>Non-Refundable</span>
                    </div>
                    <div>
                      <span className='tick-icon'></span>
                      <span>Free Breakfast</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <span style={{color:"grey"}}>Per night for a Room</span>
                  </div>
                  <div className='singleHotel-card-price-section'>
                    <div>
                      <span>₹ {room.costDetails.baseCost}</span>
                      <span>+₹ {room.costDetails.taxesAndFees} taxes & fees</span>
                    </div>
                    <div>
                      <button>Book Now</button>
                    </div>
                  </div>
                </div>
              </div>)).filter((room,index)=> index < 4)}
            </div>
        </div>
        <div className='singleHotel-location'>
          <h2>Location</h2>
          <div ref={mapRef} className='map-container'>
            <iframe className='map' src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d223994.09818129404!2d77.09004195!3d28.692405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1699640662870!5m2!1sen!2sin" frameBorder="0"></iframe>
          </div>
        </div>
        <div className='singleHotel-amenities'>
          <h2>Amenities at {hotelName}</h2>
          <div>
            <ul className='singleHotel-amenitiesList'>
            {
              hotel.amenities.map((amenity, index)=>(
                <li key={index}>{amenity}</li>
              ))
            }
            </ul>
          </div>
        </div>
        <div className='sinigleHotel-propertyRules'>
          <h2>Property Rules</h2>
          <div>
            <p>
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"></path><path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"></path><path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"></path></svg>
              <span>Check-in: After 02:00 PM, Check-out: 12:00 PM.</span>
            </p>
            <p>
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M200 23v18h21.895l-14.31 123.303c-14.473 8.144-25.962 16.414-34.18 25.265-9.02 9.712-14.405 20.57-14.405 31.97V445.54c0 11.4 5.042 21.877 12.348 29.794 7.305 7.917 17.208 13.666 28.35 13.666H312c11.23 0 21.24-5.72 28.596-13.645C347.953 467.432 353 456.94 353 445.54v-224c0-11.402-5.386-22.26-14.404-31.972-8.22-8.85-19.708-17.12-34.18-25.265L290.106 41H312V23H200zm40.016 18h31.968l8.094 69.727c-2.328-.97-4.98-1.573-8.078-1.573-10.342 0-17.062 6.425-22.15 10.772-5.09 4.346-5.982 7.135-9.85 6.46-4.685-.82-6.447-6.444-8.57-11.41L240.016 41zm31.25 86.113c.235.003.48.016.734.04 5.087.508 7.665 5.963 11.2 10.476l1.212 10.438a9.6 10.338 0 0 0-9.213-7.453 9.6 10.338 0 0 0-9.6 10.338 9.6 10.338 0 0 0 9.6 10.338 9.6 10.338 0 0 0 9.585-10.01l2.817 24.265 4.13 2.225c15.45 8.318 26.69 16.527 33.672 24.046 6.982 7.52 9.596 13.893 9.596 19.723v42.69h-25.568A64 94.77 0 0 0 256 221.54a64 94.77 0 0 0-53.416 42.69H177v-42.69c0-5.83 2.614-12.204 9.596-19.724s18.223-15.728 33.672-24.046l4.13-2.225 4.047-34.856c3.09 2.163 6.88 3.695 11.555 3.695 10.237 0 16.543-6.503 21.54-10.772 4.686-4.002 6.196-6.534 9.726-6.5zM256 166.4a9.6 10.338 0 0 0-9.6 10.338 9.6 10.338 0 0 0 9.6 10.338 9.6 10.338 0 0 0 9.6-10.338A9.6 10.338 0 0 0 256 166.4zm19.2 15.57a9.6 10.338 0 0 0-9.6 10.337 9.6 10.338 0 0 0 9.6 10.338 9.6 10.338 0 0 0 9.6-10.338 9.6 10.338 0 0 0-9.6-10.338zM256 247c13.42 0 23.9 9.857 30.578 22.445 1.962 3.698 3.663 7.726 5.098 12.016H336v18h-40.156c.757 5.4 1.156 11.038 1.156 16.85 0 12.354-1.775 23.944-5.06 34.075H336v18h-52.535c-6.64 9.987-15.97 17.23-27.465 17.23-11.496 0-20.825-7.243-27.465-17.23H176v-18h44.06c-3.285-10.13-5.06-21.72-5.06-34.076 0-5.812.4-11.45 1.156-16.85H176v-18h44.324c1.435-4.29 3.136-8.317 5.098-12.015C232.102 256.857 242.58 247 256 247zm0 18c-4.253 0-9.775 3.644-14.678 12.883-4.902 9.24-8.322 23.063-8.322 38.426 0 15.362 3.42 29.183 8.322 38.422 4.903 9.24 10.425 12.883 14.678 12.883s9.775-3.643 14.678-12.883c4.902-9.24 8.322-23.06 8.322-38.423 0-15.364-3.42-29.188-8.322-38.427C265.775 268.643 260.253 265 256 265zm-79 120.615h35.47a64 94.77 0 0 0 43.53 25.46 64 94.77 0 0 0 43.572-25.46H335v59.924c0 5.83-2.953 12.567-7.596 17.567-4.643 5-10.635 7.893-15.404 7.893H199.697c-4.555 0-10.502-2.867-15.12-7.873-4.62-5.006-7.577-11.758-7.577-17.588v-59.925z"></path></svg>
              <span>Alcohol consumption allowed within the premises.</span>
            </p>
            <p>
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.1" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M4 1.5c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5c0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5z"></path><path d="M13 1.5c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5c0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5z"></path><path d="M4 4h-3c-0.552 0-1 0.448-1 1v5h1v6h1.25v-6h0.5v6h1.25v-6h1v-5c0-0.552-0.448-1-1-1z"></path><path d="M15.234 8l0.766-0.555-2.083-3.221c-0.092-0.14-0.249-0.225-0.417-0.225h-4c-0.168 0-0.325 0.084-0.417 0.225l-2.083 3.221 0.766 0.555 1.729-2.244 0.601 1.402-2.095 3.841h1.917l0.333 5h1v-5h0.5v5h1l0.333-5h1.917l-2.095-3.842 0.601-1.402 1.729 2.244z"></path></svg>
              <span>Un-Married couples are {hotel.houseRules.guestProfile.unmarriedCouplesAllowed ? null : 'not'} allowed.</span>
            </p>
            <p>
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 32 32" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M 20.3125 3 L 20.0625 3.65625 L 17.3125 11 L 9.625 11 C 8.710938 11 7.84375 11.257813 7.125 11.71875 L 4.71875 9.28125 L 3.28125 10.71875 L 5.71875 13.125 C 5.257813 13.84375 5 14.710938 5 15.625 C 5 16.128906 5.085938 16.644531 5.25 17.125 L 5.96875 19.21875 L 5.03125 22.75 L 5 22.875 L 5 28 L 7 28 L 7 23.125 L 7.96875 19.46875 L 8.03125 19.15625 L 7.9375 18.875 L 7.125 16.46875 C 7.035156 16.199219 7 15.910156 7 15.625 C 7 14.15625 8.15625 13 9.625 13 L 17.65625 13 L 21 16.28125 L 21 13.46875 L 19.1875 11.6875 L 21.25 6.15625 L 21.5 6.53125 L 21.78125 7 L 23.65625 7 L 26.71875 9.3125 L 25.875 11 L 22 11 L 22 16.875 L 21.0625 19.6875 L 21 19.84375 L 21 23.125 L 22 27.125 L 22 28 L 24 28 L 24 26.875 L 23 22.875 L 23 20.125 L 23.9375 17.3125 L 24 17.15625 L 24 13 L 27.125 13 L 29.28125 8.6875 L 28.59375 8.1875 L 24.34375 5 L 22.90625 5 L 21.9375 3.46875 L 21.65625 3 Z M 10.21875 18 L 9 22.875 L 9 28 L 11 28 L 11 23.125 L 11.78125 20 L 12.71875 20 C 13.070313 20.234375 14.3125 21 16 21 L 17 21 L 17 23.125 L 18 27.125 L 18 28 L 20 28 L 20 26.875 L 19 22.875 L 19 19 L 16 19 C 14.9375 19 13.5625 18.15625 13.5625 18.15625 L 13.3125 18 Z"></path></svg>
              <span>Pets are {hotel.houseRules.restrictions.petsAllowed ? null: 'not'} allowed within the premises.</span>
            </p>
            <p>
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 32 32" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M 16.03125 4 C 15.671875 4.359375 15.40625 4.785156 15.09375 5.46875 C 14.78125 6.152344 14.503906 7.011719 14.5 7.96875 C 14.496094 8.925781 14.828125 10.019531 15.6875 10.84375 C 16.546875 11.667969 17.859375 12.203125 19.6875 12.4375 C 21.210938 12.632813 22.191406 12.882813 22.75 13.21875 C 23.308594 13.554688 23.539063 13.898438 23.71875 14.71875 L 25.6875 14.28125 C 25.429688 13.101563 24.777344 12.097656 23.78125 11.5 C 22.785156 10.902344 21.566406 10.644531 19.9375 10.4375 C 18.378906 10.238281 17.507813 9.800781 17.0625 9.375 C 16.617188 8.949219 16.5 8.511719 16.5 7.96875 C 16.5 7.425781 16.675781 6.816406 16.90625 6.3125 C 17.136719 5.808594 17.492188 5.351563 17.4375 5.40625 Z M 21.5625 4.3125 L 21.5625 6.3125 C 22.183594 6.3125 22.984375 6.40625 23.59375 6.75 C 24.203125 7.09375 24.71875 7.601563 24.84375 9.0625 L 24.9375 10 L 25.84375 10 C 26.359375 10 27.433594 10.160156 27.96875 10.625 C 28.234375 10.859375 28.40625 11.132813 28.46875 11.65625 C 28.53125 12.179688 28.4375 12.980469 27.96875 14.125 L 29.84375 14.875 C 30.402344 13.515625 30.585938 12.386719 30.46875 11.40625 C 30.351563 10.425781 29.875 9.644531 29.28125 9.125 C 28.378906 8.335938 27.398438 8.132813 26.59375 8.0625 C 26.246094 6.617188 25.523438 5.527344 24.59375 5 C 23.472656 4.363281 22.304688 4.3125 21.5625 4.3125 Z M 1 16 L 1 22 L 31 22 L 31 16 Z M 3 18 L 23 18 L 23 20 L 3 20 Z M 25 18 L 26 18 L 26 20 L 25 20 Z M 28 18 L 29 18 L 29 20 L 28 20 Z"></path></svg>
              <span>Smoking is {hotel.houseRules.restrictions.smokingAllowed ? null: 'not'} allowed within the premises.</span>
            </p>
            <p>
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5ZM9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8Zm1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Z"></path><path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2ZM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.96c.026-.163.04-.33.04-.5C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1.006 1.006 0 0 1 1 12V4Z"></path></svg>
              <span>
                {hotel.houseRules.restrictions.idProofsAccepted.map((id,index)=>(
                  <span key={index}>{id}, </span>
                ))
                } are accepted ID proofs.</span>
            </p>
            <p>
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z"></path><path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z"></path></svg>
              <span>Guests can pay by Debit/ Credit Card (VISA & Mastercard).</span>
            </p>
          </div>
        </div>
        <div className='singleHotel-review-container'>
          <h3>Guest Reviews</h3>
          <div>
            {
              reviewArr.map((review)=>(
                <div>
                  <div className='review-heading'><span>{review.heading}</span></div>
                  <div>
                    <span><span style={{fontWeight:'500', color:'#3c3f3f'}}>Rated </span><span className='review-rating'>{review.rate}</span></span>
                    <span className='review-by'> {review.by}</span>
                  </div>
                  <div className='review'>
                    <span>{review.review}</span>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        </>
      }
      
     </div>
     
   )
 }
 
 export default SingleHotel
 



const reviewArr = [
  {heading: 'Nice and comfortable stay', rate: '4.0', by: 'by Nitinkumar Jain . Dec 02, 2023', review: "Appropriate room size with all required amenities in place, interior is of little old fashioned style but it doesn't bother because of high cleanliness level, breakfast spread is good enough however love counter is missing with few other items"},
  {heading: 'Review', rate: '3.0', by: 'by Vibhash Kumar . Dec 01, 2023', review: "Rooms were quite old & need proper maintenece. Deluxe rooms are average. Food quality okay. No smart tv in room. Average service from in-room service, at reception area & dinning area"},
  {heading: 'Excellent Stay', rate: '5.0', by: 'by Sumit Dixit . Family Traveller . Nov 29, 2023', review: "Excellent property to stay just amazing strongly recommended to visitors great"},
  {heading: 'A stay that was value for money', rate: '5.0', by: 'by Subodh Goel . Solo Traveller . Nov 27, 2023', review: "Very comfortable stay and services offered also were upto the standards. Great hospitality with great team."},
  {heading: 'Good infrastructure with average services', rate: '4.0', by: 'by Sanjan Das . Solo Traveller . Nov 26, 2023', review: "Hotel has a grand appearance. Rooms are old. Few years later it might turn into a heritage hotel. Found the staff little rude, specifically the in house dining staff."},
]

























//  <div>
//       <div class="lighblBg">
//    <div class="innerWrap">
//       <div class="white__paper">
//          <div class="mflex">
//             <div>
//                <div class="mflex acenter">
//                   <span class="headcol mgr15">Radisson Blu</span><span class="starImg mgr15"><img class="fas fa-star" src="	https://www.easemytrip.com/hotels/images/icon-star.svg"/><img class="fas fa-star" src="https://www.easemytrip.com/hotels/images/icon-star.svg"/><img class="fas fa-star" src="	https://www.easemytrip.com/hotels/images/icon-star.svg"/></span>
//                   <div class="type-hotel">Hotel</div>
//                   <div class="clr"></div>
//                </div>
//                <p class="dprtinfo ng-binding"><img src="https://www.easemytrip.com/Hotels/img/map-marker.svg" class="mgr6"/> Mumbai, Maharashtra</p>
//             </div>
//             <div class="rate-col">
//                <div class="Review-Section-item">
//                   <div class="Review-Section-scoreText"><span class="Review-Section-scoreText">Very Good</span></div>
//                   <div class="Review-Section-count"><span>76</span><span> reviews</span></div>
//                </div>
//                <div class="review-bg-g">3.5</div>
//             </div>
//          </div>
//          <div class="mflex">
//             <div class="wid70_nv">
//                <div class="mflex">
//                   <div class="wid56_nv hgt294">
//                      <div class="slideshow-container">
//                         <div class="mySlides fade">
//                            <div class="numbertext">1 / 4</div>
//                            <img class="listImage" src="https://unsplash.com/photos/Cj7a21nHLyo/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8NjZ8fGhvdGVsfGVufDB8fHx8MTY5NzA4ODA4NXww" alt="Slide 1" style={{width: "100%"}}/>
//                         </div>
//                         <a class="prev"></a><a class="next"></a>
//                      </div>
//                   </div>
//                   <div class="wid44 imgwrap">
//                      <div class="smallpic"><img src="https://unsplash.com/photos/UPv0s6izv2Y/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjUxfHxob3RlbHxlbnwwfHx8fDE2OTcwODExODV8MA"/></div>
//                      <div class="smallpic"><img src="https://unsplash.com/photos/ej52Nm_-RUA/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTE5fHxob3RlbHxlbnwwfHx8fDE2OTcwOTE0OTJ8MA"/></div>
//                      <div class="smallpic"><img src="https://unsplash.com/photos/w1gguH6xRUc/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjQwfHxob3RlbHxlbnwwfHx8fDE2OTcxMDMzMTN8MA"/></div>
//                   </div>
//                </div>
//             </div>
//             <div class="wid30 bdrtop">
//                <div class="mflex">
//                   <div class="wid56n2 mrel">
//                      <i class="rtyphr2 clrbg1"></i>
//                      <p class="toptl liclmp3 mglf5">Suite Room/Day use Room from 12 PM to 3 PM (Check in and check out on same dat)</p>
//                      <p class="sbtoptl">2 x Guest | 1 x Room</p>
//                   </div>
//                   <div class="wid44n2 t_right">
//                      <div class="act_price"><span class="black_INR"></span>2734</div>
//                      <span class="prntax">+<i class="smalltx_INR"></i>409 Taxes &amp; fees</span><span class="prn">base price(Per Night)</span>
//                   </div>
//                </div>
//                <div class="checkincol mflex js-sb">
//                   <div class="mflex chktime" style={{width: "50%"}}><img src="https://www.easemytrip.com/Hotels/img/calendar_icon.svg"/><span class="chktime">CHECK-IN: </span>&nbsp; <span class="blk">12:00 PM </span></div>
//                   <div class="mflex chktime" style={{width: "50%"}}><img src="https://www.easemytrip.com/Hotels/img/calendar_icon.svg"/><span class="chktime">CHECK-out: </span>&nbsp; <span class="blk">12:00 PM </span></div>
//                </div>
//                <div class="amentyclm">
//                   <ul class="nwamenty">
//                      <li ng-repeat="amen in info.showFacility"><img src="https://www.easemytrip.com/Hotels/img/gym-icon.svg"/><span>Gymnasium</span></li>
//                      <a id="amentsect" class="cpointer">
//                         <li><img src="https://www.easemytrip.com/Hotels/img/feather-plus.svg"/><span class="moreamn">21 Amenities</span></li>
//                      </a>
//                   </ul>
//                </div>
//                <div class="btnhcolnv2 ol mflex js-sb fixbtn"><a class="ouline-btn" href="#room" id="room">Select Rooms</a><a class="fill-btn">Book Now</a></div>
//             </div>
//          </div>
//       </div>
//    </div>
//    <div class="innerWrap">
//       <div class="wid100 mgt20 page-section stickynav">
//          <div class="white__paperv2">
//             <ul class="menuitem navigation" id="mainNav">
//                <li><a class="navigation__link" href="#room">Rooms</a></li>
//                <li><a class="navigation__link" href="#high">Overview</a></li>
//                <li><a class="navigation__link " href="#ament">Amenities</a></li>
//                <li><a class="navigation__link" href="#loctn">Location</a></li>
//                <li><a class="navigation__link" href="#policy">Booking Policy</a></li>
//                <li><a class="navigation__link" href="#grat">Guest Rating</a></li>
//             </ul>
//          </div>
//       </div>
//       <div class="clr"></div>
//       <div class="fullBlock page-section">
//          <div class="in_box_2">
//             <div class="hdr_part">
//                <div class="wid_26">
//                   <div class="txt_hdr">Room Type</div>
//                </div>
//                <div class="wid_26">
//                   <div class="txt_hdr"> Benefits </div>
//                </div>
//                <div class="wid_40" style={{textAlign: "center"}}>
//                   <div class="txt_hdr">Per  Night Price </div>
//                </div>
//             </div>
//             <div class="box_body mrel">
//                <div class="wid_25_b">
//                   <div class="box_txt bdr_no">
//                      <h4>Suite Room/Day use Room from 12 PM to 3 PM (Check in and check out on same dat)</h4>
//                      <div class="imgroomcl"><img src="https://unsplash.com/photos/UPv0s6izv2Y/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjUxfHxob3RlbHxlbnwwfHx8fDE2OTcwODExODV8MA"/></div>
//                      <div class="Pillswrap2">
//                         <ol class="Pills">
//                            <li class="bdtype">2 Twin Beds</li>
//                         </ol>
//                      </div>
//                   </div>
//                </div>
//                <div class="wid_75_b">
//                   <div class="wid_75_b_in">
//                      <div class="wid_75_30">
//                         <div class="box_txt m_15 hscroll nw mrel">
//                            <div>
//                               <i class="rtyphr clrbg1"></i>
//                               <div class="hediner">Room Only</div>
//                               <div class="infoCol_n2"><img src="https://flight.easemytrip.com/Content/img/tick1.svg" class="tickgreen"/><span>Breakfast not included</span></div>
//                               <div class="infoCol_n2"><img src="https://flight.easemytrip.com/Content/img/tick1.svg" class="tickgreen"/><span>Booking is non refundable.</span></div>
//                            </div>
//                         </div>
//                      </div>
//                      <div class="wid_75_50">
//                         <div class="wid60">
//                            <div class="save_box">Book Now and Get Rs. 224 Off</div>
//                            <div class="mga_15">
//                               <div class="act_price"><span class="black_INR"></span>2734<span class="prntax">+<i class="smalltx_INR"></i>409 Taxes &amp; fees</span><span class="prn">(Per Night)</span></div>
//                            </div>
//                         </div>
//                         <div class="wid40">
//                            <div class="btnhcol" id="availbtn0_0"><a class="fill-btns bdrds20">Book Now</a></div>
//                            <div class="clr"></div>
//                            <div class="recm" id="topmost0_0"><img src="https://hotel.easemytrip.com/Images/Hotel/icon/recommded-3.svg" style={{width: "60px"}}/></div>
//                         </div>
//                      </div>
//                   </div>
//                </div>
//             </div>
//             <div class="box_body mrel">
//                <div class="wid_25_b">
//                   <div class="box_txt bdr_no">
//                      <h4>Deluxe Room/Day use Room from 12 PM to 3 PM (Check in and check out on same dat)</h4>
//                      <div class="imgroomcl"><img src="https://unsplash.com/photos/UPv0s6izv2Y/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjUxfHxob3RlbHxlbnwwfHx8fDE2OTcwODExODV8MA"/></div>
//                      <div class="Pillswrap2">
//                         <ol class="Pills">
//                            <li class="bdtype">2 Twin Beds</li>
//                         </ol>
//                      </div>
//                   </div>
//                </div>
//                <div class="wid_75_b">
//                   <div class="wid_75_b_in">
//                      <div class="wid_75_30">
//                         <div class="box_txt m_15 hscroll nw mrel">
//                            <div>
//                               <i class="rtyphr clrbg1"></i>
//                               <div class="hediner">Room Only</div>
//                               <div class="infoCol_n2"><img src="https://flight.easemytrip.com/Content/img/tick1.svg" class="tickgreen"/><span>Breakfast not included</span></div>
//                               <div class="infoCol_n2"><img src="https://flight.easemytrip.com/Content/img/tick1.svg" class="tickgreen"/><span>Booking is non refundable.</span></div>
//                            </div>
//                         </div>
//                      </div>
//                      <div class="wid_75_50">
//                         <div class="wid60">
//                            <div class="save_box">Book Now and Get Rs. 224 Off</div>
//                            <div class="mga_15">
//                               <div class="act_price"><span class="black_INR"></span>3112<span class="prntax">+<i class="smalltx_INR"></i>211 Taxes &amp; fees</span><span class="prn">(Per Night)</span></div>
//                            </div>
//                         </div>
//                         <div class="wid40">
//                            <div class="btnhcol" id="availbtn0_0"><a class="fill-btns bdrds20">Book Now</a></div>
//                            <div class="clr"></div>
//                            <div class="recm" id="topmost0_0"><img src="https://hotel.easemytrip.com/Images/Hotel/icon/recommded-3.svg" style={{width: "60px"}}/></div>
//                         </div>
//                      </div>
//                   </div>
//                </div>
//             </div>
//             <div class="box_body mrel">
//                <div class="wid_25_b">
//                   <div class="box_txt bdr_no">
//                      <h4>Double Room/Day use Room from 12 PM to 3 PM (Check in and check out on same dat)</h4>
//                      <div class="imgroomcl"><img src="https://unsplash.com/photos/ej52Nm_-RUA/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTE5fHxob3RlbHxlbnwwfHx8fDE2OTcwOTE0OTJ8MA"/></div>
//                      <div class="Pillswrap2">
//                         <ol class="Pills">
//                            <li class="bdtype">2 Twin Beds</li>
//                         </ol>
//                      </div>
//                   </div>
//                </div>
//                <div class="wid_75_b">
//                   <div class="wid_75_b_in">
//                      <div class="wid_75_30">
//                         <div class="box_txt m_15 hscroll nw mrel">
//                            <div>
//                               <i class="rtyphr clrbg1"></i>
//                               <div class="hediner">Room Only</div>
//                               <div class="infoCol_n2"><img src="https://flight.easemytrip.com/Content/img/tick1.svg" class="tickgreen"/><span>Breakfast not included</span></div>
//                               <div class="infoCol_n2"><img src="https://flight.easemytrip.com/Content/img/tick1.svg" class="tickgreen"/><span>Booking is non refundable.</span></div>
//                            </div>
//                         </div>
//                      </div>
//                      <div class="wid_75_50">
//                         <div class="wid60">
//                            <div class="save_box">Book Now and Get Rs. 224 Off</div>
//                            <div class="mga_15">
//                               <div class="act_price"><span class="black_INR"></span>7647<span class="prntax">+<i class="smalltx_INR"></i>129 Taxes &amp; fees</span><span class="prn">(Per Night)</span></div>
//                            </div>
//                         </div>
//                         <div class="wid40">
//                            <div class="btnhcol" id="availbtn0_0"><a class="fill-btns bdrds20">Book Now</a></div>
//                            <div class="clr"></div>
//                            <div class="recm" id="topmost0_0"><img src="https://hotel.easemytrip.com/Images/Hotel/icon/recommded-3.svg" style={{width: "60px"}}/></div>
//                         </div>
//                      </div>
//                   </div>
//                </div>
//             </div>
//          </div>
//       </div>
//       <div class="fullBlock page-section" id="policy">
//          <div class="in_box_2" style={{margin: "10px"}}>
//             <div class="fnt16">Booking Policy</div>
//             <ul class="bplicy">
//                <li>As per the government regulations, every guest above the 18 years has to carry a valid Photo ID. The identification proofs can be Driving License, Voters Card, Passport and Ration Card. Without valid ID, guests will not be allowed to check in.</li>
//                <li>EaseMyTrip.com will not be responsible for the check-in denied by the hotel due to the above-mentioned reason.</li>
//                <li>The primary guest checking-in to the hotel must be minimum of 18 years old. Children accompanying adults may be between 1 and 12 years.</li>
//                <li>Guests will be charged for extra bed, food and other facilities which are not mentioned in the booking and may vary as per the hotel.</li>
//                <li>If an extra bed is included in your booking, you may be provided with a folding cot or a mattress as an extra bed (depends on hotel).</li>
//                <li>Generally, check-in / check-out time varies from hotel to hotel and can be checked on the confirmation voucher, However, for early check-in or late check-out, you are advised to confirm the same directly from the concerned hotel.</li>
//                <li>The room tariff is inclusive of all taxes but the amount paid does not include charges for any additional services and facilities (such as room service, mini bar, snacks or telephone calls). These services will be charged by the hotel at the time of check-out.</li>
//                <li>If the hotel denies accommodation to the guests posing as a 'couple' on not providing suitable ID proof, EaseMyTrip.com will not be responsible for this condition and won’t provide any refund for such bookings.</li>
//                <li>The hotel reserves the right to decline accommodation to locals/city residents. EaseMyTrip.com will not be responsible for any check-in declined by the hotel or any refunds due to the above-mentioned reason.</li>
//                <li>For any modifications, users have to pay applicable cancellation/modification charges. Modified bookings will be subject to availability and may depend on the booking policy of the hotel. The cancellation/modification charges are standard and any waiver is on the discretion of the hotel.</li>
//                <li>In case of cancellation or modification, entire benefit (discount / cash back) on the actual booking amount will be forfeited.</li>
//                <li>EaseMyTrip.com reserves the right, at any time, without prior notice and liability and without assigning any reason whatsoever, to add/alter/modify/change or vary all of these terms and conditions or to replace, wholly or in part, this offer by another offer, whether similar to this offer or not, or to extend or withdraw it altogether.</li>
//                <li>In case of partial/full cancellation, the offer stands void, and the discount / cash back will be rolled back before processing the refunds.</li>
//                <li>Gala dinner charges which are applicable for Christmas and New Year dates would be extra and payable directly to the hotel. Please check with the hotel directly for more information on the same.</li>
//                <li>In case of any amendment (date change) in your hotel reservation, EaseMyTrip.com would inform and advise you about the availability and applicable new rates.</li>
//                <li>If payment has been received by credit/debit card, the refund shall be credited to the same card by which the payment was received. For all other cases, the refund will be made by Account Payee Cheque only.</li>
//                <li>Guests are requested to read the terms &amp; conditions before making any booking under the offers running on EaseMyTrip.com.</li>
//                <li>If any city taxes applicable then it will be directly payable to hotel. For more information, kindly connect with hotelier directly.</li>
//                <li>All the information pertaining to the hotel including the category of the hotel, images, room type, amenities and facilities available at the hotel are as per the information provided by the hotel to EaseMyTrip.com. This information is for reference only. Any discrepancy that may exist between the website pictures and actual settings of the hotel shall be raised by the User with the hotel directly, and shall be resolved between the User and hotel. EaseMyTrip.com will have no responsibility in that process of resolution, and shall not take any liability for such discrepancies.</li>
//                <li>Refund, if any shall be processed by EaseMyTrip.com to the customer only upon receipt of the same from the concerned Hotel.</li>
//                <li> For any query or clarification, please write to us at <a href="mailto:Care@easemytrip.com">care@easemytrip.com</a></li>
//             </ul>
//          </div>
//       </div>
//    </div>
// </div>
//       </div>