// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {
  collection,
  setDoc,
  updateDoc,
  doc,
  getDoc,
  getFirestore,
  increment,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD4s2xFNYPQ8FFdsFykelwA-6-8k6VN-LQ",
  authDomain: "syncmi.firebaseapp.com",
  databaseURL: "https://syncmi-default-rtdb.firebaseio.com",
  projectId: "syncmi",
  storageBucket: "syncmi.appspot.com",
  messagingSenderId: "399523924809",
  appId: "1:399523924809:web:3a15abc7d6c3d22bfce898",
  measurementId: "G-DVBYGH39DY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const auth = getAuth();

var uid;

var existingPromo;

onAuthStateChanged(auth, async (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    uid = user.uid;
    var name = user.displayName;
    let firstName = name.split(" ")[0];
    console.log("User name:" + user.displayName);
    console.log(uid);
    document.getElementById("welcome").innerText = firstName;
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    document.getElementById(
      "indexAcc"
    ).innerHTML = `<a class="get-a-quote" href="javascript:logOut()">Log Out</a>`;
    if (userSnap.exists()) {
      if (userSnap.data().promoCode != null) {
        existingPromo = userSnap.data().promoCode;
        document.getElementById("promo").placeholder = existingPromo;
        document.getElementById("promo").value = existingPromo;
        document.getElementById("cnt-btn").innerText = "Applied";
        document.getElementById("cnt-btn").classList.add("disabled");
        document.getElementById("minion").innerHTML = `<sup>&#8377;</sup>3999`;
        document.getElementById("basic").innerHTML = `<sup>&#8377;</sup>5999`;
        document.getElementById("premium").innerHTML = `<sup>&#8377;</sup>8999`;
      }
    } else {
      const newUserRef = collection(db, "users");
      await setDoc(doc(newUserRef, uid), {
        promoCode: null,
      });
      existingPromo = null;
    }
    // ...
  } else {
    // User is signed out
    // ...
    window.location.replace("index.html");
  }
});

export async function promoSubmit() {
  var promo = document.getElementById("promo").value.toLowerCase();
  console.log(promo);

  if (existingPromo == null) {
    const docRef = doc(db, "promoCode", promo);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userRef = collection(db, "users");
      await setDoc(doc(userRef, uid), {
        promoCode: promo,
      });
      try {
        await updateDoc(docRef, {
          count: increment(1),
        });
        existingPromo = promo;
        document.getElementById("promo").placeholder = existingPromo;
        document.getElementById("promo").value = existingPromo;
        document.getElementById("cnt-btn").innerText = "Applied";
        document.getElementById("cnt-btn").classList.add("disabled");
      } catch (error) {
        console.error("Error incrementing promo code count:", error);
      }
    } else {
      // docSnap.data() will be undefined in this case
      alert("No such Promo code!!");
    }
  } else {
    alert("You already applied a Promo Code!!");
  }
}

export function logOut() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
}
