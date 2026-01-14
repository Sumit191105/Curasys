import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // Auth functions import karna zaroori hai

const firebaseConfig = {
  apiKey: "AIzaSyBPsNHdnGIamtZpOnD-KQCZwuu75vX7EeU",
  authDomain: "curasyshealthcare-e3963.firebaseapp.com",
  projectId: "curasyshealthcare-e3963",
  storageBucket: "curasyshealthcare-e3963.firebasestorage.app",
  messagingSenderId: "1052537976914",
  appId: "1:1052537976914:web:edc964b61456471835078b",
  measurementId: "G-EJXPS83BRS"
};

// 1. Initialize Firebase
const app = initializeApp(firebaseConfig);

// 2. Auth aur Provider ko initialize karke EXPORT karein (Ye missing tha)
export const auth = getAuth(app); 
export const googleProvider = new GoogleAuthProvider();

