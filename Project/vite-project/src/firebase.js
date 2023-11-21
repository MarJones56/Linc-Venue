// Import the functions you need from the SDKs you need
import { initializeApp, } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLPKm4ytW8lPKmz8qj7SFSZYC-yvUG4tg",
  authDomain: "artgallery-6f3c4.firebaseapp.com",
  projectId: "artgallery-6f3c4",
  storageBucket: "artgallery-6f3c4.appspot.com",
  messagingSenderId: "213296779026",
  appId: "1:213296779026:web:9e3ba0e949cdbefa5d2dcb",
  measurementId: "G-VVJMTSSRVP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
provider.setCustomParameters({
  'login_hint': 'user@example.com'
});
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const analytics = getAnalytics(app);
export default app;

// Project/vite-project/src/firebase.js

