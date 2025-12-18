import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_Qy9ssGXcAOH8oM6h8HDBDmhP9ALowZ4",
  authDomain: "mangalamwifi.firebaseapp.com",
  projectId: "mangalamwifi",
  storageBucket: "mangalamwifi.firebasestorage.app",
  messagingSenderId: "878377640142",
  appId: "1:878377640142:web:094848249c7b8f6686309f",
  measurementId: "G-XVTBRCRB8Y"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };