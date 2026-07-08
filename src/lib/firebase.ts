import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCax7iD_wt9nOr8GiVKGJZ9fk1Rs6fEo-Q",
  authDomain: "amrootorganicsdotcom.firebaseapp.com",
  projectId: "amrootorganicsdotcom",
  storageBucket: "amrootorganicsdotcom.firebasestorage.app",
  messagingSenderId: "757309536888",
  appId: "1:757309536888:web:d6cca9b18e66b7ce228b8d"
};

// Initialize Firebase only if it hasn't been initialized already (to prevent Next.js hot-reload issues)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
