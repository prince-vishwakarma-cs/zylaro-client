import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const API_KEY = import.meta.env.VITE_FIREBASE_KEY;
const AUTH_DOMAIN = import.meta.env.VITE_AUTH_DOMAIN;
const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;
const STORAGE_BUCKET = import.meta.env.VITE_STORAGE_BUCKET;
const MESSAGEING_SENDER_ID = import.meta.env.VITE_MESSAGEING_SENDER_ID;
const APPID = import.meta.env.VITE_APPID;
const MEASUREMENTID = import.meta.env.VITE_MEASUREMENTID;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGEING_SENDER_ID,
  appId: APPID,
  measurementId: MEASUREMENTID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
