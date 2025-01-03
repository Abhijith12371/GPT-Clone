// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4RkC1yriiYrOVrXzMZ_dyY5Qr_HqbNSc",
  authDomain: "chatgpt-d7b00.firebaseapp.com",
  projectId: "chatgpt-d7b00",
  storageBucket: "chatgpt-d7b00.firebasestorage.app",
  messagingSenderId: "602120647810",
  appId: "1:602120647810:web:1b92007437456170eaf09b",
  measurementId: "G-HHF629CYSL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db=getFirestore(app)
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut,db };