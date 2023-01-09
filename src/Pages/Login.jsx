import React from "react";
import { auth } from "../firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {FcGoogle} from 'react-icons/fc'

function Login() {
  const GoogleProvider = new GoogleAuthProvider();
  const Navigator = useNavigate()

  async function signInViaPopup(){
    try{
        await signInWithPopup(auth,GoogleProvider)
        Navigator("/")
    }
    catch(e){
        console.log(e.message)
    }
  }
  return (
    <div className="h-screen w-full flex-col flex items-center justify-center space-y-10 ">
      <img src="./Instagram_logo.png" alt="screenshot" className="w-72"/>
      <div onClick={signInViaPopup}className="flex items-center my-4 bg-gray-100 rounded-lg px-12 py-1 space-x-2 cursor-pointer">
        <FcGoogle className="h-12 w-12"/>
        <p>Sign in with Google</p>
      </div>
    </div>
  );
}

export default Login;
