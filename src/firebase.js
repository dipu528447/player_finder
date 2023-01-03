// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7hjJcbv2o1TRJsOLc7Q2dmOATW02Pb7I",
  authDomain: "player-finder-application.firebaseapp.com",
  projectId: "player-finder-application",
  storageBucket: "player-finder-application.appspot.com",
  messagingSenderId: "952879109342",
  appId: "1:952879109342:web:31a2124ccb97815e581e4f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app)
export const db = getFirestore(app);
export default firebaseConfig;