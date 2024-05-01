// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIZUspqHEKzDJsRCNDaja4_WX3_wVts9M",
  authDomain: "lab201-83d34.firebaseapp.com",
  projectId: "lab201-83d34",
  storageBucket: "lab201-83d34.appspot.com",
  messagingSenderId: "804387155098",
  appId: "1:804387155098:web:21b4e6232571d61a03c323",
  measurementId: "G-S6SED8TS0T"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH=getAuth(FIREBASE_APP)
export const db=getFirestore(FIREBASE_APP)