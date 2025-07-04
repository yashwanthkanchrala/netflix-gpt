// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqTmjvLVPOULaajh6qYfTZf8sPGNT6thQ",
  authDomain: "netflix-gpt-dda88.firebaseapp.com",
  projectId: "netflix-gpt-dda88",
  storageBucket: "netflix-gpt-dda88.firebasestorage.app",
  messagingSenderId: "701830331612",
  appId: "1:701830331612:web:5bfaa280501059f9098819",
  measurementId: "G-7TYJ9KN2XX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

 export const auth = getAuth();