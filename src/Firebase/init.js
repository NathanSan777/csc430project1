// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQjguIZBNcfUBlw2vy7Zb05EXTKc3fe1M",
  authDomain: "csc430-project-1.firebaseapp.com",
  projectId: "csc430-project-1",
  storageBucket: "csc430-project-1.appspot.com",
  messagingSenderId: "51458939953",
  appId: "1:51458939953:web:2aac768d3937e760d14910"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth();
export default db