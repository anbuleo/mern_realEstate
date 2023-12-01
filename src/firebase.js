// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-725e3.firebaseapp.com",
  projectId: "mern-estate-725e3",
  storageBucket: "mern-estate-725e3.appspot.com",
  messagingSenderId: "916745041889",
  appId: "1:916745041889:web:b319db898af0d9020a04a0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);