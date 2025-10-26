import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBNEKGvneBMNt6Hu5fZZpoW2kP_7d1lebg",
  authDomain: "testing-3d2cc.firebaseapp.com",
  projectId: "testing-3d2cc",
  storageBucket: "testing-3d2cc.firebasestorage.app", // Verified this is correct for your project
  messagingSenderId: "71005655791",
  appId: "1:71005655791:web:281c04acfec4658ed6011a",
  measurementId: "G-WG6VM1M4B7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };