import React,{useState, useRef} from 'react'
import LoginOrSignUpFormContainer from './LoginOrSignUpFormContainer'
import { useLoginModalContext } from '../../provider/LoginModalProvider'

function LoginModal() {
  
    const {setIsLoginModalVisible} = useLoginModalContext()
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
                <LoginOrSignUpFormContainer/>
            </div>
        </div>
    )
  
}
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
