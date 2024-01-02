import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDyiElUXk7Kiyhuoo-b1ThcYRjzoeLmySk",

  authDomain: "expense-tracker-fabf8.firebaseapp.com",

  projectId: "expense-tracker-fabf8",

  storageBucket: "expense-tracker-fabf8.appspot.com",

  messagingSenderId: "936405494690",

  appId: "1:936405494690:web:39953ee2d1b901deb9e0fb",

  measurementId: "G-LQMQ0QVB06",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
