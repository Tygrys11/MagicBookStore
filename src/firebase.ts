// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYkfTEMkshc1NPCpo0l8f-bUXHCTv8n50",
  authDomain: "magic-bookstore.firebaseapp.com",
  projectId: "magic-bookstore",
  storageBucket: "magic-bookstore.firebasestorage.app",
  messagingSenderId: "904499627802",
  appId: "1:904499627802:web:ffa54d530fabcea4d90ea3",
  measurementId: "G-09LH3S7R1Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };