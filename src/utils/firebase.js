// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "friendsofpopcorn.firebaseapp.com",
  projectId: "friendsofpopcorn",
  storageBucket: "friendsofpopcorn.firebasestorage.app",
  messagingSenderId: "702906128349",
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: "G-641VENP6F6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);