import firebase from 'firebase/app';

import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCIx8T9RoVt6lyE8unBMSKTKIKHvHayxaA",
  authDomain: "teamwork-app-86252.firebaseapp.com",
  projectId: "teamwork-app-86252",
  storageBucket: "teamwork-app-86252.appspot.com",
  messagingSenderId: "557415661963",
  appId: "1:557415661963:web:30b0513265d1591c492f8e",
  measurementId: "G-P3DT04FRDH"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

export{db, auth};
export default firebase;











