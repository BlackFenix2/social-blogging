// Import the functions you need from the SDKs you need
import { getApp, initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQXpnSnE_jslorJN3Zri1-EmBaO81_ZSI",
  authDomain: "social-blogging-7a157.firebaseapp.com",
  projectId: "social-blogging-7a157",
  storageBucket: "social-blogging-7a157.appspot.com",
  messagingSenderId: "170220734348",
  appId: "1:170220734348:web:7950c6775dd2bf38ad38a9",
};

/**
 * prevent creating duplicate firebase apps by checking if there is already an app
 * @param config
 * @returns
 */
const createFirebaseApp = (config: any) => {
  try {
    return getApp();
  } catch {
    return initializeApp(config);
  }
};

const firebaseApp = createFirebaseApp(firebaseConfig);

export default firebaseApp;
