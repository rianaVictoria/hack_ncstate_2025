// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKvuQ0v6UGaocXr2yTQD0kX-Tu3PNnlgw",
  authDomain: "hackncstate2025.firebaseapp.com",
  projectId: "hackncstate2025",
  storageBucket: "hackncstate2025.firebasestorage.app",
  messagingSenderId: "116499205170",
  appId: "1:116499205170:web:c9ded193139ccc0e71802b",
  measurementId: "G-JSXEGWGKCJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);