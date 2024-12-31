// Import the Firebase modules you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCUs0p4Eo_Klq28-d2PZtGXqsDrVU7AAuQ',
  authDomain: 'habit-track-90bd8.firebaseapp.com',
  projectId: 'habit-track-90bd8',
  storageBucket: 'habit-track-90bd8.firebasestorage.app',
  messagingSenderId: '608196837561',
  appId: '1:608196837561:web:07238d3918d8dcdff7db68',
  measurementId: 'G-XKHSEVTZ6N'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore (database)
export const db = getFirestore(app);

// Initialize Firebase Auth (if needed)
export const auth = getAuth(app);
