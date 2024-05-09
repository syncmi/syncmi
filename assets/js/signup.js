// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth,GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js'


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4s2xFNYPQ8FFdsFykelwA-6-8k6VN-LQ",
  authDomain: "syncmi.firebaseapp.com",
  databaseURL: "https://syncmi-default-rtdb.firebaseio.com",
  projectId: "syncmi",
  storageBucket: "syncmi.appspot.com",
  messagingSenderId: "399523924809",
  appId: "1:399523924809:web:3a15abc7d6c3d22bfce898",
  measurementId: "G-DVBYGH39DY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();