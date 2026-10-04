import {
  getApps,
  initializeApp,
  type FirebaseApp,
} from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBSEZl9aOwzDyoW47sRTmhFc7Mh72RHsQY",
  authDomain: "hirakada.firebaseapp.com",
  projectId: "hirakada",
  storageBucket: "hirakada.firebasestorage.app",
  messagingSenderId: "732887994387",
  appId: "1:732887994387:web:29edbbfc9dbb2301792fe6",
  measurementId: "G-WJH2YN9QX4",
};

export function initializeFirebase(): FirebaseApp {
  const existingApp = getApps().find((app) => app.name === "[DEFAULT]");

  return existingApp ?? initializeApp(firebaseConfig);
}
