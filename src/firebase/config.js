import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

import 'firebase/storage';
import 'firebase/firestore';

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
const projectStorage = getStorage();
const projectFirestore = getFirestore();

export { analytics, projectStorage, projectFirestore }