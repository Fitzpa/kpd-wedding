import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAAHvPAGC_pEA-NZU4rzFobZQ6GxcQ0FIA",
  authDomain: "katie-louie-wedding.firebaseapp.com",
  projectId: "katie-louie-wedding",
  storageBucket: "katie-louie-wedding.appspot.com",
  messagingSenderId: "1008230177167",
  appId: "1:1008230177167:web:d72069a3e8b0280aa4d3fa",
  measurementId: "G-JN84GT3JKT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const projectStorage = getStorage(app);
const projectFirestore = getFirestore(app);

export {
  projectStorage,
  projectFirestore,
  ref,
  uploadBytesResumable,
  getDownloadURL,
};
