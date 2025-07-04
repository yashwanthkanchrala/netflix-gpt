import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import {signInWithEmailAndPassword,createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const [errorMessage,setErrorMessage] = useState(null);
  const [isSignIn,setIsSignIn] = useState(true);
  const HandleButtonClick = () => {
    const message = checkValidData(email.current.value,password.current.value);
    setErrorMessage(message)

    if(message) return;

    if(!isSignIn){
      //signup logic
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value, photoURL: "https://occ-0-3215-3663.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTZ2zlLdBVC05fsd2YQAR43J6vB1NAUBOOrxt7oaFATxMhtdzlNZ846H3D8TZzooe2-FT853YVYs8p001KVFYopWi4D4NXM.png?r=229"
          }).then(() => {
            // Profile updated!
            // ...
            const {uid,email,displayName,photoURL} = auth.currentUser;
            dispatch(addUser({uid: uid, email:email,displayName:displayName,photoURL:photoURL}));
            navigate("/browse")
          }).catch((error) => {
            // An error occurred
            // ...
            setErrorMessage(error)
          });
          console.log(user);
        
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
          // ..
        });
      

    } else {
      //signin logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
      
    }
  }; 
  
  
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
        {!isSignIn && <input ref={name} type="text" placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700'/>}
        <input ref ={email} type="text" placeholder='Email Address' className='p-4 my-4 w-full bg-gray-700'/>
        <input  ref = {password} type="text" placeholder='Password' className='p-4 my-4 w-full  bg-gray-700'/>
        <p className='text-red-500 font-bold'>{errorMessage}</p>
        <button className='bg-red-700 p-4 my-6 text-white text-2xl w-full rounded-lg' onClick = {HandleButtonClick}>{isSignIn ? "Sign In":"Sign Up"}</button>
        <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>{isSignIn ? "New To Netflix? Sign Up Now":"Already Registered? Sign In Now"}</p>
      </form>
    </div>

  )
};

export default Login