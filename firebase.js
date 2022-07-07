// Import the functions you need from the SDKs you need
import * as firebase from "firebase";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBfebckh8hwEcEXq-Y1Hlf4nxVopjfOwU",
  authDomain: "fir-auth-685e9.firebaseapp.com",
  projectId: "fir-auth-685e9",
  databaseURL: "https://fir-auth-685e9-default-rtdb.europe-west1.firebasedatabase.app",
  storageBucket: "fir-auth-685e9.appspot.com",
  messagingSenderId: "695915812026",
  appId: "1:695915812026:web:32c2a7db9e16a458005e83",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

export const auth = firebase.auth();
export const db = app.database();

export function writeUserMap(userId, map) {
  try {
    let userListRef = app.database().ref('users/' + userId);
    userListRef.set(map);
  } catch (e) {
    console.log('e', e)
  }
}

export function removeUserMap(userId) {
  try {
    let userListRef = app.database().ref('users/' + userId);
    userListRef.remove();
  } catch (e) {
    console.log('e', e)
  }
}
