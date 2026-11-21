import { getFirestore } from "@firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgCmTbwske6ZLKJ9d-AfQQcd_chzD1tnc",
  authDomain: "futurest-email-services.firebaseapp.com",
  projectId: "futurest-email-services",
  storageBucket: "futurest-email-services.firebasestorage.app",
  messagingSenderId: "414745201316",
  appId: "1:414745201316:web:a71defaabcf0f1e281f431",
  measurementId: "G-HQGE51R88Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
