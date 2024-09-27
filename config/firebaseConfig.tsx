// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-story-generator-be70c.firebaseapp.com",
  projectId: "ai-story-generator-be70c",
  storageBucket: "ai-story-generator-be70c.appspot.com",
  messagingSenderId: "272732644218",
  appId: "1:272732644218:web:0002a905208e51b572ecc3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app); 