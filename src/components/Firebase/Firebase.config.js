// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOykqUhM3LG0VreGcnOCAWrduiD6Y4b6w",
  authDomain: "capstone6-1aafc.firebaseapp.com",
  databaseURL: "https://capstone6-1aafc-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "capstone6-1aafc",
  storageBucket: "capstone6-1aafc.appspot.com",
  messagingSenderId: "982412443970",
  appId: "1:982412443970:web:ccd93bd73f49f9c53c48db",
  measurementId: "G-PNTTVW8RVG"
};

// Initialize Firebase
export  const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);