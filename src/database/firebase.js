// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDA0NqXqvJJW6ZcC-yQgDbCWVsYirjXZus",
  authDomain: "twitter-reloaded.firebaseapp.com",
  projectId: "twitter-reloaded",
  storageBucket: "twitter-reloaded.appspot.com",
  messagingSenderId: "209452734747",
  appId: "1:209452734747:web:8532db0c0c4becb2539bbe",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
