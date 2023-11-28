import React, { useEffect, useRef, useState } from 'react'
import SearchNavbar from '../components/Navbar/SearchNavbar'
import { useParams, useSearchParams } from 'react-router-dom';
import getTrain from '../utils/getTrain';
import { useTrainBookingDetailsContext } from '../provider/TrainBookingDetailsProvider';
import { createPortal } from 'react-dom';

function RailwayBookingPage() {

    const[loading, setLoading] = useState(true);
    const[train, setTrain] = useState()
    const {trainId} = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const{trainBookingState} = useTrainBookingDetailsContext()
    const [coach, setCoach] = useState(null)
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const [showModal, setShowModal] = useState(false);
    const [travellers, setTravellers] = useState([])
    const coachId = useRef(searchParams.get('coachId'));
    useEffect(()=>{
        getTrain(trainId, setTrain, setLoading, coachId, setCoach)
    },[])
    console.log(travellers);
  return (
    <div>
      <SearchNavbar/>
      <div className='searchPage-header-container'>
        <h2 className='flightBookingPage-heading' style={{color:'#fff'}}>Select Travellers</h2>
      </div>
        {loading ? 
            <div>Loading...</div>
            :
            <div className='trainBookingPage-bookingDetails-container'>
                <div>
                    <div className='trainBookingPage-train-details-container'>
                        <div className='train-details'>
                            <div>
                            <div>
                                <h2>{train.trainName}</h2>
                            </div>
                            <div className='train-depart-days'>
                                <span>#{train.trainNumber}</span>{" "}
                                <span>|</span>{" "}
                                <span>Departs on: {days.map((day)=>(
                                <span
                                    className={`${train.daysOfOperation.find(element=> element == day) ? 'trainOnDay' : ''} train-days`}
                                >{day.substring(0,1)}</span>
                                ))}</span>
                            </div>
                            </div>
                            <div>
                            <div>
                                <h4>{train.departureTime}, <span style={{fontWeight:'400', color:'grey'}}>{trainBookingState.travelDate.date} {trainBookingState.travelDate.month}</span></h4>
                            </div>
                            <div className='source-station'>
                                <span>{train.source}</span>
                            </div>
                            </div>
                            <div>
                            <div className='travel-duration'>
                                <span>____ </span>
                                <span>{train.travelDuration}</span>
                                <span> ____</span>
                            </div>
                            </div>
                            <div>
                            <div>
                                <h4>{train.arrivalTime}, <span style={{fontWeight:'400', color:'grey'}}>{trainBookingState.travelDate.date} {trainBookingState.travelDate.month}</span></h4>
                            </div>
                            <div className='source-station'>
                                <span>{train.destination}</span>
                            </div>
                            </div>
                        </div>
                        <div className='trainBookingpage-seat-details'>
                            <div>
                                <div>
                                    <span>Availability Status</span>
                                </div>
                                <div>
                                    <div>
                                        <span>{coach.coachType}</span>
                                        <span>AVAILABLE-{coach.numberOfSeats}</span>
                                    </div>
                                    <div>
                                        <span>
                                            Updated few minutes ago
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <span>Your Boarding Station</span>
                                </div>
                                <div>
                                    <span className='boarding-station-details' title={`${train.source} - ${train.departureTime} (${trainBookingState.travelDate.date} ${trainBookingState.travelDate.month})`}>{train.source} - {train.departureTime} ({trainBookingState.travelDate.date} {trainBookingState.travelDate.month})</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2>Add Travellers </h2>
                        <div className='trainBookingPage-traveller'>
                            {travellers.map((traveller, index)=>(
                                
                                <div key={index}>
                                    {console.log(traveller)}
                                    <span>{traveller.name} ({traveller.gender}), {traveller.age}</span>
                                    <button onClick={(e)=>{
                                        setTravellers(prev=>{
                                            console.log(prev)
                                            prev.splice(index,1)
                                            console.log(prev)
                                            return prev
                                        })
                                    }}>
                                        DELETE
                                    </button>

                                </div>
                            ))}
                            <div>
                                <span onClick={()=>{
                                setShowModal(true)
                            }}>
                                + ADD TRAVELLER
                                </span>
                            </div>
                            
                        </div>
                        
                    </div>
                    <div>
                        <h3>Contact Information</h3>
                        <div className='trainBookingPage-contact-info'>
                            <div>
                                <span>Email Id</span>
                                <input type="email" placeholder='Enter Email Id'/>
                            </div>
                            <div>
                                <span>Mobile Number</span>
                                <input type="number" placeholder='Enter Mobile Number'/>
                            </div>
                        </div>
                    </div>
                    {/* <div>
                        <h3>Yout State</h3>
                    </div> */}
                </div>
                <div>
                    <div className='non-scrollable'>
                        <div>Alok</div>
                    </div>
                </div>
            </div>  
        }
        {showModal && <UserDetailModalForTrain setTravellers={setTravellers} setShowModal={setShowModal}/>}
    </div>
  )
}

export default RailwayBookingPage

function UserDetailModalForTrain({setTravellers, setShowModal}){
    const [gender, setGender] = useState('Select')
    const [showGenderModal, setShowGenderModal] = useState(false)
    const [passenger, setPassenger] = useState({
        name:'',
        age:'',
        gender: 'Select'
    })
    return(
        <>
        {createPortal(
            <div onClick={()=>{
                setShowModal(false)
            }} className='user-detail-modal'>
                <div onClick={(e)=>{
                    e.stopPropagation()
                    setShowGenderModal(false)
                }}>
                    <div>
                        <h3>Add Traveller Information</h3>
                        <div>
                            <div>
                                <span>Name</span>
                                <input type="text" onChange={(e)=>{
                                    setPassenger(prev=>{
                                        return{...prev,name:e.target.value}
                                    })
                                }} value={passenger.name} placeholder='Enter Traveller Name' name="" id=""/>
                            </div>
                            <div>
                                <span>Age (in years)</span>
                                <input type="number" onChange={(e)=>{
                                    setPassenger(prev=>{
                                        return{...prev,age:e.target.value}
                                    })
                                }} value={passenger.age} placeholder='Enter Age' name="" id=""/>
                            </div>
                            <div onClick={(e)=>{
                                e.stopPropagation()
                                setShowGenderModal(!showGenderModal);
                            }}>
                                <span>Gender</span>
                                <input type="text" value={passenger.gender} name="" id=""/>
                                <span className='train-modal-dropdown'></span>
                                {showGenderModal && <GenderModal setPassenger={setPassenger} />}
                            </div>
                            <div>
                                <span>Nationality</span>
                                <input type="text" value={'India'} disabled name="" id=""/>
                                
                            </div>
                        </div>
                    </div>
                    <div>
                        <button onClick={()=>{
                            setShowModal(false)
                        }}>Cancel</button>
                        <button onClick={()=>{
                            setShowModal(false)
                            setTravellers(prev=>{
                                return [...prev, passenger]
                            })
                        }}>Add</button>
                    </div>
                </div>
            </div>,
        document.body)
        }
        </>
    )
}
function GenderModal({setPassenger}){
    return(
        <div className='gender-modal'>
            <div onClick={()=>{
                setPassenger(prev=>{
                    return {...prev, gender:'Male'}
                })
            }}>Male</div>
            <div onClick={()=>{
                setPassenger(prev=>{
                    return {...prev, gender:'Female'}
                })
            }}>Female</div>
        </div>
    )
}