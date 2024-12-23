// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrfSrT0INjr3jBEmeZ66sV4kcMzMCQSUs",
  authDomain: "econowise-4737d.firebaseapp.com",
  projectId: "econowise-4737d",
  storageBucket: "econowise-4737d.firebasestorage.app",
  messagingSenderId: "465277713503",
  appId: "1:465277713503:web:db7350392a9b6fd9a86fea",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
