// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// https://firebase.google.com/docs/web/setup#available-libraries

import 'firebase/storage';
import 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAAHvPAGC_pEA-NZU4rzFobZQ6GxcQ0FIA",
    authDomain: "katie-louie-wedding.firebaseapp.com",
    projectId: "katie-louie-wedding",
    storageBucket: "katie-louie-wedding.appspot.com",
    messagingSenderId: "1008230177167",
    appId: "1:1008230177167:web:d72069a3e8b0280aa4d3fa",
    measurementId: "G-JN84GT3JKT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);