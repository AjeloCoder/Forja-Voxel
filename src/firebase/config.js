
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyB0Wul2PW1LpXvXntpPLLvlfu72rUC95gI",
  authDomain: "forja-voxel.firebaseapp.com",
  projectId: "forja-voxel",
  storageBucket: "forja-voxel.firebasestorage.app",
  messagingSenderId: "569671313567",
  appId: "1:569671313567:web:a028e2c45e13baee8c1aaa",
  measurementId: "G-M71PJYRMPN"
};


export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);