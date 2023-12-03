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
              <span>View On Map</span>
            </div>
        </div>
        
        </>
      }
      
     </div>
     
   )
 }
 
 export default SingleHotel
 





























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