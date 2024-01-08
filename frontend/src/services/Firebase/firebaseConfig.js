// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLWKoM45IA3J99_1d7sEUX5LKl-7exXh4",
  authDomain: "iniaki-goicoechea-react-b5807.firebaseapp.com",
  projectId: "iniaki-goicoechea-react-b5807",
  storageBucket: "iniaki-goicoechea-react-b5807.appspot.com",
  messagingSenderId: "109062906080",
  appId: "1:109062906080:web:0ccb6eb9ae2c5e480a3085"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);