
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyA2B251XPP8vlaVja48ZO8j7OYeAHTT3t8",
  authDomain: "chitchat-da1ac.firebaseapp.com",
  projectId: "chitchat-da1ac",
  storageBucket: "chitchat-da1ac.appspot.com",
  messagingSenderId: "599206806852",
  appId: "1:599206806852:web:8b0761c2b102c5dc800311",
  measurementId: "G-KXXZGQE78B"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const auth=getAuth()
const analytics = getAnalytics(app);

export const storage = getStorage();
export const db=getFirestore();
