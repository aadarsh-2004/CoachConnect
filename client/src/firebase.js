// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCoq9_J-qa_WTH3ZvMWINAdt0TucJed7ZU",
  authDomain: "coachconnect-82abf.firebaseapp.com",
  projectId: "coachconnect-82abf",
  storageBucket: "coachconnect-82abf.firebasestorage.app",
  messagingSenderId: "839685414373",
  appId: "1:839685414373:web:39646f02a13bcb4d02630c",
  measurementId: "G-3LF7L8ZVMX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
export { auth };