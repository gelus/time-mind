// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyB9pymyl1sCOAzP8wRvd8XvnPR2_XZfnMs",
  authDomain: "time-mind-9d51d.firebaseapp.com",
  projectId: "time-mind-9d51d",
  storageBucket: "time-mind-9d51d.firebasestorage.app",
  messagingSenderId: "569152050883",
  appId: "1:569152050883:web:cc27818aa67911f56bf476",
  measurementId: "G-4JTS5T74CV"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebaseApp);

