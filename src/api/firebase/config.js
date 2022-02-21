// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "yumy-beauty.firebaseapp.com",
  projectId: "yumy-beauty",
  storageBucket: "yumy-beauty.appspot.com",
  messagingSenderId: "219574416000",
  appId: process.end.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// firebaseApps previously initialized using initializeApp()
const db = getFirestore();
connectFirestoreEmulator(db, 'localhost', 8080);
