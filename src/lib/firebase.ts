import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Initialize Firebase
const app = initializeApp({
  apiKey: "AIzaSyDRKn6W3LGzU0y1DFBS-u3-EjGTZAa8Sls",
  authDomain: "buyandsell-eabc9.firebaseapp.com",
  projectId: "buyandsell-eabc9",
  storageBucket: "buyandsell-eabc9.appspot.com",
  messagingSenderId: "76272197810",
  appId: "1:76272197810:web:d1a1603567fe681978a9ab",
  measurementId: "G-NN7547WX2M",
});

export const db = getFirestore(app);
export const auth = getAuth(app);
