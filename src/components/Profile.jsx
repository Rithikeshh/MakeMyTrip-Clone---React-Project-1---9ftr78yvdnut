import React, { useState, createContext, useContext } from 'react'
import {createPortal} from 'react-dom'
import '../styles/LoginModal.css'
import LoginModal from './Login&SignUpComponent/LoginModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { useAuth } from '../provider/AuthProvider'
import { useLoginModalContext } from '../provider/LoginModalProvider'
import { useNavigate } from 'react-router-dom'


function Profile() {
    
    const {isLoggedIn} = useAuth()
    const {isLoginModalVisible, setIsLoginModalVisible} = useLoginModalContext()
    const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
    const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));

    function handleModal(){

        if(isLoggedIn){
            setIsProfileModalVisible(!isProfileModalVisible)
        }
        else{
            setIsLoginModalVisible(!isLoginModalVisible)
        }
    }
    
  return (
    
        <li 
            onClick={handleModal} 
            className="header-userList-item makeFlex make-align-center login-user userLoggedOut font10"
        >
            
            {!isLoggedIn &&
            <>
             <span className="myIcon landingSprite"></span>
            <div className="flexOne whiteText bold-text">
                <p>Login or Create Account</p>
            </div>
            </>}
            {isLoggedIn &&
                <>
                    <FontAwesomeIcon 
                        style={{
                            height:'20px',
                            backgroundColor: "#a3a2a2",
                            borderRadius:"100%",
                            padding: '8px'
                        }} 
                        icon={faUser} 
                    />
                    <div className="flexOne whiteText bold-text">
                        <p style={{paddingLeft: '8px', fontSize:"1rem",color:"#3f3f3f"}}>{userDetails.name}</p>
                    </div>
                </>
            }
            {isLoginModalVisible && <LoginPortal/>}
            {isProfileModalVisible && <ProfileModal setIsProfileModalVisible={setIsProfileModalVisible}/>}
        </li> 
  )
}

// Profile exported to Header
export default Profile

function LoginPortal(){
    
    return(
        <>
            {createPortal(
                <LoginModal/>,
                document.body
            )}
        </>
    )
}

function ProfileModal({setIsProfileModalVisible}){
    const navigate = useNavigate()
    const {setIsLoggedIn} = useAuth()
    const logout = () => {
        sessionStorage.removeItem("userToken");
        sessionStorage.removeItem("userDetails");
        setIsLoggedIn(false);
        setIsProfileModalVisible(false)
        navigate('/')
    };
    return(
        <div className='profile-modal' onClick={(e)=>e.stopPropagation()}>
            
            <button>Profile Setting</button> {/*Add profile setting later */}
            <button>My Trips</button> {/*Add My trip section later */}
            <button onClick={logout}>Logout</button>

        </div>
    )
}
