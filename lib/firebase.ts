// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQXpnSnE_jslorJN3Zri1-EmBaO81_ZSI",
  authDomain: "social-blogging-7a157.firebaseapp.com",
  projectId: "social-blogging-7a157",
  storageBucket: "social-blogging-7a157.appspot.com",
  messagingSenderId: "170220734348",
  appId: "1:170220734348:web:7950c6775dd2bf38ad38a9",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
