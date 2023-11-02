import React,{useState, useContext, useRef} from 'react'
import {ModalContext} from './Profile'
import LoginOrSignUpContainer from './LoginOrSignUpContainer'

function LoginModal() {
  
    const {setIsLoginModalVisible} = useContext(ModalContext)
    return(
        <div 
            onClick={()=>setIsLoginModalVisible(false)} 
            className='login-modal-container'
        >
            <div 
                onClick={(e)=>e.stopPropagation()}
                className='login-modal'
            >
                <Carousel/>
                {/* <LoginForm/> */}
                <LoginOrSignUpContainer/>
            </div>
        </div>
    )
  
}
// function LoginForm(){
//     return(
//         <div className='login-form-container'>
//             <div className='login-account-type'>
//                 <span>PERSONAL ACCOUNT</span>
//                 <span title='currently disabled'>MYBIZ ACCOUNT</span>
//             </div>
//         <form className='login-account-form' action="">
//             <label htmlFor="userId">Email or Mobile Number</label>
//             <input 
//                 type="text" 
//                 name="userId" id="userId"
//                 placeholder='Enter email or mobile number'
//             />
//             <input disabled type="submit" value='CONTINUE'/>
//         </form>
//         </div>
//     )
// }
function Carousel(){
    const images = [
        'https://imgak.mmtcdn.com/pwa_v3/pwa_header_assets/loginPersuassionRoad.webp',
        'https://imgak.mmtcdn.com/pwa_v3/pwa_header_assets/loginPersuassionOcean.webp',
        'https://imgak.mmtcdn.com/pwa_v3/pwa_header_assets/loginPersuassionValley.webp'
    ]
    const carouselRef = useRef(null);
    const [indexOfImage, setIndexOfImage] = useState(0);
    return(
        <>
            <div id="carousel" className='carousel-image-container' ref={carouselRef}>
                {images.map((image,index)=>(
                    <picture key={index} className='carousel-picture'>
                        <img src={image} alt="" />
                    </picture>
                ))}
                <div className='carousel-text'>alok</div>
            </div>
        </>
    )
}

export default LoginModal
