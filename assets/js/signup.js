// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth,signInWithPopup,GoogleAuthProvider,onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js'


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
const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();

const auth = getAuth();

export function signUp(){
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}


onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    console.log("User name:" + user.displayName);
    console.log(uid);
    window.location.replace("index.html");
    // ...
  } else {
    // User is signed out
    // ...
  }
});
