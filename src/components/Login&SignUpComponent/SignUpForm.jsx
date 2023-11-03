import React,{useState, useEffect, useContext, useRef} from 'react'
import { useLoginModalContext } from '../../provider/LoginModalProvider';
import { useAuth } from '../../provider/AuthProvider';


function SignUpForm() {

    const {setIsLoggedIn} = useAuth()
    const {setIsLoginModalVisible} = useLoginModalContext()
    const initialUserData = {
        name: "",
        email: "",
        password: ""
    };
    
    const [userDetails, setUserDetails] = useState(initialUserData);
    const isButtonActive = useRef(false)
    if(userDetails.name && userDetails.email && userDetails.password){
        isButtonActive.current=true;
    }
    else{
        isButtonActive.current=false;
    }
    
      async function createUser(){
        const config = {
            method: "POST",
            body: JSON.stringify({ ...userDetails, appType: "bookingportals" }),
            headers: {
              "Content-Type": "application/json",
              projectID: "f104bi07c490"
            }
        };
        try{
            const response = await fetch(
                "https://academics.newtonschool.co/api/v1/bookingportals/signup",
                config
            )
            console.log(response);
            const result = await response.json();
            console.log(result);
            const token = result.token
            console.log(token)
            if(token){
                
                sessionStorage.setItem("userToken", token);
                sessionStorage.setItem(
                    "userDetails",
                    JSON.stringify({
                        name : result.data.user.name, 
                        email : result.data.user.email
                    })
                );
                setIsLoginModalVisible(false)
                setIsLoggedIn(true);
            }
        } catch(error){
            console.log("Error in creating user ", error)
        }
      }
      function handleInputChange(e){
        setUserDetails({...userDetails,[e.target.name]: e.target.value})
      }
    //   useEffect(()=>{
    //     if(userDetails.name && userDetails.email && userDetails.password){
    //         setButtonActive(true)
    //     }
    //     else{
    //         setButtonActive(false)
    //     }
    //   },[userDetails])

      function handleSubmit(e){
        e.preventDefault();
        createUser()
      }

    return(
        <form className='signup-account-form' onSubmit={handleSubmit}>
            <label htmlFor="name">Name </label>
            <input 
                className='user-details'
                type="Text" 
                name="name" id="name"
                placeholder='Enter name'
                onChange={handleInputChange}
                value={userDetails.name}
            />
            <label htmlFor="email">Email </label>
            <input 
                className='user-details'
                type="email" 
                name="email" id="email"
                placeholder='Enter email'
                onChange={handleInputChange}
                value={userDetails.email}
            />
            <label htmlFor="password">Password </label>
            <input
                className='user-details'
                type="password" 
                name="password" id="password"
                placeholder='Password'
                onChange={handleInputChange}
                value={userDetails.password}
            />
            <input className={`loginBtn ${isButtonActive.current && 'active-loginBtn'}`} disabled={!isButtonActive.current} type="submit" value='CONTINUE'/>
        </form>
    )
}

export default SignUpForm
