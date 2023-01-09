// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import {getAuth} from 'firebase/auth'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAAQ5b6UwDEW9inuh116oIZwed3CoVvETg",
//   authDomain: "instagram-clone-89da9.firebaseapp.com",
//   projectId: "instagram-clone-89da9",
//   storageBucket: "instagram-clone-89da9.appspot.com",
//   messagingSenderId: "53860676677",
//   appId: "1:53860676677:web:a44a7499f0d45665635f2c",
//   measurementId: "G-VW9WM784SR"
// };


// Import the functions you need from the SDKs you need
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: "AIzaSyC1Ctmsmt2KjK8RTCy_wT9ba61QCkyF3AE",
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "instagram-clone-bf3fa.firebaseapp.com",
  projectId: "instagram-clone-bf3fa",
  storageBucket: "instagram-clone-bf3fa.appspot.com",
  messagingSenderId: "234917796884",
  appId: process.env.REACT_APP_PROJECT_ID,
  measurementId: "G-516WGC0WGW"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage(app)
const auth = getAuth()


export {app,auth,db,storage}