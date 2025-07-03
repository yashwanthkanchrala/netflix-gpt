import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';

const Login = () => {
  const email = useRef(null);
  const password = useRef(null);
  const [errorMessage,setErrorMessage] = useState(null);
  const [isSignIn,setIsSignIn] = useState(true);
  const HandleButtonClick = () => {
    const message = checkValidData(email.current.value,password.current.value);
    setErrorMessage(message)
  }
  const toggleSignInForm = () =>{
    setIsSignIn(!isSignIn);
  };
  return (
    <div>
      <Header/>
      <div className='absolute'>
        <img className=""src="https://assets.nflxext.com/ffe/siteui/vlv3/05e91faa-6f6d-4325-934e-5418dcc2567b/web/IN-en-20250630-TRIFECTA-perspective_159086b1-425f-435b-bcd5-1ed8039cdef9_large.jpg" alt="text"/>
      </div>
      <form onSubmit = {(e) => e.preventDefault()} className='absolute w-4/12 p-8 bg-black my-36 mx-auto left-0 right-0 text-white bg-opacity-80'>
        <h1 className='font-bold text-3xl py-4'>{isSignIn ? "Sign In":"Sign Up"}</h1>
        {!isSignIn && <input type="text" placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700'/>}
        <input ref ={email} type="text" placeholder='Email Address' className='p-4 my-4 w-full bg-gray-700'/>
        <input  ref = {password} type="text" placeholder='Password' className='p-4 my-4 w-full  bg-gray-700'/>
        <p className='text-red-500 font-bold'>{errorMessage}</p>
        <button className='bg-red-700 p-4 my-6 text-white text-2xl w-full rounded-lg' onClick = {HandleButtonClick}>{isSignIn ? "Sign In":"Sign Up"}</button>
        <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>{isSignIn ? "New To Netflix? Sign Up Now":"Already Registered? Sign In Now"}</p>
      </form>
    </div>

  )
}

export default Login