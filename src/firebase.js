// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDGkw9Yv6_5cX7btdcPRocFM_XXKZb04nY",
    authDomain: "halnik-yt.firebaseapp.com",
    projectId: "halnik-yt",
    storageBucket: "halnik-yt.appspot.com",
    messagingSenderId: "691228652260",
    appId: "1:691228652260:web:d219d76a17dd9d8a9b72f1",
    measurementId: "G-FFKWN2TYG3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;


