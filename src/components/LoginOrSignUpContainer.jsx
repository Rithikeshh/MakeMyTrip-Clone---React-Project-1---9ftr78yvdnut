import React, { useEffect, useState } from 'react'
import SignUp from './SignUp';

function LoginOrSignUpContainer() {

    const [signUpPage, setSignUpPage] = useState(false);

  return (
    
    <div className='login-form-container'>
        <div className='login-account-type'>
            <span>PERSONAL ACCOUNT</span>
            <span title='currently disabled'>MYBIZ ACCOUNT</span>
        </div>
        {!signUpPage && <LoginForm/>}
        {!signUpPage && <p>Not a user?{" "}  
            <span onClick={()=>{setSignUpPage(true)}}>Click here to sign up</span>
        </p>}

        {signUpPage && <SignUp/>}
        {signUpPage && <p>Already a user?{" "}  
            <span onClick={()=>{setSignUpPage(false)}}>Click here to login</span>
        </p>}
    </div>
    
  )
}

function LoginForm(){
    return(
        <form className='login-account-form' action="">
            
            <label htmlFor="email">Email </label>
            <input 
                className='user-details'
                type="email" 
                name="email" id="email"
                placeholder='Enter email '
            />
            <label htmlFor="password">Password </label>
            <input
                className='user-details'
                type="password" 
                name="password" id="password"
                placeholder='Password '
            />
            <input className='loginBtn' disabled type="submit" value='CONTINUE'/>
        </form>
    )
}
export default LoginOrSignUpContainer
