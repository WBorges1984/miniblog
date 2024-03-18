
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDeId1V-bZMs545A-tAMInERr2ibBfoRUo",
  authDomain: "miniblog-178c5.firebaseapp.com",
  projectId: "miniblog-178c5",
  storageBucket: "miniblog-178c5.appspot.com",
  messagingSenderId: "619610437364",
  appId: "1:619610437364:web:2a120215ad922cb5be90a1"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export { db };
