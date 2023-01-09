// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
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