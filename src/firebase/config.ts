import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // apiKey: process.env.FIREBAE_API_KEY,
  // authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.FIREBASE_PROJECT_ID,
  // storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
  // appId: process.env.FIREBASE_APP_ID,

  // apiKey: "AIzaSyCIHGPQS2aLtTOIdO67z4sTNcqKguc2UFg",
  // authDomain: "giphy-store.firebaseapp.com",
  // projectId: "giphy-store",
  // storageBucket: "giphy-store.appspot.com",
  // messagingSenderId: "520968189148",
  // appId: "1:520968189148:web:607731735b7c294206f019",

  apiKey: "AIzaSyByBkw7q-CNblERirySbJIYpylWtAFu0Cc",
  authDomain: "giphy-stores.firebaseapp.com",
  projectId: "giphy-stores",
  storageBucket: "giphy-stores.appspot.com",
  messagingSenderId: "871731635316",
  appId: "1:871731635316:web:83f616226c03602ff9dd21",
};

// const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export { app, auth, db };
